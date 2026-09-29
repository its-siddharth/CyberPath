import React from 'react';
import { Shield, Terminal, Heart, Zap, Sparkles } from 'lucide-react';

interface FooterProps {
  onResetProgress: () => void;
  onOpenCertGuide: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onResetProgress,
  onOpenCertGuide,
  onScrollToTop,
}) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#050811] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Quote & Philosophy Highlight Box */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-slate-900/60 to-blue-950/20 border border-cyan-500/20 text-center max-w-4xl mx-auto shadow-xl">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>GOLDEN CYBERSECURITY AXIOM</span>
          </div>

          <blockquote className="text-lg sm:text-2xl font-semibold text-slate-100 italic tracking-wide mb-3">
            "The quieter you become, the more you are able to hear."
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs font-mono text-slate-400">
            <span className="text-cyan-400 font-bold tracking-wider uppercase">
              ⚡ Consistency &gt; Intensity
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span>45 mins of daily deliberate lab practice beats 10 hours once a month</span>
          </div>
        </div>

        {/* Links, Ethical Disclaimer & Brand */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white tracking-wide">
                Cybersecurity Roadmap for Beginners
              </div>
              <div className="text-[11px] text-slate-500">
                Ethical Hacking &amp; SOC Defense Learning Framework
              </div>
            </div>
          </div>

          {/* Ethical Disclaimer */}
          <div className="max-w-md text-center md:text-left text-[11px] text-slate-400 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
            <strong className="text-slate-300">Ethical Notice:</strong> All techniques and tools covered in this roadmap must only be practiced in authorized lab environments, CTF platforms, or systems where you have explicit written permission.
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={onOpenCertGuide}
              className="text-slate-400 hover:text-cyan-300 transition-colors"
            >
              Certs Guide
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={onResetProgress}
              className="text-slate-400 hover:text-rose-400 transition-colors"
            >
              Reset Progress
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={onScrollToTop}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Back to Top &uarr;
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-600 font-mono">
          Built for future defenders and ethical hackers. Master the fundamentals, stay curious, and defend the wire.
        </div>
      </div>
    </footer>
  );
};
