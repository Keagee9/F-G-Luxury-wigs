// This is a server-side file.
'use server';

/**
 * @fileOverview Provides personalized wig recommendations based on user photo and style preferences, incorporating face shape analysis.
 *
 * - getPersonalizedWigRecommendations - Function to generate personalized wig recommendations.
 * - PersonalizedWigRecommendationsInput - Input type for personalized wig recommendations.
 * - PersonalizedWigRecommendationsOutput - Output type for personalized wig recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedWigRecommendationsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  stylePreferences:
    z
      .string()
      .describe('The user provided style preferences for wigs, such as length, color, and texture.'),
  faceShape: z.string().describe('The user provided face shape (e.g., round, oval, square).'),
});

export type PersonalizedWigRecommendationsInput =
  z.infer<typeof PersonalizedWigRecommendationsInputSchema>;

const PersonalizedWigRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized wig recommendations.'),
});

export type PersonalizedWigRecommendationsOutput =
  z.infer<typeof PersonalizedWigRecommendationsOutputSchema>;

export async function getPersonalizedWigRecommendations(
  input: PersonalizedWigRecommendationsInput
): Promise<PersonalizedWigRecommendationsOutput> {
  return personalizedWigRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedWigRecommendationsPrompt',
  input: {schema: PersonalizedWigRecommendationsInputSchema},
  output: {schema: PersonalizedWigRecommendationsOutputSchema},
  prompt: `You are a personal stylist specializing in wig recommendations.\

Based on the user's photo, style preferences, and face shape, provide a list of wig recommendations that would suit them.\

User Style Preferences: {{{stylePreferences}}}
Face Shape: {{{faceShape}}}
Photo: {{media url=photoDataUri}}

Provide a list of wig recommendations. Focus on specific styles and product descriptions, and how they complement the user's face shape.
`,
});

const personalizedWigRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedWigRecommendationsFlow',
    inputSchema: PersonalizedWigRecommendationsInputSchema,
    outputSchema: PersonalizedWigRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
