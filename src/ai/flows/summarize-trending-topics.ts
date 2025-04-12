'use server';

/**
 * @fileOverview Summarizes trending topics for social media post inspiration.
 *
 * - summarizeTrendingTopics - A function that summarizes trending topics.
 * - SummarizeTrendingTopicsInput - The input type for the summarizeTrendingTopics function.
 * - SummarizeTrendingTopicsOutput - The return type for the summarizeTrendingTopics function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeTrendingTopicsInputSchema = z.object({
  niche: z.string().describe('The specific niche or industry to find trending topics for.'),
});
export type SummarizeTrendingTopicsInput = z.infer<typeof SummarizeTrendingTopicsInputSchema>;

const SummarizeTrendingTopicsOutputSchema = z.object({
  summary: z.string().describe('A summary of the trending topics in the specified niche.'),
});
export type SummarizeTrendingTopicsOutput = z.infer<typeof SummarizeTrendingTopicsOutputSchema>;

export async function summarizeTrendingTopics(input: SummarizeTrendingTopicsInput): Promise<SummarizeTrendingTopicsOutput> {
  return summarizeTrendingTopicsFlow(input);
}

const summarizeTrendingTopicsPrompt = ai.definePrompt({
  name: 'summarizeTrendingTopicsPrompt',
  input: {
    schema: z.object({
      niche: z.string().describe('The specific niche or industry to find trending topics for.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A summary of the trending topics in the specified niche.'),
    }),
  },
  prompt: `Summarize the current trending topics in the following niche: {{{niche}}}.\n\n` +
      `Provide a concise summary that can be used to inspire social media posts.`,
});

const summarizeTrendingTopicsFlow = ai.defineFlow<
  typeof SummarizeTrendingTopicsInputSchema,
  typeof SummarizeTrendingTopicsOutputSchema
>({
  name: 'summarizeTrendingTopicsFlow',
  inputSchema: SummarizeTrendingTopicsInputSchema,
  outputSchema: SummarizeTrendingTopicsOutputSchema,
},
async input => {
  const {output} = await summarizeTrendingTopicsPrompt(input);
  return output!;
});
