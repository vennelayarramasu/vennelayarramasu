import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Gamepad2, Music, Trophy, Settings2, Power } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500 selection:text-black overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar - Navigation/Meta */}
      <aside className="w-full md:w-20 bg-black border-b md:border-b-0 md:border-r border-white/10 flex md:flex-col items-center justify-between p-4 md:py-8 z-50">
        <div className="flex md:flex-col items-center gap-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-magenta-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <Gamepad2 className="text-white" size={24} />
          </div>
          <nav className="flex md:flex-col gap-6">
            <button className="text-cyan-400 hover:text-white transition-colors p-2 cursor-pointer">
              <Gamepad2 size={24} />
            </button>
            <button className="text-white/20 hover:text-white transition-colors p-2 cursor-pointer">
              <Music size={24} />
            </button>
            <button className="text-white/20 hover:text-white transition-colors p-2 cursor-pointer">
              <Trophy size={24} />
            </button>
          </nav>
        </div>
        <div className="flex md:flex-col gap-6 items-center">
            <button className="text-white/20 hover:text-white transition-colors p-2 cursor-pointer">
              <Settings2 size={20} />
            </button>
            <button className="text-red-500/50 hover:text-red-500 transition-colors p-2 cursor-pointer">
              <Power size={20} />
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-magenta-900/10 blur-[120px] rounded-full -z-10" />

        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
          
          {/* Game Window Section */}
          <div className="flex-1 flex flex-col items-center gap-8">
            <div className="text-center space-y-2">
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl">
                Neon <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">Pulse</span>
              </h1>
              <p className="text-white/40 text-xs font-mono uppercase tracking-[0.4em]">Integrated Rhythm Gaming Protocol</p>
            </div>

            <div className="relative">
                {/* Score Counter Floating */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-16 left-0 right-0 flex justify-between items-end px-4"
                >
                    <div className="flex flex-col items-start">
                        <span className="text-[10px] font-mono text-cyan-400/50 uppercase tracking-widest">Active Score</span>
                        <span className="text-4xl font-black font-mono tracking-tighter tabular-nums">{score.toString().padStart(5, '0')}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-magenta-400/50 uppercase tracking-widest">Hi-Score</span>
                        <span className="text-2xl font-black font-mono tracking-tighter tabular-nums text-white/30">04200</span>
                    </div>
                </motion.div>

                <SnakeGame 
                    onScoreChange={setScore} 
                    isPaused={isPaused} 
                />

                {/* Controls Info */}
                <div className="mt-8 flex justify-center gap-8 text-[10px] font-mono uppercase tracking-widest text-white/30 border-t border-white/5 pt-4 w-full">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Use Arrows to Navigate</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/20" /> Avoid Terminal Collision</span>
                </div>
            </div>

            <button 
                onClick={() => setIsPaused(!isPaused)}
                className={`px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-xl cursor-pointer ${
                    isPaused 
                    ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                }`}
            >
                {isPaused ? 'Engage Protocol' : 'Signal Pause'}
            </button>
          </div>

          {/* Music Section */}
          <div className="lg:w-96 flex flex-col gap-8">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Music className="text-magenta-500" size={18} />
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/60">Module: Audio</h2>
                </div>
                <MusicPlayer />
            </div>

            {/* Sub-Info Card */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Neural Analytics</h4>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">G-Force</span>
                        <span className="text-sm font-mono text-cyan-400">1.02 G</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">Heart Rate</span>
                        <span className="text-sm font-mono text-magenta-400">128 BPM</span>
                    </div>
                    <div className="w-full h-12 bg-black/50 rounded flex items-end gap-1 p-2 overflow-hidden">
                        {[40, 70, 45, 90, 65, 30, 85, 50, 40, 75].map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ repeat: Infinity, duration: 1 + Math.random(), repeatType: 'reverse' }}
                                className="flex-1 bg-white/20 rounded-t-sm"
                            />
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
