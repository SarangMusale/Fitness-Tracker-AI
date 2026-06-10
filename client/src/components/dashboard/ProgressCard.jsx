import { motion } from "framer-motion";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressCard({
  title = "Weekly Progress",
  percentage = 70,
  label = "7 / 10 workouts",
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-xl"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-slate-400 mb-2">Progress</p>

          <h2 className="text-2xl font-bold mb-3">
            {title}
          </h2>

          <p className="text-slate-300">
            {label}
          </p>
        </div>

        <div className="w-32 h-32">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "#ffffff",
              pathColor: "#22d3ee",
              trailColor: "#1e293b",
            })}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default ProgressCard;
