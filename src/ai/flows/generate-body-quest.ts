'use server';

/**
 * Server action: Generates body quest content using MedGemma via HF.
 */

const HF_MODEL = 'google/medgemma-1.5-4b-it';
const HF_ENDPOINT = 'https://router.huggingface.co/hf-inference/v1/chat/completions';

export interface GenerateBodyQuestInput {
  system: string;
}

export interface GenerateBodyQuestOutput {
  title: string;
  description: string;
  tasks: string[];
}

export async function generateBodyQuest(input: GenerateBodyQuestInput): Promise<GenerateBodyQuestOutput> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  if (!apiKey) {
    throw new Error('Hugging Face API key not configured.');
  }

  const prompt = `You are a medical AI assistant specializing in Sickle Cell Disease (SCD) education.
Generate a "Body Quest" for the following body system: "${input.system}".

The quest should be an educational mission for a patient or student.
Format as JSON:
{
  "title": "Quest Title",
  "description": "Educational description here...",
  "tasks": ["Task 1", "Task 2", "Task 3"]
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
        temperature: 0.6,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`HF error: ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content) as GenerateBodyQuestOutput;
  } catch (err) {
    console.error('[Body Quest] Error:', err);
    return {
      title: `${input.system} Exploration`,
      description: `Learn how the ${input.system} is impacted by Sickle Cell Disease and how to manage it.`,
      tasks: ["Learn about symptoms", "Complete the quiz", "Check health tips"]
    };
  }
}
