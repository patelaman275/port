'use client';

import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';

interface SoundContextType {
  playBootSound: () => void;
}

const SoundContext = createContext<SoundContextType>({
  playBootSound: () => {},
});

export const useSound = () => useContext(SoundContext);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize Howl with tone.mp3 for loading screen intro riser/impact
    soundRef.current = new Howl({
      src: ['/tone.mp3'],
      html5: true,
      volume: 0.45,
      preload: true,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const playBootSound = useCallback(() => {
    if (!soundRef.current) return;
    try {
      soundRef.current.volume(0.45);
      soundRef.current.seek(0);
      soundRef.current.play();
    } catch (e) {
      console.warn('Boot sound autoplay prevented:', e);
    }
  }, []);

  return (
    <SoundContext.Provider value={{ playBootSound }}>
      {children}
    </SoundContext.Provider>
  );
}
