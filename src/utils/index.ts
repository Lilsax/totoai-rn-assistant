import { GOOGLE_API_KEY } from '../config/env';

export async function getEmbedding(text: string): Promise<number[]> {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${GOOGLE_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "models/gemini-embedding-001",
                content: {
                    parts: [{ text }],
                },
            }),
        }
    );

    const data = await response.json();

    if (!data.embedding) {
        throw new Error("Failed to get embedding: " + JSON.stringify(data));
    }

    return data.embedding.values; // returns float[] like SDK
}

