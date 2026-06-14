"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WindowsTaskbarMockup() {
  // Live time for the clock
  const [time, setTime] = useState(new Date());
  
  // States
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [trayMenuPosition, setTrayMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [isTrayOpen, setTrayOpen] = useState(false);
  const [isWidgetVisible, setWidgetVisible] = useState(true);
  const [widgetMode, setWidgetMode] = useState<"full" | "network">("full");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close context menus and tray when clicking anywhere else
  useEffect(() => {
    const handleClick = () => {
      setMenuPosition(null);
      setTrayMenuPosition(null);
      setTrayOpen(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strTime = hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
    return strTime;
  };

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handleWidgetContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuPosition({ x: e.clientX - 20, y: e.clientY - 230 });
    setTrayMenuPosition(null);
    setTrayOpen(false);
  };

  const handleTrayIconContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTrayMenuPosition({ x: e.clientX - 20, y: e.clientY - 260 });
    setMenuPosition(null);
  };

  const toggleTray = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTrayOpen(!isTrayOpen);
    setMenuPosition(null);
    setTrayMenuPosition(null);
  };

  return (
    <div className="w-full h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden relative" onContextMenu={(e) => { if (!menuPosition && !trayMenuPosition) e.preventDefault(); }}>
      
      {/* Cropped Taskbar Section Floating in Center */}
      <div className="h-[48px] bg-[#202020] border-t border-white/10 flex items-center px-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-md relative z-10 transition-all duration-300">
        
        {/* The Watchman Widget (Always takes up space, only fades out) */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: isWidgetVisible ? 1 : 0, pointerEvents: isWidgetVisible ? "auto" : "none" }}
          transition={{ duration: 0.15 }}
          onContextMenu={handleWidgetContextMenu}
          className="flex flex-col justify-center gap-[2px] h-full font-mono text-[12px] font-bold select-none tracking-tight cursor-context-menu hover:bg-white/5 rounded transition-colors overflow-hidden whitespace-nowrap mr-2 px-2"
        >
          {/* Upload Row */}
          <div className="flex items-center justify-start whitespace-nowrap">
            <span className="w-[12px] text-center text-[#f07dac] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] leading-none -translate-y-[1px]">↑</span>
            <span className="w-[58px] text-right text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] leading-none">8.4 KB/s</span>
            {widgetMode === "full" && (
              <>
                <span className="w-[6px]"></span>
                <span className="text-[#f3b64a] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] leading-none">CPU</span>
                <span className="w-[28px] text-right text-[#f3b64a] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] leading-none ml-1">6%</span>
              </>
            )}
          </div>

          {/* Download Row */}
          <div className="flex items-center justify-start whitespace-nowrap">
            <span className="w-[12px] text-center text-[#63d6ff] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] leading-none -translate-y-[1px]">↓</span>
            <span className="w-[58px] text-right text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] leading-none">5.4 KB/s</span>
            {widgetMode === "full" && (
              <>
                <span className="w-[6px]"></span>
                <span className="text-[#86d96c] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] leading-none">MEM</span>
                <span className="w-[28px] text-right text-[#86d96c] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] leading-none ml-1">67%</span>
              </>
            )}
          </div>
        </motion.div>

        {/* Show Hidden Icons Arrow Button */}
        <div 
          onClick={toggleTray}
          className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors cursor-pointer mr-1 text-white/90 ${isTrayOpen ? 'bg-[#333333] shadow-inner border border-white/5' : 'hover:bg-white/10 border border-transparent'}`}
        >
          {isTrayOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          )}
        </div>

        {/* System Tray Icons (Wifi, Mic, Vol) */}
        <div className="flex items-center h-full px-2 hover:bg-white/10 rounded transition-colors cursor-pointer text-white/90 gap-3">
          {/* Microphone Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f28b82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
          {/* Wi-Fi Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 ml-1">
            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
          {/* Volume Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        </div>

        {/* Clock & Date */}
        <div className="flex flex-col items-end justify-center h-full pl-3 pr-2 hover:bg-white/10 rounded transition-colors cursor-pointer font-sans text-[12px] text-white/90 leading-tight">
          <span>{formatTime(time)}</span>
          <span>{formatDate(time)}</span>
        </div>
      </div>

      {/* Hidden Icons Tray Popup */}
      <AnimatePresence>
        {isTrayOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed z-40 bg-[#2b2b2b]/95 backdrop-blur-2xl border border-white/5 rounded-xl shadow-2xl p-3"
            style={{ 
              left: "50%", 
              top: "50%",
              transform: "translate(-50%, -50%)", 
              marginLeft: "15px",
              marginTop: "-85px" 
            }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-4 gap-2">
              <div className="w-10 h-10 hover:bg-white/10 rounded-md flex items-center justify-center cursor-pointer transition-colors text-blue-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              </div>
              
              {/* Watchman Logo Icon (Right-Clickable) */}
              <div 
                onContextMenu={handleTrayIconContextMenu}
                className="w-10 h-10 hover:bg-white/10 rounded-md flex items-center justify-center cursor-context-menu transition-colors bg-white/5 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              >
                <img src="/watchman-logo.svg" className="w-6 h-6 pointer-events-none" alt="Watchman" />
              </div>
              
              <div className="w-10 h-10 hover:bg-white/10 rounded-md flex items-center justify-center cursor-pointer transition-colors text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>
              </div>
              <div className="w-10 h-10 hover:bg-white/10 rounded-md flex items-center justify-center cursor-pointer transition-colors text-red-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
              </div>
              <div className="w-10 h-10 hover:bg-white/10 rounded-md flex items-center justify-center cursor-pointer transition-colors text-orange-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
              </div>
              <div className="w-10 h-10 hover:bg-white/10 rounded-md flex items-center justify-center cursor-pointer transition-colors text-purple-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              </div>
              <div className="w-10 h-10 hover:bg-white/10 rounded-md flex items-center justify-center cursor-pointer transition-colors text-white/70">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              </div>
              <div className="w-10 h-10 hover:bg-white/10 rounded-md flex items-center justify-center cursor-pointer transition-colors text-emerald-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget Context Menu */}
      <AnimatePresence>
        {menuPosition && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed z-50 w-64 bg-[#2b2b2b]/95 backdrop-blur-2xl border border-white/5 rounded-lg shadow-2xl py-1 text-[13px] font-sans text-white/90 select-none"
            style={{ left: menuPosition.x, top: menuPosition.y }}
            onContextMenu={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Open Dashboard</div>
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Open History</div>
            
            <div className="relative group">
              <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded flex justify-between items-center">
                View
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
              <div className="absolute right-[100%] mr-1 top-[-4px] w-40 bg-[#2b2b2b]/95 backdrop-blur-2xl border border-white/5 rounded-lg shadow-2xl py-1 hidden group-hover:block">
                <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Today</div>
                <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Last 7 Days</div>
                <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Monthly</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded flex justify-between items-center">
                Widget
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
              <div className="absolute right-[100%] mr-1 top-[-4px] w-48 bg-[#2b2b2b]/95 backdrop-blur-2xl border border-white/5 rounded-lg shadow-2xl py-1 hidden group-hover:block">
                <div 
                  className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded flex items-center"
                  onClick={() => { setWidgetMode("network"); setMenuPosition(null); }}
                >
                  <span className="w-6 flex justify-center mr-1">
                    {widgetMode === "network" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </span>
                  Show Network Only
                </div>
                <div 
                  className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded flex items-center"
                  onClick={() => { setWidgetMode("full"); setMenuPosition(null); }}
                >
                  <span className="w-6 flex justify-center mr-1">
                    {widgetMode === "full" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </span>
                  Show CPU/MEM
                </div>
              </div>
            </div>
            
            <div className="my-1 mx-4 border-b border-white/10"></div>
            
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Reset Session Counters</div>
            
            <div className="my-1 mx-4 border-b border-white/10"></div>
            
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Exit</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tray Icon Context Menu */}
      <AnimatePresence>
        {trayMenuPosition && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed z-50 w-64 bg-[#2b2b2b]/95 backdrop-blur-2xl border border-white/5 rounded-lg shadow-2xl py-1 text-[13px] font-sans text-white/90 select-none"
            style={{ left: trayMenuPosition.x, top: trayMenuPosition.y }}
            onContextMenu={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Open Watchman</div>
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Preferences</div>
            
            <div 
              className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setWidgetVisible(!isWidgetVisible);
                setTrayMenuPosition(null);
              }}
            >
              Show/Hide Widget
            </div>
            
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Run as Administrator</div>
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Restart Watchman</div>
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Help & About</div>
            
            <div className="my-1 mx-4 border-b border-white/10"></div>
            
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Quit</div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
