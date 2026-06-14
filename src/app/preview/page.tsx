import "./preview.css";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsBar from "./StatsBar";
import Features from "@/components/Features";
import CarouselView from "@/components/CarouselView";
import PrivacySection from "./PrivacySection";
import CTASection from "./CTASection";

export const metadata = {
  title: "Watchman — Preview Redesign",
  description:
    "Preview of suggested landing page improvements for the Watchman website.",
};

export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-[#050505] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsBar />

      {/* Features — reusing existing component (already solid) */}
      <div id="features">
        <Features />
      </div>

      {/* App Tour — reusing existing scroll-pinned carousel */}
      <div id="app-tour">
        <CarouselView />
      </div>

      <PrivacySection />
      <CTASection />

      {/* ── Enhanced Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.05] bg-[#050505]">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Logo & tagline */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/watchman-logo.svg"
                  alt="Watchman Logo"
                  className="h-7 w-auto"
                />
                <span className="font-bold tracking-[0.2em] text-white text-sm">
                  WATCHMAN
                </span>
              </div>
              <p className="text-neutral-500 text-sm max-w-xs">
                A lightweight, local-first network monitor for Windows.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-white/30 text-xs font-bold uppercase tracking-wider">
                  Product
                </span>
                <a
                  href="#features"
                  className="text-neutral-500 hover:text-emerald-400 text-sm transition-colors"
                >
                  Features
                </a>
                <a
                  href="#privacy"
                  className="text-neutral-500 hover:text-emerald-400 text-sm transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-neutral-500 hover:text-emerald-400 text-sm transition-colors"
                >
                  Changelog
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-white/30 text-xs font-bold uppercase tracking-wider">
                  Resources
                </span>
                <a
                  href="#"
                  className="text-neutral-500 hover:text-emerald-400 text-sm transition-colors"
                >
                  GitHub Releases
                </a>
                <a
                  href="#"
                  className="text-neutral-500 hover:text-emerald-400 text-sm transition-colors"
                >
                  Report a Bug
                </a>
                <a
                  href="#"
                  className="text-neutral-500 hover:text-emerald-400 text-sm transition-colors"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-600 text-xs">
              © 2025 Watchman. Open source under the MIT License.
            </p>
            <div className="flex items-center gap-4">
              {/* GitHub icon */}
              <a
                href="#"
                className="text-neutral-600 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
