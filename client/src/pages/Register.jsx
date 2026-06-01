import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="bg-slate-800 p-8 rounded-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-cyan-400 mb-6">
          Register
        </h1>

        {error && (
          <p className="text-red-400 mb-4">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-700 p-4 rounded-xl outline-none mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-700 p-4 rounded-xl outline-none mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-700 p-4 rounded-xl outline-none mb-6"
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 transition p-4 rounded-xl font-bold text-slate-950"
        >
          Register
        </button>

        <p className="text-slate-400 mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
