import { geminiModel } from "@/helpers/server/gemini-model";
import { generateEmbeddings } from "@/helpers/server/generateEmbeddings";
import prompt from "@/helpers/server/prompt";
import connectDB from "@/lib/db";
import { searchSimilarFeatures } from "@/lib/qdrantSearch";
import App from "@/models/app.model";
import Feature from "@/models/feature.model";
import { hashAppKey } from "@/security/appKey";
import { decrypt } from "@/security/encryption";
import { NextRequest } from "next/server";
import { GoogleGenAI, type Part } from "@google/genai";
type ChatEvent =
  | { type: "status" | "error"; message: string }
  | { type: "text"; chunk: string }
  | { type: "meta"; route: string | null; elementId: string | null }
  | { type: "done" };

const metaMarker = "[[META]]";

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

  const abort = new AbortController();
  const signal = AbortSignal.any([abort.signal, request.signal, AbortSignal.timeout(60000)]);
  const stream = new ReadableStream({
    cancel() {
      abort.abort();
    },
    async start(controller) {
      let stage = "request";
      const sendEvent = (data: ChatEvent) => {
        if (abort.signal.aborted || request.signal.aborted) return;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      const sendError = (message: string) => {
        sendEvent({
          type: "error",
          message,
        });
      };

      try {
        const contentType = request.headers.get("content-type") || "";
        let rawAppKey: unknown;
        let rawQuery: unknown;
        let imageFile: File | null = null;

        try {
          if (contentType.includes("multipart/form-data")) {
            const form = await request.formData();
            rawAppKey = form.get("appKey");
            rawQuery = form.get("query");
            const image = form.get("image");
            if (image !== null) {
              if (typeof image === "string" || !image.type.startsWith("image/")
                || image.size === 0 || image.size > 10 * 1024 * 1024) {
                sendError("Provide an image up to 10 MB");
                return controller.close();
              }
              imageFile = image;
            }
          } else {
            const body: unknown = await request.json();
            if (!body || typeof body !== "object") throw new Error("Invalid body");
            ({ appKey: rawAppKey, query: rawQuery } = body as Record<string, unknown>);
          }
        } catch {
          sendError("Invalid chat request");
          return controller.close();
        }

        if (typeof rawAppKey !== "string" || !rawAppKey.trim()) {
          sendError("App key missing");
          return controller.close();
        }
        if (rawQuery != null && typeof rawQuery !== "string") {
          sendError("Query must be text");
          return controller.close();
        }
        const query = (rawQuery ?? "").trim();
        if (!query && !imageFile) {
          sendError("Either query or image is required");
          return controller.close();
        }
        stage = "database";
        await connectDB();

        // Optional early status event
        sendEvent({
          type: "status",
          message: "Analyzing your request...",
        });

        const hashKey = hashAppKey(rawAppKey);

        const app = await App.findOne({
          appKey: hashKey,
        }).select("+geminiKey");

        if (!app) {
          sendError("App not found");
          return controller.close();
        }

        const appId = app._id.toString();
        const activeFeatureIds = (app.features ?? []).map(String);
        stage = "embedding";
        const embedding = query && activeFeatureIds.length ? await generateEmbeddings(query) : null;
        stage = "retrieval";
        const matches = embedding ? await searchSimilarFeatures(embedding, appId, activeFeatureIds) : [];
        const featureIds = query ? matches.map((match) => match.payload?.mongoFeatureId) : activeFeatureIds.slice(0, 5);
        stage = "database";
        const features = await Feature.find({ appId, _id: { $in: featureIds } });

        stage = "generation";
        const geminiKey = decrypt(app.geminiKey);
        const parts: Part[] = [{ text: prompt(app, query || "Help me with this screenshot.", features) }];
        if (imageFile) {
          parts.push({ inlineData: {
            mimeType: imageFile.type,
            data: Buffer.from(await imageFile.arrayBuffer()).toString("base64"),
          } });
        }

        const genAi = new GoogleGenAI({
          apiKey: geminiKey,
        });

        sendEvent({
          type: "status",
          message: "Generating response...",
        });

        signal.throwIfAborted();
        const aiResult = await genAi.models.generateContentStream({
          model: geminiModel,
          contents: [{ role: "user", parts }],
          config: { abortSignal: signal },
        });

        let pending = "";
        let metadata = "";
        let readingMetadata = false;

        for await (const item of aiResult) {
          if (signal.aborted) throw signal.reason;
          const chunk = item.text || "";
          if (readingMetadata) {
            metadata += chunk;
            continue;
          }
          pending += chunk;
          const markerIndex = pending.indexOf(metaMarker);
          if (markerIndex >= 0) {
            const text = pending.slice(0, markerIndex);
            if (text) sendEvent({ type: "text", chunk: text });
            metadata = pending.slice(markerIndex + metaMarker.length);
            readingMetadata = true;
            pending = "";
            continue;
          }
          let boundary = Math.min(pending.length, metaMarker.length - 1);
          while (boundary && !pending.endsWith(metaMarker.slice(0, boundary))) boundary--;
          const text = pending.slice(0, pending.length - boundary);
          if (text) sendEvent({ type: "text", chunk: text });
          pending = pending.slice(text.length);
        }
        if (pending) sendEvent({ type: "text", chunk: pending });

        let route: string | null = null;
        let elementId: string | null = null;
        if (metadata.trim()) {
          try {
            const value = JSON.parse(metadata) as { route?: unknown; elementId?: unknown } | null;
            if (typeof value?.route === "string") route = value.route;
            if (typeof value?.elementId === "string") elementId = value.elementId;
          } catch {
            console.warn("Chat provider returned invalid metadata");
          }
        }
        sendEvent({ type: "meta", route, elementId });

        sendEvent({
          type: "done",
        });

        if (!abort.signal.aborted) controller.close();
      } catch (error) {
        if (abort.signal.aborted) return;
        const status = error && typeof error === "object" && "status" in error && typeof error.status === "number"
          ? error.status
          : undefined;
        console.error("Chat request failed", { stage, status, type: error instanceof Error ? error.name : "UnknownError" });

        sendEvent({
          type: "error",
          message: signal.aborted ? "Chat request timed out" : "Unable to generate a response",
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
