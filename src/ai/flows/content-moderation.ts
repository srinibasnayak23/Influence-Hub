'use server';

/**
 * @fileOverview Content moderation flow to flag user-generated content violating community guidelines.
 *
 * - moderateContent - A function that moderates content.
 * - ModerateContentInput - The input type for the moderateContent function.
 * - ModerateContentOutput - The return type for the moderateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateContentInputSchema = z.object({
  content: z.string().describe('The content to be moderated.'),
  contentType: z
    .enum(['image', 'video', 'text'])
    .describe('The type of content being moderated.'),
});
export type ModerateContentInput = z.infer<typeof ModerateContentInputSchema>;

const ModerateContentOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the content is safe or violates guidelines.'),
  reasons: z
    .array(z.string())
    .describe('Reasons why the content was flagged (if not safe).'),
});
export type ModerateContentOutput = z.infer<typeof ModerateContentOutputSchema>;

export async function moderateContent(input: ModerateContentInput): Promise<ModerateContentOutput> {
  return moderateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moderateContentPrompt',
  input: {schema: ModerateContentInputSchema},
  output: {schema: ModerateContentOutputSchema},
  prompt: `You are a content moderation expert. Your role is to determine if the provided content violates community guidelines.

Community Guidelines:
- No hate speech or discrimination.
- No sexually explicit content.
- No violent or graphic content.
- No illegal activities.
- No spam or misleading information.

Content Type: {{{contentType}}}
Content: {{{content}}}

Determine if the content is safe and adheres to the community guidelines. If it violates any guideline, mark it as unsafe and provide specific reasons for the violation.

Output should be in JSON format:
{
  "isSafe": true/false,
  "reasons": ["reason1", "reason2", ...]
}`,
});

const moderateContentFlow = ai.defineFlow(
  {
    name: 'moderateContentFlow',
    inputSchema: ModerateContentInputSchema,
    outputSchema: ModerateContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
