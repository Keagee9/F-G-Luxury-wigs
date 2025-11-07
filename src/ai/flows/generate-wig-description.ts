'use server';

/**
 * @fileOverview This flow generates a wig description from a picture and keywords.
 *
 * - generateWigDescription - A function that handles the wig description generation process.
 * - GenerateWigDescriptionInput - The input type for the generateWigDescription function.
 * - GenerateWigDescriptionOutput - The return type for the generateWigDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWigDescriptionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a wig, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  keywords: z.string().describe('Keywords describing the wig.'),
});
export type GenerateWigDescriptionInput = z.infer<typeof GenerateWigDescriptionInputSchema>;

const GenerateWigDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated wig description.'),
});
export type GenerateWigDescriptionOutput = z.infer<typeof GenerateWigDescriptionOutputSchema>;

export async function generateWigDescription(input: GenerateWigDescriptionInput): Promise<GenerateWigDescriptionOutput> {
  return generateWigDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWigDescriptionPrompt',
  input: {schema: GenerateWigDescriptionInputSchema},
  output: {schema: GenerateWigDescriptionOutputSchema},
  prompt: `You are a marketing expert specializing in writing product descriptions for wigs.

You will use the provided photo and keywords to generate a compelling and informative product description for the wig.

Keywords: {{{keywords}}}
Photo: {{media url=photoDataUri}}`,
});

const generateWigDescriptionFlow = ai.defineFlow(
  {
    name: 'generateWigDescriptionFlow',
    inputSchema: GenerateWigDescriptionInputSchema,
    outputSchema: GenerateWigDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
