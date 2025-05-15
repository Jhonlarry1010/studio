import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
      GOOGLE_GENAI_API_KEY=AIzaSyBatfrTOriZzq0s_NUwJm_-fYlUra5mxQk
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
  export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: 'AIzaSyBatfrTOriZzq0s_NUwJm_-fYlUra5mxQk',
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
});
