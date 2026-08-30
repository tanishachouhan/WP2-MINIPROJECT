# 🌱 Smart Sugarcane Irrigation Dashboard

A React mini-project prototype (No. 12 — *Integrated Smart Sugarcane Irrigation
Dashboard*) built as a **complete decision-support UI** using static/mock data
only. No backend, database, or real APIs are used — this is meant for a
college project demo and viva.

## What it shows

| Page | Route | What it covers |
|---|---|---|
| **Login** | `/login` | User ID + password login with client-side validation (gate to the rest of the app) |
| **Sign Up** | `/signup` | New account form — name, ID, farm location, password + confirm, with live validation |
| **Dashboard** (landing page) | `/` | KPIs, most urgent irrigation alert, pump schedule, weather — the "integrated" decision-support view (No. 12) |
| **Farm & Plots** | `/farm-plots` | Farmer details + plot cards (area, soil type, crop stage, location) — (No. 1) |
| **Irrigation Prediction** | `/irrigation-prediction` | Select a plot → recommended next irrigation date, soil moisture, weather, confidence score — (No. 4) |
| **AI Advisory** | `/ai-advisory` | Farmer-friendly irrigation/weather/crop/pump advisories, English + Marathi toggle, filter chips — (No. 10) |

## Authentication (prototype only — no backend)

- `/login` and `/signup` are the only routes reachable while logged out; every
  other route redirects to `/login` (see `RequireAuth` in `App.jsx`).
- On successful login/signup, a flag is written to `localStorage` and the app
  treats the session as authenticated — there is no real server, user
  database, or password hashing behind this. It exists purely to demonstrate
  **form validation** and **protected routing** for the viva.
- A "🚪 Logout" button sits at the bottom of the sidebar and clears the flag.

### Validation rules

| Field | Rule |
|---|---|
| User ID | Required, minimum 4 characters (letters, numbers, `.`, `_`) |
| Password | Required, minimum 8 characters **and** at least one special character |
| Confirm Password (sign up) | Must match Password |
| Farm Location (sign up) | Required |

The password field on the Sign Up page also shows a live checklist (✅/⭕)
that updates as the user types, so the rules are visible before they submit.
Validation logic lives in `src/utils/validators.js` and is shared by both
forms.

## Tech stack

- React 18 + Vite
- React Router v6 (client-side routing, plus a simple `RequireAuth` guard)
- Plain CSS with a small design-token system (no UI framework, easy to explain)
- All data lives in `src/data/mockData.js` — nothing is fetched from a server
- Login/session state uses `localStorage` — no real backend

## Folder structure

```
sugarcane-dashboard/
├── src/
│   ├── components/       # Reusable UI pieces (Sidebar, Topbar, PlotCard,
│   │                      #  WeatherCard, StatCard, AdvisoryCard, StatusBadge)
│   ├── pages/             # Login, Signup, Dashboard, FarmPlots,
│   │                      #  IrrigationPrediction, AIAdvisory (+ Auth.css)
│   ├── utils/validators.js # Shared ID/password validation helpers
│   ├── data/mockData.js   # All static/mock data (farmer, plots, weather,
│   │                      #  predictions, advisories, pump schedule)
│   ├── App.jsx            # Route definitions + auth guard + sidebar layout
│   ├── main.jsx           # React + Router entry point
│   └── index.css          # Global design tokens & shared styles
├── index.html
├── package.json
└── vite.config.js
```

## How to run

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Notes for viva

- Every number (soil moisture %, prediction dates, confidence %, weather) is
  **hard-coded sample data** in `mockData.js` — swapping this for a real
  sensor/API feed later would not require changing the page components.
- The "AI prediction" and "AI advisory" are simulated with fixed
  text/values — there is no real machine-learning model running.
- Login/Sign Up is a **client-side validation demo**, not real authentication
  — there is no server, so anyone can "sign up" with any details that pass
  validation. It is there to demonstrate controlled forms, `useState`,
  conditional error rendering, and protected routing.
- Navigation uses React Router's `<NavLink>` so the active page is
  highlighted automatically in the sidebar.
- The layout is fully responsive — the sidebar collapses into a slide-out
  menu below ~900px width.
