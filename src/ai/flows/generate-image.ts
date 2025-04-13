'use server';

/**
 * @fileOverview Generates an image based on a text prompt.
 *
 * - generateImage - A function that generates an image URL from a text prompt.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the image from.'),
});

export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image.'),
});

export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImagePrompt = ai.definePrompt({
  name: 'generateImagePrompt',
  input: {
    schema: GenerateImageInputSchema,
  },
  output: {
    schema: GenerateImageOutputSchema,
  },
  prompt: `You are an AI image generator. Generate a URL for an image based on the following prompt: {{{prompt}}}`,
});

const generateImageFlow = ai.defineFlow<
  typeof GenerateImageInputSchema,
  typeof GenerateImageOutputSchema
>({
  name: 'generateImageFlow',
  inputSchema: GenerateImageInputSchema,
  outputSchema: GenerateImageOutputSchema,
}, async (input) => {
  const {output} = await generateImagePrompt(input);
  return output!;
});
