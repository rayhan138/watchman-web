"use client";

import { useState, useEffect } from "react";
import { Settings, Moon, Minus, X, LayoutDashboard, BarChart2, AppWindow, Wifi, Wrench, Activity } from "lucide-react";

const formatKB = (kb: number) => kb >= 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${Math.floor(kb)} KB`;

export default function AppsMockup() {
  const [codex, setCodex] = useState({ down: 303, up: 2430, downRate: 2.1, upRate: 5.2, conns: 4 });
  const [discord, setDiscord] = useState({ down: 650, up: 900, downRate: 0.05, upRate: 0, conns: 5 });
  const [msedge, setMsedge] = useState({ down: 15550, up: 2290, downRate: 0.02, upRate: 0.03, conns: 8 });
  const [totalApps, setTotalApps] = useState(33);
  const [uptimeMinutes, setUptimeMinutes] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      setCodex(prev => {
        const newDownRate = Math.random() * 4.5 + 0.5;
        const newUpRate = Math.random() * 1.5 + 0.1;
        return {
          ...prev,
          downRate: newDownRate,
          upRate: newUpRate,
          down: prev.down + newDownRate,
          up: prev.up + newUpRate,
          conns: Math.random() > 0.8 ? (prev.conns === 4 ? 5 : 4) : prev.conns
        };
      });

      setDiscord(prev => {
        const newDownRate = Math.random() * 0.1;
        return {
          ...prev,
          downRate: newDownRate,
          down: prev.down + newDownRate,
        };
      });

      setMsedge(prev => {
        const newDownRate = Math.random() * 0.05;
        const newUpRate = Math.random() * 0.05;
        return {
          ...prev,
          downRate: newDownRate,
          upRate: newUpRate,
          down: prev.down + newDownRate,
          up: prev.up + newUpRate,
          conns: Math.random() > 0.9 ? (prev.conns === 8 ? 9 : 8) : prev.conns
        };
      });
      
      if (Math.random() > 0.95) setTotalApps(prev => prev === 33 ? 34 : 33);
    }, 1000);
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
        
        .speed-inactive {
          color: #9ca3af;
          font-weight: 500;
        }
        .speed-active-down {
          color: #3b82f6;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(59, 130, 246, 0.35);
        }
        .speed-active-up {
          color: #10b981;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(16, 185, 129, 0.35);
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

        {/* Tabs - APPS tab active */}
        <div className="flex items-center px-[12px] h-[48px] shrink-0 border-b border-[#121212] gap-[2px] text-[11px] font-[700] tracking-[0.5px] uppercase relative z-50 bg-transparent">
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <LayoutDashboard size={14} strokeWidth={1.5} />
            Dashboard
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <BarChart2 size={14} strokeWidth={1.5} /> Data
          </div>
          <div className="flex items-center gap-[5px] bg-black text-white px-[12px] py-[6px] rounded-full cursor-pointer">
            <AppWindow size={14} strokeWidth={1.5} /> Apps
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <Wifi size={14} strokeWidth={1.5} /> Network
          </div>
          <div className="flex items-center gap-[5px] text-[#333333] px-[12px] py-[6px] rounded-full cursor-pointer hover:bg-white/40 hover:text-black">
            <Wrench size={14} strokeWidth={1.5} /> Tools
          </div>
        </div>

        {/* Main Content Area - APPS PANEL */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-[20px] pb-0 flex flex-col gap-[16px] relative z-10" style={{ scrollbarWidth: 'none' }}>
          
          {/* Header Row */}
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-col min-w-0 gap-[2px]">
              <span className="font-[800] text-[14px] uppercase tracking-[1px] text-[#111]">
                APP NETWORK ACTIVITY
              </span>
              <span className="text-[12px] font-[600] text-[#333]">
                Live now and recent background traffic stay listed here for this session.
              </span>
            </div>
            <div className="flex items-center gap-[8px]">
              <button className="flex-1 flex items-center justify-center gap-[8px] min-h-[32px] border border-[#121212] rounded-[9999px] bg-transparent text-black text-[11px] font-[700] hover:bg-white/40 transition-all">
                <BarChart2 size={14} strokeWidth={2} />
                Usage by App
              </button>
              <div className="w-[28px] h-[28px] shrink-0 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-[800] transition-all duration-300">
                {totalApps}
              </div>
            </div>
          </div>

          {/* Table Wrapper */}
          <div className="border border-[#121212] rounded-[16px] bg-transparent mb-[20px] relative overflow-hidden flex flex-col">
            <div className="overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              <table className="w-full border-separate border-spacing-0 text-[11px] table-fixed">
                <thead className="sticky top-0 z-20 shadow-[0_1px_0_#121212]">
                  <tr>
                    <th className="text-left py-[10px] pl-[58px] pr-[16px] text-[10px] font-[700] uppercase tracking-[1px] text-[#333] border-b border-[#121212] w-[46%] bg-[#f9fafb] backdrop-blur-md rounded-tl-[15px]">APPLICATION</th>
                    <th className="text-left py-[10px] px-[10px] text-[10px] font-[700] uppercase tracking-[1px] text-[#333] border-b border-[#121212] w-[20%] bg-[#f9fafb] backdrop-blur-md">↓ DOWN</th>
                    <th className="text-left py-[10px] px-[10px] text-[10px] font-[700] uppercase tracking-[1px] text-[#333] border-b border-[#121212] w-[20%] bg-[#f9fafb] backdrop-blur-md">↑ UP</th>
                    <th className="text-right py-[10px] pl-[10px] pr-[24px] text-[10px] font-[700] uppercase tracking-[1px] text-[#333] border-b border-[#121212] w-[14%] bg-[#f9fafb] backdrop-blur-md rounded-tr-[15px]">CONNS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Codex", icon: "C", status: "LIVE", active: "Last active now", down: formatKB(codex.down), downRate: `${codex.downRate.toFixed(1)} KB/s`, up: formatKB(codex.up), upRate: `${codex.upRate.toFixed(1)} KB/s`, conns: codex.conns, isHigh: false },
                    { name: "Discord", icon: "D", status: "LIVE", active: "Last active now", down: formatKB(discord.down), downRate: `${(discord.downRate * 1024).toFixed(1)} B/s`, up: formatKB(discord.up), upRate: `${(discord.upRate * 1024).toFixed(1)} B/s`, conns: discord.conns, isHigh: false },
                    { name: "msedge", icon: "M", status: "LIVE", active: "Last active 17m ago", down: formatKB(msedge.down), downRate: `${(msedge.downRate * 1024).toFixed(1)} B/s`, up: formatKB(msedge.up), upRate: `${(msedge.upRate * 1024).toFixed(1)} B/s`, conns: msedge.conns, isHigh: true },
                    { name: "codex", icon: "C", status: "LIVE", active: "Last active 17m ago", down: "3.34 MB", downRate: "15.3 KB/s", up: "85.40 MB", upRate: "11.8 KB/s", conns: 2, isHigh: false },
                    { name: "msedgewebview2", icon: "M", status: "BACKGROUND", active: "Last active now", down: "64 KB", downRate: "0.0 B/s", up: "37 KB", upRate: "0.0 B/s", conns: 1, isHigh: false },
                    { name: "Code", icon: "C", status: "BACKGROUND", active: "Last active 8s ago", down: "4.83 MB", downRate: "0.0 B/s", up: "2.40 MB", upRate: "0.0 B/s", conns: 2, isHigh: false },
                    { name: "svchost.exe", icon: "S", status: "BACKGROUND", active: "Last active 34s ago", down: "39 KB", downRate: "0.0 B/s", up: "77 KB", upRate: "0.0 B/s", conns: 36, isHigh: false },
                    { name: "MpDefenderCore...", icon: "M", status: "BACKGROUND", active: "Last active 1m ago", down: "19 KB", downRate: "0.0 B/s", up: "9 KB", upRate: "0.0 B/s", conns: 0, isHigh: false },
                    { name: "explorer", icon: "E", status: "BACKGROUND", active: "Last active 2m ago", down: "680 KB", downRate: "0.0 B/s", up: "124 KB", upRate: "0.0 B/s", conns: 5, isHigh: false },
                    { name: "IDMan", icon: "I", status: "BACKGROUND", active: "Last active 2m ago", down: "606 KB", downRate: "0.0 B/s", up: "39 KB", upRate: "0.0 B/s", conns: 0, isHigh: false },
                    // DUPLICATED ROWS TO DEMONSTRATE SCROLLING
                    { name: "SpotifyLauncher", icon: "S", status: "BACKGROUND", active: "Last active 3m ago", down: "6 KB", downRate: "0.0 B/s", up: "9 KB", upRate: "0.0 B/s", conns: 0, isHigh: false },
                    { name: "SearchApp", icon: "S", status: "BACKGROUND", active: "Last active 5m ago", down: "1.2 MB", downRate: "0.0 B/s", up: "230 KB", upRate: "0.0 B/s", conns: 1, isHigh: false },
                    { name: "System", icon: "S", status: "BACKGROUND", active: "Last active 12m ago", down: "14 MB", downRate: "0.0 B/s", up: "8 MB", upRate: "0.0 B/s", conns: 12, isHigh: false },
                    { name: "Code", icon: "C", status: "BACKGROUND", active: "Last active 20m ago", down: "800 KB", downRate: "0.0 B/s", up: "1.2 MB", upRate: "0.0 B/s", conns: 3, isHigh: false },
                  ].map((app, i) => (
                  <tr key={i} className={`group hover:bg-white/40 transition-colors ${app.isHigh ? 'bg-red-500/10' : (i % 2 === 0 ? '' : 'bg-white/30')}`}>
                    <td className="py-[12px] px-[16px] border-b border-black/5 group-last:border-none">
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[30px] h-[30px] rounded-[6px] bg-black/5 flex items-center justify-center text-[12px] font-[800] text-black shrink-0 border border-black/10">
                          {app.icon}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-[8px] min-w-0 mb-[2px]">
                            <span className="font-[600] text-[13px] text-[#222] truncate">{app.name}</span>
                            <span className={`inline-flex items-center justify-center px-[8px] py-[2px] rounded-[9999px] text-[9px] font-[800] uppercase tracking-[0.5px] border ${app.status === 'LIVE' ? 'text-blue-700 bg-blue-500/10 border-blue-500/20' : 'text-emerald-700 bg-emerald-500/10 border-emerald-500/20'}`}>
                              {app.status}
                            </span>
                          </div>
                          <span className="text-[10px] font-[600] text-[#666]">{app.active}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-[12px] px-[10px] border-b border-black/5 group-last:border-none align-middle">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-[700] text-[#111] whitespace-nowrap leading-[1.2] transition-all duration-300">{app.down}</span>
                        <span className={`watchman-mono text-[10px] whitespace-nowrap leading-[1.2] mt-[2px] transition-all duration-300 ${app.downRate !== '0.0 B/s' ? 'speed-active-down' : 'speed-inactive'}`}>{app.downRate}</span>
                      </div>
                    </td>
                    <td className="py-[12px] px-[10px] border-b border-black/5 group-last:border-none align-middle">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-[700] text-[#111] whitespace-nowrap leading-[1.2] transition-all duration-300">{app.up}</span>
                        <span className={`watchman-mono text-[10px] whitespace-nowrap leading-[1.2] mt-[2px] transition-all duration-300 ${app.upRate !== '0.0 B/s' ? 'speed-active-up' : 'speed-inactive'}`}>{app.upRate}</span>
                      </div>
                    </td>
                    <td className="py-[12px] pl-[10px] pr-[24px] border-b border-black/5 group-last:border-none align-middle text-right">
                      <span className="watchman-mono text-[12px] text-[#111] transition-all duration-300">{app.conns}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
