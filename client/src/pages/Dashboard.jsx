import { useState, useEffect } from "react";

import workoutData from "../data/workoutData";

import WorkoutCard from "../components/WorkoutCard";

function Dashboard() {

  const [workouts, setWorkouts] = useState(() => {

    const savedWorkouts = localStorage.getItem("workouts");

    return savedWorkouts
      ? JSON.parse(savedWorkouts)
      : workoutData;

  });

  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {

    localStorage.setItem(
      "workouts",
      JSON.stringify(workouts)
    );

  }, [workouts]);

  const totalWorkouts = workouts.length;

  const totalCalories = workouts.reduce(
    (sum, workout) => sum + workout.calories,
    0
  );

  const totalDuration = workouts.reduce(
    (sum, workout) => sum + workout.duration,
    0
  );

  const addWorkout = () => {

    if (!name || !calories || !duration) {
      return;
    }

    const newWorkout = {
      id: Date.now(),
      name,
      calories: Number(calories),
      duration: Number(duration),
    };

    setWorkouts([...workouts, newWorkout]);

    setName("");
    setCalories("");
    setDuration("");

  };

  const deleteWorkout = (id) => {

    const updatedWorkouts = workouts.filter(
      (workout) => workout.id !== id
    );

    setWorkouts(updatedWorkouts);

  };

  const editWorkout = (updatedWorkout) => {

    const updatedWorkouts = workouts.map((workout) =>
      workout.id === updatedWorkout.id
        ? updatedWorkout
        : workout
    );

    setWorkouts(updatedWorkouts);

  };

  return (
    <div className="p-4 md:p-6">

      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h3 className="text-xl font-semibold">
            Workouts
          </h3>

          <p className="text-3xl mt-4 font-bold text-cyan-400">
            {totalWorkouts}
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h3 className="text-xl font-semibold">
            Calories Burned
          </h3>

          <p className="text-3xl mt-4 font-bold text-cyan-400">
            {totalCalories}
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h3 className="text-xl font-semibold">
            Total Duration
          </h3>

          <p className="text-3xl mt-4 font-bold text-cyan-400">
            {totalDuration} mins
          </p>

        </div>

      </div>

      {/* Add Workout */}
      <div className="bg-slate-800 p-6 rounded-2xl mb-10">

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Add Workout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Workout Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          />

          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          />

          <input
            type="number"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          />

        </div>

        <button
          onClick={addWorkout}
          className="mt-6 w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 transition px-6 py-3 rounded-xl font-bold text-slate-900"
        >
          Add Workout
        </button>

      </div>

      {/* Workout List */}
      <div>

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Recent Workouts
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
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
