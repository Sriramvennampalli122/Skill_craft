import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, ClipboardList } from 'lucide-react';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 10); // accurate to 10ms
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const partialSeconds = Math.floor((ms % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${partialSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsActive(true);
  const handlePause = () => {
    setIsActive(false);
    const current = formatTime(time);
    setLogs(prev => [current, ...prev]);
  };
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLogs([]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-slate-200 max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-light text-slate-900 tracking-tight">Time Precision Module</h2>
        <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest italic">"Every second counts in development."</p>
      </div>

      <div className="w-full bg-slate-900 p-12 rounded-[2rem] shadow-xl border border-slate-800 mb-10">
        <div className="flex items-baseline justify-center">
          <div className="text-white text-7xl font-mono font-light tracking-tighter">
            {formatTime(time).split('.')[0]}
          </div>
          <div className="text-blue-400 text-3xl font-mono ml-2 opacity-90 self-end mb-2">
            .{formatTime(time).split('.')[1]}
          </div>
        </div>
      </div>

      <div className="flex gap-6 mb-12">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg active:scale-95"
          >
            <Play size={32} fill="white" className="ml-1" />
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            <Pause size={32} fill="white" />
          </button>
        )}
        <button
          onClick={handleReset}
          className="w-20 h-20 border-2 border-slate-200 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all active:scale-95"
        >
          <RotateCcw size={32} />
        </button>
      </div>

      <div className="w-full border-t border-slate-100 pt-8">
        <div className="flex items-center gap-2 mb-6 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          <ClipboardList size={14} />
          Session Logs
        </div>
        <div className="bg-slate-50 rounded-xl max-h-40 overflow-y-auto p-6 custom-scrollbar border border-slate-100">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div
                key={log + i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-slate-600 font-mono text-sm py-2 border-b border-slate-200/50 last:border-0 flex justify-between items-center"
              >
                <span className="text-[10px] bg-slate-200/50 px-2 py-0.5 rounded text-slate-400">LOG {logs.length - i}</span>
                <span className="font-semibold">{log}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {logs.length === 0 && (
            <div className="text-slate-300 text-center text-xs py-2 tracking-widest font-medium">PENDING LOGS...</div>
          )}
        </div>
      </div>
    </div>
  );
}
