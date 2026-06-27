"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="18" width="20" height="4" rx="1" />
        <path d="M6 20h.01" />
        <path d="M10 20h.01" />
        <path d="M17 20h4" />
        <path d="M7 15l3-3 2 2 5-5" />
        <path d="M17 9v-2" />
        <path d="M17 9h2" />
      </svg>
    ),
    title: "Taskbar Widget",
    description: "Live upload/download speeds, CPU & memory usage embedded directly into your Windows taskbar. Always visible, zero effort.",
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 12h16" />
        <path d="M12 4v16" />
        <circle cx="8" cy="8" r="1" fill="currentColor" />
        <circle cx="16" cy="8" r="1" fill="currentColor" />
        <circle cx="8" cy="16" r="1" fill="currentColor" />
        <circle cx="16" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
    title: "Per-App Bandwidth",
    description: "See exactly which app is consuming your data in real-time. Track active processes, background tasks, and connection counts.",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 4-6" />
      </svg>
    ),
    title: "Traffic History",
    description: "Daily, weekly, monthly, and yearly bar charts with period-over-period comparisons. Set data limits and never go over.",
    color: "from-violet-500/20 to-violet-500/5",
    borderColor: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Connection Health",
    description: "Monitor latency, jitter, and packet loss at a glance. Instantly know if your connection is stable, fair, or degraded.",
    color: "from-amber-500/20 to-amber-500/5",
    borderColor: "border-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "CSV Export",
    description: "Export your entire traffic history to spreadsheets with one click. Daily, weekly, or monthly — ready for analysis.",
    color: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
    title: "100% Local",
    description: "No cloud, no accounts, no telemetry. Everything is stored on your hard drive. Your network data never leaves your PC.",
    color: "from-rose-500/20 to-rose-500/5",
    borderColor: "border-rose-500/20",
    iconColor: "text-rose-400",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
};

export default function Features() {
  return (
    <section className="relative py-14 sm:py-28 z-10 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-bold tracking-[0.3em] uppercase mb-6">
            Why Watchman
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Features that stand out.
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Everything you need to understand and control your network, in one lightweight app.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className={`group relative rounded-2xl border ${feature.borderColor} bg-gradient-to-b ${feature.color} backdrop-blur-sm p-5 sm:p-7 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className={`${feature.iconColor} mb-3 sm:mb-5 transition-transform duration-500 group-hover:scale-110`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg mb-2 tracking-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
