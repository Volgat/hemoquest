'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DrHemoAvatar } from './DrHemoAvatar';
import { Droplets, Star, Unlock, Map, Zap, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSoundEffects } from '@/hooks/use-sound-effects';

const STORAGE_KEY = 'hemoquest-onboarded';

const slides = [
  {
    key: 'welcome',
    title: 'Welcome to HemoQuest!',
    description:
      'An educational adventure about sickle cell disease (drepanocytosis), created by the Sickle Cell Awareness Group of Ontario (SCAGO).',
    detail: 'Learn. Play. Understand. 🩸',
  },
  {
    key: 'bodymap',
    title: 'Your Interactive Body Map',
    description:
      'On the right side of the screen you\'ll find a human body map with clickable organs. Each organ represents a topic to explore — heart, lungs, brain, kidneys and more!',
    detail: null,
    steps: [
      { icon: Map,       text: 'The body map shows all 6 study systems' },
      { icon: Zap,       text: 'Glowing organs = unlocked & ready to play' },
      { icon: Unlock,    text: 'Locked organs unlock as you level up' },
    ],
  },
  {
    key: 'how',
    title: 'How the Game Works',
    description:
      'Click any unlocked organ or card to enter a system. Complete quiz missions to earn XP. Level up to unlock new body systems!',
    detail: null,
    steps: [
      { icon: Droplets,  text: 'Start with Blood Basics — already unlocked!' },
      { icon: BookOpen,  text: 'Read about the topic, then take the quiz' },
      { icon: Star,      text: 'Earn XP & level up to unlock all 6 systems' },
    ],
  },
  {
    key: 'hemo',
    title: 'Meet Dr. Hemo, Your Guide',
    description:
      'Have a question? Dr. Hemo is your AI health companion. Ask him anything about sickle cell disease — symptoms, genetics, treatments, crises and daily management.',
    detail: "You're all set — let's go! 🚀",
  },
];

export function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const { playSlide, playClick } = useSoundEffects();

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    playClick();
    setOpen(false);
  };

  const handleNext = () => {
    playSlide();
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
            <button
              key={i}
              onClick={() => { playSlide(); setStep(i); }}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === step ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
            />
          ))}
        </div>

        {/* Slide content */}
        <div className="flex flex-col items-center gap-4 min-h-[260px] justify-center">
          {current.key === 'welcome' && (
            <Image src="/logo.png" alt="SCAGO Logo" width={180} height={54}
              className="h-14 w-auto object-contain mb-2 drop-shadow-md" />
          )}
          {current.key === 'bodymap' && (
            /* Mini body map preview */
            <div className="w-24 h-32 relative mb-1">
              <svg viewBox="0 0 200 400" className="w-full h-full">
                <path
                  d="M100 20 C 120 20, 130 40, 130 55 C 130 70, 140 80, 150 110 C 160 140, 160 250, 150 280 C 140 310, 130 320, 130 345 C 130 370, 115 380, 100 380 C 85 380, 70 370, 70 345 C 70 320, 60 310, 50 280 C 40 250, 40 140, 50 110 C 60 80, 70 70, 70 55 C 70 40, 80 20, 100 20 Z"
                  fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.3"
                />
                {/* Brain */}
                <ellipse cx="100" cy="38" rx="18" ry="15" fill="#8b5cf6" opacity="0.85" />
                {/* Heart */}
                <path d="M100,155 C100,155 88,143 85,137 C81,130 82,122 87,119 C92,116 97,120 100,127 C103,120 108,116 113,119 C118,122 119,130 115,137 C112,143 100,155 100,155Z" fill="#ef4444" opacity="0.9" />
                {/* Lungs */}
                <path d="M74,118 C68,118 63,125 63,134 C63,148 68,160 76,164 C80,166 83,164 83,158 L83,124 C83,120 79,118 74,118Z M126,118 C132,118 137,125 137,134 C137,148 132,160 124,164 C120,166 117,164 117,158 L117,124 C117,120 121,118 126,118Z" fill="#f97316" opacity="0.85" />
                {/* Kidneys */}
                <ellipse cx="83" cy="255" rx="9" ry="13" fill="#10b981" opacity="0.85" />
                <ellipse cx="117" cy="255" rx="9" ry="13" fill="#10b981" opacity="0.85" />
                {/* Pulse dot */}
                <circle cx="100" cy="155" r="5" fill="#ef4444" opacity="0.6">
                  <animate attributeName="r" values="4;7;4" dur="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.2s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          )}
          {current.key === 'hemo' && <DrHemoAvatar size="lg" isThinking />}

          <h2 className="text-2xl font-bold font-headline">{current.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">{current.description}</p>
          {current.detail && (
            <p className="text-primary font-semibold text-sm">{current.detail}</p>
          )}

          {'steps' in current && current.steps && (
            <div className="w-full space-y-2 mt-1">
              {current.steps.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-left bg-accent/40 rounded-xl px-4 py-2.5">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button onClick={handleNext} className="w-full mt-6 rounded-xl py-5 text-base font-semibold">
          {step < slides.length - 1 ? 'Next →' : "Let's Play! 🩸"}
        </Button>

        {step < slides.length - 1 && (
          <button onClick={close} className="mt-3 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            Skip tutorial
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
