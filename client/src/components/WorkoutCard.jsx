import { useState } from "react";

import {
  FaTrash,
  FaEdit,
  FaSave
} from "react-icons/fa";

function WorkoutCard({
  workout,
  deleteWorkout,
  editWorkout
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editedName, setEditedName] = useState(workout.name);
  const [editedCalories, setEditedCalories] = useState(workout.calories);
  const [editedDuration, setEditedDuration] = useState(workout.duration);

  const handleSave = () => {
    const updatedWorkout = {
      ...workout,
      name: editedName,
      calories: Number(editedCalories),
      duration: Number(editedDuration),
    };

    editWorkout(updatedWorkout);
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="bg-slate-700 p-2 rounded-lg outline-none w-full mr-4"
          />
        ) : (
          <h3 className="text-2xl font-bold text-cyan-400">
            {workout.name}
          </h3>
        )}

        <div className="flex gap-4 text-lg">
          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="text-cyan-400 hover:text-cyan-300 transition"
          >
            {isEditing ? <FaSave /> : <FaEdit />}
          </button>

          <button
            onClick={() => deleteWorkout(workout._id)}
            className="text-red-400 hover:text-red-300 transition"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="space-y-4 text-slate-300">
        <div>
          <p className="mb-2">Calories Burned</p>

          {isEditing ? (
            <input
              type="number"
              value={editedCalories}
              onChange={(e) => setEditedCalories(e.target.value)}
              className="bg-slate-700 p-2 rounded-lg outline-none w-full"
            />
          ) : (
            <p className="text-xl font-semibold">
              {workout.calories}
            </p>
          )}
        </div>

        <div>
          <p className="mb-2">Duration</p>

          {isEditing ? (
            <input
              type="number"
              value={editedDuration}
              onChange={(e) => setEditedDuration(e.target.value)}
              className="bg-slate-700 p-2 rounded-lg outline-none w-full"
            />
          ) : (
            <p className="text-xl font-semibold">
              {workout.duration} mins
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;
