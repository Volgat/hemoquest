'use server';

/**
 * Server action: Direct MedGemma chat via Hugging Face router.
 * Uses the OpenAI-compatible /v1/chat/completions endpoint.
 * Model: google/medgemma-1.5-4b-it
 */

const HF_MODEL = process.env.HUGGINGFACE_MODEL || 'google/gemma-3-27b-it';
const HF_ENDPOINT = 'https://router.huggingface.co/v1/chat/completions';

const SYSTEM_PROMPT = `You are Hemo, a friendly and specialized medical AI guide for Sickle Cell Disease (SCD / Drepanocytosis). You help patients, caregivers, students, and families understand the disease.

Your role:
- Answer questions about SCD clearly and accurately in the same language as the user
- Provide evidence-based medical information with a warm, friendly, and encouraging tone
- Explain symptoms, triggers, treatments, genetics, and daily management
- Always be compassionate, clear and engaging
- For emergencies, always advise the user to seek immediate medical care
- Never diagnose or replace a doctor — always recommend consulting a healthcare professional for personal medical decisions
- If asked for your name, refer to yourself as "Hemo".
- Use clean formatting: use simple markdown (bold, lists) but avoid unusual special characters or emojis unless they are basic and helpful. Keep the text professional yet approachable.

When uncertainties exist, acknowledge them honestly. Keep answers concise but complete.`;

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface MedGemmaChatResult {
    success: boolean;
    message?: string;
    error?: string;
}

export async function chatWithMedGemma(
    messages: ChatMessage[]
): Promise<MedGemmaChatResult> {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
        return {
            success: false,
            error: 'Hugging Face API key not configured. Please check your .env file.',
        };
    }

    // Build conversation with system prompt
    const fullMessages: ChatMessage[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
    ];

    try {
        const response = await fetch(HF_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: HF_MODEL,
                messages: fullMessages,
                max_tokens: 1024,
                temperature: 0.6,
                top_p: 0.9,
                stream: false,
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error('[MedGemma] API error:', response.status, errText);

            // Friendly error messages
            if (response.status === 401) {
                return { success: false, error: 'Invalid Hugging Face API key. Please update your .env file.' };
            }
            if (response.status === 403) {
                return { success: false, error: 'Access denied. Please accept the MedGemma model terms at huggingface.co/google/medgemma-1.5-4b-it' };
            }
            if (response.status === 503 || response.status === 429) {
                return { success: false, error: 'The MedGemma model is currently busy. Please try again in a moment.' };
            }
            return { success: false, error: `API error (${response.status}). Please try again.` };
        }

        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;

        if (!content) {
            return { success: false, error: 'No response from MedGemma. Please try again.' };
        }

        return { success: true, message: content };
    } catch (err) {
        console.error('[MedGemma] Fetch error:', err);
        return {
            success: false,
            error: 'Network error. Please check your connection and try again.',
        };
    }
}
