import { motion } from "framer-motion";

function StatsCard({ icon, title, value, subtitle, color = "cyan" }) {
  const colors = {
    cyan: "from-cyan-500/20 to-blue-500/10 text-cyan-300",
    green: "from-green-500/20 to-emerald-500/10 text-green-300",
    orange: "from-orange-500/20 to-yellow-500/10 text-orange-300",
    purple: "from-purple-500/20 to-pink-500/10 text-purple-300",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ duration: 0.2 }}
      className={`rounded-3xl bg-gradient-to-br ${colors[color]} border border-white/10 p-5 shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className="w-3 h-3 rounded-full bg-current opacity-70" />
      </div>

      <p className="text-slate-300 text-sm mb-1">{title}</p>

      <h2 className="text-3xl font-bold text-white">
        {value}
      </h2>

      {subtitle && (
        <p className="text-slate-400 text-sm mt-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default StatsCard;
