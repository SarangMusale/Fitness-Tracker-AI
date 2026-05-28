import { Link } from "react-router-dom";
import {
  FaRobot,
  FaChartLine,
  FaDumbbell,
  FaBolt,
} from "react-icons/fa";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-slate-950 to-purple-500/10" />

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <nav className="flex items-center justify-between mb-20">
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">
            Fitness Tracker AI
          </h1>

          <Link
            to="/dashboard"
            className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-3 rounded-xl font-bold text-slate-950"
          >
            Open App
          </Link>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full mb-6">
              <FaRobot />
              <span>AI-Powered Fitness Platform</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Track workouts.
              <span className="text-cyan-400"> Get smarter plans.</span>
            </h2>

            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-8 leading-8">
              A modern fitness dashboard with workout tracking, analytics,
              progress visualization, and Gemini AI-powered workout
              recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="bg-cyan-500 hover:bg-cyan-400 transition px-7 py-4 rounded-xl font-bold text-slate-950 text-center"
              >
                Get Started
              </Link>

              <Link
                to="/ai-workout"
                className="border border-slate-700 hover:border-cyan-400 transition px-7 py-4 rounded-xl font-bold text-center"
              >
                Try AI Coach
              </Link>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 mb-2">Workouts</p>
                <h3 className="text-3xl font-bold text-cyan-400">24</h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 mb-2">Calories</p>
                <h3 className="text-3xl font-bold text-green-400">8.4k</h3>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5 mb-4">
              <p className="text-slate-400 mb-3">AI Recommendation</p>
              <p className="text-slate-200 leading-7">
                Based on your goal, a 5-day Push Pull Legs split with progressive
                overload and moderate cardio is recommended.
              </p>
            </div>

            <div className="h-32 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center">
              <p className="text-slate-200 font-semibold">
                Analytics Preview
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-24">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <FaDumbbell className="text-cyan-400 text-3xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Workout CRUD</h3>
            <p className="text-slate-400">
              Add, edit, delete, and track workouts easily.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <FaChartLine className="text-cyan-400 text-3xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-slate-400">
              Visualize calories, duration, and training trends.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <FaRobot className="text-cyan-400 text-3xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Gemini AI</h3>
            <p className="text-slate-400">
              Generate personalized workout plans using AI.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <FaBolt className="text-cyan-400 text-3xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Fast UI</h3>
            <p className="text-slate-400">
              Built with React, Vite, and Tailwind CSS.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Landing;
