import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaChartLine,
  FaDumbbell,
  FaRunning,
  FaUser,
  FaRobot,
} from "react-icons/fa";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Workouts from "./pages/Workouts";
import Profile from "./pages/Profile";
import AIWorkout from "./pages/AIWorkout";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-64 bg-slate-800 border-r border-slate-700 p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-cyan-400">
            Fitness Tracker
          </h1>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white text-xl"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 rounded-xl bg-slate-700 hover:bg-slate-600 transition">
            <FaChartLine />
            <span>Dashboard</span>
          </Link>

          <Link to="/workouts" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-700 transition">
            <FaDumbbell />
            <span>Workouts</span>
          </Link>

          <Link to="/analytics" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-700 transition">
            <FaRunning />
            <span>Analytics</span>
          </Link>

          <Link to="/ai-workout" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-700 transition">
            <FaRobot />
            <span>AI Coach</span>
          </Link>

          <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-700 transition">
            <FaUser />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex bg-slate-900 text-white min-h-screen">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1">
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800">
            <button
              onClick={() => setIsOpen(true)}
              className="text-2xl"
            >
              <FaBars />
            </button>

            <h1 className="text-2xl font-bold text-cyan-400">
              Fitness Tracker
            </h1>
          </div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/ai-workout" element={<AIWorkout />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
