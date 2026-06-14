"use client";

import { Settings, Moon, Minus, X, LayoutDashboard, BarChart2, AppWindow, Wifi, Wrench } from "lucide-react";

export default function DataMockup() {
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

        {/* Tabs - DATA tab active */}
        <div className="flex items-center px-[12px] h-[48px] shrink-0 border-b border-[#121212] gap-[2px] text-[11px] font-[700] tracking-[0.5px] uppercase relative z-50 bg-transparent">
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <LayoutDashboard size={14} strokeWidth={1.5} />
            Dashboard
          </div>
          <div className="flex items-center gap-[5px] bg-black text-white px-[12px] py-[6px] rounded-full cursor-pointer">
            <BarChart2 size={14} strokeWidth={1.5} /> Data
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <AppWindow size={14} strokeWidth={1.5} /> Apps
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <Wifi size={14} strokeWidth={1.5} /> Network
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <Wrench size={14} strokeWidth={1.5} /> Tools
          </div>
        </div>

        {/* Main Content Area - DATA USAGE PANEL */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-[20px] flex flex-col gap-[16px] relative z-10" style={{ scrollbarWidth: 'none' }}>
          
          {/* Period Selector (.du-period-bar) */}
          <div className="flex gap-[4px] bg-transparent border border-[#121212] rounded-[9999px] p-[4px]">
            <button className="flex-1 py-[6px] rounded-[9999px] bg-black text-white text-[12px] font-[800] uppercase tracking-[0.5px]">Daily</button>
            <button className="flex-1 py-[6px] rounded-[9999px] bg-transparent text-[#333333] hover:bg-white/40 text-[12px] font-[800] uppercase tracking-[0.5px] transition-colors">Weekly</button>
            <button className="flex-1 py-[6px] rounded-[9999px] bg-transparent text-[#333333] hover:bg-white/40 text-[12px] font-[800] uppercase tracking-[0.5px] transition-colors">Monthly</button>
          </div>

          {/* Usage Summary Cards (.du-summary-row) */}
          <div className="grid grid-cols-3 gap-[6px]">
            <div className="border border-[#121212] rounded-[16px] p-[12px] text-center bg-transparent hover:-translate-y-[2px] hover:bg-white/40 transition-all">
              <div className="text-[9px] font-[800] uppercase tracking-[0.5px] text-[#333333] mb-[3px] whitespace-nowrap">Total Usage</div>
              <div className="watchman-numbers text-[18px] font-[800] tracking-[-0.3px]">1.25 GB</div>
            </div>
            <div className="border border-[#121212] rounded-[16px] p-[12px] text-center bg-transparent hover:-translate-y-[2px] hover:bg-white/40 transition-all">
              <div className="text-[9px] font-[800] uppercase tracking-[0.5px] text-[#333333] mb-[3px] whitespace-nowrap">↓ Download</div>
              <div className="watchman-numbers text-[18px] font-[800] tracking-[-0.3px]">804.66 MB</div>
            </div>
            <div className="border border-[#121212] rounded-[16px] p-[12px] text-center bg-transparent hover:-translate-y-[2px] hover:bg-white/40 transition-all">
              <div className="text-[9px] font-[800] uppercase tracking-[0.5px] text-[#333333] mb-[3px] whitespace-nowrap">↑ Upload</div>
              <div className="watchman-numbers text-[18px] font-[800] tracking-[-0.3px]">470.49 MB</div>
            </div>
          </div>

          {/* Usage Chart Section */}
          <div className="border border-[#121212] rounded-[24px] p-[16px] flex flex-col gap-[12px] bg-transparent">
            {/* Filter Buttons */}
            <div className="flex gap-[4px] justify-center border border-[#121212] rounded-[9999px] p-[4px] mx-auto w-full">
               <button className="flex-1 py-[6px] text-[10px] font-[700] uppercase tracking-[0.5px] rounded-[9999px] bg-transparent text-[#333333] hover:bg-white/40">Today</button>
               <button className="flex-1 py-[6px] text-[10px] font-[700] uppercase tracking-[0.5px] rounded-[9999px] bg-black text-white">Last 7 Days</button>
               <button className="flex-1 py-[6px] text-[10px] font-[700] uppercase tracking-[0.5px] rounded-[9999px] bg-transparent text-[#333333] hover:bg-white/40">Monthly</button>
               <button className="flex-1 py-[6px] text-[10px] font-[700] uppercase tracking-[0.5px] rounded-[9999px] bg-transparent text-[#333333] hover:bg-white/40">Yearly</button>
            </div>

            {/* Stats Row inside chart panel */}
            <div className="grid grid-cols-3 gap-[6px] mt-[4px]">
              <div className="border border-[#121212] rounded-[16px] p-[12px] text-center bg-transparent hover:-translate-y-[2px] hover:bg-white/40 transition-all">
                <div className="text-[9px] font-[800] uppercase tracking-[0.5px] text-[#333333] mb-[3px]">Total Traffic</div>
                <div className="watchman-numbers text-[18px] font-[800] tracking-[-0.3px]">56.54 GB</div>
              </div>
              <div className="border border-[#121212] rounded-[16px] p-[12px] text-center bg-transparent hover:-translate-y-[2px] hover:bg-white/40 transition-all">
                <div className="text-[9px] font-[800] uppercase tracking-[0.5px] text-[#333333] mb-[3px]">↓ Download</div>
                <div className="watchman-numbers text-[18px] font-[800] tracking-[-0.3px]">38.37 GB</div>
              </div>
              <div className="border border-[#121212] rounded-[16px] p-[12px] text-center bg-transparent hover:-translate-y-[2px] hover:bg-white/40 transition-all">
                <div className="text-[9px] font-[800] uppercase tracking-[0.5px] text-[#333333] mb-[3px]">↑ Upload</div>
                <div className="watchman-numbers text-[18px] font-[800] tracking-[-0.3px]">18.17 GB</div>
              </div>
            </div>

            {/* Date Range Label */}
            <div className="text-center mt-2">
              <span className="text-[12px] font-[700] text-black">May 27 - Jun 3, 2026</span>
            </div>

            {/* Chart Canvas Mockup - Stacked Bar Chart */}
            <div className="h-[180px] w-full mt-2 relative border border-[#121212] rounded-[16px] p-[12px] flex">
               
               {/* Y Axis Labels */}
               <div className="flex flex-col justify-between items-end h-full text-[9px] font-[600] text-[#9ca3af] pr-[8px] pb-[20px] w-[50px] shrink-0 border-r border-[#e5e7eb]">
                 <span>13.84 GB</span>
                 <span>11.18 GB</span>
                 <span>9.31 GB</span>
                 <span>7.45 GB</span>
                 <span>5.59 GB</span>
                 <span>3.73 GB</span>
                 <span>1.86 GB</span>
                 <span>0 B</span>
               </div>

               {/* Chart Area */}
               <div className="flex-1 h-full relative flex items-end justify-around pb-[20px] px-[10px]">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 left-0 right-[10px] top-[6px] bottom-[20px] flex flex-col justify-between pointer-events-none z-0">
                    <div className="border-t border-black/5 w-full"></div>
                    <div className="border-t border-black/5 w-full"></div>
                    <div className="border-t border-black/5 w-full"></div>
                    <div className="border-t border-black/5 w-full"></div>
                    <div className="border-t border-black/5 w-full"></div>
                    <div className="border-t border-black/5 w-full"></div>
                    <div className="border-t border-black/5 w-full"></div>
                    <div className="border-t border-black/10 w-full"></div>
                  </div>
                  
                  {/* Bars & X Labels */}
                  {[
                    { label: 'Jun 3', light: '15%', dark: '5%', up: '470.49 MB', down: '804.66 MB', total: '1.25 GB' },
                    { label: 'Jun 2', light: '22%', dark: '48%', up: '2.25 GB', down: '7.50 GB', total: '9.75 GB' },
                    { label: 'Jun 1', light: '12%', dark: '55%', up: '1.50 GB', down: '6.00 GB', total: '7.50 GB' },
                    { label: 'May 31', light: '26%', dark: '30%', up: '3.00 GB', down: '4.69 GB', total: '7.69 GB' },
                    { label: 'May 30', light: '48%', dark: '40%', up: '6.72 GB', down: '6.17 GB', total: '12.89 GB' },
                    { label: 'May 29', light: '30%', dark: '50%', up: '4.00 GB', down: '7.00 GB', total: '11.00 GB' },
                    { label: 'May 28', light: '10%', dark: '25%', up: '468.48 MB', down: '4.43 GB', total: '4.89 GB' },
                  ].map((bar, i) => {
                    const isRightSide = i >= 4; // Show tooltip on the left side for the rightmost bars
                    
                    return (
                      <div key={i} className="flex flex-col items-center h-full justify-end relative z-10 hover:z-50 group w-[32px]">
                        
                        {/* Tooltip */}
                        <div className={`absolute top-1/2 -translate-y-1/2 ${isRightSide ? 'right-[calc(100%+8px)]' : 'left-[calc(100%+8px)]'} opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 pointer-events-none bg-[#1c1c1c] rounded-[8px] p-[10px] shadow-2xl border border-white/10 w-[140px]`}>
                          {/* Pointer Arrow */}
                          <div className={`absolute top-1/2 -translate-y-1/2 ${isRightSide ? '-right-[5px] border-[5px] border-transparent border-l-[#1c1c1c]' : '-left-[5px] border-[5px] border-transparent border-r-[#1c1c1c]'}`}></div>
                          
                          <div className="text-white text-[11px] font-[700] mb-[6px]">{bar.label}</div>
                          
                          <div className="flex items-center gap-[6px] mb-[4px]">
                            <div className="w-[8px] h-[8px] bg-[#60a5fa] rounded-[1px]"></div>
                            <span className="text-white/80 text-[10px] font-[500]">Upload: {bar.up}</span>
                          </div>
                          
                          <div className="flex items-center gap-[6px] mb-[8px]">
                            <div className="w-[8px] h-[8px] bg-[#1e3a8a] rounded-[1px]"></div>
                            <span className="text-white/80 text-[10px] font-[500]">Download: {bar.down}</span>
                          </div>
                          
                          <div className="text-white text-[11px] font-[700] pt-[6px] border-t border-white/10">Total: {bar.total}</div>
                        </div>

                        {/* Bar */}
                        <div className="w-full flex flex-col justify-end h-full cursor-pointer hover:brightness-110 transition-all">
                          <div className="w-full bg-[#1e3a8a] transition-all duration-300" style={{ height: bar.dark }}></div>
                          <div className="w-full bg-[#60a5fa] transition-all duration-300" style={{ height: bar.light }}></div>
                        </div>
                        <span className="absolute -bottom-[16px] text-[9px] font-[600] text-[#9ca3af] whitespace-nowrap">{bar.label}</span>
                      </div>
                    );
                  })}
               </div>
            </div>
          </div>

          {/* Comparison Card */}
          <div className="border border-[#121212] rounded-[16px] p-[16px] bg-transparent flex flex-col gap-[4px] hover:bg-white/40 transition-colors">
            <div className="text-[9px] font-[800] uppercase tracking-[1px] text-[#333333]">VS PREVIOUS PERIOD</div>
            <div className="text-[24px] font-[800] text-[#10b981] watchman-numbers tracking-[-0.5px]">↓ 87.2%</div>
            <div className="text-[10px] font-[600] text-[#333333] mt-[2px]">Current: 1.25 GB / Previous: 9.75 GB</div>
          </div>

          {/* Data Limit Card */}
          <div className="border border-[#121212] rounded-[24px] p-[16px] bg-transparent flex flex-col gap-[12px]">
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-[800] uppercase tracking-[1px]">DATA LIMIT</span>
              <span className="text-[11px] font-[600] text-[#333333]">No limit set</span>
            </div>
            
            <div className="flex items-center gap-[10px]">
              <div className="flex-1 h-[8px] rounded-[4px] bg-[#e5e7eb] overflow-hidden">
                <div className="h-full bg-[#3b82f6] rounded-[4px]" style={{ width: '0%' }}></div>
              </div>
              <span className="text-[11px] font-[700] watchman-mono text-right min-w-[36px] text-[#333333]">0%</span>
            </div>
            
            <div className="flex gap-[8px] items-center mt-1">
              <input type="text" placeholder="Limit in GB" className="flex-1 px-[10px] py-[8px] border border-[#121212] rounded-[8px] bg-transparent text-black watchman-mono text-[12px] outline-none" />
              <button className="bg-[#3b82f6] text-white font-[800] text-[11px] uppercase px-[16px] py-[9px] rounded-[8px] hover:bg-[#2563eb] transition-colors">SET LIMIT</button>
            </div>
          </div>

        </div>
        
        {/* Status Bar / Footer (Sibling to content, flex-shrink-0) */}
        <div className="h-[32px] shrink-0 border-t border-[#121212] flex items-center justify-between px-[16px] text-[10px] font-[700] text-[#333333] relative z-50 bg-transparent uppercase tracking-[1px]">
          <div className="flex items-center gap-[8px]">
             <div className="w-[8px] h-[8px] rounded-full bg-[#10b981] border border-[#10b981]"></div>
             <span className="pt-[1px]">Connected</span>
          </div>
          <span className="pt-[1px] watchman-mono">Uptime: 7H 42M</span>
        </div>
      </div>
    </>
  );
}
