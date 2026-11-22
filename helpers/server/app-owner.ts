import { isObjectIdOrHexString } from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { getApiOrigin } from "@/lib/api-origin";

export async function getAppOwnerId(request: NextRequest): Promise<string | null> {
    const cookie = request.headers.get("cookie");
    if (!cookie) return null;

    const profile = await fetch(new URL("/user", getApiOrigin()), {
        headers: { cookie },
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(5000),
    });

    if (profile.ok) {
        const { _id } = await profile.json();
        if (typeof _id !== "string" || !isObjectIdOrHexString(_id)) {
            throw new Error("Invalid dashboard profile ID");
        }
        return _id;
    }

    if (profile.status !== 401) {
        throw new Error("Dashboard profile lookup failed");
    }

    const token = await getToken({ req: request });
    return typeof token?.id === "string" && isObjectIdOrHexString(token.id)
        ? token.id
        : null;
}
