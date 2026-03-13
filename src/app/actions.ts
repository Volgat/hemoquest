'use server';

import { generateBodyQuest, GenerateBodyQuestInput, GenerateBodyQuestOutput } from '@/ai/flows/generate-body-quest';
import { rewardCompletionWithContextualBadge, RewardCompletionWithContextualBadgeInput, RewardCompletionWithContextualBadgeOutput } from '@/ai/flows/reward-completion-with-contextual-badge';
import { generateSickleCellQuestions, GenerateSCDQuestionsInput, GenerateSCDQuestionsOutput } from '@/ai/flows/generate-sickle-cell-questions';
import { generateSprite, GenerateSpriteInput, GenerateSpriteOutput } from '@/ai/flows/dynamic-sprite-generation';
import { generatePersonalizedMissions, PersonalizedMissionOutput } from '@/ai/flows/personalized-mission';

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

export async function generateQuestionsAction(input: GenerateSCDQuestionsInput): Promise<GenerateSCDQuestionsOutput> {
  try {
    const result = await generateSickleCellQuestions(input);
    return result;
  } catch (error) {
    console.error('Error in generateQuestionsAction:', error);
    throw new Error('Failed to generate questions. Please try again.');
  }
}

export async function generateSpriteAction(input: GenerateSpriteInput): Promise<GenerateSpriteOutput> {
  try {
    const result = await generateSprite(input);
    return result;
  } catch (error) {
    console.error('Error in generateSpriteAction:', error);
    throw new Error('Failed to generate sprite. Please try again.');
  }
}

export async function generatePersonalizedMissionsAction(topic: string, level: number): Promise<PersonalizedMissionOutput> {
  try {
    const result = await generatePersonalizedMissions(topic, level);
    return result;
  } catch (error) {
    console.error('Error in generatePersonalizedMissionsAction:', error);
    throw new Error('Failed to generate personalized missions. Please try again.');
  }
}
