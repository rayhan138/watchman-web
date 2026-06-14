"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Import our perfectly replicated mockups
import DashboardMockup from "./mockups/DashboardMockup";
import DataMockup from "./mockups/DataMockup";
import AppsMockup from "./mockups/AppsMockup";
import NetworkMockup from "./mockups/NetworkMockup";
import ToolsMockup from "./mockups/ToolsMockup";
import PreferencesMockup from "./mockups/PreferencesMockup";

const tabs = [
  {
    id: "dashboard",
    component: (isActive: boolean) => <DashboardMockup isActive={isActive} />,
    title: "Dashboard",
    body: "It shows live download and upload speed, current session data usage, network activity level, and CPU/RAM/GPU gauges.",
    features: [
      "Real-time download & upload speeds",
      "Current session data tracking",
      "Hardware gauges (CPU, RAM, GPU)",
      "Network health status indicator"
    ]
  },
  {
    id: "data",
    component: (isActive: boolean) => <DataMockup isActive={isActive} />,
    title: "Data",
    body: "Analyze your historical usage. Review daily, weekly, and monthly network traffic charts to ensure you stay within your data limits.",
    features: [
      "Daily, Weekly & Monthly charts",
      "Total traffic historical summary",
      "Previous period comparisons",
      "Custom monthly data limit caps"
    ]
  },
  {
    id: "apps",
    component: (isActive: boolean) => <AppsMockup />,
    title: "Apps",
    body: "Total transparency. View live per-app bandwidth monitoring, track active background tasks, and see exactly what is consuming your data.",
    features: [
      "Live & background active status",
      "Per-app upload/download rates",
      "Active network connection counts",
      "Windows data usage integration"
    ]
  },
  {
    id: "network",
    component: (isActive: boolean) => <NetworkMockup isActive={isActive} />,
    title: "Network",
    body: "Ensure maximum performance. Run speed tests directly from the app, monitor average latency, and check your connection health.",
    features: [
      "Latency, jitter & packet loss",
      "Built-in M-Lab NDT7 speed test",
      "Local IP & adapter information",
      "Active connection quality state"
    ]
  },
  {
    id: "tools",
    component: (isActive: boolean) => <ToolsMockup />,
    title: "Tools",
    body: "Take control. Run advanced network troubleshooters, export your data directly to CSV, and manage your preferences.",
    features: [
      "Network connection troubleshooter",
      "Run advanced diagnostics",
      "Export historical data to CSV",
      "Check & install application updates"
    ]
  },
  {
    id: "preferences",
    component: (isActive: boolean) => <PreferencesMockup />,
    title: "Preferences",
    body: "Tailor the experience to your needs. Set usage warnings, change measurement units, and control application startup behavior.",
    features: [
      "High data usage notifications",
      "Hardware temperature warnings",
      "Customizable startup behavior",
      "Bits/s or Bytes/s unit toggles"
    ]
  }
];

export default function CarouselView() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Initialize GSAP ScrollTrigger for Mockups ONLY
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const images = imagesRef.current.filter(Boolean);
    const totalItems = images.length;

    const isMobile = window.innerWidth < 768;

    const getStyleForPosition = (pos: number) => {
      if (pos === 0) {
        return { 
          x: isMobile ? "0vw" : "4vw", 
          y: "0vh", 
          scale: isMobile ? 0.65 : 1, 
          blur: 0, 
          opacity: 0.95, 
          zIndex: 10,
          boxShadow: "0 0 80px 20px rgba(59, 130, 246, 0.25), 0 25px 50px rgba(0,0,0,0.5)" 
        };
      } else if (pos === 1) {
        return { 
          x: isMobile ? "0vw" : "-6vw", 
          y: isMobile ? "22vh" : "35vh", 
          scale: isMobile ? 0.45 : 0.65, 
          blur: 6, 
          opacity: 0.5, 
          zIndex: 5,
          boxShadow: "0 0 0px 0px rgba(59, 130, 246, 0), 0 10px 30px rgba(0,0,0,0.3)" 
        };
      } else if (pos === -1) {
        return { 
          x: isMobile ? "0vw" : "-6vw", 
          y: isMobile ? "-22vh" : "-35vh", 
          scale: isMobile ? 0.45 : 0.65, 
          blur: 6, 
          opacity: 0.5, 
          zIndex: 5,
          boxShadow: "0 0 0px 0px rgba(59, 130, 246, 0), 0 10px 30px rgba(0,0,0,0.3)" 
        };
      } else if (pos >= 2) {
        return { 
          x: isMobile ? "0vw" : "-15vw", 
          y: isMobile ? "40vh" : "60vh", 
          scale: isMobile ? 0.3 : 0.4, 
          blur: 12, 
          opacity: 0, 
          zIndex: 1,
          boxShadow: "0 0 0px 0px rgba(59, 130, 246, 0), 0 0px 0px rgba(0,0,0,0)" 
        };
      } else if (pos <= -2) {
        return { 
          x: isMobile ? "0vw" : "-15vw", 
          y: isMobile ? "-40vh" : "-60vh", 
          scale: isMobile ? 0.3 : 0.4, 
          blur: 12, 
          opacity: 0, 
          zIndex: 1,
          boxShadow: "0 0 0px 0px rgba(59, 130, 246, 0), 0 0px 0px rgba(0,0,0,0)" 
        };
      }
      return { x: "0vw", y: "0vh", scale: 1, blur: 0, opacity: 1, zIndex: 1, boxShadow: "none" };
    };

    let ctx = gsap.context(() => {
      // 1. Set initial resting positions
      images.forEach((img, index) => {
        const initStyle = getStyleForPosition(index);
        gsap.set(img, {
          x: initStyle.x,
          y: initStyle.y,
          scale: initStyle.scale,
          filter: `blur(${initStyle.blur}px)`,
          opacity: initStyle.opacity,
          zIndex: initStyle.zIndex,
          boxShadow: initStyle.boxShadow
        });
      });

      // 2. Setup the Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1,
          snap: 1 / (totalItems - 1),
          onUpdate: (self) => {
            const index = Math.round(self.progress * (totalItems - 1));
            setActiveIndex(index);
          }
        }
      });

      const stepDuration = 1 / (totalItems - 1);

      // 3. Build sweeping curve animations
      for (let stepIndex = 0; stepIndex < totalItems - 1; stepIndex++) {
        const startTime = stepIndex * stepDuration;

        images.forEach((img, itemIndex) => {
          const nextPosition = itemIndex - (stepIndex + 1);
          const targetStyle = getStyleForPosition(nextPosition);

          tl.to(img, {
            x: targetStyle.x,
            y: targetStyle.y,
            scale: targetStyle.scale,
            filter: `blur(${targetStyle.blur}px)`,
            opacity: targetStyle.opacity,
            zIndex: targetStyle.zIndex,
            boxShadow: targetStyle.boxShadow,
            ease: "power2.inOut",
            duration: stepDuration
          }, startTime);
        });
      }
    }, showcaseRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="w-full bg-transparent text-white overflow-x-hidden font-sans relative">
      
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>



      <section ref={showcaseRef} className="h-screen w-screen relative flex flex-col md:flex-row items-center overflow-hidden z-10">
        
        {/* Left Side: Arc Images */}
        <div className="relative w-full md:w-[55%] h-[55%] md:h-full flex justify-center items-center pointer-events-none md:mt-0 mt-8">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              ref={el => { imagesRef.current[index] = el; }}
              className="absolute w-[450px] transform-origin-center will-change-transform rounded-[16px] shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)]"
            >
              {/* Pointer events only on the center active component */}
              <div className="pointer-events-auto">
                {tab.component(activeIndex === index)}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Premium Pagination Dots */}
        <div className="fixed right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center z-50">
          <div className="relative flex flex-col gap-[12px]">
            {/* Background Track Dots */}
            {tabs.map((tab, index) => (
              <button
                key={`bg-${tab.id}`}
                onClick={() => {
                  const scrollY = (index / (tabs.length - 1)) * 5000;
                  window.scrollTo({ top: scrollY, behavior: 'smooth' });
                }}
                className="w-[6px] h-[6px] rounded-full bg-white/20 transition-all duration-300 hover:bg-white/40 cursor-pointer"
                aria-label={`Go to ${tab.title}`}
              />
            ))}
            
            {/* Active Sliding Glowing Pill */}
            <div 
              className="absolute w-[6px] h-[24px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
              style={{ top: `calc(${activeIndex * 18}px - 9px)` }}
            />
          </div>
        </div>

        {/* Right Side: Text (Driven by React State) */}
        <div className="w-full md:w-[45%] px-6 md:px-0 md:pr-[5%] relative h-[45%] md:h-[80%] pointer-events-none pb-12 md:pb-0 flex items-center md:block">
          {tabs.map((tab, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={`text-${tab.id}`}
                className={`absolute top-[15%] left-0 w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 translate-y-8 invisible pointer-events-none'}`}
              >
                <div className="text-emerald-400 text-sm font-bold tracking-[0.3em] uppercase mb-4">App Tour</div>
                <h1 className="text-6xl font-play font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                  {tab.title}
                </h1>
                <p className="text-xl leading-relaxed text-white/80 font-[500] max-w-[500px] mb-10">
                  {tab.body}
                </p>

                {/* Features Card Container (BlinkEye Style) */}
                <div className="bg-[#0f121a]/90 backdrop-blur-xl border border-white/5 rounded-2xl p-6 max-w-[550px] shadow-2xl relative overflow-hidden">
                   {/* Top Badge */}
                   <div className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-2 px-3 py-1 bg-white/10 rounded-full w-fit">
                     Key Features
                   </div>
                   
                   {/* Feature Pills Grid */}
                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mt-4">
                     {tab.features.map((feature, i) => (
                       <div key={i} className="flex items-center gap-3 bg-[#1a1f2c] border border-white/5 hover:border-emerald-500/30 transition-colors rounded-xl px-4 py-3 shadow-inner">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-[13px] font-semibold text-white/90 leading-snug">{feature}</span>
                       </div>
                     ))}
                   </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Scroll to Top Button (Visible on all slides except the first) */}
        <div className={`fixed bottom-12 right-12 z-50 transition-all duration-500 ease-out ${activeIndex > 0 ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 translate-y-4 invisible pointer-events-none'}`}>
          <button 
            onClick={() => {
              if (lenisInstance) {
                lenisInstance.scrollTo(0, { duration: 1.5 });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-5 py-3 bg-[#1a1f2c] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/50 rounded-full text-white/80 hover:text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.1)] group"
            aria-label="Back to Top"
          >
            <span className="text-[11px] font-bold tracking-widest uppercase">Back to Top</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>

      </section>



    </div>
  );
}
