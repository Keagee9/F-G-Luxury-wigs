'use server';
/**
 * @fileOverview Implements a virtual try-on flow with style matching.
 *
 * - virtualTryOnWithStyleMatching - A function that allows users to virtually try on wigs and receive style-based recommendations.
 * - VirtualTryOnWithStyleMatchingInput - The input type for the virtualTryOnWithStyleMatching function.
 * - VirtualTryOnWithStyleMatchingOutput - The return type for the virtualTryOnWithStyleMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VirtualTryOnWithStyleMatchingInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
  stylePreference: z
    .string()
    .describe(
      'The user\'s preferred style (e.g., \'bohemian\', \'classic\').'
    ),
});
export type VirtualTryOnWithStyleMatchingInput = z.infer<
  typeof VirtualTryOnWithStyleMatchingInputSchema
>;

const VirtualTryOnWithStyleMatchingOutputSchema = z.object({
  virtualTryOnImage: z
    .string()
    .describe(
      'The data URI of the generated image with the virtual try-on applied.'
    ),
  recommendedWigs: z
    .array(z.string())
    .describe('A list of recommended wigs based on the style preference.'),
});
export type VirtualTryOnWithStyleMatchingOutput = z.infer<
  typeof VirtualTryOnWithStyleMatchingOutputSchema
>;

export async function virtualTryOnWithStyleMatching(
  input: VirtualTryOnWithStyleMatchingInput
): Promise<VirtualTryOnWithStyleMatchingOutput> {
  return virtualTryOnWithStyleMatchingFlow(input);
}

const virtualTryOnPrompt = ai.definePrompt({
  name: 'virtualTryOnPrompt',
  input: {schema: VirtualTryOnWithStyleMatchingInputSchema},
  output: {schema: VirtualTryOnWithStyleMatchingOutputSchema},
  prompt: `You are an AI assistant specializing in virtual try-on for wigs and style recommendations.

  The user has provided a photo and a style preference.  Generate an image of the user wearing a wig in the requested style, and suggest some specific wigs to try.

  Photo: {{media url=photoDataUri}}
  Style Preference: {{{stylePreference}}}

  Output the URL for the generated try-on image, as well as the recommended wigs.
`,
});

const virtualTryOnWithStyleMatchingFlow = ai.defineFlow(
  {
    name: 'virtualTryOnWithStyleMatchingFlow',
    inputSchema: VirtualTryOnWithStyleMatchingInputSchema,
    outputSchema: VirtualTryOnWithStyleMatchingOutputSchema,
  },
  async input => {
    const {output} = await virtualTryOnPrompt(input);
    return output!;
  }
);
