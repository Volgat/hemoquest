'use server';

/**
 * @fileOverview Dynamic sprite generation flow using AI.
 *
 * - generateSprite - A function that generates a sprite based on a text prompt.
 * - GenerateSpriteInput - The input type for the generateSprite function.
 * - GenerateSpriteOutput - The return type for the generateSprite function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSpriteInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired sprite.'),
});
export type GenerateSpriteInput = z.infer<typeof GenerateSpriteInputSchema>;

const GenerateSpriteOutputSchema = z.object({
  spriteDataUri: z
    .string() // Consider refining this to validate as a data URI if needed
    .describe('The generated sprite as a data URI (e.g., PNG base64 encoded).'),
});
export type GenerateSpriteOutput = z.infer<typeof GenerateSpriteOutputSchema>;

export async function generateSprite(input: GenerateSpriteInput): Promise<GenerateSpriteOutput> {
  return generateSpriteFlow(input);
}

const generateSpriteFlow = ai.defineFlow(
  {
    name: 'generateSpriteFlow',
    inputSchema: GenerateSpriteInputSchema,
    outputSchema: GenerateSpriteOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: `Generate a 2D game sprite with a transparent background. The sprite should be in a friendly, cartoon style.

Description: ${input.prompt}`,
      model: 'googleai/gemini-pro-vision',
    });

    return {spriteDataUri: media!.url!};
  }
);
