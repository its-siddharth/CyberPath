/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ROADMAP_PHASES, Phase } from './data/roadmapData';
import { StickyProgress } from './components/StickyProgress';
import { Header } from './components/Header';
import { PhaseCard } from './components/PhaseCard';
import { QuizModal } from './components/QuizModal';
import { CertGuideModal } from './components/CertGuideModal';
import { ExportModal } from './components/ExportModal';
import { Footer } from './components/Footer';
import { AlertCircle, RotateCcw, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'cyber_roadmap_progress_v1';

export default function App() {
  // 1. Persistent Checklist State
  const [completedItemIds, setCompletedItemIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return new Set(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    // Default starter completion for quick interactive demonstration
    return new Set(['p1_tcp_ip']);
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedItemIds)));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [completedItemIds]);

  // 2. Expand/Collapse State (Phase 1 expanded by default)
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  // 3. Track Filter & Search
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'red' | 'blue' | 'core'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 4. Modal States
  const [quizModalPhase, setQuizModalPhase] = useState<Phase | null>(null);
  const [isCertGuideOpen, setIsCertGuideOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);

  // Phase container refs for smooth scrolling
  const phaseRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Calculate total trackable items
  const totalItemsCount = useMemo(() => {
    let count = 0;
    ROADMAP_PHASES.forEach((p) => {
      count += p.topics.length;
      count += p.milestones.length;
      count += p.tools.length;
    });
    return count;
  }, []);

  // Handlers
  const handleToggleItem = (itemId: string) => {
    setCompletedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const handleToggleAllInPhase = (phase: Phase, markComplete: boolean) => {
    const idsToChange: string[] = [
      ...phase.topics.map((t) => t.id),
      ...phase.milestones.map((m) => m.id),
      ...phase.tools.map((t) => t.id),
    ];

    setCompletedItemIds((prev) => {
      const next = new Set(prev);
      idsToChange.forEach((id) => {
        if (markComplete) {
          next.add(id);
        } else {
          next.delete(id);
        }
      });
      return next;
    });
  };

  const handleToggleExpandPhase = (phaseId: number) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  const isAllExpanded = useMemo(() => {
    return ROADMAP_PHASES.every((p) => !!expandedPhases[p.id]);
  }, [expandedPhases]);

  const handleToggleExpandAll = () => {
    const nextState = !isAllExpanded;
    const updated: Record<number, boolean> = {};
    ROADMAP_PHASES.forEach((p) => {
      updated[p.id] = nextState;
    });
    setExpandedPhases(updated);
  };

  const handleScrollToPhase = (phaseId: number) => {
    // Also expand it if it's currently closed
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: true }));
    const el = phaseRefs.current[phaseId];
    if (el) {
      const yOffset = -70; // offset for sticky bar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmReset = () => {
    setCompletedItemIds(new Set());
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 cyber-grid-pattern relative selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Sticky Progress Bar at the Top */}
      <StickyProgress
        phases={ROADMAP_PHASES}
        completedItemIds={completedItemIds}
        totalItemsCount={totalItemsCount}
        onResetProgress={() => setIsResetConfirmOpen(true)}
        onOpenCertGuide={() => setIsCertGuideOpen(true)}
        onScrollToPhase={handleScrollToPhase}
      />

      {/* Hero Header & Track Switcher */}
      <Header
        selectedTrack={selectedTrack}
        onSelectTrack={setSelectedTrack}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isAllExpanded={isAllExpanded}
        onToggleExpandAll={handleToggleExpandAll}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Roadmap Timeline Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Active Filter Announcement if filtered */}
        {(selectedTrack !== 'all' || searchQuery.trim() !== '') && (
          <div className="mb-8 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs font-mono text-cyan-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>
                Filtering view: {selectedTrack !== 'all' ? `Track [${selectedTrack.toUpperCase()}]` : ''}
                {searchQuery ? ` matching "${searchQuery}"` : ''}
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedTrack('all');
                setSearchQuery('');
              }}
              className="text-slate-400 hover:text-white underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Vertical Timeline Nodes */}
        <div className="space-y-2">
          {ROADMAP_PHASES.map((phase, index) => (
            <div
              key={phase.id}
              ref={(el) => {
                phaseRefs.current[phase.id] = el;
              }}
            >
              <PhaseCard
                phase={phase}
                isExpanded={!!expandedPhases[phase.id]}
                onToggleExpand={() => handleToggleExpandPhase(phase.id)}
                completedItemIds={completedItemIds}
                onToggleItem={handleToggleItem}
                onToggleAllInPhase={handleToggleAllInPhase}
                selectedTrack={selectedTrack}
                searchQuery={searchQuery}
                onOpenQuiz={(p) => setQuizModalPhase(p)}
                isLast={index === ROADMAP_PHASES.length - 1}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer
        onResetProgress={() => setIsResetConfirmOpen(true)}
        onOpenCertGuide={() => setIsCertGuideOpen(true)}
        onScrollToTop={handleScrollToTop}
      />

      {/* Knowledge Check / Quiz Modal */}
      {quizModalPhase && (
        <QuizModal
          phase={quizModalPhase}
          onClose={() => setQuizModalPhase(null)}
        />
      )}

      {/* Certifications Roadmap Modal */}
      <CertGuideModal
        isOpen={isCertGuideOpen}
        onClose={() => setIsCertGuideOpen(false)}
      />

      {/* Markdown Export & Notes Checklist Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        phases={ROADMAP_PHASES}
        completedItemIds={completedItemIds}
      />

      {/* Reset Confirmation Dialog */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#091024] border border-rose-500/40 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-500/30">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                Reset All Progress?
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This will clear all your saved checked items, tool practice marks, and phase milestones. This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-md shadow-rose-950"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
