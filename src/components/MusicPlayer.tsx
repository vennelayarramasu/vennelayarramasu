import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music2, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Synthwave Dreams",
    artist: "A.I. Horizon",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Neon Pulse",
    artist: "Digital Echo",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Cyber City",
    artist: "Neural Network",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1515405299443-f71bb768a63e?w=400&h=400&fit=crop"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handleBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Music2 size={80} className="text-cyan-400" />
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />

      <div className="flex flex-col gap-6 relative z-10 text-white">
        <div className="flex items-center gap-4">
          <motion.div 
            key={currentTrack.cover}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 shadow-lg"
          >
            <img src={currentTrack.cover} alt="Cover" className="w-full h-full object-cover" />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3 
              key={currentTrack.title}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-bold truncate tracking-tight text-white"
            >
              {currentTrack.title}
            </motion.h3>
            <motion.p 
               key={currentTrack.artist}
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-sm text-cyan-400/70 font-medium truncate uppercase tracking-widest text-xs"
            >
              {currentTrack.artist}
            </motion.p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-cyan-400 shadow-[0_0_10px_#00ffff]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase tracking-tighter">
            <span>0{Math.floor((audioRef.current?.currentTime || 0) / 60)}:{Math.floor((audioRef.current?.currentTime || 0) % 60).toString().padStart(2, '0')}</span>
            <span>Live Feed</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-cyan-400 hover:scale-110 active:scale-95 transition-all shadow-xl"
            >
              {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
            </button>
            <button 
              onClick={handleNext}
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-white/20 hover:text-white/60 transition-colors cursor-pointer">
            <Volume2 size={16} />
            <div className="w-16 h-0.5 bg-current rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/5 blur-[80px] rounded-full" />
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-magenta-500/5 blur-[80px] rounded-full" />
    </div>
  );
}
