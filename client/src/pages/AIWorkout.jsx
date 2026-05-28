import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function AIWorkout() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [days, setDays] = useState("");
  const [focusArea, setFocusArea] = useState("");

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePlan = async () => {
    if (!goal || !level || !days || !focusArea) {
      setError("Please fill all fields before generating a plan.");
      return;
    }

    setLoading(true);
    setError("");
    setPlan("");

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const prompt = `
Create a personalized workout plan.

User details:
Goal: ${goal}
Experience level: ${level}
Workout days per week: ${days}
Focus area: ${focusArea}

Give:
1. Best workout split
2. Weekly schedule
3. Exercises for each day
4. Sets and reps
5. Cardio recommendation
6. Recovery advice
7. Nutrition guidance

Keep it practical for an engineering student who goes to gym regularly.
`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      );

      const aiText =
        response.data.candidates[0].content.parts[0].text;

      setPlan(aiText);
    } catch (err) {
      console.error(err);
      setError("AI request failed. Check API key, internet, or console error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        AI Workout Generator
      </h1>

      <div className="bg-slate-800 p-6 rounded-2xl mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          >
            <option value="">Select Goal</option>
            <option>Muscle Gain</option>
            <option>Fat Loss</option>
            <option>Body Recomposition</option>
            <option>Strength</option>
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          >
            <option value="">Experience Level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

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

        <button
          onClick={generatePlan}
          disabled={loading}
          className="mt-6 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 transition px-6 py-3 rounded-xl font-bold text-slate-900"
        >
          {loading ? "Generating..." : "Generate Real AI Plan"}
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
            Gemini AI Recommendation
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
