'use server';

/**
 * Server action: Generates multiple personalized medical missions using MedGemma via HF.
 */

const HF_MODEL = 'google/medgemma-1.5-4b-it';
const HF_ENDPOINT = 'https://router.huggingface.co/hf-inference/v1/chat/completions';

export interface QuizQuestion {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    explanation?: string;
}

export interface PersonalizedMission {
    title: string;
    description: string;
    xp: number;
    quiz: QuizQuestion[];
}

export interface PersonalizedMissionOutput {
    missions: PersonalizedMission[];
}

export async function generatePersonalizedMissions(topic: string, level: number): Promise<PersonalizedMissionOutput> {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
        throw new Error('Hugging Face API key not configured.');
    }

    const prompt = `You are a medical AI assistant specializing in Sickle Cell Disease (SCD) education for the Hemo Quest game.
Generate 2 to 3 unique and engaging personalized "Body Quest" missions for a level ${level} student about the body system: "${topic}".

Requirements per mission:
- COMPLETELY medically accurate and evidence-based.
- Tailored specifically to the ${topic} system and its relation to Sickle Cell Disease.
- Level-appropriate complexity (Level ${level}).
- Each mission MUST contain EXACTLY 5 diverse quiz questions.
- Each quiz question must have 4 distinct options and one clear correct answer with a detailed medical explanation.
- Assign a fair XP reward between 30 and 80 based on complexity.

You MUST respond with a valid JSON object matching this structure EXACTLY. 
Here is an example of ONE mission (ensure you provide 2-3 in your response):
{
  "missions": [
    {
      "title": "${topic} Awareness",
      "description": "Learn the essentials of how ${topic} interacts with sickle cells.",
      "xp": 50,
      "quiz": [
        {"questionText": "Question 1?", "options": ["A", "B", "C", "D"], "correctAnswerIndex": 0, "explanation": "Exp 1"},
        {"questionText": "Question 2?", "options": ["A", "B", "C", "D"], "correctAnswerIndex": 1, "explanation": "Exp 2"},
        {"questionText": "Question 3?", "options": ["A", "B", "C", "D"], "correctAnswerIndex": 2, "explanation": "Exp 3"},
        {"questionText": "Question 4?", "options": ["A", "B", "C", "D"], "correctAnswerIndex": 3, "explanation": "Exp 4"},
        {"questionText": "Question 5?", "options": ["A", "B", "C", "D"], "correctAnswerIndex": 0, "explanation": "Exp 5"}
      ]
    }
  ]
}

Ensure the output is ONLY the JSON object. No extra text.`;

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
                max_tokens: 3000, 
                temperature: 0.7, // Slightly higher for more creative/diverse questions
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

        return JSON.parse(content) as PersonalizedMissionOutput;
    } catch (err) {
        console.error('[Personalized Missions] Error:', err);
        // Fallback missions in case of API failure
        return {
            missions: [
                {
                    title: `${topic} Review Mission`,
                    description: `Review your knowledge of the ${topic} system and how it relates to Sickle Cell Disease management.`,
                    xp: 40,
                    quiz: [
                        {
                            questionText: `Why is monitoring the ${topic} system important in SCD?`,
                            options: ["It isn't important", "To prevent long-term complications", "Because the AI said so", "Just for more XP"],
                            correctAnswerIndex: 1,
                            explanation: "Regular monitoring helps identify and manage SCD complications early."
                        }
                    ]
                }
            ]
        };
    }
}
