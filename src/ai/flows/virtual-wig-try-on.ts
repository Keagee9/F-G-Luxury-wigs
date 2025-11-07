'use server';
/**
 * @fileOverview Implements a virtual try-on flow for wigs.
 *
 * - virtualWigTryOn - A function that allows users to virtually try on wigs.
 * - VirtualWigTryOnInput - The input type for the virtualWigTryOn function.
 * - VirtualWigTryOnOutput - The return type for the virtualWigTryOn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VirtualWigTryOnInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'    ),
  wigPhotoDataUri: z
    .string()
    .describe(
      'A photo of the wig, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'    ),
});
export type VirtualWigTryOnInput = z.infer<
  typeof VirtualWigTryOnInputSchema
>;

const VirtualWigTryOnOutputSchema = z.object({
  virtualTryOnImage: z
    .string()
    .describe(
      'The data URI of the generated image with the virtual try-on applied.'
    ),
});
export type VirtualWigTryOnOutput = z.infer<
  typeof VirtualWigTryOnOutputSchema
>;

export async function virtualWigTryOn(
  input: VirtualWigTryOnInput
): Promise<VirtualWigTryOnOutput> {
  return virtualWigTryOnFlow(input);
}

const virtualWigTryOnPrompt = ai.definePrompt({
  name: 'virtualWigTryOnPrompt',
  input: {schema: VirtualWigTryOnInputSchema},
  output: {schema: VirtualWigTryOnOutputSchema},
  prompt: `You are an AI assistant specializing in virtual try-on for wigs.

The user has provided a photo and a wig photo.  Generate an image of the user wearing the wig.

Photo: {{media url=photoDataUri}}
Wig Photo: {{media url=wigPhotoDataUri}}

Output the URL for the generated try-on image.
`,
});

const virtualWigTryOnFlow = ai.defineFlow(
  {
    name: 'virtualWigTryOnFlow',
    inputSchema: VirtualWigTryOnInputSchema,
    outputSchema: VirtualWigTryOnOutputSchema,
  },
  async input => {
    const {output} = await virtualWigTryOnPrompt(input);
    return output!;
  }
);
