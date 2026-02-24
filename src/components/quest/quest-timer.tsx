'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icons from '@/components/icons';

interface QuestTimerProps {
  durationString: string;
  onComplete: () => void;
  onStart: () => void;
}

function parseDuration(durationString: string): number {
  const parts = durationString.split(' ');
  const value = parseInt(parts[0], 10);
  const unit = parts[1];
  if (isNaN(value)) return 0;

  switch (unit) {
    case 'minutes':
    case 'minute':
      return value * 60;
    case 'hour':
    case 'hours':
      return value * 3600;
    default:
      return value;
  }
}

export function QuestTimer({ durationString, onComplete, onStart }: QuestTimerProps) {
  const totalSeconds = useMemo(() => parseDuration(durationString), [durationString]);
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    setTimeLeft(totalSeconds);
    setIsActive(false);
    setIsStarted(false);
  }, [totalSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, onComplete]);

  const handleStartPause = () => {
    if (!isStarted) {
      onStart();
      setIsStarted(true);
    }
    setIsActive(!isActive);
  };

  const handleReset = useCallback(() => {
    setIsActive(false);
    setIsStarted(false);
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  return (
    <Card className="w-full">
      <CardContent className="p-6 flex flex-col items-center gap-4">
        <div className="text-center">
            <p className="text-5xl font-mono font-bold tracking-tighter">{formatTime(timeLeft)}</p>
            <p className="text-muted-foreground">Time Remaining</p>
        </div>
        <Progress value={progress} className="w-full h-2" />
        <div className="flex items-center gap-4">
          <Button onClick={handleStartPause} size="lg" className="w-32">
            {isActive ? <Icons.Pause className="mr-2" /> : <Icons.Play className="mr-2" />}
            {isStarted ? (isActive ? 'Pause' : 'Resume') : 'Start'}
          </Button>
          <Button onClick={handleReset} variant="outline" size="icon" aria-label="Reset Timer">
            <Icons.Reset />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
