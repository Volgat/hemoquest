'use client';

import { useState } from 'react';
import { MissionCard } from './MissionCard';
import { PersonalizedQuestButton } from './PersonalizedQuestButton';
import type { Mission } from '@/lib/game-data';

interface SystemMissionsProps {
    systemName: string;
    initialMissions: Mission[];
}

export function SystemMissions({ systemName, initialMissions }: SystemMissionsProps) {
    const [aiMissions, setAiMissions] = useState<Mission[]>([]);

    const handleMissionsGenerated = (newMissions: Mission[]) => {
        setAiMissions((prev) => [...newMissions, ...prev]);
    };

    const allMissions = [...aiMissions, ...initialMissions];

    return (
        <div className="space-y-8">
            {/* Personalized AI Quest Button */}
            <div className="mt-8">
                <PersonalizedQuestButton 
                    systemName={systemName} 
                    onMissionsGenerated={handleMissionsGenerated} 
                />
            </div>

            {/* Missions List */}
            <div>
                <h2 className="text-2xl font-bold font-headline mb-4 mt-8 flex items-center gap-2">
                    Available Missions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allMissions.map((mission, idx) => (
                        <MissionCard 
                            key={mission.id} 
                            mission={mission} 
                            isNew={idx < aiMissions.length}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
