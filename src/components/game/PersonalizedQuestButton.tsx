'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { generatePersonalizedMissionsAction } from '@/app/actions';
import { usePlayer } from '@/hooks/use-player';
import type { Mission } from '@/lib/game-data';
import { useToast } from '@/hooks/use-toast';

interface PersonalizedQuestButtonProps {
    systemName: string;
    onMissionsGenerated: (missions: Mission[]) => void;
}

export function PersonalizedQuestButton({ systemName, onMissionsGenerated }: PersonalizedQuestButtonProps) {
    const { level } = usePlayer();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const data = await generatePersonalizedMissionsAction(systemName, level);
            
            const missions: Mission[] = data.missions.map((m, idx) => ({
                id: Math.floor(Math.random() * 1000000) + 2000 + idx, // Unique ID
                title: m.title,
                description: m.description,
                xp: m.xp,
                quiz: m.quiz
            }));

            onMissionsGenerated(missions);
            
            toast({
                title: "Personalized Quests Ready!",
                description: "Hemo has prepared new special missions for you.",
            });
        } catch (error) {
            console.error("Failed to generate personalized missions:", error);
            toast({
                variant: "destructive",
                title: "AI Consultation Failed",
                description: "Hemo is currently busy. Please try again in a moment.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white font-bold py-6 group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Consulting Hemo...
                </>
            ) : (
                <>
                    <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                    Generate AI Personalized Quests
                </>
            )}
        </Button>
    );
}
