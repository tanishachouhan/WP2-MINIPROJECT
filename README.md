# 🌱 Smart Sugarcane Irrigation Dashboard

A React mini-project prototype (No. 12 — *Integrated Smart Sugarcane Irrigation
Dashboard*) built as a **complete decision-support UI** using static/mock data
only. No backend, database, or real APIs are used — this is meant for a
college project demo and viva.

## What it shows

| Page | Route | What it covers |
|---|---|---|
| **Dashboard** (landing page) | `/` | KPIs, most urgent irrigation alert, plot preview, pump schedule, weather, recent advisories — the "integrated" decision-support view (No. 12) |
| **Farm & Plots** | `/farm-plots` | Farmer details + plot cards (area, soil type, crop stage, location) — (No. 1) |
| **Irrigation Prediction** | `/irrigation-prediction` | Select a plot → recommended next irrigation date, soil moisture, weather, confidence score — (No. 4) |
| **AI Advisory** | `/ai-advisory` | Farmer-friendly irrigation/weather/crop/pump advisories, English + Marathi toggle, filter chips — (No. 10) |

## Tech stack

- React 18 + Vite
- React Router v6 (client-side routing between the 4 pages)
- Plain CSS with a small design-token system (no UI framework, easy to explain)
- All data lives in `src/data/mockData.js` — nothing is fetched from a server

## Folder structure

```
sugarcane-dashboard/
├── src/
│   ├── components/       # Reusable UI pieces (Sidebar, Topbar, PlotCard,
│   │                      #  WeatherCard, StatCard, AdvisoryCard, StatusBadge)
│   ├── pages/             # One file per page (Dashboard, FarmPlots,
│   │                      #  IrrigationPrediction, AIAdvisory)
│   ├── data/mockData.js   # All static/mock data (farmer, plots, weather,
│   │                      #  predictions, advisories, pump schedule)
│   ├── App.jsx            # Route definitions + sidebar layout
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
- Navigation uses React Router's `<NavLink>` so the active page is
  highlighted automatically in the sidebar.
- The layout is fully responsive — the sidebar collapses into a slide-out
  menu below ~900px width.
