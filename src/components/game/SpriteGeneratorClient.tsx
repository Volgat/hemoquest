'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateSprite } from '@/ai/flows/dynamic-sprite-generation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { DrHemoAvatar } from './DrHemoAvatar';
import { Skeleton } from '../ui/skeleton';
import { usePlayer } from '@/hooks/use-player';
import { Check } from 'lucide-react';

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: 'Prompt must be at least 10 characters.',
  }),
});

export function SpriteGeneratorClient() {
  const [loading, setLoading] = useState(false);
  const [spriteDataUri, setSpriteDataUri] = useState<string | null>(null);
  const { toast } = useToast();
  const { setCustomSprite, customSprite } = usePlayer();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSpriteDataUri(null);
    try {
      const result = await generateSprite(values);
      if (result.spriteDataUri) {
        setSpriteDataUri(result.spriteDataUri);
      } else {
        throw new Error('AI did not return a sprite.');
      }
    } catch (error) {
      console.error('Sprite generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'There was a problem with the AI generation. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleSetAsActive = () => {
    if (spriteDataUri) {
      setCustomSprite(spriteDataUri);
      toast({
        title: 'Character Updated!',
        description: 'Your new sprite is now the active mascot.',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                      <DrHemoAvatar size="sm" isThinking={loading} />
                      Sprite Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'A friendly red blood cell character with big eyes and a smile, in a cute cartoon style'"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Sprite
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col items-center justify-center">
          <div className="w-full aspect-square max-w-md bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden mb-4">
            {loading ? (
              <div className='flex flex-col items-center gap-4'>
                <Skeleton className="h-[256px] w-[256px] rounded-lg" />
                <p className="text-muted-foreground animate-pulse">AI is creating your sprite...</p>
              </div>
            ) : spriteDataUri ? (
              <Image
                src={spriteDataUri}
                alt="Generated Sprite"
                width={512}
                height={512}
                className="object-contain"
              />
            ) : (
              <div className="text-center text-muted-foreground p-4">
                <p>Your generated sprite will appear here.</p>
              </div>
            )}
          </div>
          
          {spriteDataUri && !loading && (
            <Button 
                onClick={handleSetAsActive} 
                variant={customSprite === spriteDataUri ? "outline" : "default"}
                className ="w-full max-w-md"
                disabled={customSprite === spriteDataUri}
            >
              {customSprite === spriteDataUri ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Active Mascot
                </>
              ) : (
                "Set as Active Mascot"
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
