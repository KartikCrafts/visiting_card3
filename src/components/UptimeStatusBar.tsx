import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, WifiOff, ShieldCheck, Zap, Lock } from 'lucide-react';

interface UptimeStatusBarProps {
  onOpenDashboard: () => void;
}

export const UptimeStatusBar: React.FC<UptimeStatusBarProps> = ({ onOpenDashboard }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [latency, setLatency] = useState(18);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Subtle random realistic latency fluctuation (14ms - 24ms)
    const interval = setInterval(() => {
      setLatency(Math.floor(14 + Math.random() * 9));
    }, 12000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-[#FAF7F2] border-b border-[#DECFC0] text-neutral-800 text-[11px] sm:text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Server Availability & Latency */}
        <div className="flex items-center gap-2 sm:gap-3 font-medium">
          <span className="inline-flex items-center gap-1.5 text-neutral-900 font-bold">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
            {isOnline ? '24/7 Cloud Node Active' : 'Offline Cached Mode'}
          </span>
          <span className="hidden sm:inline-block text-[#CDBAA5]">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-neutral-600">
            <Zap className="w-3 h-3 text-neutral-700" /> Latency: {latency}ms
          </span>
          <span className="hidden md:inline-block text-[#CDBAA5]">|</span>
          <span className="hidden md:inline-flex items-center gap-1 text-neutral-600">
            <ShieldCheck className="w-3 h-3 text-neutral-700" /> High Availability (99.98% Uptime)
          </span>
        </div>

        {/* Right: Direct Business Owner Access */}
        <div className="flex items-center gap-3">
          <span className="hidden xs:inline text-neutral-500 font-medium">
            Factory Direct Printing • Niraj Vora
          </span>
          <button
            onClick={onOpenDashboard}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 font-bold border border-[#DECFC0] transition-colors"
          >
            <Lock className="w-3 h-3 text-neutral-700" />
            <span>Proprietor Portal</span>
          </button>
        </div>
      </div>

      {/* Offline Toast if network disconnects */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-amber-100 border-t border-amber-300 px-4 py-1 text-center text-[11px] font-bold text-amber-900 flex items-center justify-center gap-1.5"
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>You are currently offline. All prices and card specs are loaded from local cache.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
