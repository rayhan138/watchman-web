"use client";

import { useState, useEffect, useRef } from "react";
import { handleDownload } from "@/utils/github";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inAppTour, setInAppTour] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const latest = window.scrollY;
      const diff = latest - lastScrollY.current;
      if (!inAppTour) {
        if (diff > 5 && latest > 100) setHidden(true);
        else if (diff < -5) setHidden(false);
      } else {
        setHidden(false);
      }
      setScrolled(latest > 50);
      lastScrollY.current = latest;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inAppTour]);

  useEffect(() => {
    const el = document.getElementById("app-tour");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInAppTour(entry.isIntersecting);
        if (entry.isIntersecting) setHidden(false);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "App Tour", href: "/#app-tour" },
    { label: "Privacy", href: "/#privacy" },
    { label: "Blog", href: "/blog" },
  ];

  const showBg = scrolled || inAppTour;
  const ease = "cubic-bezier(0.33, 1, 0.68, 1)";
  const dur = "0.7s";

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className="pointer-events-auto absolute inline-flex items-center rounded-full"
        style={{
          top: inAppTour ? "55px" : scrolled ? "20px" : "36px", 
          left: inAppTour ? "55%" : "50%",
          transform: [
            `translateX(${inAppTour ? "0%" : "-50%"})`,
            hidden && !inAppTour ? "translateY(-120%)" : "translateY(0)",
            `scale(${inAppTour ? 1 : 1.35})` // 35% bigger in Hero, shrinks to normal in App Tour
          ].join(" "),
          transformOrigin: "top center", // Ensures it scales downwards, not upwards into the browser edge
          opacity: mounted ? (hidden && !inAppTour ? 0 : 1) : 0,
          width: "min(550px, 90vw)",
          justifyContent: "space-between",
          gap: "3px",
          padding: "4px",
          background: showBg ? "rgba(10, 10, 10, 0.85)" : "transparent",
          backdropFilter: showBg ? "blur(24px)" : "none",
          WebkitBackdropFilter: showBg ? "blur(24px)" : "none",
          border: showBg
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
          boxShadow: showBg
            ? "0 8px 32px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02)"
            : "none",
          transition: `all ${dur} ${ease}`,
        }}
      >
        {/* ── Gradient border glow ── */}
        <div
          style={{
            position: "absolute",
            inset: "-1px",
            borderRadius: "9999px",
            pointerEvents: "none",
            opacity: showBg ? 1 : 0,
            background: inAppTour
              ? "linear-gradient(135deg, rgba(16,185,129,0.3) 0%, transparent 50%, rgba(6,182,212,0.2) 100%)"
              : "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, transparent 40%, transparent 60%, rgba(6,182,212,0.1) 100%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
            transition: `all ${dur} ${ease}`,
          }}
        />

        {/* ── Logo ── */}
        <a
          href="/"
          className="flex items-center gap-2 relative z-10"
          style={{ padding: "0 10px" }}
        >
          <img
            src="/watchman-logo.svg"
            alt="Watchman"
            style={{ height: "16px", width: "auto" }}
          />
          <span
            className="font-bold text-white tracking-[0.15em] whitespace-nowrap"
            style={{ fontSize: "11px" }}
          >
            WATCHMAN
          </span>
        </a>

        {/* ── Divider ── */}
        <div
          style={{
            width: "1px",
            height: "12px",
            background: "rgba(255,255,255,0.1)",
            margin: "0 2px",
            opacity: showBg ? 1 : 0,
            transition: `opacity ${dur} ${ease}`,
          }}
        />

        {/* ── Nav Links ── */}
        <div className="hidden md:flex items-center" style={{ gap: "2px" }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative font-medium rounded-full group whitespace-nowrap"
              style={{
                padding: "5px 12px",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                transition: `color 0.3s`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
            >
              <span className="absolute inset-0 rounded-full bg-white/[0.06] scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </div>

        {/* ── Divider ── */}
        <div
          style={{
            width: "1px",
            height: "16px",
            background: "rgba(255,255,255,0.1)",
            margin: "0 2px",
            opacity: showBg ? 1 : 0,
            transition: `opacity ${dur} ${ease}`,
          }}
        />
        {/* ── CTA & GitHub ── */}
        <div className="hidden md:flex items-center animate-fade-in" style={{ gap: "10px", paddingRight: "4px" }}>
          <a
            href="https://github.com/rayhan138/Watchman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors p-1"
            aria-label="GitHub Repository"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <button
            onClick={handleDownload}
            className="flex items-center font-bold rounded-full bg-emerald-500 hover:bg-emerald-400 text-black whitespace-nowrap hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            style={{
              gap: "6px",
              padding: "4px 14px",
              fontSize: "11px",
              transition: "background 0.3s, box-shadow 0.3s",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ width: "10px", height: "10px" }}
            >
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
            Download
          </button>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/[0.06]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── Fullscreen Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Close Button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="flex flex-col gap-8 items-center text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-bold text-white/80 hover:text-white tracking-tight transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleDownload();
                }}
                className="mt-8 flex items-center gap-3 font-bold rounded-full bg-emerald-500 text-black px-8 py-4 text-lg hover:bg-emerald-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ width: "16px", height: "16px" }}
                >
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                </svg>
                Download for Windows
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
