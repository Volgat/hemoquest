'use client';

import Image from "next/image";
import Link from "next/link";
import { PlayerProgression } from "@/components/game/PlayerProgression";
import { usePlayer } from "@/hooks/use-player";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { DrHemoAvatar } from "@/components/game/DrHemoAvatar";

export function AppHeader() {
  const { level, xp, xpToNextLevel } = usePlayer();

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
              <Image
                src="/logo.png"
                alt="SCAGO Logo"
                width={240}
                height={72}
                className="h-14 w-auto object-contain"
                priority
              />
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
              <Button variant="ghost" size="icon" asChild title="Hemo - Health Guide" className="relative group">
                <Link href="/health-guide" aria-label="Hemo - Health Guide" className="flex items-center justify-center">
                  <DrHemoAvatar size="sm" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
