"use client";

import { useState, useEffect } from "react";
import { Settings, Moon, Minus, X, LayoutDashboard, BarChart2, AppWindow, Wifi, Wrench } from "lucide-react";

export default function NetworkMockup({ isActive = true }: { isActive?: boolean }) {
  const [latency, setLatency] = useState(78);
  const [jitter, setJitter] = useState(11);
  const [uptimeMinutes, setUptimeMinutes] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(74 + Math.floor(Math.random() * 8));
      setJitter(9 + Math.floor(Math.random() * 4));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const uptimeInterval = setInterval(() => {
      setUptimeMinutes(prev => (prev + 1) % 60);
    }, 60000);
    return () => clearInterval(uptimeInterval);
  }, []);

  return (
    <>
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
        
        {/* Background Blobs */}
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none z-0" style={{ top: '-10%', left: '-20%', background: 'rgba(244, 114, 182, 0.5)' }}></div>
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none z-0" style={{ bottom: '-10%', right: '-20%', background: 'rgba(253, 224, 71, 0.4)' }}></div>
        <div className="absolute w-[250px] h-[250px] rounded-full blur-[120px] pointer-events-none z-0" style={{ top: '40%', left: '30%', background: 'rgba(251, 146, 60, 0.4)' }}></div>

        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 h-[48px] shrink-0 border-b border-[#121212] relative z-50 bg-transparent">
          <div className="flex items-center gap-[12px]">
            {/* Logo */}
            <div className="w-[22px] h-[22px] flex items-center justify-center relative top-[1px]">
              <img src="/watchman-logo.svg" alt="Watchman" className="w-full h-full object-contain block" />
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

        {/* Tabs - NETWORK tab active */}
        <div className="flex items-center px-[12px] h-[48px] shrink-0 border-b border-[#121212] gap-[2px] text-[11px] font-[700] tracking-[0.5px] uppercase relative z-50 bg-transparent">
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <LayoutDashboard size={14} strokeWidth={1.5} /> Dashboard
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <BarChart2 size={14} strokeWidth={1.5} /> Data
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <AppWindow size={14} strokeWidth={1.5} /> Apps
          </div>
          <div className="flex items-center gap-[5px] bg-black text-white px-[12px] py-[6px] rounded-full cursor-pointer">
            <Wifi size={14} strokeWidth={1.5} /> Network
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <Wrench size={14} strokeWidth={1.5} /> Tools
          </div>
        </div>

        {/* Main Content Area - NETWORK PANEL */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-[20px] pb-0 flex flex-col gap-[16px] relative z-10" style={{ scrollbarWidth: 'none' }}>
          
          {/* Connection Health Card */}
          <div className="flex items-center gap-[16px] p-[16px] px-[20px] border border-[#121212] rounded-[9999px] bg-transparent hover:bg-white/40 transition-colors">
            <div className="w-[32px] h-[32px] rounded-full bg-[#10b981] shrink-0"></div>
            <div className="flex flex-col gap-[1px]">
              <div className="text-[9px] font-[800] tracking-[1px] uppercase text-[#333]">CONNECTION HEALTH</div>
              <div className="text-[16px] font-[800] text-[#111]">Stable</div>
              <div className="text-[10px] text-[#333] watchman-mono mt-[2px] transition-all duration-300">{latency}ms avg · {jitter}ms jitter · 0% loss · Wired</div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-[10px]">
            <div className="border border-[#121212] rounded-[24px] p-[16px] text-center bg-transparent flex flex-col items-center gap-[6px] hover:bg-white/40 transition-colors">
              <div className="text-[10px] font-[800] uppercase tracking-[0.5px] text-[#333] whitespace-nowrap">LATENCY</div>
              <div className="watchman-numbers text-[26px] font-[800] tracking-[-0.3px] text-[#111] leading-[1] transition-all duration-300">{latency}ms</div>
              <div className="text-[10px] font-[700] text-[#333] mt-[2px]">5/5 Replies From 8.8.8.8</div>
            </div>
            <div className="border border-[#121212] rounded-[24px] p-[16px] text-center bg-transparent flex flex-col items-center gap-[6px] hover:bg-white/40 transition-colors">
              <div className="text-[10px] font-[800] uppercase tracking-[0.5px] text-[#333] whitespace-nowrap">JITTER</div>
              <div className="watchman-numbers text-[26px] font-[800] tracking-[-0.3px] text-[#111] leading-[1] transition-all duration-300">{jitter}ms</div>
              <div className="text-[10px] font-[700] text-[#333] mt-[2px] transition-all duration-300">Min {Math.max(1, latency - 11)}ms / Max {latency + 15}ms</div>
            </div>
            <div className="border border-[#121212] rounded-[24px] p-[16px] text-center bg-transparent flex flex-col items-center gap-[6px] hover:bg-white/40 transition-colors">
              <div className="text-[10px] font-[800] uppercase tracking-[0.5px] text-[#333] whitespace-nowrap">PACKET LOSS</div>
              <div className="watchman-numbers text-[26px] font-[800] tracking-[-0.3px] text-[#111] leading-[1]">0%</div>
              <div className="text-[10px] font-[700] text-[#333] mt-[2px]">0 Of 5 Lost</div>
            </div>
          </div>

          {/* Connection Card */}
          <div className="border border-[#121212] rounded-[24px] p-[16px] bg-transparent flex flex-col gap-[12px]">
            <div className="text-[12px] font-[800] uppercase tracking-[1px] text-[#111] mb-[4px]">CONNECTION</div>
            <div className="flex justify-between items-center gap-[16px]">
              <div className="flex-1 flex flex-col gap-[12px]">
                <div className="flex items-baseline justify-between gap-[14px] pb-[8px] border-b border-black/10">
                  <div className="text-[10px] font-[800] uppercase tracking-[0.7px] text-[#333]">TYPE</div>
                  <div className="text-[12px] font-[800] text-[#111] text-right">Ethernet</div>
                </div>
                <div className="flex items-baseline justify-between gap-[14px] pb-[8px] border-b border-black/10">
                  <div className="text-[10px] font-[800] uppercase tracking-[0.7px] text-[#333]">SSID / ADAPTER</div>
                  <div className="text-[12px] font-[800] text-[#111] text-right">Ethernet 3</div>
                </div>
                <div className="flex items-baseline justify-between gap-[14px] pb-[8px] border-b border-black/10">
                  <div className="text-[10px] font-[800] uppercase tracking-[0.7px] text-[#333]">LINK SPEED</div>
                  <div className="text-[12px] font-[800] text-[#111] text-right">1000 Mbps</div>
                </div>
                <div className="flex items-baseline justify-between gap-[14px]">
                  <div className="text-[10px] font-[800] uppercase tracking-[0.7px] text-[#333]">LOCAL IP</div>
                  <div className="text-[12px] font-[800] text-[#111] text-right">10.240.12.233</div>
                </div>
              </div>
              
              <div className="w-[120px] shrink-0 min-h-[92px] rounded-[16px] border border-black/10 bg-white/40 flex flex-col items-center justify-center gap-[10px] p-[12px]">
                <div className="flex items-end justify-center gap-[3px] h-[28px]">
                  {/* Wired Signal */}
                  <div className="flex items-center gap-[3px]">
                    <div className="w-[9px] h-[9px] rounded-full bg-[#10b981]"></div>
                    <div className="w-[28px] h-[3px] rounded-full bg-[#10b981]"></div>
                  </div>
                </div>
                <div className="text-[10px] font-[800] uppercase tracking-[0.7px] text-[#333] text-center">WIRED LINK</div>
              </div>
            </div>
          </div>

          {/* Speed Test Card */}
          <div className="border border-[#121212] rounded-[24px] p-[16px] bg-transparent flex flex-col gap-[14px] mb-[20px]">
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-[800] uppercase tracking-[1px] text-[#111]">SPEED TEST</span>
              <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-[800] text-[10px] uppercase px-[16px] py-[8px] rounded-[9999px] transition-colors">RUN TEST</button>
            </div>
            
            <div className="text-[10px] font-[700] text-[#333] leading-[1.4] -mt-[4px]">
              M-Lab may collect public IP and test data for internet research.
            </div>

            <div className="flex flex-col gap-[10px] mt-[4px]">
              <div className="flex justify-between items-center pb-[8px] border-b border-black/10">
                <span className="text-[10px] font-[800] uppercase tracking-[0.7px] text-[#333]">DOWNLOAD</span>
                <span className="watchman-mono text-[12px] font-[700] text-[#111]">18.4 Mbps (2.31 MB/s)</span>
              </div>
              <div className="flex justify-between items-center pb-[8px] border-b border-black/10">
                <span className="text-[10px] font-[800] uppercase tracking-[0.7px] text-[#333]">UPLOAD</span>
                <span className="watchman-mono text-[12px] font-[700] text-[#111]">25.5 Mbps (3.19 MB/s)</span>
              </div>
              <div className="flex justify-between items-center pb-[8px] border-b border-black/10">
                <span className="text-[10px] font-[800] uppercase tracking-[0.7px] text-[#333]">LATENCY</span>
                <span className="watchman-mono text-[12px] font-[700] text-[#111]">70ms</span>
              </div>
              <div className="flex justify-between items-center pb-[8px] border-b border-black/10">
                <span className="text-[10px] font-[800] uppercase tracking-[0.7px] text-[#333]">SERVER</span>
                <span className="watchman-mono text-[12px] font-[700] text-[#111]">New Delhi, IN · M-Lab NDT7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-[800] uppercase tracking-[0.7px] text-[#333]">LAST TESTED</span>
                <span className="watchman-mono text-[12px] font-[700] text-[#111]">5/30/2026, 6:16:08 PM</span>
              </div>
            </div>
          </div>

        </div>
        
        {/* Status Bar / Footer */}
        <div className="h-[32px] shrink-0 border-t border-[#121212] flex items-center justify-between px-[16px] text-[10px] font-[700] text-[#333333] relative z-50 bg-transparent uppercase tracking-[1px]">
          <div className="flex items-center gap-[8px]">
             <div className="w-[8px] h-[8px] rounded-full bg-[#10b981] border border-[#10b981]"></div>
             <span className="pt-[1px]">Connected</span>
          </div>
          <span className="pt-[1px] watchman-mono">Uptime: 11H {uptimeMinutes}M</span>
        </div>
      </div>
    </>
  );
}
