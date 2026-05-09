import { generateEmbeddings } from "@/helpers/server/generateEmbeddings";
import prompt from "@/helpers/server/promt";
import connectDB from "@/lib/db";
import { searchSimilarFeatures } from "@/lib/qdrantSearch";
import App from "@/models/app.model";
import Feature from "@/models/feature.model";
import { hashAppKey } from "@/security/appKey";
import { decrypt } from "@/security/encryption";
import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getErrorMessage } from "@/helpers/server/errorMessage";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-SDK-Name, X-SDK-Version",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      const sendError = (message: string) => {
        sendEvent({
          type: "error",
          message,
        });
      };

      try {
        await connectDB();

        const contentType = request.headers.get("content-type") || "";

        let appKey: string | null = null;
        let query = "";
        let imageFile: File | null = null;

        if (contentType.includes("multipart/form-data")) {
          const formData = await request.formData();

          appKey = formData.get("appKey") as string | null;
          query = (formData.get("query") as string) || "";
          imageFile = formData.get("image") as File | null;
        } else {
          const body = await request.json();

          appKey = body.appKey;
          query = body.query || "";
        }

        if (!appKey) {
          sendError("App key missing");
          return controller.close();
        }

        if (!query && !imageFile) {
          sendError("Either query or image is required");
          return controller.close();
        }

        // Optional early status event
        sendEvent({
          type: "status",
          message: "Analyzing your request...",
        });

        const hashKey = hashAppKey(appKey);

        const app = await App.findOne({
          appKey: hashKey,
        }).select("+geminiKey");

        if (!app) {
          sendError("App not found");
          return controller.close();
        }

        const emb = query ? await generateEmbeddings(query) : null;

        if (!emb) {
          sendError("Failed to generate embeddings");
          return controller.close();
        }

        const result = await searchSimilarFeatures(emb, app._id.toString());

        const featureIds = result.map((r) => r?.payload?.mongoFeatureId);

        const features = await Feature.find({
          _id: { $in: featureIds },
        });

        const geminiKey = decrypt(app.geminiKey);

        const getPrompt = prompt(app, query, features);

        const genAi = new GoogleGenAI({
          apiKey: geminiKey,
        });

        sendEvent({
          type: "status",
          message: "Generating response...",
        });

        const aiResult = await genAi.models.generateContentStream({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: getPrompt,
                },
              ],
            },
          ],
        });

        let fullText = "";
        let metaStarted = false;

        for await (const item of aiResult) {
          const chunk = item.candidates?.[0]?.content?.parts?.[0]?.text || "";

          if (!chunk) continue;

          fullText += chunk;

          // Stop streaming once metadata starts
          if (fullText.includes("[[META]]") || metaStarted) {
            metaStarted = true;
            continue;
          }

          sendEvent({
            type: "text",
            chunk,
          });
        }

        let cleanText = fullText;

        let meta = {
          route: null,
          elementId: null,
        };

        if (fullText.includes("[[META]]")) {
          const parts = fullText.split("[[META]]");

          cleanText = parts[0].trim();

          try {
            meta = JSON.parse(parts[1].trim());
          } catch (err) {
            console.error("Meta parse error:", err);
          }
        }

        // Optional future usage
        console.log("Final Clean Response:", cleanText);

        sendEvent({
          type: "meta",
          route: meta.route,
          elementId: meta.elementId,
        });

        sendEvent({
          type: "done",
        });

        controller.close();
      } catch (error) {
        console.error(error);

        sendEvent({
          type: "error",
          message: getErrorMessage(error),
        });

        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,

      "Content-Type": "text/event-stream",

      "Cache-Control": "no-cache, no-transform",

      Connection: "keep-alive",

      "X-Accel-Buffering": "no",
    },
  });
}
