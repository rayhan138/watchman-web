"use client";

import { useState, useEffect } from "react";
import { Settings, Moon, Minus, X, LayoutDashboard, BarChart2, AppWindow, Wifi, Wrench, ArrowDown, ArrowUp } from "lucide-react";

export default function DashboardMockup({ isActive = true }: { isActive?: boolean }) {
  const [downloadSpeed, setDownloadSpeed] = useState("1.5");
  const [uploadSpeed, setUploadSpeed] = useState("0.1");
  const [cpu, setCpu] = useState(8);
  const [ram, setRam] = useState(67);
  const [gpu, setGpu] = useState(9);
  const [uptimeMinutes, setUptimeMinutes] = useState(35);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuate download speed (1.2 to 8.5 KB/s)
      setDownloadSpeed((Math.random() * 7.3 + 1.2).toFixed(1));
      
      // Randomly fluctuate upload speed (0.1 to 2.4 KB/s)
      setUploadSpeed((Math.random() * 2.3 + 0.1).toFixed(1));
      
      // Fluctuate CPU (4% to 18%)
      setCpu(Math.floor(Math.random() * 14) + 4);
      
      // Fluctuate RAM (65% to 69%)
      setRam(Math.floor(Math.random() * 4) + 65);
      
      // Fluctuate GPU (2% to 15%)
      setGpu(Math.floor(Math.random() * 13) + 2);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Update uptime every minute
  useEffect(() => {
    const uptimeInterval = setInterval(() => {
      setUptimeMinutes(prev => (prev + 1) % 60);
    }, 60000);
    return () => clearInterval(uptimeInterval);
  }, []);

  return (
    <>
      {/* Import the exact fonts the app uses */}
      <style dangerouslySetInnerHTML={{__html: `
        .watchman-app * { box-sizing: border-box; }
        .watchman-app {
          font-family: var(--font-inter), -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          font-weight: 600;
        }
        .watchman-numbers {
          font-family: var(--font-nunito-sans), var(--font-inter), sans-serif;
          font-variant-numeric: tabular-nums;
        }
        .watchman-mono {
          font-family: var(--font-jetbrains-mono), monospace;
        }
      `}} />

      <div className="watchman-app w-[522px] h-[782px] bg-white border border-[#121212] shadow-2xl flex flex-col text-black overflow-hidden relative select-none shrink-0" style={{ borderRadius: '10px' }}>
        
        {/* Background Blobs (Exactly from their CSS) */}
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none z-0" style={{ top: '-10%', left: '-20%', background: 'rgba(244, 114, 182, 0.5)' }}></div>
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none z-0" style={{ bottom: '-10%', right: '-20%', background: 'rgba(253, 224, 71, 0.4)' }}></div>
        <div className="absolute w-[250px] h-[250px] rounded-full blur-[120px] pointer-events-none z-0" style={{ top: '40%', left: '30%', background: 'rgba(251, 146, 60, 0.4)' }}></div>

        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 h-[48px] shrink-0 border-b border-[#121212] relative z-50 bg-transparent">
          <div className="flex items-center gap-[12px]">
            {/* Logo */}
            <div className="w-[22px] h-[22px] flex items-center justify-center">
              <img src="/watchman-logo.svg" alt="Watchman" className="w-[22px] h-[22px] object-contain block" />
            </div>
            <span className="font-[700] tracking-[2px] text-[14px] uppercase mt-[1px]">Watchman</span>
          </div>
          <div className="flex items-center gap-[4px] text-black">
            <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:border hover:border-[#121212] cursor-pointer"><Settings size={14} strokeWidth={1.5} /></div>
            <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:border hover:border-[#121212] cursor-pointer"><Moon size={14} strokeWidth={1.5} /></div>
            <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:border hover:border-[#121212] cursor-pointer"><Minus size={14} strokeWidth={1.5} /></div>
            <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:border hover:border-[#121212] cursor-pointer"><X size={14} strokeWidth={1.5} /></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center px-[12px] h-[48px] shrink-0 border-b border-[#121212] gap-[2px] text-[11px] font-[700] tracking-[0.5px] uppercase relative z-50 bg-transparent">
          <div className="flex items-center gap-[5px] bg-black text-white px-[12px] py-[6px] rounded-full cursor-pointer">
            <LayoutDashboard size={14} strokeWidth={1.5} />
            Dashboard
          </div>
          <div className="flex items-center gap-[5px] text-[#121212] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <BarChart2 size={14} strokeWidth={1.5} /> Data
          </div>
          <div className="flex items-center gap-[5px] text-[#121212] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <AppWindow size={14} strokeWidth={1.5} /> Apps
          </div>
          <div className="flex items-center gap-[5px] text-[#121212] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <Wifi size={14} strokeWidth={1.5} /> Network
          </div>
          <div className="flex items-center gap-[5px] text-[#121212] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <Wrench size={14} strokeWidth={1.5} /> Tools
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-[20px] flex flex-col gap-[16px] relative z-10" style={{ scrollbarWidth: 'none' }}>
          
          {/* Speed Cards (Download / Upload) */}
          <div className="flex flex-col gap-[12px]">
            {/* DOWNLOAD */}
            <div className="rounded-[9999px] border border-[#121212] flex items-center justify-between px-[20px] py-[14px] bg-transparent hover:-translate-y-[2px] hover:bg-white/40 transition-all cursor-default">
              <div className="flex items-center gap-[14px]">
                <span className="text-[24px] font-[700] text-[#1d4ed8]">↓</span>
                <span className="font-[800] text-[13px] uppercase tracking-[1px]">Download</span>
              </div>
              <div className="flex items-baseline gap-[6px] transition-all duration-300">
                <span className="watchman-numbers text-[36px] font-[800] tracking-[-1px] leading-none w-[70px] text-right">{downloadSpeed}</span>
                <span className="font-[700] text-[14px] text-[#121212]">KB/s</span>
              </div>
            </div>

            {/* UPLOAD */}
            <div className="rounded-[9999px] border border-[#121212] flex items-center justify-between px-[20px] py-[14px] bg-transparent hover:-translate-y-[2px] hover:bg-white/40 transition-all cursor-default">
              <div className="flex items-center gap-[14px]">
                <span className="text-[24px] font-[700] text-[#f97316]">↑</span>
                <span className="font-[800] text-[13px] uppercase tracking-[1px]">Upload</span>
              </div>
              <div className="flex items-baseline gap-[6px] transition-all duration-300">
                <span className="watchman-numbers text-[36px] font-[800] tracking-[-1px] leading-none w-[70px] text-right">{uploadSpeed}</span>
                <span className="font-[700] text-[14px] text-[#121212]">KB/s</span>
              </div>
            </div>
          </div>

          {/* CURRENT SESSION */}
          <div className="rounded-[24px] border border-[#121212] p-[14px] px-[18px] pb-[15px]" style={{ background: 'linear-gradient(135deg, rgba(255, 247, 237, 0.78), rgba(255, 255, 255, 0.9))' }}>
            <div className="flex justify-between items-center mb-[13px]">
              <div className="flex flex-col gap-[3px]">
                <span className="font-[900] text-[13px] tracking-[1.2px] uppercase">Current Session</span>
                <span className="text-[10px] text-[#121212] font-[700]">Since app opened or last reset</span>
              </div>
              <div className="bg-black text-white text-[10px] font-[900] tracking-[0.5px] uppercase px-[13px] py-[9px] rounded-full leading-none cursor-pointer hover:bg-[#1d4ed8] hover:border-[#1d4ed8] transition-colors border border-[#121212]">
                Reset Session
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-[9px]">
              <div className="border-t border-black/5 pt-[10px] flex flex-col gap-[4px]">
                <span className="text-[9px] font-[900] tracking-[0.8px] uppercase text-[#121212]">Download</span>
                <span className="watchman-numbers text-[24px] font-[900] tracking-[-0.6px] leading-none">3.39 GB</span>
              </div>
              <div className="border-t border-black/5 pt-[10px] flex flex-col gap-[4px]">
                <span className="text-[9px] font-[900] tracking-[0.8px] uppercase text-[#121212]">Upload</span>
                <span className="watchman-numbers text-[24px] font-[900] tracking-[-0.6px] leading-none">549.56 MB</span>
              </div>
              <div className="border-t border-black/5 pt-[10px] flex flex-col gap-[4px]">
                <span className="text-[9px] font-[900] tracking-[0.8px] uppercase text-[#121212]">Total</span>
                <span className="watchman-numbers text-[24px] font-[900] tracking-[-0.6px] leading-none text-[#1d4ed8]">3.93 GB</span>
              </div>
            </div>
          </div>

          {/* USAGE SNAPSHOT */}
          <div className="rounded-[24px] border border-[#121212] p-[16px] px-[18px] pb-[14px]" style={{ background: 'linear-gradient(135deg, rgba(255, 247, 237, 0.82), rgba(255, 255, 255, 0.92))' }}>
            <div className="flex justify-between items-center gap-[12px] mb-[14px]">
              <span className="font-[800] text-[13px] tracking-[1.2px] uppercase">Usage Snapshot</span>
              <div className="border border-black/20 text-black text-[11px] font-[700] px-[12px] py-[7px] rounded-[999px] bg-[rgba(255,245,238,0.95)] cursor-pointer leading-none hover:bg-[rgba(255,237,223,0.96)] transition-all">
                Today
              </div>
            </div>
            <div className="grid grid-cols-3 gap-[6px] mb-[6px]">
              <div className="flex flex-col">
                <span className="text-[9px] font-[800] tracking-[0.5px] uppercase text-[#121212] mb-[3px]">Total</span>
                <span className="watchman-numbers font-[800] text-[24px] tracking-[-0.5px] leading-none">6.97 GB</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-[800] tracking-[0.5px] uppercase text-[#121212] mb-[3px]">↓ Download</span>
                <span className="watchman-numbers font-[800] text-[24px] tracking-[-0.5px] leading-none">4.88 GB</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-[800] tracking-[0.5px] uppercase text-[#121212] mb-[3px]">↑ Upload</span>
                <span className="watchman-numbers font-[800] text-[24px] tracking-[-0.5px] leading-none">2.09 GB</span>
              </div>
            </div>
            <div className="text-[10px] font-[700] text-[#121212] mt-2">Updated just now</div>
          </div>

          {/* NORMAL STATUS */}
          <div className="rounded-full border border-[#121212] flex items-center px-[20px] py-[12px] gap-[16px] bg-transparent">
            <div className="w-[20px] h-[20px] rounded-full bg-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.5)] shrink-0 transition-opacity duration-1000" style={{ opacity: cpu > 15 ? 0.5 : 1 }}></div>
            <div className="flex flex-col gap-[2px]">
              <span className="font-[800] text-[14px] tracking-[1px] uppercase leading-none mt-1">Normal</span>
              <span className="text-[10px] text-[#121212] leading-none mb-1">Network usage is within normal range</span>
            </div>
          </div>

          {/* HARDWARE DIALS */}
          <div className="grid grid-cols-3 gap-[10px]">
            {/* CPU */}
            <div className="rounded-[24px] border border-[#121212] py-[16px] px-[10px] flex flex-col items-center text-center bg-transparent hover:bg-white/40 hover:-translate-y-[2px] transition-all">
              <div className="w-[56px] h-[56px] rounded-full border border-[#121212] flex items-center justify-center mb-[10px] relative overflow-hidden shrink-0">
                 <div className="absolute bottom-0 left-0 right-0 h-full origin-bottom transition-transform duration-1000 ease-out will-change-transform" style={{ transform: `scaleY(${cpu / 100})`, background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.10) 100%)' }}></div>
                 <div className="relative z-10 flex items-center transition-all duration-300">
                    <span className="watchman-numbers font-[800] text-[22px] tracking-[-0.5px] w-[26px]">{cpu}</span>
                    <span className="font-[700] text-[12px]">%</span>
                 </div>
              </div>
              <div className="font-[800] text-[13px] uppercase tracking-[1px] mb-[2px]">CPU</div>
              <div className="font-[700] text-[10px] text-[#121212]">12 cores</div>
            </div>
            
            {/* RAM */}
            <div className="rounded-[24px] border border-[#121212] py-[16px] px-[10px] flex flex-col items-center text-center bg-transparent hover:bg-white/40 hover:-translate-y-[2px] transition-all">
              <div className="w-[56px] h-[56px] rounded-full border border-[#121212] flex items-center justify-center mb-[10px] relative overflow-hidden shrink-0">
                 <div className="absolute bottom-0 left-0 right-0 h-full origin-bottom transition-transform duration-1000 ease-out will-change-transform" style={{ transform: `scaleY(${ram / 100})`, background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.15) 100%)' }}></div>
                 <div className="relative z-10 flex items-center transition-all duration-300">
                    <span className="watchman-numbers font-[800] text-[22px] tracking-[-0.5px] w-[26px]">{ram}</span>
                    <span className="font-[700] text-[12px]">%</span>
                 </div>
              </div>
              <div className="font-[800] text-[13px] uppercase tracking-[1px] mb-[2px]">RAM</div>
              <div className="font-[700] text-[10px] text-[#121212]">{(ram * 0.139).toFixed(1)} / 13.9 GB</div>
            </div>
            
            {/* GPU */}
            <div className="rounded-[24px] border border-[#121212] py-[16px] px-[10px] flex flex-col items-center text-center bg-transparent hover:bg-white/40 hover:-translate-y-[2px] transition-all">
              <div className="w-[56px] h-[56px] rounded-full border border-[#121212] flex items-center justify-center mb-[10px] relative overflow-hidden shrink-0">
                 <div className="absolute bottom-0 left-0 right-0 h-full origin-bottom transition-transform duration-1000 ease-out will-change-transform" style={{ transform: `scaleY(${gpu / 100})`, background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.20) 100%)' }}></div>
                 <div className="relative z-10 flex items-center transition-all duration-300">
                    <span className="watchman-numbers font-[800] text-[22px] tracking-[-0.5px] w-[26px]">{gpu}</span>
                    <span className="font-[700] text-[12px]">%</span>
                 </div>
              </div>
              <div className="font-[800] text-[13px] uppercase tracking-[1px] mb-[2px]">GPU</div>
              <div className="font-[700] text-[10px] text-[#121212]">3D</div>
            </div>
          </div>
          
          {/* EXPANDABLE DETAILS */}
          <div className="flex flex-col gap-[10px]">
            {/* Network Details */}
            <div className="rounded-[9999px] border border-[#121212] overflow-hidden bg-transparent">
              <div className="flex items-center gap-[12px] w-full px-[20px] py-[14px] min-h-[56px] cursor-pointer hover:bg-white/40 transition-colors">
                <span className="text-[14px] font-[600] shrink-0">→</span>
                <span className="flex-1 text-left font-[800] text-[13px] uppercase tracking-[1px] text-black">Network Details</span>
              </div>
            </div>
            
            {/* System Information */}
            <div className="rounded-[9999px] border border-[#121212] overflow-hidden bg-transparent">
              <div className="flex items-center gap-[12px] w-full px-[20px] py-[14px] min-h-[56px] cursor-pointer hover:bg-white/40 transition-colors">
                <span className="text-[14px] font-[600] shrink-0">→</span>
                <span className="flex-1 text-left font-[800] text-[13px] uppercase tracking-[1px] text-black">System Information</span>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Status Bar / Footer (Sibling to content, flex-shrink-0) */}
        <div className="h-[32px] shrink-0 border-t border-[#121212] flex items-center justify-between px-[16px] text-[10px] font-[700] text-[#121212] relative z-50 bg-transparent uppercase tracking-[1px]">
          <div className="flex items-center gap-[8px]">
             <div className="w-[8px] h-[8px] rounded-full bg-[#10b981] border border-[#10b981]"></div>
             <span className="pt-[1px]">Connected</span>
          </div>
          <span className="pt-[1px] watchman-mono">Uptime: 7H {uptimeMinutes}M</span>
        </div>
      </div>
    </>
  );
}
