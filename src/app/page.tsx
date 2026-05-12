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

        {/* ── Systems Grid ── */}
        <div>
          <h2 className="text-xl font-bold font-headline mb-5 text-center text-foreground/80">
            Choose a Body System
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {systems.map((system) => {
              const isLocked = level < system.levelRequirement;
              const totalXp = getTotalXp(system);

              if (isLocked) {
                return (
                  <div
                    key={system.slug}
                    onClick={() => handleLockedClick(system)}
                    className="cursor-pointer"
                  >
                    <Card className="relative h-full flex flex-col items-center justify-center text-center p-5 transition-all duration-300 bg-muted/40 text-muted-foreground border-dashed opacity-70 hover:opacity-90 hover:shadow-md min-h-[160px]">
                      <div className="absolute top-2 right-2">
                        <Lock className="w-4 h-4 text-muted-foreground/50" />
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center mb-3 opacity-40">
                        <system.Icon className="w-10 h-10" />
                      </div>
                      <p className="text-sm font-bold font-headline">{system.name}</p>
                      <p className="text-xs mt-1 text-muted-foreground/70">
                        Level {system.levelRequirement} required
                      </p>
                    </Card>
                  </div>
                );
              }

              return (
                <Link key={system.slug} href={`/systems/${system.slug}`} className="block">
                  <Card className={cn(
                    'relative h-full flex flex-col items-center justify-center text-center p-5 transition-all duration-300',
                    'hover:scale-105 hover:shadow-xl hover:bg-accent/50 hover:border-primary/40 border-2 min-h-[160px]',
                    system.animation
                  )}>
                    <div className="w-12 h-12 flex items-center justify-center mb-3">
                      <system.Icon className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-sm font-bold font-headline">{system.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-snug">
                      {system.description.split('.')[0]}.
                    </p>
                    <Badge className="mt-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 text-xs flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {totalXp} XP available
                    </Badge>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
