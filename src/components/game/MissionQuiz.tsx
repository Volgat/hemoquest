'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Mission, QuizQuestion } from '@/lib/game-data';
import { CheckCircle, XCircle } from 'lucide-react';
import { usePlayer } from '@/hooks/use-player';

interface MissionQuizProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  mission: Mission;
}

export function MissionQuiz({ isOpen, onOpenChange, mission }: MissionQuizProps) {
  const { toast } = useToast();
  const { addXp } = usePlayer();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = mission.quiz[currentQuestionIndex];

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === question.correctAnswerIndex;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      addXp(mission.xp);
      toast({
        title: 'Correct!',
        description: `You earned ${mission.xp} XP!`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Incorrect',
        description: 'Try again!',
      });
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex + 1 < mission.quiz.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onOpenChange(false); // End of quiz
      setCurrentQuestionIndex(0); // Reset for next time
    }
  };
  
  const handleClose = () => {
    // Reset state when closing the dialog
    setShowResult(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(0);
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mission.title}</DialogTitle>
          <DialogDescription>Question {currentQuestionIndex + 1} / {mission.quiz.length}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="font-semibold mb-4">{question.questionText}</p>
          <RadioGroup 
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            value={selectedAnswer !== null ? String(selectedAnswer) : ""}
            disabled={showResult}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={String(index)} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>

          {showResult && (
            <div className={`mt-4 flex items-center p-4 rounded-md ${isCorrect ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              {isCorrect ? <CheckCircle className="text-green-600 mr-2" /> : <XCircle className="text-red-600 mr-2" />}
              <p className={isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}>
                {isCorrect ? "Good answer!" : `Incorrect. The correct answer is: ${question.options[question.correctAnswerIndex]}`}
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          {!showResult ? (
            <Button onClick={handleCheckAnswer} disabled={selectedAnswer === null}>Check</Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQuestionIndex + 1 < mission.quiz.length ? "Next Question" : "Finish"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
