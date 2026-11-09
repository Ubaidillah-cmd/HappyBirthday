'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import DomeGallery from '@/components/DomeGallery';
import InteractionFlow from '@/components/InteractionFlow';
import { Confetti, Balloons } from '@/components/Confetti';

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Coba putar musik otomatis saat galeri muncul (kalau diblokir browser, pakai tombol musik)
  useEffect(() => {
    if (!showGallery) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [showGallery]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const userImages = [
    '/1.jpeg',
    '/2.jpeg',
    '/3.jpeg',
    '/4.jpeg',
    '/5.jpeg',
    '/6.jpeg',
    '/7.jpeg',
    '/8.jpeg',
    '/9.jpeg',
    '/10.jpeg',
    '/11.jpeg',
    '/12.jpeg',
    '/13.jpeg',
    '/14.jpeg',
    '/15.jpeg',
  ];

  return (
    <main className="relative w-screen h-screen bg-[#060010] overflow-hidden">
      {!showGallery ? (
        <InteractionFlow onFlowComplete={() => setShowGallery(true)} />
      ) : (
        <>
          <audio ref={audioRef} src="/happy-birthday.mp3" loop preload="auto" className="hidden" />
          <Balloons count={6} />
          <Confetti count={30} />
          <div className="absolute top-6 inset-x-0 z-30 flex justify-center pointer-events-none">
            <h1 className="px-6 py-2 rounded-full backdrop-blur-md bg-white/10 border border-amber-300/30 text-2xl sm:text-4xl font-playfair text-white drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
              🎂 Happy Birthday 🎉
            </h1>
          </div>
          <button
            onClick={toggleMusic}
            className={`absolute bottom-6 right-6 z-30 flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-md border text-white text-sm font-medium transition-all ${playing ? 'bg-white/10 border-white/20' : 'bg-amber-400/30 border-amber-300/50 animate-pulse'}`}
          >
            {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
            {playing ? 'Musik On' : 'Putar musik 🎵'}
          </button>
          <DomeGallery
            images={userImages}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
            autoRotationSpeed={0.1}
          />
        </>
      )}
    </main>
  );
}
