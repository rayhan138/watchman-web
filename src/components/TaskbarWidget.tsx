"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export default function TaskbarWidget() {
  const [upSpeed, setUpSpeed] = useState(0);
  const [downSpeed, setDownSpeed] = useState(0);
  const [cpu, setCpu] = useState(15);
  const [mem, setMem] = useState(79);

  useEffect(() => {
    let up = 0;
    let down = 0;
    let c = 15;
    let m = 79;

    const interval = setInterval(() => {
      // Generate some realistic-looking random network/system data
      const newUp = Math.random() * 500;
      const newDown = Math.random() * 1200;
      const newCpu = Math.floor(Math.random() * 30) + 10;
      const newMem = Math.floor(Math.random() * 10) + 70;

      animate(up, newUp, { duration: 0.8, ease: "easeOut", onUpdate: setUpSpeed });
      animate(down, newDown, { duration: 0.8, ease: "easeOut", onUpdate: setDownSpeed });
      animate(c, newCpu, { duration: 0.8, ease: "easeOut", onUpdate: setCpu });
      animate(m, newMem, { duration: 0.8, ease: "easeOut", onUpdate: setMem });

      up = newUp;
      down = newDown;
      c = newCpu;
      m = newMem;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a1a1a] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] px-4 py-2 font-mono text-xs font-bold tracking-wider flex items-center justify-center text-white select-none w-fit rounded-lg relative overflow-hidden group">
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      
      <div className="flex items-center gap-4">
        {/* Network Speeds */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[#ff71a4]">↑</span>
            <span className="w-[72px] text-right">{upSpeed.toFixed(1)} KB/s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#3ddbd9]">↓</span>
            <span className="w-[72px] text-right">{downSpeed.toFixed(1)} KB/s</span>
          </div>
        </div>
        
        {/* Hardware Usages */}
        <div className="flex flex-col gap-0.5 border-l border-white/10 pl-4">
          <div className="flex items-center gap-2">
            <span className="text-[#fca311] w-8">CPU</span>
            <span className="text-[#fca311] w-8 text-right">{Math.round(cpu)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#68d391] w-8">MEM</span>
            <span className="text-[#68d391] w-8 text-right">{Math.round(mem)}%</span>
          </div>
        </div>

        {/* Fake system tray arrow */}
        <div className="pl-2 flex items-center justify-center opacity-50">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </div>
      </div>
    </div>
  );
}
