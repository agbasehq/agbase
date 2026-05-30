import crypto from "crypto";

export function generateAppKey(): string {
    const random = crypto.randomBytes(32).toString("hex");
    return `agbase_live_${random}`;
}

const HASH_SECRET = process.env.APP_KEY_SECRET || 'fallback-secret-for-dev-only';

export function hashAppKey(appKey: string): string {
    return crypto
        .createHmac('sha256', HASH_SECRET)
        .update(appKey)
        .digest('hex');
}
