import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { huggingfaceProvider } from './huggingface-adapter';

const geminiApiKey = process.env.GEMINI_API_KEY;
const hfApiKey = process.env.HUGGINGFACE_API_KEY;
const hasValidGeminiKey = geminiApiKey && geminiApiKey.length > 10 && geminiApiKey !== 'dummy_key';

const config: any = {
  plugins: [
    ...(hasValidGeminiKey ? [googleAI({ apiKey: geminiApiKey })] : []),
    ...(hfApiKey ? [huggingfaceProvider({ apiKey: hfApiKey })] : []),
  ],
};

if (hasValidGeminiKey) {
  config.model = 'googleai/gemini-2.0-flash';
} else if (hfApiKey) {
  config.model = 'huggingface/huggingface-gateway';
}

export const ai = genkit(config);
