import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Terminal,
  Compass,
  Award,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Crosshair,
  Layers,
  HelpCircle,
  Flame,
  Check,
  CheckCheck,
} from 'lucide-react';
import { Phase, SkillTopic, ToolItem, ResourceItem, MilestoneItem } from '../data/roadmapData';

interface PhaseCardProps {
  phase: Phase;
  isExpanded: boolean;
  onToggleExpand: () => void;
  completedItemIds: Set<string>;
  onToggleItem: (itemId: string) => void;
  onToggleAllInPhase: (phase: Phase, markComplete: boolean) => void;
  selectedTrack: 'all' | 'red' | 'blue' | 'core';
  searchQuery: string;
  onOpenQuiz: (phase: Phase) => void;
  isLast: boolean;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({
  phase,
  isExpanded,
  onToggleExpand,
  completedItemIds,
  onToggleItem,
  onToggleAllInPhase,
  selectedTrack,
  searchQuery,
  onOpenQuiz,
  isLast,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'topics' | 'resources' | 'tools' | 'milestones'>('all');

  // Filter topics based on selectedTrack and searchQuery
  const filteredTopics = phase.topics.filter((topic) => {
    const matchesTrack =
      selectedTrack === 'all' ||
      topic.category === selectedTrack ||
      (selectedTrack === 'red' && topic.category === 'core') ||
      (selectedTrack === 'blue' && topic.category === 'core');
    
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesTrack;

    const matchesSearch =
      topic.name.toLowerCase().includes(query) ||
      topic.description.toLowerCase().includes(query);
    return matchesTrack && matchesSearch;
  });

  const filteredResources = phase.resources.filter((res) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      res.name.toLowerCase().includes(query) ||
      res.platform.toLowerCase().includes(query) ||
      res.description.toLowerCase().includes(query)
    );
  });

  const filteredTools = phase.tools.filter((tool) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.practicalUse.toLowerCase().includes(query)
    );
  });

  const filteredMilestones = phase.milestones.filter((milestone) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      milestone.title.toLowerCase().includes(query) ||
      milestone.description.toLowerCase().includes(query)
    );
  });

  // Calculate phase completion stats
  const allTrackableIds: string[] = [
    ...phase.topics.map((t) => t.id),
    ...phase.milestones.map((m) => m.id),
    ...phase.tools.map((t) => t.id),
  ];
  const completedInPhase = allTrackableIds.filter((id) => completedItemIds.has(id)).length;
  const phaseTotal = allTrackableIds.length;
  const phasePercent = phaseTotal > 0 ? Math.round((completedInPhase / phaseTotal) * 100) : 0;
  const isPhaseCompleted = phasePercent === 100;

  // Track badges helper
  const renderTrackBadge = (cat: 'core' | 'red' | 'blue') => {
    if (cat === 'red') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30">
          <Crosshair className="w-2.5 h-2.5" /> Red Team
        </span>
      );
    }
    if (cat === 'blue') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-500/30">
          <ShieldCheck className="w-2.5 h-2.5" /> Blue Team
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
        <Layers className="w-2.5 h-2.5" /> Core
      </span>
    );
  };

  return (
    <div className="relative flex gap-4 sm:gap-8 group">
      {/* Left Timeline Line & Stem */}
      <div className="flex flex-col items-center">
        {/* Timeline Node Icon */}
        <button
          onClick={onToggleExpand}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm sm:text-base border-2 transition-all duration-300 z-10 ${
            isPhaseCompleted
              ? 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
              : phasePercent > 0
              ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
              : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-cyan-500/50 group-hover:text-slate-200'
          }`}
          title={`Click to toggle Phase ${phase.id}`}
        >
          {isPhaseCompleted ? (
            <CheckCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          ) : (
            <span>0{phase.id}</span>
          )}
        </button>

        {/* Stem Line down to next phase */}
        {!isLast && (
          <div
            className={`w-0.5 flex-1 my-2 transition-all duration-500 ${
              isPhaseCompleted
                ? 'bg-gradient-to-b from-emerald-500 to-cyan-500/70 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                : phasePercent > 0
                ? 'bg-gradient-to-b from-cyan-500 to-slate-800'
                : 'bg-slate-800 group-hover:bg-slate-700'
            }`}
          />
        )}
      </div>

      {/* Main Card Body */}
      <div className="flex-1 pb-10">
        <div
          className={`rounded-2xl transition-all duration-300 border backdrop-blur-sm overflow-hidden ${
            isPhaseCompleted
              ? 'bg-[#0a1424]/90 border-emerald-500/30 shadow-[0_4px_30px_rgba(16,185,129,0.08)]'
              : isExpanded
              ? 'bg-[#091124]/90 border-cyan-500/40 shadow-[0_4px_30px_rgba(6,182,212,0.1)]'
              : 'bg-[#080d1d]/80 border-slate-800/80 hover:border-slate-700/90 shadow-md'
          }`}
        >
          {/* Card Header (Always Clickable) */}
          <div
            onClick={onToggleExpand}
            className="p-4 sm:p-6 cursor-pointer select-none transition-colors hover:bg-slate-800/20"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Titles & Timeframe */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                    Phase 0{phase.id}
                  </span>
                  <span className="text-xs font-mono text-slate-300 bg-slate-800/80 border border-slate-700/60 px-2.5 py-0.5 rounded-full">
                    ⏱️ {phase.timeframe}
                  </span>
                  <span className="hidden sm:inline text-xs text-slate-400">
                    {phase.durationMonths}
                  </span>
                  {isPhaseCompleted && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                      <Check className="w-3 h-3" /> Phase Cleared
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {phase.title}
                </h2>
                <p className="text-sm font-medium text-slate-400 font-mono">
                  {phase.tagline}
                </p>
              </div>

              {/* Progress & Controls */}
              <div className="flex items-center gap-3 self-end lg:self-center">
                {/* Mini phase progress */}
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-xs font-mono font-semibold text-cyan-400">
                      {phasePercent}%
                    </span>
                    <span className="text-xs text-slate-400">
                      ({completedInPhase}/{phaseTotal})
                    </span>
                  </div>
                  <div className="w-24 sm:w-32 bg-slate-800 rounded-full h-1.5 overflow-hidden mt-1 border border-slate-700/50">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isPhaseCompleted ? 'bg-emerald-400' : 'bg-gradient-to-r from-cyan-400 to-sky-400'
                      }`}
                      style={{ width: `${phasePercent}%` }}
                    />
                  </div>
                </div>

                {/* Chevron */}
                <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white transition-colors">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>

            {/* Teaser text if collapsed */}
            {!isExpanded && (
              <p className="mt-3 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                {phase.description}
              </p>
            )}
          </div>

          {/* Expanded Content Area */}
          {isExpanded && (
            <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-6 animate-fadeIn">
              {/* Description & Quick Phase Action Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {phase.description}
                </p>

                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  <button
                    onClick={() => onOpenQuiz(phase)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 transition-colors shadow-sm"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Knowledge Check</span>
                  </button>

                  <button
                    onClick={() => onToggleAllInPhase(phase, !isPhaseCompleted)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
                      isPhaseCompleted
                        ? 'text-slate-300 bg-slate-800/80 hover:bg-slate-700 border-slate-600'
                        : 'text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border-emerald-500/40'
                    }`}
                  >
                    {isPhaseCompleted ? (
                      <>
                        <Circle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Unmark Phase</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Mark All Done</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Specialization Track Focus Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-rose-950/20 to-slate-900/40 border border-rose-500/20">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold mb-1.5">
                    <Crosshair className="w-4 h-4" />
                    <span>RED TEAM (OFFENSIVE FOCUS)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {phase.trackFocus.red}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-gradient-to-br from-sky-950/20 to-slate-900/40 border border-sky-500/20">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-bold mb-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>BLUE TEAM (DEFENSIVE FOCUS)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {phase.trackFocus.blue}
                  </p>
                </div>
              </div>

              {/* Section Subtabs Navigation */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                    activeTab === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Details ({filteredTopics.length + filteredResources.length + filteredTools.length + filteredMilestones.length})
                </button>
                <button
                  onClick={() => setActiveTab('topics')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                    activeTab === 'topics'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Key Topics ({filteredTopics.length})
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                    activeTab === 'resources'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Free Platforms ({filteredResources.length})
                </button>
                <button
                  onClick={() => setActiveTab('tools')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                    activeTab === 'tools'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tools to Master ({filteredTools.length})
                </button>
                <button
                  onClick={() => setActiveTab('milestones')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                    activeTab === 'milestones'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Milestones ({filteredMilestones.length})
                </button>
              </div>

              {/* SECTION 1: Key Topics / Skills */}
              {(activeTab === 'all' || activeTab === 'topics') && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <span>Key Topics & Core Skills</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      Check off as you master
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {filteredTopics.map((topic) => {
                      const isCompleted = completedItemIds.has(topic.id);
                      return (
                        <div
                          key={topic.id}
                          onClick={() => onToggleItem(topic.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                            isCompleted
                              ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300 hover:border-emerald-500/50'
                              : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-900/80'
                          }`}
                        >
                          <button
                            className="mt-0.5 shrink-0 transition-transform active:scale-90"
                            aria-label={`Toggle ${topic.name}`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500 hover:text-cyan-400" />
                            )}
                          </button>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-xs font-semibold ${
                                  isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
                                }`}
                              >
                                {topic.name}
                              </span>
                              {renderTrackBadge(topic.category)}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                              {topic.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 2: Recommended Free Platforms & Resources */}
              {(activeTab === 'all' || activeTab === 'resources') && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-emerald-400" />
                      <span>Recommended Free Platforms & Resources</span>
                    </h3>
                    <span className="text-xs text-emerald-400 font-mono">
                      Zero paywall required
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredResources.map((res) => (
                      <a
                        key={res.id}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/res p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <span className="text-xs font-bold text-white group-hover/res:text-emerald-300 transition-colors flex items-center gap-1.5">
                              {res.name}
                              <ExternalLink className="w-3 h-3 text-slate-400 group-hover/res:text-emerald-400 shrink-0" />
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                              {res.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
                            {res.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] font-mono text-slate-500">
                          <span>Platform: {res.platform}</span>
                          <span className="text-emerald-400/90 group-hover/res:underline">
                            Open Lab &rarr;
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 3: Tools to Learn */}
              {(activeTab === 'all' || activeTab === 'tools') && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-sky-400" />
                      <span>Essential Tools to Master</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      Check off as practiced
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredTools.map((tool) => {
                      const isCompleted = completedItemIds.has(tool.id);
                      return (
                        <div
                          key={tool.id}
                          className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                            isCompleted
                              ? 'bg-emerald-950/20 border-emerald-500/30'
                              : 'bg-slate-900/60 border-slate-800 hover:border-sky-500/40'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => onToggleItem(tool.id)}
                                  className="shrink-0"
                                  title={`Mark ${tool.name} as mastered`}
                                >
                                  {isCompleted ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-500 hover:text-sky-400" />
                                  )}
                                </button>
                                <span className="text-xs font-bold text-white font-mono">
                                  {tool.name}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                {tool.category}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                              {tool.description}
                            </p>

                            <div className="text-[11px] text-slate-400 mb-2">
                              <span className="text-sky-400 font-medium font-mono text-[10px] uppercase">
                                Real Use:
                              </span>{' '}
                              {tool.practicalUse}
                            </div>
                          </div>

                          {tool.starterTip && (
                            <div className="p-2 rounded bg-black/50 border border-slate-800 text-[10px] font-mono text-cyan-300/90 break-all select-all">
                              <span className="text-slate-500 select-none">$ </span>
                              {tool.starterTip}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 4: Phase Milestones & Action Goals */}
              {(activeTab === 'all' || activeTab === 'milestones') && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Phase Milestones & Deliverables</span>
                    </h3>
                    <span className="text-xs text-amber-400 font-mono">
                      Hands-on Proof of Work
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {filteredMilestones.map((m) => {
                      const isCompleted = completedItemIds.has(m.id);
                      return (
                        <div
                          key={m.id}
                          onClick={() => onToggleItem(m.id)}
                          className={`p-3 sm:p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                            isCompleted
                              ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                              : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900/90'
                          }`}
                        >
                          <button
                            className="mt-0.5 shrink-0"
                            aria-label={`Toggle milestone ${m.title}`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-500 hover:text-amber-400" />
                            )}
                          </button>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <span
                                className={`text-xs sm:text-sm font-bold ${
                                  isCompleted ? 'line-through text-slate-400' : 'text-white'
                                }`}
                              >
                                {m.title}
                              </span>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                  m.difficulty === 'Beginner'
                                    ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30'
                                    : m.difficulty === 'Intermediate'
                                    ? 'bg-sky-950/50 text-sky-300 border-sky-500/30'
                                    : 'bg-purple-950/50 text-purple-300 border-purple-500/30'
                                }`}
                              >
                                {m.difficulty} Milestone
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {m.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Mentor Pro Tip Callout Box */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 via-slate-900/50 to-blue-950/30 border border-cyan-500/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wide mb-1">
                    Mentor Pro-Tip for Phase {phase.id}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{phase.proTip}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
