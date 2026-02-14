
import { GoogleGenAI, Type } from "@google/genai";
import { VerificationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeLiveness = async (base64Image: string, challengesText: string): Promise<VerificationResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: `AUDIT LOG: Liveness Detection for High-Value Asset Access.
            
            SCENARIO: User was prompted with: "${challengesText}". 
            Current frame captured during a high-intensity Blue Chroma-Flash.
            
            TASK: Perform a deep forensic analysis of this image to detect:
            1. SYNTHETIC RIGIDITY: Does the facial muscle movement look mathematically perfect or naturally chaotic?
            2. MOIRÉ PATTERNS: Look for micro-grid artifacts suggesting the camera is filming an LCD screen (Injection Attack).
            3. REFLECTIVE AUDIT: Is there a blue tint reflection on the eyes or skin consistent with the screen's flash?
            4. BOUNDARY ANALYSIS: Check for "ghosting" around the chin or hair-line which suggests a real-time deepfake mask overlay.
            
            Return a JSON object with 'isReal' (boolean), 'confidence' (number 0-1), 'sentiment' (string: 'fluid' or 'rigid'), 
            and 'reasoning' (concise forensic summary).`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isReal: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            sentiment: { type: Type.STRING },
            reasoning: { type: Type.STRING },
          },
          required: ["isReal", "confidence", "sentiment", "reasoning"]
        }
      }
    });

    return JSON.parse(response.text.trim()) as VerificationResult;
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      isReal: false,
      confidence: 0,
      sentiment: 'unknown',
      reasoning: 'AI security pipeline timed out.'
    };
  }
};
