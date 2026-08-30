import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import FarmPlots from "./pages/FarmPlots";
import IrrigationPrediction from "./pages/IrrigationPrediction";
import AIAdvisory from "./pages/AIAdvisory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

const AUTH_KEY = "agrisense_auth";

function RequireAuth({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_KEY) === "true"
  );

  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  function handleAuthSuccess() {
    localStorage.setItem(AUTH_KEY, "true");
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={handleAuthSuccess} />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Signup onSignup={handleAuthSuccess} />
          )
        }
      />

      <Route
        path="/*"
        element={
          <RequireAuth isAuthenticated={isAuthenticated}>
            <div className="app-shell">
              <Sidebar open={sidebarOpen} onClose={closeSidebar} onLogout={handleLogout} />

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
          </RequireAuth>
        }
      />
    </Routes>
  );
}
