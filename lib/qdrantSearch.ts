import {qdrantClient} from "@/lib/qdrant";
import {ensureQdrantReady} from "@/lib/qdrantInit";

export async function searchSimilarFeatures(embedding: number[], appId: string, featureIds: string[]) {
    if (featureIds.length === 0) return [];

    await ensureQdrantReady();
    const {points} = await qdrantClient.query(process.env.QDRANT_COLLECTION!, {
        query: embedding,
        with_payload: true,
        limit: 5,
        filter: {
            must: [
                {key: "appId", match: {value: appId}},
                {key: "mongoFeatureId", match: {any: featureIds}},
            ],
        },
    });
    return points;
}
