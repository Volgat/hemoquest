'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Mission } from "@/lib/game-data";
import { Badge } from "@/components/ui/badge";
import { MissionQuiz } from './MissionQuiz';

export function MissionCard({ mission }: { mission: Mission }) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>{mission.title}</CardTitle>
          <CardDescription>{mission.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
        <CardFooter className="flex justify-between items-center">
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
              {mission.xp} XP
          </Badge>
          <Button onClick={() => setIsQuizOpen(true)}>Start Mission</Button>
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
