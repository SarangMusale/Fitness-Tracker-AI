import { useEffect, useState } from "react";
import api from "../api";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
    experience: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");

      setProfile({
        name: response.data.name || "",
        email: response.data.email || "",
        age: response.data.age || "",
        height: response.data.height || "",
        weight: response.data.weight || "",
        goal: response.data.goal || "",
        experience: response.data.experience || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      const response = await api.put("/profile", {
        age: Number(profile.age),
        height: Number(profile.height),
        weight: Number(profile.weight),
        goal: profile.goal,
        experience: profile.experience,
      });

      setProfile({
        name: response.data.name || "",
        email: response.data.email || "",
        age: response.data.age || "",
        height: response.data.height || "",
        weight: response.data.weight || "",
        goal: response.data.goal || "",
        experience: response.data.experience || "",
      });

      setMessage("Profile updated successfully");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Profile
      </h1>

      <div className="bg-slate-800 p-6 rounded-2xl max-w-3xl">
        {message && (
          <p className="mb-6 text-cyan-400 font-semibold">
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={profile.name}
            disabled
            className="bg-slate-700 p-4 rounded-xl outline-none text-slate-400"
          />

          <input
            name="email"
            value={profile.email}
            disabled
            className="bg-slate-700 p-4 rounded-xl outline-none text-slate-400"
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={profile.age}
            onChange={handleChange}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          />

          <input
            name="height"
            type="number"
            placeholder="Height in cm"
            value={profile.height}
            onChange={handleChange}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          />

          <input
            name="weight"
            type="number"
            placeholder="Weight in kg"
            value={profile.weight}
            onChange={handleChange}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          />

          <select
            name="goal"
            value={profile.goal}
            onChange={handleChange}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          >
            <option value="">Select Goal</option>
            <option>Fat Loss</option>
            <option>Muscle Gain</option>
            <option>Body Recomposition</option>
            <option>Strength</option>
          </select>

          <select
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            className="bg-slate-700 p-4 rounded-xl outline-none"
          >
            <option value="">Experience Level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <button
          onClick={saveProfile}
          className="mt-6 bg-cyan-500 hover:bg-cyan-400 transition px-6 py-3 rounded-xl font-bold text-slate-900"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
