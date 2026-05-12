'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { System } from '@/lib/game-data';

interface InteractiveBodyMapProps {
  systems: System[];
  level: number;
  onLockedClick: (system: System) => void;
}

// Organ SVG paths in a 200×400 viewBox matching the body silhouette
const organConfig: Record<string, { label: string; color: string; element: string; lx: number; ly: number }> = {
  'genetics': {
    label: 'Brain',
    color: '#8b5cf6',
    element: 'M85,28 C85,16 115,16 115,28 C122,36 120,50 100,54 C80,50 78,36 85,28Z M93,30 C93,38 107,38 107,30 M100,30 L100,54',
    lx: 100, ly: 60,
  },
  'blood-basics': {
    label: 'Heart',
    color: '#ef4444',
    element: 'M100,155 C100,155 82,138 77,129 C71,119 73,106 81,102 C89,98 97,104 100,114 C103,104 111,98 119,102 C127,106 129,119 123,129 C118,138 100,155 100,155Z',
    lx: 100, ly: 163,
  },
  'complications': {
    label: 'Lungs',
    color: '#f97316',
    element: 'M78,120 C67,120 58,130 58,145 C58,168 68,188 80,195 C87,199 93,195 93,184 L93,128 C93,122 86,120 78,120Z M122,120 C133,120 142,130 142,145 C142,168 132,188 120,195 C113,199 107,195 107,184 L107,128 C107,122 114,120 122,120Z',
    lx: 100, ly: 205,
  },
  'pain-crisis': {
    label: 'Stomach',
    color: '#f59e0b',
    element: 'M82,218 C78,210 78,238 82,248 C88,260 112,260 118,248 C122,238 122,210 118,218 C112,226 88,226 82,218Z',
    lx: 100, ly: 268,
  },
  'health-prevention': {
    label: 'Kidneys',
    color: '#10b981',
    element: 'M78,270 C70,267 64,275 67,286 C70,296 80,299 87,293 C93,287 93,274 88,270 C85,267 81,267 78,270Z M122,270 C130,267 136,275 133,286 C130,296 120,299 113,293 C107,287 107,274 112,270 C115,267 119,267 122,270Z',
    lx: 100, ly: 308,
  },
  'treatments': {
    label: 'Spine',
    color: '#3b82f6',
    element: 'M95,80 L105,80 L105,88 L95,88Z M95,98 L105,98 L105,106 L95,106Z M95,116 L105,116 L105,124 L95,124Z M95,134 L105,134 L105,142 L95,142Z M95,172 L105,172 L105,180 L95,180Z M95,190 L105,190 L105,198 L95,198Z M95,208 L105,208 L105,216 L95,216Z M95,226 L105,226 L105,234 L95,234Z M95,244 L105,244 L105,252 L95,252Z',
    lx: 100, ly: 340,
  },
};

export function InteractiveBodyMap({ systems, level, onLockedClick }: InteractiveBodyMapProps) {
  const router = useRouter();

  return (
    <svg viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto select-none">
      {/* Body silhouette */}
      <path
        d="M100 20 C 120 20, 130 40, 130 55 C 130 70, 140 80, 150 110 C 160 140, 160 250, 150 280 C 140 310, 130 320, 130 345 C 130 370, 115 380, 100 380 C 85 380, 70 370, 70 345 C 70 320, 60 310, 50 280 C 40 250, 40 140, 50 110 C 60 80, 70 70, 70 55 C 70 40, 80 20, 100 20 Z"
        fill="currentColor"
        className="text-primary/10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.2"
      />

      {/* Organs */}
      {systems.map((system) => {
        const cfg = organConfig[system.slug];
        if (!cfg) return null;
        const isLocked = level < system.levelRequirement;
        const col = isLocked ? '#9ca3af' : cfg.color;

        return (
          <g
            key={system.slug}
            onClick={() => isLocked ? onLockedClick(system) : router.push(`/systems/${system.slug}`)}
            style={{ cursor: 'pointer' }}
            opacity={isLocked ? 0.45 : 0.92}
            className={cn(!isLocked && 'hover:opacity-100 transition-opacity duration-200')}
          >
            {/* Glow behind organ */}
            {!isLocked && (
              <path d={cfg.element} fill={col} opacity={0.18} transform="scale(1.15) translate(-13,-13)" />
            )}
            {/* Organ shape */}
            <path d={cfg.element} fill={col} stroke="white" strokeWidth="0.8" strokeOpacity="0.5" />
            {/* Label */}
            <text x={cfg.lx} y={cfg.ly} textAnchor="middle" fontSize="6.5" fill={col} fontWeight="700" letterSpacing="0.3">
              {cfg.label}
            </text>
            {/* Lock badge */}
            {isLocked && (
              <text x={cfg.lx} y={cfg.ly - 4} textAnchor="middle" fontSize="9">🔒</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
