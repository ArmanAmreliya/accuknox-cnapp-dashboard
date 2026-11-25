# AccuKnox - CNAPP Dynamic Dashboard (Frontend Assignment)

> **Frontend Developer Assignment Submission**  
> **Role:** FE Trainee (Front End Trainee)  
> **Tech Stack:** React 18, Vite, Redux Toolkit, React-Redux, Tailwind CSS, Lucide React, Vitest, Testing Library.  
> **Live Deployment:** Ready for Vercel / GitHub Pages.

---

## 🚀 Features Implemented

1. **Dynamic Dashboard via JSON Model (`src/data/dashboardData.js`)**
   - Clean, modular JSON structure containing multiple security categories (`CSPM Executive Dashboard`, `CWPP Dashboard`, `Registry Scan`, `Ticket Dashboard`).
   - Dynamic widget configurations with donut charts, multi-segment progress bars, empty state graphs, and custom text cards.

2. **State Management via Redux Toolkit (`src/store/dashboardSlice.js`)**
   - Centralized global store with persistent state saved in `localStorage`.
   - Actions to add widgets dynamically, remove individual widgets, uncheck/check widgets via category drawer, search widgets globally, and reset state.

3. **Slide-over Add Widget Drawer (+ Personalization Modal)**
   - Click top bar `+ Add Widget` or category-level `+ Add Widget` button.
   - Categorized tabs matching the assignment design: `CSPM`, `CWPP`, `Image` (Registry Scan), `Ticket`.
   - Dynamic checkboxes to uncheck existing widgets or check them to restore.
   - Dynamic form allowing users to enter custom **Widget Name** and **Widget Text / Content**.
   - Changes reflected across the dashboard upon clicking **Confirm**.

4. **Direct Removal with Cross Icon (`X`)**
   - Every individual widget features an accessible remove icon on hover, allowing instant removal from that category.

5. **Real-time Global Widget Search**
   - Top navigation bar includes a live search bar that instantly filters widgets across all categories by name and text content.
   - Displays clean empty states if no widgets match in a category.

6. **Automated Testing Suite (Vitest + React Testing Library)**
   - Unit tests covering Redux Toolkit state transitions (add, remove, search, batch update).
   - Component tests covering widget rendering and event handling.

---

## 🛠️ Project Structure

```text
accuknox-cnapp-dashboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── DonutChart.jsx          # SVG Donut Chart with legends & center summary
│   │   │   ├── ProgressBarChart.jsx    # Segmented horizontal risk bar
│   │   │   └── EmptyWidgetState.jsx    # 'No Graph data available!' graph placeholder
│   │   ├── AddWidgetCard.jsx           # Dotted placeholder '+ Add Widget' card
│   │   ├── AddWidgetDrawer.jsx         # Slide-over sidebar with tabs & widget toggling/creation
│   │   ├── CategorySection.jsx         # Section renderer for each security category
│   │   ├── DashboardHeader.jsx         # Title, buttons, time range dropdown
│   │   ├── Navbar.jsx                  # Top navigation bar with breadcrumbs & search
│   │   ├── WidgetCard.jsx              # Widget container with title & cross (X) button
│   │   └── WidgetCard.test.jsx         # Component unit test
│   ├── data/
│   │   └── dashboardData.js            # Initial JSON schema and sample dashboard data
│   ├── store/
│   │   ├── dashboardSlice.js           # Redux slice (reducers, localStorage persistence)
│   │   ├── dashboardSlice.test.js      # Redux reducer tests
│   │   └── store.js                    # Redux store configuration
│   ├── App.jsx                         # Main dashboard layout
│   ├── index.css                       # Tailwind CSS directives
│   ├── main.jsx                        # React root entry point
│   └── setupTests.js                   # Vitest DOM environment setup
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 💻 Steps to Run Locally

### 1. Clone repository
```bash
git clone <your-github-repo-url>
cd accuknox-cnapp-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run test suite
```bash
npm test
```

### 5. Create production build
```bash
npm run build
```

---

## 🌐 Deploying to Vercel

### Option 1: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Via GitHub & Vercel Dashboard (Recommended)
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/accuknox-cnapp-dashboard.git
   git branch -M main
   git push -u origin main
   ```
2. Log into [vercel.com](https://vercel.com).
3. Click **Add New Project** -> **Import Git Repository**.
4. Framework preset will automatically detect **Vite**.
5. Click **Deploy**. Your live dashboard URL will be generated in under a minute!
