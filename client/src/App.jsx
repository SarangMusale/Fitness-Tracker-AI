import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { FaBars } from "react-icons/fa";

import Sidebar from "./Components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Workouts from "./pages/Workouts";
import Profile from "./pages/Profile";
import AIWorkout from "./pages/AIWorkout";

function App() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>

      <div className="flex bg-slate-900 text-white min-h-screen">

        {/* Sidebar */}
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {/* Main Content */}
        <div className="flex-1">

          {/* Mobile Navbar */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800">

            <button
              onClick={() => setIsOpen(true)}
              className="text-2xl"
            >
              <FaBars />
            </button>

            <h1 className="text-2xl font-bold text-cyan-400">
              Fitness Tracker AI
            </h1>

          </div>

          {/* Routes */}
          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/workouts"
              element={<Workouts />}
            />

            <Route
              path="/ai-workout"
              element={<AIWorkout />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;
