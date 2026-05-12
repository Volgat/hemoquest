'use client';

/**
 * useSoundEffects — generates all game sounds via Web Audio API.
 * No audio files needed: pure synthesis.
 */
export function useSoundEffects() {
  const ctx = () => {
    if (typeof window === 'undefined') return null;
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  };

  /** Low-level helper: play a series of notes */
  function playNotes(notes: { freq: number; dur: number; delay: number; type?: OscillatorType; vol?: number }[]) {
    const ac = ctx();
    if (!ac) return;
    notes.forEach(({ freq, dur, delay, type = 'sine', vol = 0.3 }) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ac.currentTime + delay);
      gain.gain.setValueAtTime(vol, ac.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + dur);
      osc.start(ac.currentTime + delay);
      osc.stop(ac.currentTime + delay + dur);
    });
  }

  /** ✅ Correct answer — bright ascending chime */
  function playCorrect() {
    playNotes([
      { freq: 523, dur: 0.12, delay: 0,    type: 'sine', vol: 0.25 },
      { freq: 659, dur: 0.12, delay: 0.1,  type: 'sine', vol: 0.25 },
      { freq: 784, dur: 0.2,  delay: 0.2,  type: 'sine', vol: 0.3  },
    ]);
  }

  /** ❌ Wrong answer — low descending buzz */
  function playWrong() {
    playNotes([
      { freq: 300, dur: 0.15, delay: 0,    type: 'square', vol: 0.18 },
      { freq: 220, dur: 0.25, delay: 0.12, type: 'square', vol: 0.15 },
    ]);
  }

  /** 🎉 Level up — triumphant fanfare */
  function playLevelUp() {
    playNotes([
      { freq: 523, dur: 0.1,  delay: 0,    vol: 0.28 },
      { freq: 659, dur: 0.1,  delay: 0.1,  vol: 0.28 },
      { freq: 784, dur: 0.1,  delay: 0.2,  vol: 0.28 },
      { freq: 1047,dur: 0.35, delay: 0.3,  vol: 0.35 },
      { freq: 784, dur: 0.1,  delay: 0.55, vol: 0.2  },
      { freq: 1047,dur: 0.4,  delay: 0.65, vol: 0.35 },
    ]);
  }

  /** 🏆 Mission complete — short success melody */
  function playMissionComplete() {
    playNotes([
      { freq: 440, dur: 0.1,  delay: 0,    vol: 0.25 },
      { freq: 554, dur: 0.1,  delay: 0.11, vol: 0.25 },
      { freq: 659, dur: 0.1,  delay: 0.22, vol: 0.25 },
      { freq: 880, dur: 0.28, delay: 0.33, vol: 0.32 },
    ]);
  }

  /** 🖱️ UI click — soft tick */
  function playClick() {
    playNotes([{ freq: 800, dur: 0.05, delay: 0, type: 'sine', vol: 0.1 }]);
  }

  /** 🔒 Locked — blocked thud */
  function playLocked() {
    playNotes([
      { freq: 180, dur: 0.12, delay: 0,    type: 'sawtooth', vol: 0.15 },
      { freq: 140, dur: 0.15, delay: 0.1,  type: 'sawtooth', vol: 0.1  },
    ]);
  }

  /** 📖 Onboarding slide turn — soft whoosh */
  function playSlide() {
    playNotes([{ freq: 600, dur: 0.08, delay: 0, type: 'sine', vol: 0.08 },
               { freq: 900, dur: 0.08, delay: 0.06, type: 'sine', vol: 0.06 }]);
  }

  return { playCorrect, playWrong, playLevelUp, playMissionComplete, playClick, playLocked, playSlide };
}
