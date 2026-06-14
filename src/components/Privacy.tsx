"use client";

import { motion } from "framer-motion";

const privacyFeatures = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Local First",
    description:
      "Everything stays on your hard drive. No data leaves your machine, ever. Your network history is yours alone.",
    borderColor: "border-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    glowColor: "rgba(16,185,129,0.06)",
    accentGradient:
      "bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
    title: "Signed Updates",
    description:
      "Secure, verified updates pushed straight from GitHub. Every release is checksummed and transparently built.",
    borderColor: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    glowColor: "rgba(59,130,246,0.06)",
    accentGradient:
      "bg-gradient-to-r from-transparent via-blue-500/40 to-transparent",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
    title: "Silent Operation",
    description:
      "It sits quietly in your taskbar. No popups, no nag screens, no auto-running bandwidth-heavy tests.",
    borderColor: "border-violet-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    glowColor: "rgba(139,92,246,0.06)",
    accentGradient:
      "bg-gradient-to-r from-transparent via-violet-500/40 to-transparent",
  },
];

export default function Privacy() {
  return (
    <section
      id="privacy"
      className="py-32 relative z-10"
      style={{
        background:
          "linear-gradient(180deg, #050505 0%, #070d0a 50%, #050505 100%)",
      }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto px-6 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight">
          Your PC. Your Data.
        </h2>
        <p className="text-xl text-neutral-400 leading-relaxed mb-16 max-w-2xl mx-auto">
          Watchman is an old-school Windows utility built with modern tech.{" "}
          <br />
          <strong className="text-emerald-400">
            No cloud account. No telemetry. No web dashboard required.
          </strong>
        </p>

        {/* Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {privacyFeatures.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`group relative bg-white/[0.03] backdrop-blur-md border ${item.borderColor} p-8 rounded-2xl hover:border-white/15 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden`}
            >
              {/* Accent line at top */}
              <div
                className={`absolute top-0 left-8 right-8 h-[2px] ${item.accentGradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${item.glowColor} 0%, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div
                className={`relative w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} mb-6 transition-transform duration-500 group-hover:scale-110`}
              >
                {item.icon}
              </div>

              <h4 className="relative text-white font-bold text-lg mb-3 tracking-tight">
                {item.title}
              </h4>
              <p className="relative text-neutral-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
