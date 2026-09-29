import React from 'react';
import { X, Award, Shield, Crosshair, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { CERTIFICATION_ROADMAP } from '../data/roadmapData';

interface CertGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertGuideModal: React.FC<CertGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#091024] border border-cyan-500/40 shadow-2xl shadow-cyan-950 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                Career Roadmap Reference
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Industry Certifications Guide & Strategy
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Important Advice Callout */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-slate-300">
              <h4 className="font-bold text-amber-300 font-mono">
                The Golden Rule: Hands-on Skills First, Badges Second
              </h4>
              <p className="leading-relaxed">
                Certifications open doors through HR keyword filters, but your interview performance and technical homelab get you the offer. Do not spend thousands on expensive bootcamps. Focus first on completing free TryHackMe/PortSwigger labs before buying exam vouchers.
              </p>
            </div>
          </div>

          {/* Certifications by Tier */}
          <div className="space-y-5">
            {CERTIFICATION_ROADMAP.map((tier, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-mono font-bold text-slate-200">
                  {tier.tier.includes('Defensive') ? (
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                  ) : tier.tier.includes('Offensive') ? (
                    <Crosshair className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Shield className="w-4 h-4 text-cyan-400" />
                  )}
                  <span>{tier.tier}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {tier.certs.map((cert, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <h5 className="text-xs font-bold text-white font-mono">
                            {cert.name}
                          </h5>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                              cert.difficulty === 'Beginner'
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                                : cert.difficulty === 'Intermediate'
                                ? 'bg-sky-950/60 text-sky-300 border-sky-500/30'
                                : 'bg-purple-950/60 text-purple-300 border-purple-500/30'
                            }`}
                          >
                            {cert.difficulty}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {cert.focus}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Practical Recommended Timeline */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase">
              Recommended Certification Milestones
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span><strong className="text-white">Month 4–6:</strong> Complete CompTIA Security+ or Cisco CCST for foundational resume credential.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span><strong className="text-white">Month 8–10:</strong> Choose your first hands-on 24h practical exam (BTL1 for Blue Team, or eJPT for Red Team).</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span><strong className="text-white">Year 2+:</strong> Advance toward industry heavyweights (OSCP, CISSP, or Cloud Security specialties).</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
