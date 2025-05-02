'use server';
/**
 * @fileOverview Refactors code using a prompt and an LLM.
 *
 * - refactorCode - A function that handles the code refactoring process.
 * - RefactorCodeInput - The input type for the refactorCode function.
 * - RefactorCodeOutput - The return type for the refactorCode function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RefactorCodeInputSchema = z.object({
  code: z.string().describe('The code to refactor.'),
  prompt: z.string().describe('The prompt to use for refactoring the code.'),
});
export type RefactorCodeInput = z.infer<typeof RefactorCodeInputSchema>;

const RefactorCodeOutputSchema = z.object({
  refactoredCode: z.string().describe('The refactored code.'),
});
export type RefactorCodeOutput = z.infer<typeof RefactorCodeOutputSchema>;

export async function refactorCode(input: RefactorCodeInput): Promise<RefactorCodeOutput> {
  return refactorCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refactorCodePrompt',
  input: {
    schema: z.object({
      code: z.string().describe('The code to refactor.'),
      prompt: z.string().describe('The prompt to use for refactoring the code.'),
    }),
  },
  output: {
    schema: z.object({
      refactoredCode: z.string().describe('The refactored code.'),
    }),
  },
  prompt: `You are a code refactoring expert.  Refactor the provided code according to the prompt.

Prompt: {{{prompt}}}

Code: {{{code}}}`,
});

const refactorCodeFlow = ai.defineFlow<
  typeof RefactorCodeInputSchema,
  typeof RefactorCodeOutputSchema
>({
  name: 'refactorCodeFlow',
  inputSchema: RefactorCodeInputSchema,
  outputSchema: RefactorCodeOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});

