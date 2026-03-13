'use client';

import { AnimatedDrHemo } from '@/components/game/AnimatedDrHemo';

interface DrHemoAvatarProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isThinking?: boolean;
    isInteractive?: boolean;
    priority?: boolean;
}

export function DrHemoAvatar({
    className,
    size = 'md',
    isThinking = false,
    isInteractive = true,
}: DrHemoAvatarProps) {
    return (
        <AnimatedDrHemo 
            className={className} 
            size={size} 
            isThinking={isThinking} 
            isInteractive={isInteractive} 
        />
    );
}
