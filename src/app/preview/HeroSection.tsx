"use client";

import { motion } from "framer-motion";
import WindowsTaskbarMockup from "@/components/mockups/WindowsTaskbarMockup";

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{
        background:
          "linear-gradient(145deg, #050505 0%, #060806 40%, #050505 100%)",
      }}
    >
      {/* ── Animated gradient blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="preview-blob-1 absolute -top-[20%] -left-[10%] w-[700px] h-[700px] rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className="preview-blob-2 absolute -bottom-[15%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 70%)",
          }}
        />
        <div
          className="preview-blob-3 absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.025) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none preview-grid-fade opacity-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Radial vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, transparent 30%, #050505 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center w-full">
        {/* Left Column */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400 text-xs font-semibold tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Open Source · Windows Network Monitor
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            className="text-5xl sm:text-6xl md:text-[5.5rem] font-black tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-500 uppercase"
            style={{ lineHeight: "0.92" }}
          >
            Know where your internet is going.
          </motion.h1>

          {/* Better subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-neutral-300 text-base md:text-lg max-w-lg mb-10 leading-relaxed"
          >
            A lightweight taskbar widget that gives you instant visibility into
            your network speed, hardware usage, and data consumption —{" "}
            <span className="text-emerald-400 font-medium">
              100% local, no cloud required.
            </span>
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.55 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <button className="group flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-bold text-sm hover:bg-emerald-400 hover:scale-[1.03] transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
              </svg>
              Download for Windows
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            <div className="flex items-center gap-3 px-7 py-4 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white/40"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="text-white/40 text-sm font-bold">
                Coming soon for Mac
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column — Mockup with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.4 }}
          className="relative preview-float"
        >
          {/* Glow behind mockup */}
          <div className="absolute -inset-10 bg-emerald-500/[0.03] rounded-[50px] blur-[70px] preview-glow-pulse" />

          <div className="relative">
            <WindowsTaskbarMockup embedded={true} autoPlay={true} />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
    </section>
  );
}
