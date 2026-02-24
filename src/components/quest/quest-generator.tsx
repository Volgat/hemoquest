'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateQuestAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { Quest } from '@/lib/types';
import Icons from '@/components/icons';

const formSchema = z.object({
  duration: z.string().min(1, 'Please select a duration.'),
  intensity: z.string().min(1, 'Please select an intensity.'),
  targetMuscleGroup: z.string().min(1, 'Please select a muscle group.'),
});

type QuestGeneratorFormValues = z.infer<typeof formSchema>;

interface QuestGeneratorProps {
  onQuestGenerated: (quest: Quest) => void;
}

const durationOptions = ['15 minutes', '30 minutes', '45 minutes', '1 hour'];
const intensityOptions = ['low', 'medium', 'high'];
const muscleGroupOptions = ['full body', 'legs', 'arms', 'core', 'back', 'chest'];

export function QuestGenerator({ onQuestGenerated }: QuestGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuestGeneratorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: '15 minutes',
      intensity: 'medium',
      targetMuscleGroup: 'full body',
    },
  });

  const onSubmit = async (data: QuestGeneratorFormValues) => {
    setIsLoading(true);
    try {
      const preferences = { preferences: data };
      const newQuest = await generateQuestAction(preferences);
      onQuestGenerated(newQuest);
      toast({
        title: 'Quest Generated!',
        description: `Your new quest "${newQuest.activityName}" is ready.`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Icons.Sparkles className="text-primary" />
          Generate Your Next Quest
        </CardTitle>
        <CardDescription>Select your preferences and let our AI craft a unique workout for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {durationOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intensity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intensity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select intensity" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {intensityOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetMuscleGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Muscle Group</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select muscle group" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {muscleGroupOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Icons.Logo className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Quest'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
