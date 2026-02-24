'use server';

/**
 * Server action: Generates a reward upon quest completion using MedGemma via HF.
 */

const HF_MODEL = 'google/medgemma-1.5-4b-it';
const HF_ENDPOINT = 'https://router.huggingface.co/hf-inference/v1/chat/completions';

export interface RewardCompletionWithContextualBadgeInput {
  questName: string;
  questDescription: string;
  muscleGroupTargeted: string;
  levelOfExertionRequired: string;
  rewardPoints: number;
}

export interface RewardCompletionWithContextualBadgeOutput {
  rewardDescription: string;
  badgeDescription: string;
}

export async function rewardCompletionWithContextualBadge(
  input: RewardCompletionWithContextualBadgeInput
): Promise<RewardCompletionWithContextualBadgeOutput> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  if (!apiKey) {
    throw new Error('Hugging Face API key not configured.');
  }

  const prompt = `You are a reward system expert designing rewards and badges for a fitness and health app.
The user completed a quest named "${input.questName}".
Details: ${input.questDescription}, Targeting: ${input.muscleGroupTargeted}, Exertion: ${input.levelOfExertionRequired}.

Generate a motivating reward description and a badge description as JSON.
Format:
{
  "rewardDescription": "Congratulations! You've earned...",
  "badgeDescription": "The [Name] Badge: Awarded for..."
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
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      return {
        rewardDescription: `You earned ${input.rewardPoints} points!`,
        badgeDescription: `Completed: ${input.questName}`
      };
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content) as RewardCompletionWithContextualBadgeOutput;
  } catch (err) {
    return {
      rewardDescription: `You earned ${input.rewardPoints} points!`,
      badgeDescription: `Completed: ${input.questName}`
    };
  }
}
