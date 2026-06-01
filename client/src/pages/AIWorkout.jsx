import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import api from "../api";

function AIWorkout() {
  const [days, setDays] = useState("");
  const [focusArea, setFocusArea] = useState("");
  const [notes, setNotes] = useState("");

  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePlan = async () => {
    if (!days || !focusArea) {
      setError("Please select workout days and focus area.");
      return;
    }

    setLoading(true);
    setError("");
    setPlan("");

    try {
      const response = await api.post("/ai/workout-plan", {
        profile,
        days,
        focusArea,
        notes,
      });

      setPlan(response.data.plan);
    } catch (err) {
      console.log(err.response?.data);

      if (err.response?.status === 429) {
        setError(
          "AI quota limit reached. Please wait a few minutes and try again."
        );
      } else if (err.response?.status === 403) {
        setError("Gemini API key is invalid or blocked.");
      } else if (err.response?.status === 404) {
        setError("Gemini model not found. Check model name.");
      } else {
        setError("AI request failed. Check console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        AI Workout Generator
      </h1>

      {profile && (
        <div className="bg-slate-800 p-6 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">
            Profile-Based AI Coach
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-slate-300">
            <p>Age: {profile.age}</p>
            <p>Height: {profile.height} cm</p>
            <p>Weight: {profile.weight} kg</p>
            <p>Goal: {profile.goal}</p>
            <p>Level: {profile.experience}</p>
          </div>
        </div>
      )}

      <div className="bg-slate-800 p-6 rounded-2xl mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          >
            <option value="">Workout Days</option>
            <option>3 Days</option>
            <option>4 Days</option>
            <option>5 Days</option>
            <option>6 Days</option>
          </select>

          <select
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          >
            <option value="">Focus Area</option>
            <option>Chest and Arms</option>
            <option>Back and Shoulders</option>
            <option>Legs</option>
            <option>Full Body</option>
            <option>Aesthetic Physique</option>
          </select>
        </div>

        <textarea
          placeholder="Any extra notes? Example: I do running, have knee pain, prefer morning workouts, want bigger arms..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="bg-slate-700 p-4 rounded-xl outline-none w-full mt-4 min-h-32"
        />

        <button
          onClick={generatePlan}
          disabled={loading}
          className="mt-6 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 transition px-6 py-3 rounded-xl font-bold text-slate-900"
        >
          {loading ? "Generating..." : "Generate Personalized AI Plan"}
        </button>

        {error && (
          <p className="mt-4 text-red-400">
            {error}
          </p>
        )}
      </div>

      {plan && (
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">
            AI Recommendation
          </h2>

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>
              {plan}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIWorkout;
