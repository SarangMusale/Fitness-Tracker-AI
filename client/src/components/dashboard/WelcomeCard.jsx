import { motion } from "framer-motion";

function WelcomeCard({ name = "Sarang", goal = "Fat Loss", level = "Intermediate" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 border border-white/10 p-6 md:p-8 shadow-2xl"
    >
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        <p className="text-slate-300 mb-2">Welcome back</p>

        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {name} 👋
        </h1>

        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/20">
            Goal: {goal}
          </span>

          <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/20">
            Level: {level}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeCard;
