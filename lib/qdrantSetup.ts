import {qdrantClient} from "@/lib/qdrant";

export async function ensureQdrantCollection() {
    const collectionName = process.env.QDRANT_COLLECTION;
    if (!collectionName) throw new Error("Missing QDRANT_COLLECTION");

    const exists = async () => (await qdrantClient.getCollections()).collections.some(
        (collection) => collection.name === collectionName,
    );

    if (!await exists()) {
        try {
            await qdrantClient.createCollection(collectionName, {
                vectors: {size: 768, distance: "Cosine"},
            });
        } catch (error) {
            if (!await exists()) throw error;
        }
    }

    for (const field of ["appId", "mongoFeatureId"]) {
        await qdrantClient.createPayloadIndex(collectionName, {
            field_name: field,
            field_schema: "keyword",
            wait: true,
        });
    }
}
