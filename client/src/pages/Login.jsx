import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      login(response.data.user, response.data.token);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-8 rounded-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-cyan-400 mb-6">
          Login
        </h1>

        {error && (
          <p className="text-red-400 mb-4">
            {error}
          </p>
        )}

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
          Login
        </button>

        <p className="text-slate-400 mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
