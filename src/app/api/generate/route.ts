import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { buildCakePrompt } from "@/lib/prompt";
import type { CakeConfig } from "@/lib/types";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const config: CakeConfig = await request.json();

    if (!config.kageType || !config.smag) {
      return NextResponse.json(
        { error: "Vælg mindst kage-type og smag" },
        { status: 400 }
      );
    }

    const prompt = buildCakePrompt(config);

    const result = await generateText({
      model: google("gemini-3.1-flash-image-preview"),
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: prompt }],
        },
      ],
      providerOptions: {
        google: {
          responseModalities: ["IMAGE"],
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K",
          },
        },
      },
    });

    const file = result.files?.[0];
    if (!file) {
      return NextResponse.json(
        { error: "AI kunne ikke generere et billede. Prøv igen." },
        { status: 500 }
      );
    }

    const base64 = Buffer.from(file.uint8Array).toString("base64");

    return NextResponse.json({
      image: base64,
      mimeType: file.mediaType || "image/png",
    });
  } catch (error) {
    console.error("[generate] Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Der opstod en fejl under generering",
      },
      { status: 500 }
    );
  }
}
