'use client';

import React, { createContext, useContext, useEffect, useRef, useCallback, useState } from 'react';
import { Howl } from 'howler';

interface SoundContextType {
  playBootSound: () => void;
  playTickSound: (progress: number) => void;
  unlockAudio: () => void;
  isAudioUnlocked: boolean;
}

const SoundContext = createContext<SoundContextType>({
  playBootSound: () => {},
  playTickSound: () => {},
  unlockAudio: () => {},
  isAudioUnlocked: false,
});

export const useSound = () => useContext(SoundContext);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const soundRef = useRef<Howl | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const lastTickTimeRef = useRef(0);

  // Initialize Web Audio Context
  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().then(() => setIsAudioUnlocked(true)).catch(() => {});
    } else if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      setIsAudioUnlocked(true);
    }
    return audioCtxRef.current;
  }, []);

  const unlockAudio = useCallback(() => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().then(() => setIsAudioUnlocked(true)).catch(() => {});
    } else {
      setIsAudioUnlocked(true);
    }
  }, [getAudioContext]);

  useEffect(() => {
    // Initialize Howl with tone.mp3 for loading screen intro riser/impact
    soundRef.current = new Howl({
      src: ['/tone.mp3'],
      html5: true,
      volume: 0.5,
      preload: true,
    });

    const handleInteraction = () => {
      unlockAudio();
    };

    window.addEventListener('pointerdown', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      soundRef.current?.unload();
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [unlockAudio]);

  // Futuristic tick sound for progressive calibration
  const playTickSound = useCallback(
    (progress: number) => {
      const now = Date.now();
      // Throttle ticks to avoid audio buffer saturation (min 60ms between ticks)
      if (now - lastTickTimeRef.current < 60) return;
      lastTickTimeRef.current = now;

      const ctx = getAudioContext();
      if (!ctx || ctx.state !== 'running') return;

      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        // Pitch rises as progress nears 100% (from 420Hz up to 1100Hz)
        const freq = 420 + (progress / 100) * 680;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft, crisp sci-fi click
        gain.gain.setValueAtTime(0.025, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.04);
      } catch {
        // Silently catch audio buffer restrictions
      }
    },
    [getAudioContext]
  );

  // Cinematic impact sound when systems mount (100%)
  const playBootSound = useCallback(() => {
    // 1. Play tone.mp3 if available
    if (soundRef.current) {
      try {
        soundRef.current.volume(0.55);
        soundRef.current.seek(0);
        soundRef.current.play();
      } catch (e) {
        console.warn('Boot sound autoplay prevented:', e);
      }
    }

    // 2. Synthesize deep sub-bass cinematic boom + high chime chord via Web Audio API
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const t = ctx.currentTime;

      // Sub-bass impact boom
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(150, t);
      subOsc.frequency.exponentialRampToValueAtTime(36, t + 0.9);
      subGain.gain.setValueAtTime(0.35, t);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(t);
      subOsc.stop(t + 1.2);

      // Sci-fi high resolution chime chord (Lavender harmony)
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteTime = t + i * 0.04;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.07, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 1.5);
      });
    } catch {
      // Silently catch audio buffer restrictions
    }
  }, [getAudioContext]);

  return (
    <SoundContext.Provider value={{ playBootSound, playTickSound, unlockAudio, isAudioUnlocked }}>
      {children}
    </SoundContext.Provider>
  );
}
