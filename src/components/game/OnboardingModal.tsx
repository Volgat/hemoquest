'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DrHemoAvatar } from './DrHemoAvatar';
import { Droplets, Star, Unlock } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'hemoquest-onboarded';

const slides = [
  {
    key: 'welcome',
    title: 'Welcome to HemoQuest!',
    description:
      'An educational adventure about sickle cell disease (drepanocytosis), created by the Sickle Cell Awareness Group of Ontario (SCAGO).',
    detail: 'Learn. Play. Understand.',
  },
  {
    key: 'how',
    title: 'How It Works',
    description:
      'Complete quiz missions to earn XP and level up. Each new level unlocks a new body system to explore.',
    detail: null,
    steps: [
      { icon: Droplets, text: 'Start with Blood Basics — already unlocked!' },
      { icon: Star,     text: 'Answer quiz questions to earn XP' },
      { icon: Unlock,   text: 'Level up to unlock new topics' },
    ],
  },
  {
    key: 'hemo',
    title: 'Meet Hemo, Your Guide',
    description:
      'Dr. Hemo is your AI health companion. Ask him anything about sickle cell disease — symptoms, genetics, treatments and daily management.',
    detail: "Ready? Let's go! 🩸",
  },
];

export function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setOpen(false);
  };

  const handleNext = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else close();
  };

  const current = slides[step];

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) close(); }}>
      <DialogContent className="sm:max-w-md text-center p-8">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === step ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'
              )}
            />
          ))}
        </div>

        {/* Slide content */}
        <div className="flex flex-col items-center gap-4">
          {current.key === 'welcome' && (
            <Image src="/logo.png" alt="SCAGO Logo" width={180} height={54}
              className="h-14 w-auto object-contain mb-2" />
          )}
          {current.key === 'hemo' && <DrHemoAvatar size="lg" isThinking />}

          <h2 className="text-2xl font-bold font-headline">{current.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
            {current.description}
          </p>
          {current.detail && (
            <p className="text-primary font-semibold text-sm">{current.detail}</p>
          )}

          {'steps' in current && current.steps && (
            <div className="w-full space-y-3 mt-2">
              {current.steps.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-left bg-accent/40 rounded-xl px-4 py-3">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button onClick={handleNext} className="w-full mt-8 rounded-xl py-5 text-base font-semibold">
          {step < slides.length - 1 ? 'Next →' : "Let's Play! 🩸"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
