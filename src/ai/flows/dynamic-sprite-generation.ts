'use server';

/**
 * @fileOverview Dynamic sprite generation flow using Hugging Face.
 */

import { z } from 'zod';

const GenerateSpriteInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired sprite.'),
});
export type GenerateSpriteInput = z.infer<typeof GenerateSpriteInputSchema>;

const GenerateSpriteOutputSchema = z.object({
  spriteDataUri: z
    .string()
    .describe('The generated sprite as a data URI (e.g., PNG base64 encoded).'),
});
export type GenerateSpriteOutput = z.infer<typeof GenerateSpriteOutputSchema>;

/**
 * Generates a sprite using Hugging Face Inference API.
 */
export async function generateSprite(input: GenerateSpriteInput): Promise<GenerateSpriteOutput> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    throw new Error('Hugging Face API key not configured.');
  }

  // Use a fast, reliable model for sprite-like images
  const model = "black-forest-labs/FLUX.1-schnell";
  const endpoint = `https://router.huggingface.co/hf-inference/models/${model}`;

  const enhancedPrompt = `A 2D game sprite of ${input.prompt}. Friendly cartoon style, white background, high quality, digital art, vector style, isolated.`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: enhancedPrompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HF Image Error: ${response.status} - ${errorText}`);
      throw new Error(`Hugging Face image generation failed: ${response.status}`);
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUri = `data:image/webp;base64,${base64}`;

    return { spriteDataUri: dataUri };
  } catch (error) {
    console.error('Error generating sprite:', error);
    throw error;
  }
}
