'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface AnimatedDrHemoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isThinking?: boolean;
  isInteractive?: boolean;
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-20 h-20',
  xl: 'w-32 h-32',
};

export function AnimatedDrHemo({
  className,
  size = 'md',
  isThinking = false,
  isInteractive = true,
}: AnimatedDrHemoProps) {
  const [isJumping, setIsJumping] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  // Randomly wave or sparkle occasionally
  useEffect(() => {
    if (isThinking) return;
    const interval = setInterval(() => {
      const r = Math.random();
      if (r > 0.7) {
        setIsWaving(true);
        setSparkle(true);
        setTimeout(() => { setIsWaving(false); setSparkle(false); }, 2000);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isThinking]);

  const handleClick = () => {
    if (!isInteractive || isJumping) return;
    setIsJumping(true);
    setSparkle(true);
    setTimeout(() => { setIsJumping(false); setSparkle(false); }, 700);
  };

  return (
    <div
      className={cn(
        'relative flex-shrink-0 flex items-center justify-center transition-all duration-300',
        sizes[size],
        isInteractive && 'cursor-pointer active:scale-95',
        className
      )}
      onClick={handleClick}
    >
      {/* Glow ring under the mascot */}
      <div className={cn(
        "absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-sky-300/30 blur-md rounded-full transition-all duration-500",
        isThinking ? "scale-125 opacity-100 bg-sky-400/40" : "scale-75 opacity-50"
      )} />

      {/* AI thinking glow */}
      {isThinking && (
        <div className="absolute inset-0 rounded-full bg-sky-300/25 blur-xl animate-pulse scale-125" />
      )}

      <div
        className={cn(
          'relative w-full h-full transition-all duration-300 ease-in-out',
          isThinking ? 'animate-bounce scale-110' : 'animate-[float_3.5s_ease-in-out_infinite]',
          isInteractive && 'hover:scale-110 hover:drop-shadow-2xl',
          isJumping && 'animate-[jump_0.6s_ease-in-out]'
        )}
      >
        <svg
          viewBox="0 0 100 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Drop shadow definition */}
          <defs>
            <filter id="dropshadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#B91C1C" floodOpacity="0.3" />
            </filter>
            <radialGradient id="bodyGrad" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#F87171" />  
              <stop offset="100%" stopColor="#DC2626" />
            </radialGradient>
            <radialGradient id="shineGrad" cx="40%" cy="30%" r="40%">
              <stop offset="0%" stopColor="white" stopOpacity="0.45" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── BODY ── */}
          <g filter="url(#dropshadow)">
            <g className={cn("origin-[50px_55px]", !isThinking && "animate-[breathe_3.5s_ease-in-out_infinite]")}>
              {/* Main body - rounder, friendlier blob */}
              <ellipse cx="50" cy="58" rx="36" ry="38" fill="url(#bodyGrad)" />
              {/* Shine highlight */}
              <ellipse cx="50" cy="58" rx="36" ry="38" fill="url(#shineGrad)" />
              {/* Dimple */}
              <ellipse cx="38" cy="40" rx="8" ry="5" fill="#F87171" opacity="0.3" transform="rotate(-15 38 40)" />
            </g>
          </g>

          {/* ── LEGS ── */}
          <ellipse cx="39" cy="95" rx="8" ry="5" fill="#B91C1C" />
          <ellipse cx="61" cy="95" rx="8" ry="5" fill="#B91C1C" />

          {/* ── LEFT ARM (waving) ── */}
          <g
            style={{ transformOrigin: '18px 52px' }}
            className={cn(isWaving ? "animate-[wave_2s_ease-in-out]" : "")}
          >
            <path d="M18 52 Q 4 40 8 28" stroke="#DC2626" strokeWidth="7" strokeLinecap="round" />
            <circle cx="8" cy="27" r="5" fill="#EF4444" />
          </g>

          {/* ── RIGHT ARM ── */}
          <g>
            <path d="M82 52 Q 96 60 92 72" stroke="#DC2626" strokeWidth="7" strokeLinecap="round" />
            <circle cx="92" cy="72" r="5" fill="#EF4444" />
          </g>

          {/* ── FACE ── */}
          {/* Left Eye with blink */}
          <g style={{ transformOrigin: '34px 47px' }} className="animate-[blink_5s_ease-in-out_infinite]">
            <ellipse cx="34" cy="47" rx="7" ry="8.5" fill="white" />
            <circle cx="35.5" cy="47" r="4.5" fill="#1E1B4B" />
            <circle cx="37" cy="44.5" r="1.8" fill="white" />
          </g>

          {/* Right Eye with blink (offset timing) */}
          <g style={{ transformOrigin: '66px 47px' }} className="animate-[blink_5s_0.15s_ease-in-out_infinite]">
            <ellipse cx="66" cy="47" rx="7" ry="8.5" fill="white" />
            <circle cx="64.5" cy="47" r="4.5" fill="#1E1B4B" />
            <circle cx="63" cy="44.5" r="1.8" fill="white" />
          </g>

          {/* ── MOUTH: CONCAVE (UPWARD CURVED) FRIENDLY SMILE ── */}
          {isThinking ? (
            /* Thinking: small neutral wavy line */
            <path
              d="M 40 67 Q 50 64 60 67"
              stroke="#FCA5A5"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            /* Happy state: CLEAR concave upward smile (U-shape = opening upward = happy) */
            /* The control point Y is HIGHER than start/end => concave smile */
            <g>
              {/* Mouth fill - the interior */}
              <path
                d="M 36 68 Q 50 85 64 68 Q 50 73 36 68 Z"
                fill="#7F1D1D"
              />
              {/* Top lip curve - concave arch going downward then up = smile */}
              <path
                d="M 36 68 Q 50 82 64 68"
                stroke="#FCA5A5"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Bottom lip highlight */}
              <path
                d="M 40 73 Q 50 78 60 73"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
            </g>
          )}

          {/* Rosy cheeks */}
          <circle cx="21" cy="57" r="6" fill="#FECACA" opacity="0.65" />
          <circle cx="79" cy="57" r="6" fill="#FECACA" opacity="0.65" />

          {/* ── SPARKLES (shown on wave/click) ── */}
          {sparkle && (
            <g className="animate-[sparkle_1.5s_ease-in-out_infinite]">
              <text x="80" y="25" fontSize="10" fill="#FBBF24">✦</text>
              <text x="10" y="20" fontSize="7" fill="#FDE68A">✦</text>
              <text x="88" y="42" fontSize="6" fill="#FBBF24">✦</text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
