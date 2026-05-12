'use client';

import { Progress } from "@/components/ui/progress";

interface PlayerProgressionProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export function PlayerProgression({ level, xp, xpToNextLevel }: PlayerProgressionProps) {
  const xpPercentage = Math.min((xp / xpToNextLevel) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      {/* Level badge */}
      <div className="font-bold text-sm bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center border-2 border-background shadow-md flex-shrink-0">
        {level}
      </div>
      {/* XP bar + label */}
      <div className="flex flex-col gap-1 min-w-[130px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{xp} / {xpToNextLevel} XP</span>
          <span className="text-xs text-muted-foreground/60">→ Lv{level + 1}</span>
        </div>
        <Progress value={xpPercentage} className="h-2" />
      </div>
    </div>
  );
}
