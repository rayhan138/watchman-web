"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import WindowsTaskbarMockup from "@/components/mockups/WindowsTaskbarMockup";

export default function CinematicDesktop() {
  const [zoomComplete, setZoomComplete] = useState(false);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* The Monitor Screen */}
      <motion.div
        className="relative w-[1920px] max-w-[95vw] aspect-video bg-cover bg-center rounded-lg shadow-[0_0_100px_rgba(255,255,255,0.05)] overflow-hidden border border-white/10"
        style={{
          // A sleek, premium Windows-like dark wallpaper
          backgroundImage: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)",
        }}
        // Start showing the whole monitor, then zoom dramatically into the bottom right corner
        initial={{ scale: 0.8, transformOrigin: "100% 100%" }}
        animate={{ scale: 3.5 }}
        transition={{ delay: 0.5, duration: 3.0, ease: [0.25, 0.1, 0.25, 1] }}
        onAnimationComplete={() => {
          setTimeout(() => setZoomComplete(true), 500); // Wait half a second after zoom before starting the animation
        }}
      >
        {/* Fake Desktop Icons to make it look like a real PC */}
        <div className="absolute top-6 left-6 flex flex-col gap-6">
          <div className="w-12 h-16 flex flex-col items-center gap-2 opacity-50">
            <div className="w-10 h-10 bg-blue-500/20 border border-blue-400/30 rounded" />
            <div className="w-12 h-2 bg-white/20 rounded-full" />
          </div>
          <div className="w-12 h-16 flex flex-col items-center gap-2 opacity-50">
            <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-400/30 rounded" />
            <div className="w-12 h-2 bg-white/20 rounded-full" />
          </div>
        </div>

        {/* Fake Windows Taskbar running across the whole bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[48px] bg-[#111111]/90 backdrop-blur-md border-t border-white/5 flex items-center px-4">
          {/* Start Menu Area */}
          <div className="w-10 h-10 rounded hover:bg-white/10 flex items-center justify-center mr-4">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#3b82f6">
              <path d="M2 2h9v9H2zM13 2h9v9h-9zM2 13h9v9H2zM13 13h9v9h-9z" />
            </svg>
          </div>
          {/* Pinned Apps */}
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded hover:bg-white/10 flex items-center justify-center">
              <div className="w-6 h-6 bg-white/20 rounded" />
            </div>
            <div className="w-10 h-10 rounded hover:bg-white/10 flex items-center justify-center">
              <div className="w-6 h-6 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Embed the actual functional Watchman Mockup exactly in the corner over the fake taskbar! */}
        <WindowsTaskbarMockup cinematicMode={true} cinematicTrigger={zoomComplete} />
      </motion.div>
    </div>
  );
}
