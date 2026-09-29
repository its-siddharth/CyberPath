# 🛡️ Cybersecurity Roadmap for Beginners

An interactive, responsive single-page web application featuring a complete step-by-step roadmap from zero fundamentals to junior security professional.

---

## 🌐 Instant Live URL

You can open and use this application live right now at:
👉 **[Open Live Application](https://ais-pre-tyroj75rnzu3v6net7uela-12147341554.asia-east1.run.app)**

---

## 🚀 How to Publish to GitHub & GitHub Pages

To host this repository on your GitHub account with a personal `https://<your-username>.github.io/<repo-name>/` link:

### Step 1: Create a new repository on GitHub
1. Go to [GitHub.com/new](https://github.com/new).
2. Name your repository (for example: `cybersecurity-roadmap`).
3. Set visibility to **Public** and do not initialize with README (this project already has one).
4. Click **Create repository**.

### Step 2: Push this codebase to your repository
In your terminal in this project directory:

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "feat: complete interactive cybersecurity roadmap"

# Link to your new GitHub repository
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# Push the code
git push -u origin main
```

### Step 3: Enable GitHub Pages (Automated!)
1. In your GitHub repository, click **Settings** (gear icon) > **Pages** (in the left sidebar).
2. Under **Build and deployment** > **Source**, select:
   👉 **GitHub Actions**
3. The included workflow file (`.github/workflows/deploy.yml`) will automatically run `npm run build` and deploy your site.
4. Once completed (usually ~1 minute), GitHub will display your live public URL:
   `https://<your-username>.github.io/<your-repository-name>/`

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 📜 Features
- **5 Structured Phases**: Foundations (0–2m), Core Skills (2–5m), Hands-on Practice (5–8m), Intermediate Level (8–12m), and Junior Ready (12+m).
- **Interactive Progress Tracking**: Checklists saved in browser `localStorage`.
- **Track Filters**: Red Team (Offensive), Blue Team (Defensive), Core Fundamentals, and Full Spectrum.
- **Knowledge Self-Assessments**: 3-question mini-quizzes per phase with instant explanations.
- **Tools & Free Platforms**: Direct curated links to TryHackMe, PortSwigger Academy, OverTheWire, CyberDefenders, etc.
- **Export & Notes Sync**: Copy checklist markdown for Obsidian/Notion.
