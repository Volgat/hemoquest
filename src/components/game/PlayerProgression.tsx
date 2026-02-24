'use client';

import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PlayerProgressionProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export function PlayerProgression({ level, xp, xpToNextLevel }: PlayerProgressionProps) {
  const xpPercentage = (xp / xpToNextLevel) * 100;

  return (
    <div className="flex items-center gap-3 w-48">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="font-bold text-sm bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center border-2 border-background shadow-md">
              {level}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Level {level}</p>
          </TooltipContent>
        </Tooltip>
        <div className="w-full">
            <Tooltip>
                <TooltipTrigger className="w-full">
                    <Progress value={xpPercentage} className="h-3" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>{xp} / {xpToNextLevel} XP</p>
                </TooltipContent>
            </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
