import {ensureQdrantCollection} from "@/lib/qdrantSetup";

let initialization: Promise<void> | undefined;

export function ensureQdrantReady() {
    initialization ??= ensureQdrantCollection().catch((error: unknown) => {
        initialization = undefined;
        throw error;
    });
    return initialization;
}
