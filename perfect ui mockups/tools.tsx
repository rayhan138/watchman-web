"use client";

import { Settings, Moon, Minus, X, LayoutDashboard, BarChart2, AppWindow, Wifi, Wrench } from "lucide-react";

export default function ToolsMockup() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Nunito+Sans:wght@400;600;700;800;900&family=JetBrains+Mono:wght@700&display=swap');
        .watchman-app * { box-sizing: border-box; }
        .watchman-app {
          font-family: 'Inter', -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          font-weight: 600;
        }
        .watchman-numbers {
          font-family: 'Nunito Sans', 'Inter', sans-serif;
        }
        .watchman-mono {
          font-family: 'JetBrains Mono', monospace;
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

        {/* Tabs - TOOLS tab active */}
        <div className="flex items-center px-[12px] h-[48px] shrink-0 border-b border-[#121212] gap-[2px] text-[11px] font-[700] tracking-[0.5px] uppercase relative z-50 bg-transparent">
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <LayoutDashboard size={14} strokeWidth={1.5} />
            Dashboard
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <BarChart2 size={14} strokeWidth={1.5} /> Data
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <AppWindow size={14} strokeWidth={1.5} /> Apps
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <Wifi size={14} strokeWidth={1.5} /> Network
          </div>
          <div className="flex items-center gap-[5px] bg-black text-white px-[12px] py-[6px] rounded-full cursor-pointer">
            <Wrench size={14} strokeWidth={1.5} /> Tools
          </div>
        </div>

        {/* Main Content Area - TOOLS PANEL */}
        <div className="flex-1 overflow-y-auto p-[20px] pb-[32px] flex flex-col gap-[20px] relative z-10" style={{ scrollbarWidth: 'none' }}>
          
          {/* Troubleshooter Section */}
          <section className="w-full">
            <div className="flex flex-col p-[20px] border border-[#121212] rounded-[16px] bg-transparent h-[120px]">
              <div className="flex items-center justify-between">
                <span className="font-[800] text-[13px] uppercase tracking-[1px] text-[#111]">Network Troubleshooter</span>
                <button className="h-[28px] px-[16px] bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[11px] font-[800] uppercase tracking-[0.5px] rounded-[9999px] transition-colors border-none shadow-sm cursor-pointer">Run Diagnostics</button>
              </div>
              <div className="flex flex-col flex-1 justify-center items-center">
                <div className="text-[#333] text-[13px] italic font-[500]">
                  Click "Run Diagnostics" to check your network
                </div>
              </div>
            </div>
          </section>

          {/* Updates Section */}
          <section className="w-full">
            <div className="flex flex-col p-[20px] border border-[#121212] rounded-[16px] bg-transparent gap-[16px]">
              <div className="flex items-center justify-between">
                <span className="font-[800] text-[13px] uppercase tracking-[1px] text-[#111]">Updates</span>
                <button className="h-[28px] px-[16px] bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[11px] font-[800] uppercase tracking-[0.5px] rounded-[9999px] transition-colors border-none shadow-sm cursor-pointer">Check for Updates</button>
              </div>
              <div className="flex flex-col p-[16px] border border-[#121212] rounded-[12px] bg-transparent gap-[4px]">
                <div className="font-[800] text-[12px] uppercase tracking-[1px] text-[#111]">Watchman is up to date</div>
                <div className="text-[#333] text-[12px] font-[500]">Current version installed</div>
              </div>
            </div>
          </section>

          {/* Export Section */}
          <section className="w-full">
            <div className="flex flex-col p-[20px] border border-[#121212] rounded-[16px] bg-transparent gap-[16px]">
              <div className="flex items-center justify-between">
                <span className="font-[800] text-[13px] uppercase tracking-[1px] text-[#111]">Export CSV</span>
              </div>
              <div className="flex flex-col gap-[16px]">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-[700] uppercase tracking-[1px] text-[#111]">Format</label>
                  <span className="px-[16px] py-[6px] border border-[#121212] rounded-[9999px] bg-[#111] text-white text-[11px] font-[800] tracking-[0.5px]">CSV Only</span>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-[700] uppercase tracking-[1px] text-[#111]">Period</label>
                  <div className="relative">
                    <select className="min-w-[180px] h-[32px] px-[16px] pr-[32px] border border-[#121212] rounded-[9999px] bg-transparent text-[11px] font-[800] uppercase tracking-[0.5px] text-[#111] appearance-none outline-none cursor-pointer">
                      <option value="monthly" selected>Monthly</option>
                    </select>
                    <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 1L5 5L9 1" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-[700] uppercase tracking-[1px] text-[#111]">Year</label>
                  <div className="relative">
                    <select className="min-w-[180px] h-[32px] px-[16px] pr-[32px] border border-[#121212] rounded-[9999px] bg-transparent text-[11px] font-[800] uppercase tracking-[0.5px] text-[#111] appearance-none outline-none cursor-pointer">
                      <option value="2026" selected>2026</option>
                    </select>
                    <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 1L5 5L9 1" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="text-[12px] text-[#222] font-[500] mt-[2px]">
                  Export every saved month from the selected year.
                </div>
                <button className="h-[42px] mt-[4px] bg-[#111] hover:bg-[#000] text-white text-[13px] font-[800] uppercase tracking-[1px] rounded-[9999px] transition-colors border-none cursor-pointer w-full shadow-sm">Download CSV</button>
              </div>
            </div>
          </section>

        </div>

        {/* Status Bar / Footer */}
        <div className="h-[32px] shrink-0 border-t border-[#121212] flex items-center justify-between px-[16px] text-[10px] font-[700] text-[#333333] relative z-50 bg-transparent uppercase tracking-[1px]">
          <div className="flex items-center gap-[8px]">
             <div className="w-[8px] h-[8px] rounded-full bg-[#10b981] border border-[#10b981]"></div>
             <span className="pt-[1px]">Connected</span>
          </div>
          <span className="pt-[1px] watchman-mono">Uptime: 11H 59M</span>
        </div>
      </div>
    </>
  );
}
