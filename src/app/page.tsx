'use client';

import Link from 'next/link';
import { systems, type System } from '@/lib/game-data';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Lock, Bot } from 'lucide-react';
import { BodyIcon } from '@/components/icons/BodyIcon';
import { usePlayer } from '@/hooks/use-player';
import { Button } from '@/components/ui/button';

const SystemCard = ({ system, isLocked }: { system: System; isLocked: boolean }) => (
  <Link
    href={isLocked ? '#' : `/systems/${system.slug}`}
    className={cn(
      'absolute transform -translate-x-1/2 -translate-y-1/2 group',
      isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
    )}
    style={{ top: system.position.top, left: system.position.left }}
    aria-disabled={isLocked}
    tabIndex={isLocked ? -1 : undefined}
    onClick={(e) => isLocked && e.preventDefault()}
  >
    <Card
      className={cn(
        'relative w-32 h-32 flex flex-col items-center justify-center text-center p-2 transition-all duration-300',
        isLocked
          ? 'bg-muted/50 text-muted-foreground'
          : 'hover:scale-110 hover:shadow-lg hover:bg-accent'
      )}
    >
      <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
        {isLocked && (
          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center z-10">
            <Lock className="w-8 h-8 text-white" />
          </div>
        )}
        <div className={cn(
          "w-12 h-12 flex items-center justify-center",
          system.animation
        )}>
          <system.Icon className="w-10 h-10" />
        </div>
        <p className="text-xs font-bold font-headline">{system.name}</p>
        {isLocked && (
          <p className="text-[10px] leading-tight">Requires Level {system.levelRequirement}</p>
        )}
      </CardContent>
    </Card>
  </Link>
);


export default function Home() {
  const { level } = usePlayer();

  return (
    <div className="container mx-auto py-8 h-full flex flex-col items-center justify-center">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold font-headline text-primary">Sickle Cell Body Quest</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Explore the human body, complete missions and learn about sickle cell disease. Gain XP to unlock new topics.
        </p>
        <Button asChild className="mt-4 gap-2" variant="outline">
          <Link href="/sprite-generator">
            <Bot className="w-4 h-4" />
            Ask the Health Guide
          </Link>
        </Button>
      </div>

      <div className="relative w-full max-w-sm h-[70vh] flex-grow">
        <BodyIcon className="w-full h-full text-primary/20" />
        {systems.map((system) => (
          <SystemCard key={system.slug} system={system} isLocked={level < system.levelRequirement} />
        ))}
      </div>
    </div>
  );
}
