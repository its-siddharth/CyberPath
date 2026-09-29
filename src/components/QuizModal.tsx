import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';
import { Phase, QuizQuestion } from '../data/roadmapData';

interface QuizModalProps {
  phase: Phase | null;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ phase, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!phase) return null;

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return; // locked once submitted
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    let score = 0;
    phase.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const allAnswered = phase.quiz.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#091024] border border-cyan-500/40 shadow-2xl shadow-cyan-950 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                Phase 0{phase.id} Knowledge Check
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {phase.title} Self-Assessment
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Questions */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {phase.quiz.map((q, qIndex) => {
            const selectedOpt = selectedAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = isAnswered && selectedOpt === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="shrink-0 w-6 h-6 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">
                    {qIndex + 1}
                  </span>
                  <p className="text-sm font-medium text-slate-100 leading-snug">
                    {q.question}
                  </p>
                </div>

                <div className="space-y-2 pl-8">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = selectedOpt === optIndex;
                    let optionStyle =
                      'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-900';

                    if (submitted) {
                      if (optIndex === q.correctAnswer) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      } else {
                        optionStyle = 'bg-slate-950/30 border-slate-800/60 text-slate-500';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-cyan-950/60 border-cyan-500 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.3)]';
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleSelect(q.id, optIndex)}
                        disabled={submitted}
                        className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && optIndex === q.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Reveal */}
                {submitted && (
                  <div
                    className={`mt-2 p-3 rounded-lg text-xs leading-relaxed border ${
                      isCorrect
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    <span className="font-bold uppercase font-mono">
                      {isCorrect ? 'Correct! ' : 'Explanation: '}
                    </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
          {submitted ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Award
                  className={`w-5 h-5 ${
                    score === phase.quiz.length ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                />
                <span className="text-sm font-bold text-white font-mono">
                  Score: {score} / {phase.quiz.length} (
                  {Math.round((score / phase.quiz.length) * 100)}%)
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {score === phase.quiz.length
                  ? 'Mastery demonstrated!'
                  : 'Review the explanations and try again!'}
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">
              Answer all {phase.quiz.length} questions to check your score.
            </span>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {submitted ? (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                disabled={!allAnswered}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all shadow-md ${
                  allAnswered
                    ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 hover:brightness-110 shadow-cyan-900/50'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                Submit Answers
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
