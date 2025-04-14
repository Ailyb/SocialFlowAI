import {genkit, Schema} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const generateAIImageFlow = genkit.flow(
  'generateAIImage',
  async (prompt: string) => {
    const result = await googleAI.generateImage({prompt});
    return result.url;
  },
  {
    inputSchema: Schema.object({
        prompt: Schema.string().describe('The text prompt to use for image generation')
      }),
      outputSchema: Schema.object({
        imageUrl: Schema.string().describe('The url of the generated image.')
      }),
    description: 'Generates an image from a text prompt using Google AI.',
  }
);