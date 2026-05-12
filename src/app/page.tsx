'use client';

import Image from 'next/image';
import Link from 'next/link';
import { systems, type System } from '@/lib/game-data';
import { cn } from '@/lib/utils';
import { Lock, Zap } from 'lucide-react';
import { DrHemoAvatar } from '@/components/game/DrHemoAvatar';
import { usePlayer } from '@/hooks/use-player';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { OnboardingModal } from '@/components/game/OnboardingModal';
import { BodyIcon } from '@/components/icons/BodyIcon';

function getTotalXp(system: System) {
  return system.missions.reduce((sum, m) => sum + m.xp, 0);
}

export default function Home() {
  const { level, xp, xpToNextLevel } = usePlayer();
  const { toast } = useToast();

  const handleLockedClick = (system: System) => {
    const xpNeeded = xpToNextLevel - xp;
    toast({
      title: `🔒 ${system.name} — Level ${system.levelRequirement} Required`,
      description: `You need ${xpNeeded} more XP to reach Level ${system.levelRequirement}. Keep completing Blood Basics missions!`,
    });
  };

  return (
    <>
      <OnboardingModal />
      <div className="container mx-auto py-8 px-4">

        {/* ── Hero ── */}
        <div className="text-center mb-10 flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="SCAGO Logo"
            width={280}
            height={84}
            className="h-24 w-auto mb-4 object-contain drop-shadow-lg"
            priority
          />
          <h1 className="text-4xl font-bold font-headline bg-gradient-to-r from-red-500 via-rose-400 to-red-700 bg-clip-text text-transparent drop-shadow-sm">
            Hemo Quest
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mt-2 text-sm leading-relaxed">
            Explore the human body, complete missions and learn about sickle cell disease. Gain XP to unlock new topics.
          </p>
          <Button
            asChild
            className="mt-5 gap-3 py-5 px-7 text-base font-semibold rounded-2xl shadow-lg bg-white/10 backdrop-blur border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 hover:scale-105"
            variant="outline"
          >
            <Link href="/health-guide">
              <DrHemoAvatar size="sm" />
              Ask Hemo 🩺
            </Link>
          </Button>
        </div>

        {/* ── Main content: Grid + Body Map ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start max-w-5xl mx-auto">

          {/* ── Systems Grid ── */}
          <div className="flex-1 w-full">
            <h2 className="text-xl font-bold font-headline mb-5 text-foreground/80">
              Choose a Body System
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {systems.map((system) => {
                const isLocked = level < system.levelRequirement;
                const totalXp = getTotalXp(system);

                if (isLocked) {
                  return (
                    <div key={system.slug} onClick={() => handleLockedClick(system)} className="cursor-pointer">
                      <Card className="relative h-full flex flex-col items-center justify-center text-center p-5 transition-all duration-300 bg-muted/40 text-muted-foreground border-dashed opacity-70 hover:opacity-90 hover:shadow-md min-h-[150px]">
                        <div className="absolute top-2 right-2">
                          <Lock className="w-4 h-4 text-muted-foreground/50" />
                        </div>
                        <div className="w-11 h-11 flex items-center justify-center mb-3 opacity-40">
                          <system.Icon className="w-9 h-9" />
                        </div>
                        <p className="text-sm font-bold font-headline">{system.name}</p>
                        <p className="text-xs mt-1 text-muted-foreground/70">Level {system.levelRequirement} required</p>
                      </Card>
                    </div>
                  );
                }

                return (
                  <Link key={system.slug} href={`/systems/${system.slug}`} className="block">
                    <Card className={cn(
                      'relative h-full flex flex-col items-center justify-center text-center p-5 transition-all duration-300',
                      'hover:scale-105 hover:shadow-xl hover:bg-accent/50 hover:border-primary/40 border-2 min-h-[150px]',
                      system.animation
                    )}>
                      <div className="w-11 h-11 flex items-center justify-center mb-3">
                        <system.Icon className="w-9 h-9 text-primary" />
                      </div>
                      <p className="text-sm font-bold font-headline">{system.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-snug">
                        {system.description.split('.')[0]}.
                      </p>
                      <Badge className="mt-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 text-xs flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {totalXp} XP
                      </Badge>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── Body Map ── */}
          <div className="hidden lg:flex flex-col items-center w-72 flex-shrink-0">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Body Map</p>
            <div className="relative w-full">
              <BodyIcon className="w-full h-auto text-primary/20 drop-shadow-sm" />

              {/* System hotspots on the body */}
              {systems.map((system) => {
                const isLocked = level < system.levelRequirement;
                return (
                  <div
                    key={system.slug}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: system.position.top, left: system.position.left }}
                  >
                    {isLocked ? (
                      <div
                        onClick={() => handleLockedClick(system)}
                        title={`${system.name} — Level ${system.levelRequirement} required`}
                        className="cursor-pointer w-9 h-9 rounded-full bg-muted/80 border-2 border-muted-foreground/30 flex items-center justify-center shadow-md opacity-60 hover:opacity-80 transition-opacity"
                      >
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ) : (
                      <Link href={`/systems/${system.slug}`}>
                        <div
                          title={system.name}
                          className={cn(
                            'w-9 h-9 rounded-full bg-primary/90 border-2 border-white shadow-lg flex items-center justify-center',
                            'hover:scale-125 transition-transform duration-200 cursor-pointer',
                            system.animation
                          )}
                        >
                          <system.Icon className="w-5 h-5 text-white" />
                        </div>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground/60 mt-3 text-center">
              Click a hotspot or use the cards to navigate
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
