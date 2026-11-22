import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY");
}

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export const generateEmbeddings = async (text: string) => {
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: text.trim().replace(/\s+/g, " "),
        config: {
            httpOptions: {timeout: 15000},
            outputDimensionality: 768,
            taskType: 'RETRIEVAL_QUERY' // Added for better RAG accuracy
        },
    });
    const values = response.embeddings?.[0]?.values;
    if (values?.length !== 768 || !values.every(Number.isFinite)) {
        throw new Error("Embedding provider returned an invalid vector");
    }
    return values;
};