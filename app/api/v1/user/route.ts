import authOptions from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";
import uploadOnCloudinary from "@/lib/cloudinary";

export async function GET() {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session || !session?.user?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "user not authenticated",
                },
                {status: 400},
            );
        }
        const user = await User.findById(session.user.id).select("-password");
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "user not found",
                },
                {status: 404},
            );
        }
        return NextResponse.json(
            {
                success: true,
                message: "user fetched successfully",
                user,
            },
            {status: 200},
        );
    } catch (error) {
        console.error("Legacy profile request failed", error instanceof Error ? error.name : "UnknownError");
        return NextResponse.json(
            {
                success: false,
                message: "Error in fetching profile",
            },
            {status: 500},
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session || !session?.user?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "user not authenticated",
                },
                {status: 401},
            );
        }
        const formData = await request.formData();
        const name = formData.get("name");
        const file = formData.get("file");
        if ((name !== null && typeof name !== "string") || typeof file === "string") {
            return NextResponse.json({success: false, message: "Invalid profile data"}, {status: 400});
        }
        const updateData: {username?: string; image?: string} = {};
        if (name !== null) updateData.username = name;

        if (file) {
            const image = await uploadOnCloudinary(file);
            if (!image) {
                return NextResponse.json({success: false, message: "Profile image upload failed"}, {status: 502});
            }
            updateData.image = image;
        }

        const user = await User.findByIdAndUpdate(session.user.id, updateData, {
            new: true,
        }).select("-password");
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                {status: 404},
            );
        }
        return NextResponse.json(
            {
                success: true,
                message: "Profile Updated Successfully",
                user,
            },
            {status: 200},
        );
    } catch (error) {
        console.error("Legacy profile request failed", error instanceof Error ? error.name : "UnknownError");
        return NextResponse.json(
            {
                success: false,
                message: "Error in updating profile",
            },
            {status: 500},
        );
    }
}