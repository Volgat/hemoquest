'use server';

import { generateBodyQuest, GenerateBodyQuestInput, GenerateBodyQuestOutput } from '@/ai/flows/generate-body-quest';
import { rewardCompletionWithContextualBadge, RewardCompletionWithContextualBadgeInput, RewardCompletionWithContextualBadgeOutput } from '@/ai/flows/reward-completion-with-contextual-badge';

export async function generateQuestAction(input: GenerateBodyQuestInput): Promise<GenerateBodyQuestOutput> {
  try {
    const result = await generateBodyQuest(input);
    return result;
  } catch (error) {
    console.error('Error in generateQuestAction:', error);
    throw new Error('Failed to generate quest. Please try again.');
  }
}

export async function getRewardAction(input: RewardCompletionWithContextualBadgeInput): Promise<RewardCompletionWithContextualBadgeOutput> {
  try {
    const result = await rewardCompletionWithContextualBadge(input);
    return result;
  } catch (error) {
    console.error('Error in getRewardAction:', error);
    throw new Error('Failed to generate reward. Please try again.');
  }
}
