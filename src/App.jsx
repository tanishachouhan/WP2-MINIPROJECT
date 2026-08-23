import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import FarmPlots from "./pages/FarmPlots";
import IrrigationPrediction from "./pages/IrrigationPrediction";
import AIAdvisory from "./pages/AIAdvisory";
import "./App.css";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard onMenuClick={openSidebar} />} />
          <Route path="/farm-plots" element={<FarmPlots onMenuClick={openSidebar} />} />
          <Route
            path="/irrigation-prediction"
            element={<IrrigationPrediction onMenuClick={openSidebar} />}
          />
          <Route path="/ai-advisory" element={<AIAdvisory onMenuClick={openSidebar} />} />
        </Routes>
      </main>
    </div>
  );
}
