'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Mission } from "@/lib/game-data";
import { Badge } from "@/components/ui/badge";
import { MissionQuiz } from './MissionQuiz';
import { Zap, PlayCircle, CheckCircle, Clock, FileQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePlayer } from '@/hooks/use-player';

interface MissionCardProps {
  mission: Mission;
  systemSlug: string;
  isNew?: boolean;
}

export function MissionCard({ mission, systemSlug, isNew = false }: MissionCardProps) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const { isMissionCompleted } = usePlayer();
  const missionKey = `${systemSlug}:${mission.id}`;
  const completed = isMissionCompleted(missionKey);
  const estimatedMin = Math.ceil(mission.quiz.length * 1.5);

  return (
    <>
      <Card className={cn(
        "flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-2",
        completed
          ? "border-green-400/50 bg-green-50/30 dark:bg-green-900/10"
          : "hover:border-primary/40",
        isNew && "animate-[fadeInUp_0.4s_ease-out_forwards] border-primary/30 bg-accent/30"
      )}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">{mission.title}</CardTitle>
            {completed ? (
              <Badge className="shrink-0 bg-green-500 text-white border-0 shadow-sm text-xs flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Done
              </Badge>
            ) : (
              <Badge className="shrink-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 shadow-sm text-xs flex items-center gap-1">
                <Zap className="w-3 h-3" /> {mission.xp} XP
              </Badge>
            )}
          </div>
          <CardDescription className="text-xs mt-1 leading-relaxed line-clamp-2">
            {mission.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow pb-2">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileQuestion className="w-3 h-3" /> {mission.quiz.length} questions
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> ~{estimatedMin} min
            </span>
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <Button
            onClick={() => setIsQuizOpen(true)}
            className={cn(
              "w-full gap-2 group-hover:scale-[1.02] transition-all duration-200",
              completed
                ? "bg-green-600 hover:bg-green-700"
                : "bg-primary hover:bg-primary/90"
            )}
            size="sm"
          >
            {completed ? (
              <><CheckCircle className="w-4 h-4" /> Review</>
            ) : (
              <><PlayCircle className="w-4 h-4" /> Start Mission</>
            )}
          </Button>
        </CardFooter>
      </Card>

      {mission.quiz && mission.quiz.length > 0 && (
        <MissionQuiz
          isOpen={isQuizOpen}
          onOpenChange={setIsQuizOpen}
          mission={mission}
          systemSlug={systemSlug}
        />
      )}
    </>
  );
}
