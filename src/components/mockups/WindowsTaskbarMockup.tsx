"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DataMockup from "./DataMockup";

export default function WindowsTaskbarMockup({ 
  embedded = false, 
  autoPlay = false,
  cinematicMode = false,
  cinematicTrigger = false
}: { 
  embedded?: boolean; 
  autoPlay?: boolean;
  cinematicMode?: boolean;
  cinematicTrigger?: boolean;
}) {
  // Live time for the clock
  const [time, setTime] = useState(new Date());
  
  // States
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [trayMenuPosition, setTrayMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [isTrayOpen, setTrayOpen] = useState(false);
  const [isWidgetVisible, setWidgetVisible] = useState(true);
  const [isDataWindowOpen, setDataWindowOpen] = useState(false);
  const [widgetMode, setWidgetMode] = useState<"full" | "network">("full");
  
  // Color Sweep Animation States
  const [taskbarBaseBg, setTaskbarBaseBg] = useState("#202020");
  const [sweepBg, setSweepBg] = useState("#efefef");
  const [isSweeping, setIsSweeping] = useState(false);
  const isLightModeBase = taskbarBaseBg === "#efefef";
  const isLightModeSweep = sweepBg === "#efefef";

  // Dynamic Stats
  const [upSpeed, setUpSpeed] = useState(8.4);
  const [downSpeed, setDownSpeed] = useState(154.2);
  const [cpu, setCpu] = useState(6);
  const [mem, setMem] = useState(67);

  // Animation States
  const [isAnimating, setIsAnimating] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorClick, setCursorClick] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);
  const [hoverState, setHoverState] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Simulate live network/system activity
  useEffect(() => {
    const statTimer = setInterval(() => {
      setUpSpeed(prev => {
        const diff = (Math.random() - 0.5) * 8;
        return Math.max(0.1, Math.min(999.9, prev + diff));
      });
      setDownSpeed(prev => {
        const diff = (Math.random() - 0.5) * 25;
        return Math.max(0.1, Math.min(999.9, prev + diff));
      });
      setCpu(prev => {
        const diff = Math.floor((Math.random() - 0.5) * 6);
        return Math.max(1, Math.min(100, prev + diff));
      });
      setMem(prev => {
        const diff = Math.floor((Math.random() - 0.5) * 3);
        return Math.max(15, Math.min(95, prev + diff));
      });
    }, 1200);
    return () => clearInterval(statTimer);
  }, []);

  // Close context menus and tray when clicking anywhere else
  useEffect(() => {
    const handleClick = () => {
      if (isAnimating) return;
      setMenuPosition(null);
      setTrayMenuPosition(null);
      setTrayOpen(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isAnimating]);

  // Auto-play Loop for Embedded Hero & Cinematic Mode
  useEffect(() => {
    if (cinematicMode) {
      if (cinematicTrigger && !isAnimating) {
        const timer = setTimeout(() => {
          const btn = document.getElementById("demo-play-btn");
          if (btn) btn.click();
        }, 500);
        return () => clearTimeout(timer);
      }
      return;
    }
    
    if (!autoPlay) return;
    if (!isAnimating) {
      const timer = setTimeout(() => {
        const btn = document.getElementById("demo-play-btn");
        if (btn) btn.click();
      }, 1000); // Exactly 1 second delay after animation completes
      return () => clearTimeout(timer);
    }
  }, [autoPlay, isAnimating, cinematicMode, cinematicTrigger]);

  const startDemo = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Reset state
    setWidgetVisible(true);
    setWidgetMode("full");
    setMenuPosition(null);
    setTrayOpen(false);
    
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const container = document.getElementById("mockup-container");
    const CX = container ? container.offsetWidth / 2 : window.innerWidth / 2;
    const CY = container ? container.offsetHeight / 2 : window.innerHeight / 2;
    // Helper to get true local coordinates immune to CSS transforms AND external scales
    const getCenterPos = (elId: string, fallbackX: number, fallbackY: number) => {
      if (typeof window === "undefined") return { x: fallbackX, y: fallbackY };
      const containerEl = document.getElementById("mockup-container");
      if (!containerEl) return { x: fallbackX, y: fallbackY };
      const el = document.getElementById(elId);
      if (!el) return { x: fallbackX, y: fallbackY };
      
      const containerRect = containerEl.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      
      const scaleX = containerRect.width / containerEl.offsetWidth || 1;
      const scaleY = containerRect.height / containerEl.offsetHeight || 1;
      
      const localX = (elRect.left - containerRect.left) / scaleX;
      const localY = (elRect.top - containerRect.top) / scaleY;
      
      return { 
        x: localX + (elRect.width / scaleX) / 2, 
        y: localY + (elRect.height / scaleY) / 2 
      };
    };
    
    const triggerClick = async (delayAfter = 100) => {
      setCursorClick(true);
      setRipples(r => [...r, Date.now() + Math.random()]);
      await delay(60);
      setCursorClick(false);
      await delay(delayAfter);
    };
    
    // 0. Continuous Sweeping Animation with Laser
    const cycleColors = [
      "#efefef", // Crisp White
      "#003b82", // Classic Deep Blue
      "#ff0055", // Neon Crimson
      "#10b981", // Emerald Green
      "#202020"  // Dark Mode
    ];
    
    setIsSweeping(true);
    setWidgetVisible(true);
    setDataWindowOpen(false);
    for (let i = 0; i < cycleColors.length; i++) {
      setSweepBg(cycleColors[i]);
      await delay(350); // Faster sweep
      setTaskbarBaseBg(cycleColors[i]);
    }
    setIsSweeping(false);
    
    // 1. Enter screen
    setCursorPos({ x: CX + 300, y: CY + 200 });
    await delay(300);
    
    // 2. Move to Widget using true local DOM coordinates
    setCursorText("Moving...");
    let pos = getCenterPos("demo-widget", CX - 60, CY);
    setCursorPos(pos);
    await delay(550);
    
    // 3. Right Click
    setCursorText("Right click");
    await triggerClick(100);
    
    const menuX = pos.x - 20;
    const menuY = pos.y - 230;
    setMenuPosition({ x: menuX, y: menuY });
    await delay(450);
    
    // 4. Move to "Widget" menu item (4th item down)
    setCursorText("Hover menu");
    setCursorPos({ x: menuX + 40, y: menuY + 105 });
    await delay(450);
    
    // Hover trigger
    setHoverState("widget");
    await delay(450);
    
    // 5. Move into submenu "Show Network Only" (sub menu is to the left)
    setCursorText("Select option");
    setCursorPos({ x: menuX - 90, y: menuY + 105 });
    await delay(450);
    
    // 6. Click it
    setCursorText("Left click");
    await triggerClick(100);
    
    // Trigger action
    setWidgetMode("network");
    setMenuPosition(null);
    setHoverState(null);
    await delay(450);
    
    // 7. Move to Tray Arrow Button
    setCursorText("Moving...");
    pos = getCenterPos("demo-tray-btn", CX + 25, CY);
    setCursorPos(pos);
    await delay(550);
    
    // Left click
    setCursorText("Left click");
    await triggerClick(100);
    setTrayOpen(true);
    await delay(300); // give it time to animate open
    
    // 8. Move to Watchman Logo inside the Tray Popup
    setCursorText("Moving...");
    pos = getCenterPos("demo-watchman-logo", CX - 10, CY - 100);
    setCursorPos(pos);
    await delay(550);
    
    // Right click the Logo
    setCursorText("Right click");
    await triggerClick(100);
    
    const trayMenuX = pos.x - 20;
    const trayMenuY = pos.y - 260;
    setTrayMenuPosition({ x: trayMenuX, y: trayMenuY });
    await delay(450);
    
    // 9. Move to "Show/Hide Widget" option (3rd item down)
    setCursorText("Select option");
    setCursorPos({ x: trayMenuX + 40, y: trayMenuY + 75 });
    await delay(550);
    
    // Left click it
    setCursorText("Left click");
    await triggerClick(100);
    
    // Trigger action
    setWidgetVisible(false);
    setTrayMenuPosition(null);
    setTrayOpen(false);
    
    // 10. Wait a moment
    setCursorText("");
    setCursorPos({ x: CX + 300, y: CY + 200 });
    await delay(630);
    
    // 11. Unhide widget to demonstrate double click
    setWidgetVisible(true);
    await delay(500);
    
    // 12. Move to Widget
    setCursorText("Moving...");
    pos = getCenterPos("demo-widget", CX - 60, CY);
    setCursorPos(pos);
    await delay(550);
    
    // 13. Double Click
    setCursorText("Double click");
    await triggerClick(50); // first click
    await triggerClick(100); // second click
    
    // Open Data window
    setDataWindowOpen(true);
    await delay(1200); // Wait just slightly longer so the user can enjoy the big window
    
    // 14. Move cursor away
    setCursorText("");
    setCursorPos({ x: CX + 400, y: CY - 150 });
    await delay(700);
    
    setIsAnimating(false);
  };

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

  const getLocalCoords = (e: React.MouseEvent) => {
    const container = document.getElementById("mockup-container");
    if (!container) return { x: e.clientX, y: e.clientY };
    const rect = container.getBoundingClientRect();
    const scaleX = rect.width / container.offsetWidth;
    const scaleY = rect.height / container.offsetHeight;
    return {
      x: (e.clientX - rect.left) / scaleX,
      y: (e.clientY - rect.top) / scaleY
    };
  };

  const handleWidgetContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const coords = getLocalCoords(e);
    setMenuPosition({ x: coords.x - 20, y: coords.y - 230 });
    setTrayMenuPosition(null);
    setTrayOpen(false);
  };

  const handleTrayIconContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const coords = getLocalCoords(e);
    setTrayMenuPosition({ x: coords.x - 20, y: coords.y - 260 });
    setMenuPosition(null);
  };

  const toggleTray = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTrayOpen(!isTrayOpen);
    setMenuPosition(null);
    setTrayMenuPosition(null);
  };

  const renderTaskbarContent = (isLightMode: boolean, isOverlay: boolean) => (
    <>
      {/* The Watchman Widget (Always takes up space, only fades out) */}
      <motion.div 
        id={isOverlay ? undefined : "demo-widget"}
        initial={{ opacity: 1 }}
        animate={{ opacity: isWidgetVisible ? 1 : 0, pointerEvents: isWidgetVisible ? "auto" : "none" }}
        transition={{ duration: 0.15 }}
        onContextMenu={isOverlay ? undefined : handleWidgetContextMenu}
        className="flex flex-col justify-center gap-[2px] h-full font-mono text-[11px] font-bold select-none cursor-context-menu hover:bg-white/5 rounded transition-colors overflow-hidden whitespace-nowrap mr-2 px-2"
      >
        {/* Upload Row */}
        <div className="relative z-10 flex items-center justify-start whitespace-nowrap overflow-hidden">
          <span className={`w-[12px] text-center ${isLightMode ? 'text-[#c4366e]' : 'text-[#f07dac] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]'}`}>&#8593;</span>
          <span className={`min-w-[66px] max-w-[66px] text-right ${isLightMode ? 'text-black font-[800]' : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]'}`}>
            {upSpeed.toFixed(1)} <span className="text-[10px]">KB/s</span>
          </span>
          {widgetMode === "full" && (
            <>
              <span className="min-w-[4px] w-[4px]"></span>
              <span className={`${isLightMode ? 'text-[#b37e1a]' : 'text-[#f3b64a] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]'}`}>CPU</span>
              <span className={`min-w-[16px] max-w-[16px] text-right ml-1 ${isLightMode ? 'text-[#b37e1a] font-bold' : 'text-[#f3b64a] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]'}`}>
                {cpu}
              </span>
              <span className={`min-w-[6px] text-left ${isLightMode ? 'text-[#b37e1a]' : 'text-[#f3b64a] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]'}`}>%</span>
            </>
          )}
        </div>

        {/* Download Row */}
        <div className="relative z-10 flex items-center justify-start whitespace-nowrap overflow-hidden">
          <span className={`w-[12px] text-center ${isLightMode ? 'text-[#0088cc]' : 'text-[#63d6ff] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]'}`}>&#8595;</span>
          <span className={`min-w-[66px] max-w-[66px] text-right ${isLightMode ? 'text-black font-[800]' : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]'}`}>
            {downSpeed.toFixed(1)} <span className="text-[10px]">KB/s</span>
          </span>
          {widgetMode === "full" && (
            <>
              <span className="min-w-[4px] w-[4px]"></span>
              <span className={`${isLightMode ? 'text-[#35821f]' : 'text-[#86d96c] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]'}`}>MEM</span>
              <span className={`min-w-[16px] max-w-[16px] text-right ml-1 ${isLightMode ? 'text-[#35821f] font-bold' : 'text-[#86d96c] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]'}`}>
                {mem}
              </span>
              <span className={`min-w-[6px] text-left ${isLightMode ? 'text-[#35821f]' : 'text-[#86d96c] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]'}`}>%</span>
            </>
          )}
        </div>
      </motion.div>

      {/* Show Hidden Icons Arrow Button */}
      <div 
        id={isOverlay ? undefined : "demo-tray-btn"}
        onClick={isOverlay ? undefined : toggleTray}
        className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-md transition-colors cursor-pointer mr-1 ${isLightMode ? 'text-black/80' : 'text-white/90'} ${isTrayOpen ? 'bg-[#121212] text-white/90 shadow-inner border border-white/5' : isLightMode ? 'hover:bg-black/5' : 'hover:bg-white/10'}`}
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
      <div className={`relative z-10 flex items-center h-full px-2 ${isLightMode ? 'hover:bg-black/5 text-black/80' : 'hover:bg-white/10 text-white/90'} rounded transition-colors cursor-pointer gap-3`}>
        {/* Microphone Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isLightMode ? "#d32f2f" : "#f28b82"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <div className={`relative z-10 flex flex-col items-end justify-center h-full pl-3 pr-2 ${isLightMode ? 'hover:bg-black/5 text-black/80' : 'hover:bg-white/10 text-white/90'} rounded transition-colors cursor-pointer font-sans text-[12px] leading-tight`}>
        <span suppressHydrationWarning>{formatTime(time)}</span>
        <span suppressHydrationWarning>{formatDate(time)}</span>
      </div>
    </>
  );

  return (
    <div 
      id="mockup-container"
      className={`w-full ${embedded ? 'h-[320px] sm:h-[480px] md:h-[600px] bg-transparent' : 'h-screen bg-[#0a0a0a] overflow-hidden'} flex items-center justify-center relative scale-[0.65] sm:scale-[0.85] md:scale-[1.2] origin-center`} 
      onContextMenu={(e) => { if (!menuPosition && !trayMenuPosition) e.preventDefault(); }}
    >
      {/* Removed old DemoText block entirely, cursor has the tail now */}


      {/* Data Window Pop-up on Double Click */}
      <AnimatePresence>
        {isDataWindowOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%", filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: isMobile ? 0.6 : 0.75, x: "-50%", y: "-50%", filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%", filter: "blur(20px)", transition: { duration: 0.2 } }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            className="absolute z-50 pointer-events-none top-1/2 drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
            style={{ left: isMobile ? "50%" : "calc(50% + 80px)" }} // Center-aligned on mobile, shifted 80px right on desktop
          >
            <DataMockup isActive={isDataWindowOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar Wrapper for Tracking Glow Alignment */}
      <div className={`relative z-10 flex items-center ${isMobile ? "" : "translate-x-20"}`}>
        
        {/* Dynamic Color Change Text */}
        <AnimatePresence>
          {isSweeping && (
            <motion.div
              initial={{ opacity: 0, y: 15, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -10, x: "-50%", transition: { duration: 0.2 } }}
              className="absolute z-30 text-xs font-bold tracking-[0.2em] uppercase pointer-events-none whitespace-nowrap left-1/2"
              style={{ 
                bottom: "calc(100% + 24px)",
                color: taskbarBaseBg === "#202020" ? "#efefef" : taskbarBaseBg,
                textShadow: `0 0 16px ${taskbarBaseBg === "#202020" ? "rgba(255,255,255,0.3)" : taskbarBaseBg}`
              }}
            >
              Adapts to any taskbar
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Tracking Glow Behind Taskbar */}
        <AnimatePresence>
          {isSweeping && (
            <motion.div
              key={sweepBg}
              className="absolute top-1/2 -translate-y-[55%] w-[300px] h-[80px] rounded-full blur-[50px] z-0 pointer-events-none"
              style={{ backgroundColor: sweepBg }}
              initial={{ left: "0%", x: "-50%", opacity: 0 }}
              animate={{ 
                left: "100%", 
                x: "-50%", 
                opacity: [0, sweepBg === "#efefef" ? 0.12 : 0.30, sweepBg === "#efefef" ? 0.12 : 0.30, 0] 
              }}
              transition={{ 
                duration: 0.35, 
                ease: "easeInOut", 
                opacity: { duration: 0.35, times: [0, 0.1, 0.9, 1] } 
              }}
            />
          )}
        </AnimatePresence>

        {/* Cropped Taskbar Section Floating in Center/Right */}
        <div className="h-[48px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-md relative z-10 overflow-hidden transform-gpu">
          
          {/* Universal Top Border */}
          <div className="absolute inset-0 border-t border-white/10 rounded-md pointer-events-none z-30" />

          {/* Base Background Layer */}
          <div className="absolute inset-0 z-0 rounded-md" style={{ backgroundColor: taskbarBaseBg }} />

          {/* Base Content Layer (In document flow, determines taskbar width) */}
          <div className="relative z-10 flex items-center h-full px-2">
            {renderTaskbarContent(isLightModeBase, false)}
          </div>
          
          {/* Sweeping Overlay Layer with Laser Scanner */}
          {isSweeping && (
            <motion.div
              key={sweepBg}
              className="absolute inset-0 z-20 overflow-hidden rounded-md flex items-center px-2"
              style={{ backgroundColor: sweepBg }}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {renderTaskbarContent(isLightModeSweep, true)}
              
              {/* The Laser / Scanner Line attached to the leading edge */}
              <motion.div
                className="absolute top-0 bottom-0 w-[3px] z-30 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.9), transparent)",
                  boxShadow: "0 0 12px 2px rgba(255,255,255,0.5)"
                }}
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ 
                  duration: 0.35, 
                  ease: "easeInOut", 
                  opacity: { duration: 0.35, times: [0, 0.1, 0.9, 1] } 
                }}
              />
            </motion.div>
          )}
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
            className="absolute z-40 bg-[#2b2b2b]/95 backdrop-blur-2xl border border-white/5 rounded-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] p-3"
            style={{ 
              left: "50%", 
              top: "50%",
              transform: "translate(-50%, -50%)", 
              marginLeft: "95px",
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
                id="demo-watchman-logo"
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
            className="absolute z-50 w-64 bg-[#2b2b2b]/95 backdrop-blur-2xl border border-white/5 rounded-lg shadow-[0_0_40px_rgba(16,185,129,0.15)] py-1 text-[13px] font-sans text-white/90 select-none"
            style={{ left: menuPosition.x, top: menuPosition.y }}
            onContextMenu={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Open Dashboard</div>
            <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Open History</div>
            
            <div className="relative group" onMouseEnter={() => !isAnimating && setHoverState("view")} onMouseLeave={() => !isAnimating && setHoverState(null)}>
              <div className={`px-4 py-1.5 cursor-default mx-1 rounded flex justify-between items-center ${hoverState === "view" ? "bg-white/10" : "hover:bg-white/10"}`}>
                View
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={hoverState === "view" ? "opacity-100" : "opacity-50 group-hover:opacity-100"}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
              <div className={`absolute right-[100%] mr-1 top-[-4px] w-40 bg-[#2b2b2b]/95 backdrop-blur-2xl border border-white/5 rounded-lg shadow-[0_0_40px_rgba(16,185,129,0.15)] py-1 ${hoverState === "view" ? "block" : "hidden group-hover:block"}`}>
                <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Today</div>
                <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Last 7 Days</div>
                <div className="px-4 py-1.5 hover:bg-white/10 cursor-default mx-1 rounded">Monthly</div>
              </div>
            </div>
            
            <div className="relative group" onMouseEnter={() => !isAnimating && setHoverState("widget")} onMouseLeave={() => !isAnimating && setHoverState(null)}>
              <div className={`px-4 py-1.5 cursor-default mx-1 rounded flex justify-between items-center ${hoverState === "widget" ? "bg-white/10" : "hover:bg-white/10"}`}>
                Widget
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={hoverState === "widget" ? "opacity-100" : "opacity-50 group-hover:opacity-100"}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
              <div className={`absolute right-[100%] mr-1 top-[-4px] w-48 bg-[#2b2b2b]/95 backdrop-blur-2xl border border-white/5 rounded-lg shadow-[0_0_40px_rgba(16,185,129,0.15)] py-1 ${hoverState === "widget" ? "block" : "hidden group-hover:block"}`}>
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
            className="absolute z-50 w-64 bg-[#2b2b2b]/95 backdrop-blur-2xl border border-white/5 rounded-lg shadow-[0_0_40px_rgba(16,185,129,0.15)] py-1 text-[13px] font-sans text-white/90 select-none"
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
      
      {/* Fake Cursor for Demo */}
      <motion.div
        animate={{ 
          x: cursorPos.x, 
          y: cursorPos.y,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 175, 
          damping: 24, 
          mass: 0.5 
        }}
        className="absolute top-0 left-0 z-[99999] pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        style={{ originX: 0, originY: 0 }}
      >
        {/* Cursor Icon scaling down on click */}
        <motion.div
          animate={{ scale: cursorClick ? 0.7 : 1 }}
          transition={{ duration: 0.1 }}
          style={{ originX: 0.1, originY: 0.1 }}
        >
          <svg width="20" height="26" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 1.5L15.5 13.5H9.5L13.5 20.5L10.5 22L6.5 15L2.5 19V1.5Z" fill={cursorClick ? "#34d399" : "#10b981"} stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Expanding Click Ripple */}
        <AnimatePresence>
          {ripples.map((id) => (
            <motion.div
              key={id}
              className="absolute w-8 h-8 rounded-full border-[2.5px] border-emerald-400 pointer-events-none"
              style={{ top: -16, left: -14 }}
              initial={{ scale: 0.2, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onAnimationComplete={() => setRipples(r => r.filter(rid => rid !== id))}
            />
          ))}
        </AnimatePresence>

        {/* The Text Tail attached directly to the cursor */}
        <AnimatePresence mode="wait">
          {cursorText && (
            <motion.div
              key={cursorText}
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -10, transition: { duration: 0.1 } }}
              className="absolute left-6 top-6 bg-[#0a0a0a]/90 backdrop-blur-md text-emerald-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md font-sans whitespace-nowrap border border-emerald-500/30 shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-[999999]"
            >
              {cursorText}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Play Demo Button */}
      {!embedded ? (
        <button 
          id="demo-play-btn"
          onClick={startDemo}
          disabled={isAnimating}
          className="fixed top-6 right-6 z-50 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md font-sans text-sm backdrop-blur-md transition-colors disabled:opacity-50"
        >
          Play Interaction Demo
        </button>
      ) : (
        <button id="demo-play-btn" onClick={startDemo} className="hidden" />
      )}

    </div>
  );
}
