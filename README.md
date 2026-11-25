# AccuKnox - CNAPP Dynamic Dashboard

> Dynamic, JSON-driven Cloud Native Application Protection Platform (CNAPP) dashboard built with React, Redux Toolkit, and Tailwind CSS for the AccuKnox Frontend Trainee assignment.

🔗 **Live Demo:** [https://accuknox-cnapp-dashboard-eight.vercel.app/](https://accuknox-cnapp-dashboard-eight.vercel.app/)

---

## ⚡ Key Features

- **JSON-Driven Dashboard:** Dynamically generates categories (CSPM, CWPP, Registry Scan, Ticket) and widgets from a modular JSON schema.
- **Dynamic Widget Management:**
  - **Add Widgets:** Slide-over drawer with categorized tabs (`CSPM`, `CWPP`, `Image`, `Ticket`), multi-checkbox toggling, and custom widget creation (name & content).
  - **Remove Widgets:** Instant removal via hover cross (`X`) icon on each card or by unchecking from the drawer.
- **Interactive Header Controls:**
  - Real-time global widget search.
  - Interactive time-window filter dropdown (`Last 2 days`, `Last 24 hours`, etc.).
  - Refresh button with animated telemetry re-sync.
  - Export to PDF and shareable link generation.
- **State Persistence:** Centralized Redux Toolkit store with automatic `localStorage` persistence.
- **Automated Testing:** 100% passing Vitest unit & component test suite.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React
- **State Management:** Redux Toolkit, React-Redux
- **Testing:** Vitest, React Testing Library, JSDOM
- **Deployment:** Vercel

---

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/ArmanAmreliya/accuknox-cnapp-dashboard.git
cd accuknox-cnapp-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Run tests
npm test

# 5. Build for production
npm run build
```
