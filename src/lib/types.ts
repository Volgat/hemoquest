export type Quest = {
  activityName: string;
  description: string;
  duration: string;
  targetMuscleGroup: string;
  levelOfExertion: string;
};

export type CompletedQuest = Quest & {
  id: string;
  completedAt: string;
  points: number;
};

export type Reward = {
  rewardDescription: string;
  badgeDescription: string;
};

export type LeaderboardUser = {
  id: string;
  username: string;
  avatar: string;
  score: number;
};
