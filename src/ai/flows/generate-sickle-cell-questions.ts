'use server';

/**
 * Server action: Generates medical quiz questions using MedGemma via HF.
 * Uses the same direct-fetch pattern as the chatbot for maximum stability.
 */

const HF_MODEL = process.env.HUGGINGFACE_MODEL || 'google/gemma-3-27b-it';
const HF_ENDPOINT = 'https://router.huggingface.co/v1/chat/completions';

export interface QuizQuestion {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    explanation?: string;
}

export interface GenerateSCDQuestionsInput {
    topic: string;
    count: number;
}

export interface GenerateSCDQuestionsOutput {
    topic: string;
    questions: QuizQuestion[];
}

export async function generateSickleCellQuestions(
    input: GenerateSCDQuestionsInput
): Promise<GenerateSCDQuestionsOutput> {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
        throw new Error('Hugging Face API key not configured.');
    }

    const prompt = `You are a medical AI assistant specializing in Sickle Cell Disease (SCD) education.

Generate ${input.count} quiz questions about the following SCD topic: "${input.topic}".

Requirements for each question:
- Medically accurate and evidence-based
- 4 options, only one correct
- A clear explanation of why the correct answer is right
- Format as JSON with this structure:
{
  "topic": "${input.topic}",
  "questions": [
    {
      "questionText": "Question here",
      "options": ["Option 0", "Option 1", "Option 2", "Option 3"],
      "correctAnswerIndex": 0,
      "explanation": "Explanation here"
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
                max_tokens: 2048,
                temperature: 0.3, // Lower temperature for JSON accuracy
                response_format: { type: 'json_object' },
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`HF API error: ${response.status} ${err}`);
        }

        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error('Empty response from MedGemma');
        }

        // Attempt to parse JSON
        const parsed = JSON.parse(content);
        return parsed as GenerateSCDQuestionsOutput;
    } catch (err) {
        console.error('[MedGemma Questions] Error:', err);
        throw err;
    }
}
