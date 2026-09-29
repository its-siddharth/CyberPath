import React from 'react';
import {
  Shield,
  Terminal,
  Crosshair,
  ShieldCheck,
  Layers,
  Search,
  X,
  FileDown,
  ChevronsUpDown,
  Compass,
} from 'lucide-react';

interface HeaderProps {
  selectedTrack: 'all' | 'red' | 'blue' | 'core';
  onSelectTrack: (track: 'all' | 'red' | 'blue' | 'core') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isAllExpanded: boolean;
  onToggleExpandAll: () => void;
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedTrack,
  onSelectTrack,
  searchQuery,
  onSearchChange,
  isAllExpanded,
  onToggleExpandAll,
  onOpenExportModal,
}) => {
  return (
    <div className="relative pt-8 pb-6 border-b border-slate-800/80 bg-gradient-to-b from-[#091024] via-[#070b14] to-[#070b14]">
      {/* Decorative ambient glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>2026 EDITION • ZERO TO JOB-READY PATH</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
              100% Free Resources Curated
            </span>
            <span className="hidden sm:inline px-2.5 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
              5 Phases • 12+ Months
            </span>
          </div>
        </div>

        {/* Main Title & Description */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 flex items-center gap-3">
            <span className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
            </span>
            <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
              Cybersecurity Roadmap
            </span>
            <span className="text-sm sm:text-base font-mono font-normal text-cyan-400/90 self-end mb-1">
              for Beginners
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
            A comprehensive, battle-tested learning path taking you from core networking and Linux fundamentals to enterprise Active Directory exploitation, SOC detection engineering, and professional portfolio building. Follow the roadmap, mark your progress, practice in free virtual labs, and build undeniable proof of work.
          </p>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>PHASES</span>
              </div>
              <div className="text-lg font-bold text-white">5 Structured Stages</div>
              <div className="text-[11px] text-slate-400">Foundations to Portfolio</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono mb-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>KEY TOOLS</span>
              </div>
              <div className="text-lg font-bold text-white">25+ Core Utilities</div>
              <div className="text-[11px] text-slate-400">Wireshark, Burp, Nmap, SIEM</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>FREE LABS</span>
              </div>
              <div className="text-lg font-bold text-white">20+ Top Platforms</div>
              <div className="text-[11px] text-slate-400">THM, PortSwigger, OverTheWire</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-mono mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CAREER TRACKS</span>
              </div>
              <div className="text-lg font-bold text-white">Red & Blue Team</div>
              <div className="text-[11px] text-slate-400">Offensive & Defensive Paths</div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
          {/* Track Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">Track:</span>
            
            <button
              onClick={() => onSelectTrack('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                selectedTrack === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Spectrum (All)</span>
            </button>

            <button
              onClick={() => onSelectTrack('blue')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                selectedTrack === 'blue'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/60 shadow-[0_0_12px_rgba(14,165,233,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Blue Team (Defense)</span>
            </button>

            <button
              onClick={() => onSelectTrack('red')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                selectedTrack === 'red'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5 text-rose-400" />
              <span>Red Team (Offense)</span>
            </button>

            <button
              onClick={() => onSelectTrack('core')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                selectedTrack === 'core'
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/60 shadow-[0_0_12px_rgba(20,184,166,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-teal-400" />
              <span>Core Fundamentals</span>
            </button>
          </div>

          {/* Search & Global Actions */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search topics, tools, labs..."
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <button
              onClick={onToggleExpandAll}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/80 border border-slate-700/80 hover:border-slate-600 transition-all flex items-center gap-1.5"
              title={isAllExpanded ? 'Collapse all phases' : 'Expand all phases'}
            >
              <ChevronsUpDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAllExpanded ? 'Collapse All' : 'Expand All'}</span>
            </button>

            <button
              onClick={onOpenExportModal}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/80 border border-slate-700/80 hover:text-cyan-300 hover:border-cyan-500/40 transition-all flex items-center gap-1.5"
              title="Export roadmap checklist"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
