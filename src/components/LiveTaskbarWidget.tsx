"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * Animated Number Helper Component
 * Handles the smooth counting up/down of the values
 */
function AnimatedNumber({ value, isInteger = false }: { value: number; isInteger?: boolean }) {
  const motionValue = useMotionValue(value);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, motionValue]);

  const formatted = useTransform(motionValue, (latest) => {
    return isInteger ? Math.round(latest).toString() : latest.toFixed(1);
  });

  return <motion.span>{formatted}</motion.span>;
}

/**
 * Main Taskbar Widget Component
 */
export default function LiveTaskbarWidget() {
  // Simulate incoming live data
  const [stats, setStats] = useState({
    upload: 0.2,
    download: 1.5,
    cpu: 17,
    mem: 74,
  });

  // Randomize the data every 2.5 seconds to simulate network activity
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        upload: +(Math.random() * 5).toFixed(1), // Random between 0-5 MB/s
        download: +(Math.random() * 50).toFixed(1), // Random between 0-50 MB/s
        cpu: Math.floor(Math.random() * 30) + 10, // Random between 10-40%
        mem: Math.floor(Math.random() * 15) + 65, // Random between 65-80%
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    // We use font-mono and replicate your exact styling constraints
    <div className="relative flex flex-col justify-center gap-[2px] p-[3px] w-full max-w-[220px] h-[40px] bg-black/40 backdrop-blur-md rounded-md font-mono text-[11px] font-bold select-none border border-white/5 shadow-2xl">
      
      {/* Upload Row */}
      <div className="relative z-10 flex items-center justify-start whitespace-nowrap overflow-hidden">
        <span className="w-[12px] text-center text-[#f07dac] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">&#8593;</span>
        
        {/* Upload Value */}
        <span className="min-w-[66px] max-w-[66px] text-right text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
          <AnimatedNumber value={stats.upload} /> <span className="text-[10px]">MB/s</span>
        </span>
        
        <span className="min-w-[4px] w-[4px]"></span>
        
        {/* CPU Value */}
        <span className="text-[#f3b64a] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">CPU</span>
        <span className="min-w-[16px] max-w-[16px] text-right text-[#f3b64a] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] ml-1">
          <AnimatedNumber value={stats.cpu} isInteger />
        </span>
        <span className="min-w-[6px] text-left text-[#f3b64a] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">%</span>
      </div>

      {/* Download Row */}
      <div className="relative z-10 flex items-center justify-start whitespace-nowrap overflow-hidden">
        <span className="w-[12px] text-center text-[#63d6ff] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">&#8595;</span>
        
        {/* Download Value */}
        <span className="min-w-[66px] max-w-[66px] text-right text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
          <AnimatedNumber value={stats.download} /> <span className="text-[10px]">MB/s</span>
        </span>
        
        <span className="min-w-[4px] w-[4px]"></span>
        
        {/* MEM Value */}
        <span className="text-[#86d96c] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">MEM</span>
        <span className="min-w-[16px] max-w-[16px] text-right text-[#86d96c] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] ml-1">
          <AnimatedNumber value={stats.mem} isInteger />
        </span>
        <span className="min-w-[6px] text-left text-[#86d96c] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">%</span>
      </div>

    </div>
  );
}
