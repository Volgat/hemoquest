'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Mission } from "@/lib/game-data";
import { Badge } from "@/components/ui/badge";
import { MissionQuiz } from './MissionQuiz';
import { Zap, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MissionCard({ mission, isNew = false }: { mission: Mission; isNew?: boolean }) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [wasNew] = useState(isNew);

  return (
    <>
      <Card className={cn(
        "flex flex-col group transition-all duration-500 hover:-translate-y-1 hover:shadow-xl border-2 hover:border-primary/40",
        wasNew && "animate-[fadeInUp_0.4s_ease-out_forwards] border-primary/30 bg-accent/30"
      )}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">{mission.title}</CardTitle>
            <Badge className="shrink-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 shadow-sm text-xs flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {mission.xp} XP
            </Badge>
          </div>
          <CardDescription className="text-xs mt-1 leading-relaxed line-clamp-2">
            {mission.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
        <CardFooter className="pt-2">
          <Button
            onClick={() => setIsQuizOpen(true)}
            className="w-full gap-2 bg-primary hover:bg-primary/90 group-hover:scale-[1.02] transition-all duration-200"
            size="sm"
          >
            <PlayCircle className="w-4 h-4" />
            Start Mission
          </Button>
        </CardFooter>
      </Card>
      {mission.quiz && mission.quiz.length > 0 && (
        <MissionQuiz
          isOpen={isQuizOpen}
          onOpenChange={setIsQuizOpen}
          mission={mission}
        />
      )}
    </>
  );
}
