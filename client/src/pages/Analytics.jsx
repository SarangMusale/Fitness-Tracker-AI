import { useEffect, useState } from "react";
import api from "../api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

function Analytics() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await api.get("/workouts");
      setWorkouts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = workouts.map((workout) => ({
    name: workout.name,
    calories: workout.calories,
    duration: workout.duration,
  }));

  const totalWorkouts = workouts.length;

  const totalCalories = workouts.reduce(
    (sum, workout) => sum + workout.calories,
    0
  );

  const totalDuration = workouts.reduce(
    (sum, workout) => sum + workout.duration,
    0
  );

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold">Total Workouts</h3>
          <p className="text-3xl mt-4 font-bold text-cyan-400">
            {totalWorkouts}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold">Total Calories</h3>
          <p className="text-3xl mt-4 font-bold text-cyan-400">
            {totalCalories}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold">Total Duration</h3>
          <p className="text-3xl mt-4 font-bold text-cyan-400">
            {totalDuration} mins
          </p>
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="bg-slate-800 p-6 rounded-2xl">
          <p className="text-slate-300">
            No workout data yet. Add workouts from the Dashboard to see analytics.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-slate-800 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">
              Calories Burned
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#06b6d4"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">
              Workout Duration
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="duration"
                    fill="#22c55e"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
