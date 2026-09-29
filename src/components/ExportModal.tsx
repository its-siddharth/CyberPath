import React, { useState } from 'react';
import { X, Copy, Check, Printer, FileText } from 'lucide-react';
import { Phase } from '../data/roadmapData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  phases: Phase[];
  completedItemIds: Set<string>;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  phases,
  completedItemIds,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Build markdown string
  const generateMarkdown = () => {
    let md = `# Cybersecurity Roadmap for Beginners — Study Checklist\n\n`;
    md += `*Generated on: ${new Date().toLocaleDateString()}*\n\n`;
    md += `**Overall Progress**: ${completedItemIds.size} items completed\n\n`;
    md += `---\n\n`;

    phases.forEach((p) => {
      md += `## Phase 0${p.id}: ${p.title} (${p.timeframe})\n`;
      md += `> ${p.tagline}\n\n`;
      md += `${p.description}\n\n`;

      md += `### Key Topics & Skills\n`;
      p.topics.forEach((t) => {
        const checked = completedItemIds.has(t.id) ? 'x' : ' ';
        md += `- [${checked}] **${t.name}** [${t.category.toUpperCase()}]: ${t.description}\n`;
      });
      md += `\n`;

      md += `### Essential Tools to Learn\n`;
      p.tools.forEach((tool) => {
        const checked = completedItemIds.has(tool.id) ? 'x' : ' ';
        md += `- [${checked}] **${tool.name}** (${tool.category}): ${tool.practicalUse}\n`;
      });
      md += `\n`;

      md += `### Milestones & Action Goals\n`;
      p.milestones.forEach((m) => {
        const checked = completedItemIds.has(m.id) ? 'x' : ' ';
        md += `- [${checked}] **${m.title}** (${m.difficulty}): ${m.description}\n`;
      });
      md += `\n`;

      md += `### Recommended Free Platforms\n`;
      p.resources.forEach((r) => {
        md += `- [${r.name}](${r.url}) - ${r.platform} (${r.badge}): ${r.description}\n`;
      });
      md += `\n---\n\n`;
    });

    md += `\n*Note: Consistency > Intensity. Practice daily in authorized virtual labs.*\n`;
    return md;
  };

  const markdownContent = generateMarkdown();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-[#091024] border border-cyan-500/40 shadow-2xl shadow-cyan-950 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                Export & Notes Sync
              </span>
              <h3 className="text-base font-bold text-white">
                Roadmap Markdown Checklist
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

        {/* Text Area Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-xs text-slate-400 mb-3">
            Copy this formatted Markdown checklist into Obsidian, Notion, Logseq, or your personal study notes. Checkmarks reflect your current progress.
          </p>
          <textarea
            readOnly
            value={markdownContent}
            rows={14}
            className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300 focus:outline-none focus:border-cyan-500 selection:bg-cyan-500/30"
          />
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print View</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:brightness-110 transition-all shadow-md shadow-cyan-950"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-950" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
