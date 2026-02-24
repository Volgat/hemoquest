'use server';

/**
 * Server action: Generates sickle cell health tips using MedGemma via HF.
 * Direct fetch pattern for stability.
 */

const HF_MODEL = 'google/medgemma-1.5-4b-it';
const HF_ENDPOINT = 'https://router.huggingface.co/hf-inference/v1/chat/completions';

export interface HealthTip {
    title: string;
    tip: string;
    icon: string;
    urgency: 'info' | 'important' | 'critical';
}

export interface HealthTipsInput {
    category: string;
    count: number;
}

export interface HealthTipsOutput {
    category: string;
    tips: HealthTip[];
}

export async function generateHealthTips(input: HealthTipsInput): Promise<HealthTipsOutput> {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
        throw new Error('Hugging Face API key not configured.');
    }

    const prompt = `You are a medical AI assistant specializing in Sickle Cell Disease (SCD) education. 
Generate ${input.count} practical health tips for the category "${input.category}" for people living with SCD.

Each tip must be:
- Concise (1-2 sentences)
- Medically accurate
- Urgency levels: "info", "important", or "critical"
- Format as JSON with this structure:
{
  "category": "${input.category}",
  "tips": [
    {
      "title": "Tip title",
      "tip": "Tip content",
      "icon": "Emoji",
      "urgency": "info"
    }
  ]
}

Response must be valid JSON only.`;

    try {
        const response = await fetch(HF_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: HF_MODEL,
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 1024,
                temperature: 0.5,
                response_format: { type: 'json_object' },
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`HF error: ${response.status} ${err}`);
        }

        const data = await response.json();
        return JSON.parse(data.choices[0].message.content) as HealthTipsOutput;
    } catch (err) {
        console.error('[Health Tips] Error:', err);
        throw err;
    }
}
