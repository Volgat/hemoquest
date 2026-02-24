'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestCard } from '@/components/quest/quest-card';
import Icons from '@/components/icons';
import type { CompletedQuest } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProgressTrackerProps {
  completedQuests: CompletedQuest[];
}

export function ProgressTracker({ completedQuests }: ProgressTrackerProps) {
  const totalPoints = completedQuests.reduce((sum, quest) => sum + quest.points, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Icons.History />
          Activity History
        </CardTitle>
        <CardDescription>
          You've completed {completedQuests.length} quests and earned a total of {totalPoints} points.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {completedQuests.length > 0 ? (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {completedQuests
                .slice()
                .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                .map(quest => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No quests completed yet.</p>
            <p>Generate and complete your first quest to see your progress here!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
