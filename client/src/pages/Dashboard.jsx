import { useState, useEffect } from "react";
import api from "../api";

import WorkoutCard from "../components/WorkoutCard";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCard from "../components/dashboard/StatsCard";
import ProgressCard from "../components/dashboard/ProgressCard";

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [latestWeight, setLatestWeight] = useState(null);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    fetchWorkouts();
     fetchLatestWeight();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await api.get("/workouts");
      setWorkouts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLatestWeight = async () => {
  try {
    const response = await api.get("/weight");

    if (response.data.length > 0) {
      const latest = response.data[response.data.length - 1];
      setLatestWeight(latest.weight);
    }
  } catch (error) {
    console.log(error);
  }
};

  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce(
    (sum, workout) => sum + workout.calories,
    0
  );

  const totalDuration = workouts.reduce(
    (sum, workout) => sum + workout.duration,
    0
  );

  const addWorkout = async () => {
    if (!name || !calories || !duration) {
      return;
    }

    const newWorkout = {
      name,
      calories: Number(calories),
      duration: Number(duration),
    };

    try {
      const response = await api.post("/workouts", newWorkout);

      setWorkouts([response.data, ...workouts]);

      setName("");
      setCalories("");
      setDuration("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      await api.delete(`/workouts/${id}`);

      const updatedWorkouts = workouts.filter(
        (workout) => workout._id !== id
      );

      setWorkouts(updatedWorkouts);
    } catch (error) {
      console.log(error);
    }
  };

  const editWorkout = async (updatedWorkout) => {
    try {
      const response = await api.put(
        `/workouts/${updatedWorkout._id}`,
        updatedWorkout
      );

      const updatedWorkouts = workouts.map((workout) =>
        workout._id === updatedWorkout._id
          ? response.data
          : workout
      );

      setWorkouts(updatedWorkouts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#081224] text-white p-4 md:p-6">
      <div className="mb-8">
        <WelcomeCard
          name="Sarang"
          goal="Fat Loss"
          level="Intermediate"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon="🔥"
          title="Current Streak"
          value="12 Days"
          subtitle="Keep going"
          color="orange"
        />
<StatsCard
  icon="⚖️"
  title="Current Weight"
  value={latestWeight ? `${latestWeight} kg` : "- kg"}
  subtitle="Target: 82 kg"
  color="purple"
/>
       
        <StatsCard
          icon="🏋️"
          title="Total Workouts"
          value={totalWorkouts}
          subtitle={`${totalCalories} kcal burned`}
          color="cyan"
        />

        <StatsCard
          icon="⏱️"
          title="Training Time"
          value={`${totalDuration} min`}
          subtitle="Total duration"
          color="green"
        />
      </div>

      <div className="mb-8">
        <ProgressCard
          title="Weekly Goal"
          percentage={70}
          label="7 / 10 sessions completed"
        />
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold mb-6">
          ➕ Add Workout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Workout Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-800 p-4 rounded-2xl outline-none"
          />

          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="bg-slate-800 p-4 rounded-2xl outline-none"
          />

          <input
            type="number"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-slate-800 p-4 rounded-2xl outline-none"
          />
        </div>

        <button
          onClick={addWorkout}
          className="mt-6 bg-cyan-500 hover:bg-cyan-400 transition px-8 py-3 rounded-2xl font-bold text-slate-900"
        >
          Add Workout
        </button>
      </div>

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-cyan-500/20 border border-white/10 p-6">
        <h2 className="text-2xl font-bold mb-2">
          🤖 AI Fitness Coach
        </h2>

        <p className="text-slate-300">
          Complete your workouts and track your weight to unlock
          personalized AI progress reviews.
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">
          Recent Workouts
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              deleteWorkout={deleteWorkout}
              editWorkout={editWorkout}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
