import React from 'react';
import { CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { Phase } from '../data/roadmapData';

interface StickyProgressProps {
  phases: Phase[];
  completedItemIds: Set<string>;
  totalItemsCount: number;
  onResetProgress: () => void;
  onOpenCertGuide: () => void;
  onScrollToPhase: (phaseId: number) => void;
}

export const StickyProgress: React.FC<StickyProgressProps> = ({
  phases,
  completedItemIds,
  totalItemsCount,
  onResetProgress,
  onOpenCertGuide,
  onScrollToPhase,
}) => {
  const completedCount = completedItemIds.size;
  const progressPercent = totalItemsCount > 0 ? Math.round((completedCount / totalItemsCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#070b14]/85 border-b border-cyan-900/40 shadow-lg shadow-black/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Overall Progress Info */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
                {progressPercent}%
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                    Roadmap Progress
                  </span>
                  {progressPercent === 100 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Fully Job Ready!
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">{completedCount}</span> of{' '}
                  <span className="font-semibold text-slate-200">{totalItemsCount}</span> skills & milestones conquered
                </p>
              </div>
            </div>

            {/* Mobile quick actions */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <button
                onClick={onOpenCertGuide}
                className="p-1.5 rounded-md text-slate-300 hover:text-cyan-400 bg-slate-900/80 border border-slate-700/60 text-xs flex items-center gap-1"
                title="Certifications Roadmap"
              >
                <Award className="w-4 h-4 text-cyan-400" />
              </button>
              <button
                onClick={onResetProgress}
                className="p-1.5 rounded-md text-slate-400 hover:text-red-400 bg-slate-900/80 border border-slate-700/60 text-xs"
                title="Reset Progress"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center: Phase Quick Navigation */}
          <div className="hidden md:flex items-center gap-1.5">
            {phases.map((phase) => {
              // Calculate phase sub-progress
              let phaseTotal = 0;
              let phaseDone = 0;
              phase.topics.forEach((t) => {
                phaseTotal++;
                if (completedItemIds.has(t.id)) phaseDone++;
              });
              phase.milestones.forEach((m) => {
                phaseTotal++;
                if (completedItemIds.has(m.id)) phaseDone++;
              });

              const isComplete = phaseTotal > 0 && phaseDone === phaseTotal;

              return (
                <button
                  key={phase.id}
                  onClick={() => onScrollToPhase(phase.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 border ${
                    isComplete
                      ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
                      : phaseDone > 0
                      ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30 hover:bg-cyan-900/50'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                  title={`${phase.title} (${phaseDone}/${phaseTotal})`}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isComplete ? '#10b981' : phase.accentColor }} />
                  <span>Phase {phase.id}</span>
                  {isComplete ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : phaseDone > 0 ? (
                    <span className="text-[10px] text-cyan-400/80">{Math.round((phaseDone / phaseTotal) * 100)}%</span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenCertGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-sm shadow-cyan-950"
            >
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Certifications Guide</span>
            </button>
            <button
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-red-400 bg-slate-900/60 hover:bg-red-950/30 border border-slate-800 hover:border-red-900/50 transition-all"
              title="Reset all tracked items"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* The Glowing Neon Progress Bar */}
        <div className="mt-2.5 w-full bg-slate-900/90 rounded-full h-2 overflow-hidden border border-slate-800/80 relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
