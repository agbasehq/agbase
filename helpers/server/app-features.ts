import {Types} from "mongoose";
import {v4 as uuidv4} from "uuid";
import Feature from "@/models/feature.model";
import {generateEmbeddings} from "@/helpers/server/generateEmbeddings";
import {ensureQdrantReady} from "@/lib/qdrantInit";
import {qdrantClient} from "@/lib/qdrant";
import {upsertFeatureVector} from "@/lib/qdrantUpsert";

type FeatureInput = {
    name: string;
    description: string;
    route?: string | null;
    elementId?: string | null;
    image?: string | null;
};

export function isFeatureList(value: unknown): value is FeatureInput[] {
    return Array.isArray(value) && value.every((item: unknown) => {
        if (!item || typeof item !== "object") return false;
        const feature = item as Record<string, unknown>;
        return typeof feature.name === "string" && Boolean(feature.name.trim())
            && typeof feature.description === "string" && Boolean(feature.description.trim())
            && ["route", "elementId", "image"].every((key) =>
                feature[key] == null || typeof feature[key] === "string",
            );
    });
}

export async function removeAppFeatures(appId: Types.ObjectId, featureIds: Types.ObjectId[]) {
    if (featureIds.length === 0) return;

    const results = await Promise.allSettled([
        Feature.deleteMany({appId, _id: {$in: featureIds}}),
        qdrantClient.delete(process.env.QDRANT_COLLECTION!, {
            wait: true,
            filter: {must: [
                {key: "appId", match: {value: appId.toString()}},
                {key: "mongoFeatureId", match: {any: featureIds.map(String)}},
            ]},
        }),
    ]);
    if (results.some((result) => result.status === "rejected")) {
        console.error("App feature cleanup failed for app", appId.toString());
    }
}

export async function stageAppFeatures(appId: Types.ObjectId, inputs: FeatureInput[]) {
    const featureIds: Types.ObjectId[] = [];
    if (inputs.length === 0) return featureIds;

    await ensureQdrantReady();
    try {
        for (const {name, description, route, elementId, image} of inputs) {
            const embedding = await generateEmbeddings(description);
            const _id = new Types.ObjectId();
            featureIds.push(_id);
            await Feature.create({_id, appId, name, description, route, elementId, image});
            await upsertFeatureVector({
                pointId: uuidv4(),
                embedding,
                payload: {appId: appId.toString(), mongoFeatureId: _id.toString(), name, route},
            });
        }
        return featureIds;
    } catch (error) {
        await removeAppFeatures(appId, featureIds);
        throw error;
    }
}
