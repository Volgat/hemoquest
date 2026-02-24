'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the player state and the context
interface PlayerState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  addXp: (amount: number) => void;
}

// Create the context with a default undefined value
const PlayerContext = createContext<PlayerState | undefined>(undefined);

// Initial values and logic for calculating next level's XP
const INITIAL_LEVEL = 1;
const INITIAL_XP = 0;
const getXpToNextLevel = (level: number) => 50 + level * 50;

// Create a provider component
export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [level, setLevel] = useState(INITIAL_LEVEL);
  const [xp, setXp] = useState(INITIAL_XP);
  const [xpToNextLevel, setXpToNextLevel] = useState(getXpToNextLevel(INITIAL_LEVEL));

  const addXp = (amount: number) => {
    setXp(currentXp => {
      let newXp = currentXp + amount;
      let newLevel = level;
      let newXpToNextLevel = xpToNextLevel;

      // Check for level up
      while (newXp >= newXpToNextLevel) {
        newLevel++;
        newXp -= newXpToNextLevel;
        newXpToNextLevel = getXpToNextLevel(newLevel);
        
        // Update state for level up
        setLevel(newLevel);
        setXpToNextLevel(newXpToNextLevel);
      }

      return newXp;
    });
  };

  const value = { level, xp, xpToNextLevel, addXp };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

// Create a custom hook for easy consumption of the context
export const usePlayer = (): PlayerState => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
