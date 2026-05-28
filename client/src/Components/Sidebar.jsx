import {
  FaDumbbell,
  FaChartLine,
  FaRunning,
  FaUser,
  FaTimes,
  FaRobot
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-64 bg-slate-800
          border-r border-slate-700 p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-cyan-400">
  Fitness Tracker AI
</h1>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <div className="space-y-4">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
          >
            <FaChartLine />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/workouts"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-700 transition"
          >
            <FaDumbbell />
            <span>Workouts</span>
          </Link>

          <Link
            to="/analytics"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-700 transition"
          >
            <FaRunning />
            <span>Analytics</span>
          </Link>

          <Link
           to="/ai-workout"
           onClick={() => setIsOpen(false)}
           className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-700 transition"
          >
           <FaRobot />
           <span>AI Coach</span>
          </Link>

          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-700 transition"
          >
            <FaUser />
            <span>Profile</span>
          </Link>

          

        </div>

      </div>
    </>
  );
}

export default Sidebar;
