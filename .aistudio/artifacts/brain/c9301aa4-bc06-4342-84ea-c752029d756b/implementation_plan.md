# Interactive Cybersecurity Roadmap for Beginners

A modern, responsive, dark-themed interactive single-page application that guides aspiring cybersecurity professionals from ground zero to junior job readiness across 5 structured phases, featuring granular progress tracking for topics, tools, and milestones, specialized Red vs. Blue team tracks, search filtering, and local storage persistence.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The implementation plan incorporates your confirmed preferences from the interactive questionnaire:
> - **Career Track**: Generalist path with explicit Red Team (Offensive) and Blue Team (Defensive) sub-tracks and badges.
> - **Tracking Granularity**: Granular tracking enabling users to check off individual topics, tools, resources, and capstone milestones, with automatic roll-up into phase progress and overall sticky progress bar.

- **Confirmed Decision 1**: Dual Red/Blue Team specialization view toggle allowing learners to see the shared core path while highlighting specialized defensive vs. offensive tradecraft.
- **Confirmed Decision 2**: Granular checklist state persisted in browser `localStorage`, with export/import and reset safeguards.

---

## 1. Overview & Core Concept

- **What It Does**: Provides an intuitive, structured vertical timeline and interactive curriculum covering 5 sequential phases: Foundations (0–2 months), Core Skills (2–5 months), Hands-on Practice (5–8 months), Intermediate Level (8–12 months), and Junior Ready / Portfolio Building (12+ months).
- **Target Audience**: Self-taught cybersecurity newcomers, computer science students, IT support specialists transitioning to security, and junior analysts seeking a clear, vetted learning pathway.
- **Key Value**: Eliminates "tutorial hell" by delivering curated, battle-tested free platforms (TryHackMe, PortSwigger, OverTheWire, LetsDefend, Hack The Box), hands-on lab milestones, and tangible portfolio projects instead of overwhelming theory.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Explore the Roadmap**:
   - Learner arrives at an atmospheric dark cyber interface with a sticky header displaying overall progress (`0%`, `0 / 35 completed`).
   - Learner reads the quick intro and can filter by track (All, Generalist, Red Team, Blue Team) or search for specific tools/topics (e.g., "Wireshark", "Active Directory", "PortSwigger").
2. **Interact with Phases**:
   - Each phase card displays its phase number, title, estimated duration, summary, and a progress meter.
   - Expanding a phase reveals four dedicated tabs or clean modular sections:
     - **Key Skills & Topics** (individual interactive check items)
     - **Tools to Master** (categorized with quick cheat-sheet tooltips and check items)
     - **Free Recommended Platforms** (direct links with domain badges: TryHackMe, PortSwigger, OverTheWire, etc.)
     - **Phase Milestone / Capstone Goal** (achievement check with criteria for completion)
3. **Track & Persist Progress**:
   - Ticking off any sub-item dynamically updates the phase progress bar and the top sticky global progress bar with smooth CSS/motion easing.
   - Learner can add personal study notes to each phase.
   - All progress auto-saves to `localStorage` and can be exported as a backup JSON or printed in a clean print-ready format.

### Visual Identity & Theme
- **Aesthetic Direction**: High-end cyber engineering cockpit—deep obsidian background, subtle grid matrix hairline overlay, precision borders, and radiant neon cyan (`#00f5ff`) and electric sapphire (`#3b82f6`) focal points.
- **Color Palette**:
  - Background Canvas: Deep Obsidian Slate (`#0a0e17`) with darker panel background (`#0e1424`)
  - Structural Borders: Hairline translucent borders (`rgba(56, 189, 248, 0.15)`)
  - Neon Accents: Neon Cyan (`#00f0ff` / `#38bdf8`) for active states and primary milestones; Electric Indigo (`#6366f1`) for intermediate stages; Emerald (`#10b981`) for completed items; Crimson Amber (`#f59e0b`) for Red Team offensive callouts; Azure Blue (`#0284c7`) for Blue Team defensive callouts.
  - Typography: Clean Sans (`Plus Jakarta Sans` / system clean sans) for headers and body; Tabular Monospace (`JetBrains Mono` / system mono) for tools, durations, commands, and metrics.
- **Top Bar Contract**:
  - Zone 1 (Brand): Single text wordmark `CyberRoute // 2026` with subtle shield icon
  - Zone 2 (Navigation / View Filters): `All Tracks`, `Red Team (Offensive)`, `Blue Team (Defensive)`, `Certifications Guide`
  - Zone 3 (Action): Progress summary pill (`X% Completed`) + `Reset / Export` menu
- **Anti-Slop Discipline**:
  - No candy pill sandwiches on cards; metadata uses unboxed text with `·` typographic dividers.
  - No fake execution engine tickers or fake latency telemetry in the footer.
  - No decorative emojis prefixing every line; functional icons only for interactive actions.
  - Meaningful motivational footer: *"Consistency > Intensity — The attacker only has to succeed once; the defender must succeed every time. Master the fundamentals one day at a time."*

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: React 19 + Tailwind v4 + Lucide Icons + Motion vs Single Plain HTML File**
  - *Chosen Approach*: Build a modular, ultra-responsive React SPA with Tailwind v4, Motion animations, and Lucide React icons, structured cleanly so all interactive states (localStorage persistence, search, accordions, notes drawer, export/import) work reliably without bugs.
  - *Why*: Provides fluid micro-interactions, robust state management for 35+ granular checklist items, and zero script loading race conditions.
  - *Alternatives Considered*: A single monolithic HTML file with inline vanilla JavaScript would be prone to DOM desynchronization when handling complex nested checkboxes and localStorage migrations.
- **Decision 2: Granular Sub-Task + Tool Tracking with Rollup**
  - *Chosen Approach*: Allow learners to mark individual topics, tools, and milestones as complete, while also providing a "Mark Whole Phase Complete" convenience action.
  - *Why*: Directly aligns with user preference for granular milestone tracking and provides immediate micro-rewards as learners study.
- **Decision 3: Zero-Mock Free Resources**
  - *Chosen Approach*: Link directly to authentic, genuinely free, industry-standard learning materials (TryHackMe free rooms, PortSwigger Web Security Academy free labs, OverTheWire Bandit, Professor Messer YouTube series, CyberDefenders, LetsDefend free tier).

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            STICKY TOP PROGRESS BAR                          │
│   [Brand Logo]   ·   [Global Completion: 42%]   ·   [Track Filters]   ·   [Actions] │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         HERO BANNER & QUICK STATS                           │
│   - Title: Cybersecurity Roadmap for Beginners                              │
│   - Description & Study Strategy Guide (Consistency > Intensity)           │
│   - Search Bar (filter by tool, skill, or platform across all 5 phases)    │
│   - Track Selector: [All Phases] [Core] [Red Team Focus] [Blue Team Focus]  │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          VERTICAL TIMELINE CONTAINER                        │
│                                                                             │
│  Phase 1: Foundations (0–2 Mo)       ─── [Progress: 100%] [✓ Completed]     │
│  ├─ Key Topics: Networking, Linux CLI, Windows OS, Security Fundamentals    │
│  ├─ Tools: Wireshark, Nmap, curl, OpenSSH                                   │
│  ├─ Resources: OverTheWire Bandit, Professor Messer, NetworkChuck           │
│  └─ Milestone: Local VM Lab setup & packet inspection verification          │
│                                                                             │
│  Phase 2: Core Skills (2–5 Mo)       ─── [Progress: 60%]  [In Progress]     │
│  ├─ Key Topics: OWASP Top 10, Python Security Scripting, Firewalls/IDS      │
│  ├─ Tools: Burp Suite Community, Python 3, ffuf, Shodan                     │
│  ├─ Resources: TryHackMe Pre-Security, PortSwigger Academy (Apprentice)     │
│  └─ Milestone: Custom Python Port Scanner & first 10 PortSwigger labs       │
│                                                                             │
│  Phase 3: Hands-on Practice (5–8 Mo) ─── [Progress: 20%]  [Expandable]      │
│  Phase 4: Intermediate Level (8–12 Mo)                                      │
│  Phase 5: Junior Ready & Portfolio (12+ Mo)                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RESOURCE MODAL / NOTES DRAWER / FOOTER                   │
│   - Personal Study Notes per Phase (stored in localStorage)                 │
│   - Certifications Guide Overview (Security+, BTL1, eJPT, PNPT, CEH advice) │
│   - Motivational Quote: "Consistency > Intensity"                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State (`src/types/roadmap.ts`)
- `Phase`: `id`, `number`, `title`, `duration`, `description`, `trackBadge`, `topics[]`, `tools[]`, `resources[]`, `milestone`, `certSuggestions[]`
- `TopicItem`: `id`, `title`, `description`, `track` (`general` | `red` | `blue`)
- `ToolItem`: `id`, `name`, `category`, `description`, `isEssential`
- `ResourceItem`: `id`, `name`, `url`, `type` (`platform` | `course` | `lab` | `docs`), `isFree`
- `MilestoneItem`: `id`, `title`, `description`, `deliverable`
- `UserProgress`: `completedItemIds: Set<string>`, `phaseNotes: Record<string, string>`, `lastActivePhaseId: string`

### Interactive Component & State Mapping
- `App.tsx`: Manages root layout, sticky navigation bar, search term filter, track filter, and syncs progress state with `localStorage`.
- `ProgressBar.tsx`: Renders sticky header progress indicator with percentage, remaining count, and animated gradient fill.
- `PhaseCard.tsx`: Collapsible accordion card featuring animated status ring, item checklists, tools list, external resource links, and study notes toggle.
- `SearchFilterBar.tsx`: Real-time debounced search across all phase topics, tools, and platforms with counter badges.
- `CertGuideModal.tsx`: Helpful reference guide detailing beginner certifications (CompTIA Security+, BTL1, eJPT) and study roadmaps.
- `ExportImportModal.tsx`: Allows users to download their progress JSON or import a previous backup.
