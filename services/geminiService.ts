
import { GoogleGenAI } from "@google/genai";
import { ArtStyle, Language } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType
    },
  };
};

export const generatePrompt = async (
  imageBase64: string,
  mimeType: string,
  artStyle: ArtStyle,
  language: Language
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const imagePart = fileToGenerativePart(imageBase64, mimeType);

    const prompt = `
      Your task is to act as an expert prompt engineer for AI image generation models like DALL-E, Midjourney, and Stable Diffusion. Analyze the provided image and generate a detailed, descriptive, and artistic text prompt that could be used to recreate or creatively interpret the image.

      **Instructions:**
      1. The output prompt must be in **${language}**.
      2. The desired art style is **${artStyle}**. Incorporate this style into the prompt.
      3. The prompt should be a single, continuous string of text, without any special formatting like markdown or line breaks.
      4. Describe the image in detail, covering elements such as:
          *   **Subject**: What is the main subject? Describe their appearance, clothing, expression, and action.
          *   **Setting/Background**: Where is the subject? Describe the environment, time of day, and any background elements.
          *   **Lighting**: Describe the quality of light (e.g., soft, harsh, golden hour, neon).
          *   **Color Tone**: Describe the overall color palette (e.g., vibrant, muted, monochromatic, pastel).
          *   **Mood/Atmosphere**: What is the feeling of the image (e.g., serene, dramatic, joyful, mysterious)?
          *   **Composition/Camera Angle**: Describe the shot (e.g., close-up, wide shot, low angle, high angle, shallow depth of field).

      **Example Output:**
      "A stunningly detailed ${artStyle} of a majestic lion with a golden mane, sitting on a rocky outcrop at sunset. The warm, golden hour light illuminates its fur. The background is a vast, serene savanna with acacia trees. The mood is powerful and peaceful. Wide-angle shot, cinematic lighting, hyperrealistic, epic."

      Now, analyze the image I've provided and generate the prompt.
    `;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [{text: prompt}, imagePart]},
    });

    const text = response.text;
    if (text) {
      return text.trim();
    } else {
      throw new Error("Failed to generate prompt. The response was empty.");
    }
  } catch (error) {
    console.error("Error generating prompt:", error);
    if (error instanceof Error) {
        return `Error: ${error.message}`;
    }
    return "An unknown error occurred while generating the prompt.";
  }
};
