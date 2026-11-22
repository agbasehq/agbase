import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/db";
import Feature from "@/models/feature.model";
import App from "@/models/app.model";
import {encrypt} from "@/security/encryption";
import {generateAppKey, hashAppKey} from "@/security/appKey";
import User from "@/models/user.model";
import {qdrantClient} from "@/lib/qdrant";
import {getAppOwnerId} from "@/helpers/server/app-owner";
import {isObjectIdOrHexString, Types} from "mongoose";
import {isFeatureList, removeAppFeatures, stageAppFeatures} from "@/helpers/server/app-features";

function appError(message: string, status: number) {
    return NextResponse.json({success: false, message}, {status});
}

async function requireOwner(request: NextRequest) {
    try {
        return await getAppOwnerId(request) ?? appError("Sign in to access apps", 401);
    } catch {
        return appError("Unable to verify session", 503);
    }
}

export async function POST(request: NextRequest) {
    const owner = await requireOwner(request);
    if (typeof owner !== "string") return owner;

    const encoder = new TextEncoder();
    const body: unknown = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return appError("Invalid app data", 400);
    const {owner: requestedOwner, name, contactEmail, geminiKey, description, features: inputFeats} =
        body as Record<string, unknown>;
    if (requestedOwner !== undefined && requestedOwner !== owner) {
        return appError("App owner does not match the signed-in user", 403);
    }

    if (typeof name !== "string" || !name.trim()
        || typeof contactEmail !== "string" || !contactEmail.trim()
        || typeof geminiKey !== "string" || !geminiKey.trim()
        || typeof description !== "string" || !description.trim()
        || !isFeatureList(inputFeats)) {
        return appError("App details and features are invalid", 400);
    }

    const stream = new ReadableStream({
        async start(controller) {
            const sendStatus = (message: string) => {
                controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({type: "status", message})}\n\n`)
                );
            };
            const sendFinal = (payload: {success: boolean; message: string; appKey: string}) => {
                controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({type: "final", ...payload})}\n\n`)
                );
            };
            const sendError = (message: string) => {
                controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({type: "error", message})}\n\n`)
                );
            };
            try {
                await connectDB();
                const user = await User.findById(owner);
                if (!user) {
                    sendError("App owner not found");
                    return controller.close();
                }
                sendStatus("🔐 Encrypting Your Gemini Key...");
                const encryptedGeminiKey = encrypt(geminiKey);
                sendStatus("🔑 Generating secure App Key...");
                const secureAppKey = generateAppKey();
                const hashSecureAppKey = hashAppKey(secureAppKey);
                sendStatus("🗄️ Creating Your Application...");
                const appId = new Types.ObjectId();
                sendStatus("Registering and indexing features...");
                const features = await stageAppFeatures(appId, inputFeats);
                const app = await App.create({
                    _id: appId,
                    owner,
                    name,
                    contactEmail,
                    geminiKey: encryptedGeminiKey,
                    description,
                    appKey: hashSecureAppKey,
                    features,
                });
                user.apps.push(app._id);
                await user.save().catch(() => {
                    console.error("App profile link update failed for app", appId.toString());
                });
                sendFinal({
                    success: true,
                    message: "App Created Successfully",
                    appKey: secureAppKey,
                });
                controller.close();
            } catch (error) {
                console.error("App operation failed", error instanceof Error ? error.name : "UnknownError");
                sendError("❌ Failed to create app. Check server logs.");

                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        },
    });
}

export async function GET(request: NextRequest) {
    const owner = await requireOwner(request);
    if (typeof owner !== "string") return owner;

    try {
        await connectDB();
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        const appId = searchParams.get("appId");

        if (appId) {
            if (!isObjectIdOrHexString(appId)) return appError("Invalid app ID", 400);
            const app = await App.findOne({_id: appId, owner})
                .populate("features")
                .select("name description features contactEmail owner");

            if (!app) {
                return NextResponse.json({success: false, message: "App not found."}, {status: 404});
            }
            return NextResponse.json({success: true, app}, {status: 200});
        }

        if (userId) {
            if (userId !== owner) return appError("App owner does not match the signed-in user", 403);
            const apps = await App.find({owner}).select("name description features contactEmail");
            return NextResponse.json({success: true, apps}, {status: 200});
        }

        return NextResponse.json(
            {success: false, message: "Provide either userId or appId"},
            {status: 400}
        );

    } catch (error) {
        console.error("App operation failed", error instanceof Error ? error.name : "UnknownError");
        return NextResponse.json(
            {success: false, message: "Internal server error"},
            {status: 500}
        );
    }
}

export async function DELETE(request: NextRequest) {
    const owner = await requireOwner(request);
    if (typeof owner !== "string") return owner;

    try {
        await connectDB();
        const {searchParams} = new URL(request.url);
        const appId = searchParams.get("appId");
        if (!isObjectIdOrHexString(appId)) return appError("Invalid app ID", 400);
        const app = await App.findOne({_id: appId, owner});
        if (!app) {
            return appError("App not found", 404);
        }
        const user = await User.findById(owner);
        if (!user) {
            return appError("App owner not found", 404);
        }
        const deletion = await App.deleteOne({_id: app._id, owner});
        if (!deletion.deletedCount) return appError("App not found", 404);
        user.apps.pull(app._id);
        const cleanup = await Promise.allSettled([
            Feature.deleteMany({appId: app._id}),
            qdrantClient.delete(process.env.QDRANT_COLLECTION!, {
                wait: true,
                filter: {must: [{key: "appId", match: {value: appId}}]},
            }),
            user.save(),
        ]);
        if (cleanup.some((result) => result.status === "rejected")) {
            console.error("Deleted app cleanup failed for app", appId);
        }
        return NextResponse.json({success: true, message: "App deleted successfully."});
    } catch (error) {
        console.error("App operation failed", error instanceof Error ? error.name : "UnknownError");
        return NextResponse.json(
            {
                success: false,
                message: `Internal server error for deleting app`,
            },
            {status: 500}
        );
    }
}

export async function PUT(request: NextRequest) {
    const owner = await requireOwner(request);
    if (typeof owner !== "string") return owner;

    try {
        await connectDB();
        const formData = await request.formData().catch(() => null);
        if (!formData) return appError("Invalid app data", 400);
        if (["name", "description", "contactEmail", "geminiKey"].some((field) => {
            const value = formData.get(field);
            return value !== null && typeof value !== "string";
        })) return appError("Invalid app details", 400);
        const {searchParams} = new URL(request.url);
        const appId = searchParams.get("appId");

        if (!appId) {
            return NextResponse.json({success: false, message: "appId is required"}, {status: 400});
        }

        if (!isObjectIdOrHexString(appId)) return appError("Invalid app ID", 400);
        const app = await App.findOne({_id: appId, owner}).select("+geminiKey");
        if (!app) {
            return NextResponse.json({success: false, message: "App not found"}, {status: 404});
        }

        const name = formData.get("name")?.toString() || app.name;
        const description = formData.get("description")?.toString() || app.description;
        const contactEmail = formData.get("contactEmail")?.toString() || app.contactEmail;

        let encryptedGeminiKey = app.geminiKey;
        const newGeminiKey = formData.get("geminiKey")?.toString();
        if (newGeminiKey && newGeminiKey !== "undefined") {
            encryptedGeminiKey = encrypt(newGeminiKey);
        }

        const rawFeatures = formData.get("features");
        let inputFeats: unknown = [];
        if (rawFeatures !== null) {
            if (typeof rawFeatures !== "string") return appError("Invalid features", 400);
            try {
                inputFeats = JSON.parse(rawFeatures);
            } catch {
                return appError("Invalid features JSON", 400);
            }
        }
        if (!isFeatureList(inputFeats)) return appError("Invalid features", 400);

        const oldFeatureIds = app.features ?? [];
        const newFeatureIds = await stageAppFeatures(app._id, inputFeats);
        const updated = await App.findOneAndUpdate(
            {_id: app._id, owner, updatedAt: app.updatedAt ?? {$exists: false}},
            {name, description, contactEmail, geminiKey: encryptedGeminiKey, features: newFeatureIds},
        );

        if (!updated) {
            await removeAppFeatures(app._id, newFeatureIds);
            return appError("App changed while editing. Reload and try again.", 409);
        }
        await removeAppFeatures(app._id, oldFeatureIds);

        return NextResponse.json({
            success: true,
            message: "App and features updated and re-indexed successfully"
        });

    } catch (error) {
        console.error("App update failed", error instanceof Error ? error.name : "UnknownError");
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error for updating app",
            },
            {status: 500}
        );
    }
}