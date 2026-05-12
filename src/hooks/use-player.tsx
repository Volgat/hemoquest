'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useToast } from './use-toast';

interface PlayerState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  completedMissions: string[];
  customSprite: string | null;
  addXp: (amount: number) => void;
  setCustomSprite: (uri: string) => void;
  completeMission: (key: string) => void;
  isMissionCompleted: (key: string) => boolean;
}

const PlayerContext = createContext<PlayerState | undefined>(undefined);

const INITIAL_LEVEL = 1;
const INITIAL_XP = 0;
const getXpToNextLevel = (level: number) => 50 + level * 50;

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [level, setLevel] = useLocalStorage('hemoquest-level', INITIAL_LEVEL);
  const [xp, setXp] = useLocalStorage('hemoquest-xp', INITIAL_XP);
  const [xpToNextLevel, setXpToNextLevel] = useLocalStorage('hemoquest-xpnext', getXpToNextLevel(INITIAL_LEVEL));
  const [completedMissions, setCompletedMissions] = useLocalStorage<string[]>('hemoquest-completed', []);
  const [customSprite, setCustomSprite] = useLocalStorage<string | null>('hemoquest-sprite', null);

  const addXp = (amount: number) => {
    let newXp = xp + amount;
    let newLevel = level;
    let newXpToNextLevel = xpToNextLevel;
    let didLevelUp = false;

    while (newXp >= newXpToNextLevel) {
      newLevel++;
      newXp -= newXpToNextLevel;
      newXpToNextLevel = getXpToNextLevel(newLevel);
      didLevelUp = true;
    }

    setXp(newXp);
    if (didLevelUp) {
      setLevel(newLevel);
      setXpToNextLevel(newXpToNextLevel);
      setTimeout(() => {
        toast({
          title: `🎉 Level Up!`,
          description: `You reached Level ${newLevel}! New content has been unlocked.`,
        });
      }, 400);
    }
  };

  const completeMission = (key: string) => {
    setCompletedMissions((prev) => (prev.includes(key) ? prev : [...prev, key]));
  };

  const isMissionCompleted = (key: string) => completedMissions.includes(key);

  const value: PlayerState = {
    level, xp, xpToNextLevel, completedMissions, customSprite,
    addXp, setCustomSprite, completeMission, isMissionCompleted,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = (): PlayerState => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
