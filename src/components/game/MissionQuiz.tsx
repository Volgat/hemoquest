'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Mission } from '@/lib/game-data';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { usePlayer } from '@/hooks/use-player';
import { cn } from '@/lib/utils';
import { useSoundEffects } from '@/hooks/use-sound-effects';

interface MissionQuizProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  mission: Mission;
  systemSlug: string;
}

export function MissionQuiz({ isOpen, onOpenChange, mission, systemSlug }: MissionQuizProps) {
  const { toast } = useToast();
  const { addXp, completeMission, isMissionCompleted } = usePlayer();
  const { playCorrect, playWrong, playMissionComplete } = useSoundEffects();

  const missionKey = `${systemSlug}:${mission.id}`;
  const alreadyDone = isMissionCompleted(missionKey);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const question = mission.quiz[currentIndex];
  const total = mission.quiz.length;

  const handleCheck = () => {
    if (selected === null) return;
    const correct = selected === question.correctAnswerIndex;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) { playCorrect(); setScore((s) => s + 1); }
    else { playWrong(); }
  };

  const handleNext = () => {
    setShowResult(false);
    setSelected(null);
    if (currentIndex + 1 < total) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of quiz — show summary
      setShowSummary(true);
      const finalScore = isCorrect ? score + 1 : score; // account for last answer
      if (!alreadyDone) {
        const earned = Math.round((finalScore / total) * mission.xp);
        if (earned > 0) {
          addXp(earned);
          toast({ title: `+${earned} XP earned!`, description: `${finalScore}/${total} correct answers.` });
        }
        completeMission(missionKey);
      }
      playMissionComplete();
    }
  };

  const handleClose = () => {
    setShowResult(false);
    setSelected(null);
    setCurrentIndex(0);
    setScore(0);
    setShowSummary(false);
    onOpenChange(false);
  };

  // Final score computed for summary screen
  const finalScore = showSummary ? (isCorrect ? score : score) : score;
  const earnedXp = alreadyDone ? 0 : Math.round((finalScore / total) * mission.xp);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[440px]">

        {/* ── Summary Screen ── */}
        {showSummary ? (
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <Trophy className="w-16 h-16 text-amber-400" />
            <h2 className="text-2xl font-bold font-headline">{mission.title}</h2>
            <p className="text-muted-foreground text-sm">Mission Complete!</p>
            <div className="text-5xl font-bold text-primary">{finalScore}<span className="text-2xl text-muted-foreground">/{total}</span></div>
            <p className="text-sm text-muted-foreground">correct answers</p>
            {alreadyDone ? (
              <p className="text-xs text-muted-foreground/70 italic">You already completed this mission — no XP this time.</p>
            ) : (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-6 py-3">
                <p className="text-amber-700 dark:text-amber-300 font-bold text-lg">+{earnedXp} XP</p>
              </div>
            )}
            <Button onClick={handleClose} className="w-full mt-2 rounded-xl">
              <RotateCcw className="w-4 h-4 mr-2" /> Back to Missions
            </Button>
          </div>
        ) : (
          /* ── Quiz Screen ── */
          <>
            <DialogHeader>
              <DialogTitle>{mission.title}</DialogTitle>
              <DialogDescription>
                Question {currentIndex + 1} / {total}
                {alreadyDone && <span className="ml-2 text-muted-foreground/60 text-xs">(Review mode — no XP)</span>}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <p className="font-semibold mb-4">{question.questionText}</p>
              <RadioGroup
                onValueChange={(v) => setSelected(parseInt(v))}
                value={selected !== null ? String(selected) : ''}
                disabled={showResult}
              >
                {question.options.map((option, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center space-x-2 p-3 rounded-lg border transition-colors',
                      showResult && i === question.correctAnswerIndex && 'bg-green-50 dark:bg-green-900/30 border-green-400',
                      showResult && i === selected && i !== question.correctAnswerIndex && 'bg-red-50 dark:bg-red-900/30 border-red-400'
                    )}
                  >
                    <RadioGroupItem value={String(i)} id={`opt-${i}`} />
                    <Label htmlFor={`opt-${i}`} className="flex-1 cursor-pointer">{option}</Label>
                    {showResult && i === question.correctAnswerIndex && <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />}
                    {showResult && i === selected && i !== question.correctAnswerIndex && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                  </div>
                ))}
              </RadioGroup>

              {showResult && question.explanation && (
                <div className={cn('mt-4 p-3 rounded-lg text-sm', isCorrect ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200')}>
                  {question.explanation}
                </div>
              )}
            </div>

            <DialogFooter>
              {!showResult ? (
                <Button onClick={handleCheck} disabled={selected === null} className="w-full">Check Answer</Button>
              ) : (
                <Button onClick={handleNext} className="w-full">
                  {currentIndex + 1 < total ? 'Next Question →' : 'See Results 🏆'}
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
