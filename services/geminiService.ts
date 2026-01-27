
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GeminiAnalysisResponse } from "../types";

const API_KEY = process.env.API_KEY || "";

export const analyzeMedia = async (
  base64Data: string,
  mimeType: string
): Promise<GeminiAnalysisResponse> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are an expert digital forensics analyst specialized in identifying AI-generated content (images and videos).
    Analyze the provided media for artifacts common in GANs, Diffusion models, and Deepfakes.
    Look for:
    1. Irregular textures/blurring in hair or backgrounds.
    2. Anatomical inconsistencies (hands, eyes, ears).
    3. Lighting/shadow mismatch.
    4. Text warping or gibberish.
    5. Background hallucinations.
    6. For videos, look for temporal flickering or "ghosting" around movement.

    Respond ONLY in JSON format following the schema provided.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data,
          },
        },
        {
          text: "Analyze this file for AI generation artifacts and provide a detailed forensic report in JSON.",
        },
      ],
    },
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          is_ai_generated: { type: Type.BOOLEAN },
          confidence_score: { type: Type.NUMBER, description: "Scale 0-1" },
          reasoning_summary: { type: Type.STRING },
          detected_artifacts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                description: { type: Type.STRING },
                severity: { type: Type.STRING, enum: ["low", "medium", "high"] },
              },
              required: ["label", "description", "severity"],
            },
          },
        },
        required: ["is_ai_generated", "confidence_score", "reasoning_summary", "detected_artifacts"],
      },
    },
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text) as GeminiAnalysisResponse;
  } catch (err) {
    console.error("Failed to parse Gemini response:", err);
    throw new Error("Forensic analysis engine failed to return valid data.");
  }
};
