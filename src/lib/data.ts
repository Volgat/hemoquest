import type { LeaderboardUser } from '@/lib/types';

export const initialLeaderboardData: LeaderboardUser[] = [
  { id: '1', username: 'Alex', avatar: 'https://i.pravatar.cc/150?u=alex', score: 2500 },
  { id: '2', username: 'Sam', avatar: 'https://i.pravatar.cc/150?u=sam', score: 2300 },
  { id: 'player', username: 'You', avatar: 'https://i.pravatar.cc/150?u=player', score: 1800 },
  { id: '4', username: 'Jess', avatar: 'https://i.pravatar.cc/150?u=jess', score: 1750 },
  { id: '5', username: 'Chris', avatar: 'https://i.pravatar.cc/150?u=chris', score: 1500 },
];
