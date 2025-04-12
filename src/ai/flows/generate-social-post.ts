'use server';
/**
 * @fileOverview A social media post generation AI agent.
 *
 * - generateSocialPost - A function that handles the social media post generation process.
 * - GenerateSocialPostInput - The input type for the generateSocialPost function.
 * - GenerateSocialPostOutput - The return type for the generateSocialPost function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateSocialPostInputSchema = z.object({
  topic: z.string().describe('The topic of the social media post.'),
  tone: z.string().describe('The desired tone of the social media post (e.g., professional, funny, casual).'),
});
export type GenerateSocialPostInput = z.infer<typeof GenerateSocialPostInputSchema>;

const GenerateSocialPostOutputSchema = z.object({
  post: z.string().describe('The generated social media post.'),
});
export type GenerateSocialPostOutput = z.infer<typeof GenerateSocialPostOutputSchema>;

export async function generateSocialPost(input: GenerateSocialPostInput): Promise<GenerateSocialPostOutput> {
  return generateSocialPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialPostPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic of the social media post.'),
      tone: z.string().describe('The desired tone of the social media post (e.g., professional, funny, casual).'),
    }),
  },
  output: {
    schema: z.object({
      post: z.string().describe('The generated social media post.'),
    }),
  },
  prompt: `You are an expert social media content creator.

You will generate a social media post based on the given topic and desired tone.

Topic: {{{topic}}}
Tone: {{{tone}}}

Post:`,
});

const generateSocialPostFlow = ai.defineFlow<
  typeof GenerateSocialPostInputSchema,
  typeof GenerateSocialPostOutputSchema
>(
  {
    name: 'generateSocialPostFlow',
    inputSchema: GenerateSocialPostInputSchema,
    outputSchema: GenerateSocialPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
