'use client';

import Link from "next/link";
import { PlayerProgression } from "@/components/game/PlayerProgression";
import { usePlayer } from "@/hooks/use-player";
import { Button } from "@/components/ui/button";
import { Bot, Home } from "lucide-react";
import { ScagoLogo } from "@/components/icons/ScagoLogo";

export function AppHeader() {
  const { level, xp, xpToNextLevel } = usePlayer();

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
              <ScagoLogo className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <PlayerProgression
              level={level}
              xp={xp}
              xpToNextLevel={xpToNextLevel}
            />
            <nav className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/" aria-label="Home">
                  <Home className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild title="Dr. Hemo - Health Guide">
                <Link href="/sprite-generator" aria-label="Dr. Hemo - Health Guide">
                  <Bot className="h-5 w-5" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
