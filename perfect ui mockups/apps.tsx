"use client";

import { Settings, Moon, Minus, X, LayoutDashboard, BarChart2, AppWindow, Wifi, Wrench, Activity } from "lucide-react";

export default function AppsMockup() {
  const apps = [
    {
      name: "Steam",
      icon: "St",
      status: "LIVE",
      statusColor: "text-blue-600 bg-blue-100 border-blue-200",
      highUsage: true,
      downTotal: "1.4 GB",
      downRate: "45.5 MB/s",
      downActive: true,
      upTotal: "2.1 MB",
      upRate: "1.2 MB/s",
      upActive: true,
    },
    {
      name: "Discord",
      icon: "Di",
      status: "LIVE",
      statusColor: "text-blue-600 bg-blue-100 border-blue-200",
      highUsage: false,
      downTotal: "4.2 MB",
      downRate: "1.2 MB/s",
      downActive: true,
      upTotal: "500 KB",
      upRate: "120 KB/s",
      upActive: true,
    },
    {
      name: "Google Chrome",
      icon: "Ch",
      status: "BACKGROUND",
      statusColor: "text-emerald-700 bg-emerald-100 border-emerald-200",
      highUsage: false,
      downTotal: "120.5 MB",
      downRate: "0 B/s",
      downActive: false,
      upTotal: "45.2 MB",
      upRate: "0 B/s",
      upActive: false,
    },
    {
      name: "Spotify",
      icon: "Sp",
      status: "BACKGROUND",
      statusColor: "text-emerald-700 bg-emerald-100 border-emerald-200",
      highUsage: false,
      downTotal: "14.2 MB",
      downRate: "0 B/s",
      downActive: false,
      upTotal: "1.2 MB",
      upRate: "0 B/s",
      upActive: false,
    },
    {
      name: "Slack",
      icon: "Sl",
      status: "RECENT",
      statusColor: "text-neutral-500 bg-neutral-100 border-neutral-200",
      highUsage: false,
      downTotal: "4.5 MB",
      downRate: "0 B/s",
      downActive: false,
      upTotal: "1.1 MB",
      upRate: "0 B/s",
      upActive: false,
    },
  ];

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
              <div className="w-[28px] h-[28px] shrink-0 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-[800]">
                33
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
                    { name: "Codex", icon: "C", status: "LIVE", active: "Last active now", down: "303 KB", downRate: "2.1 KB/s", up: "2.43 MB", upRate: "5.2 KB/s", conns: 4, isHigh: false },
                    { name: "Discord", icon: "D", status: "LIVE", active: "Last active now", down: "650 KB", downRate: "52.0 B/s", up: "900 KB", upRate: "0.0 B/s", conns: 5, isHigh: false },
                    { name: "msedge", icon: "M", status: "LIVE", active: "Last active 17m ago", down: "15.55 MB", downRate: "24.0 B/s", up: "2.29 MB", upRate: "29.0 B/s", conns: 8, isHigh: true },
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
                        <span className="text-[12px] font-[700] text-[#111] whitespace-nowrap leading-[1.2]">{app.down}</span>
                        <span className={`watchman-mono text-[10px] whitespace-nowrap leading-[1.2] mt-[2px] ${app.downRate !== '0.0 B/s' ? 'speed-active-down' : 'speed-inactive'}`}>{app.downRate}</span>
                      </div>
                    </td>
                    <td className="py-[12px] px-[10px] border-b border-black/5 group-last:border-none align-middle">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-[700] text-[#111] whitespace-nowrap leading-[1.2]">{app.up}</span>
                        <span className={`watchman-mono text-[10px] whitespace-nowrap leading-[1.2] mt-[2px] ${app.upRate !== '0.0 B/s' ? 'speed-active-up' : 'speed-inactive'}`}>{app.upRate}</span>
                      </div>
                    </td>
                    <td className="py-[12px] pl-[10px] pr-[24px] border-b border-black/5 group-last:border-none align-middle text-right">
                      <span className="watchman-mono text-[12px] text-[#111]">{app.conns}</span>
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
          <span className="pt-[1px] watchman-mono">Uptime: 11H 59M</span>
        </div>
      </div>
    </>
  );
}
