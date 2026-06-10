import { useEffect, useState } from "react";
import api from "../api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function WeightTracker() {
  const [weights, setWeights] = useState([]);
  const [weight, setWeight] = useState("");

  useEffect(() => {
    fetchWeights();
  }, []);

  const fetchWeights = async () => {
    try {
      const response = await api.get("/weight");
      setWeights(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addWeight = async () => {
    if (!weight) return;

    try {
      const response = await api.post("/weight", {
        weight: Number(weight),
      });

      setWeights([...weights, response.data]);
      setWeight("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWeight = async (id) => {
    try {
      await api.delete(`/weight/${id}`);

      setWeights(weights.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = weights.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    weight: item.weight,
  }));

  const latestWeight =
    weights.length > 0 ? weights[weights.length - 1].weight : "-";

  const startingWeight =
    weights.length > 0 ? weights[0].weight : "-";

  const progress =
    weights.length > 1
      ? (weights[0].weight - weights[weights.length - 1].weight).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-[#081224] text-white p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Weight Tracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-3xl bg-purple-500/20 border border-purple-400/20 p-6">
          <p className="text-slate-300">Current Weight</p>
          <h2 className="text-4xl font-bold mt-3">
            {latestWeight} kg
          </h2>
        </div>

        <div className="rounded-3xl bg-cyan-500/20 border border-cyan-400/20 p-6">
          <p className="text-slate-300">Starting Weight</p>
          <h2 className="text-4xl font-bold mt-3">
            {startingWeight} kg
          </h2>
        </div>

        <div className="rounded-3xl bg-green-500/20 border border-green-400/20 p-6">
          <p className="text-slate-300">Progress</p>
          <h2 className="text-4xl font-bold mt-3">
            {progress} kg
          </h2>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Add Weight Entry
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            placeholder="Enter weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-slate-800 p-4 rounded-2xl outline-none flex-1"
          />

          <button
            onClick={addWeight}
            className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-3 rounded-2xl font-bold text-slate-900"
          >
            Save Weight
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Weight Progress Graph
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#22d3ee"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6">
          Weight History
        </h2>

        <div className="space-y-4">
          {weights.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-slate-800 p-4 rounded-2xl"
            >
              <div>
                <p className="text-xl font-bold">
                  {item.weight} kg
                </p>
                <p className="text-slate-400">
                  {new Date(item.date).toLocaleDateString("en-IN")}
                </p>
              </div>

              <button
                onClick={() => deleteWeight(item._id)}
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeightTracker;
