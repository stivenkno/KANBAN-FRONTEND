import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Register() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://kanban-backend-pqc0.onrender.com/auth/register",
        formData
      );
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white dark:bg-zinc-900 text-black dark:text-white p-4 shadow-sm flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Kanban
        </Link>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </nav>

      {/* Background */}
      <div
        className="relative min-h-screen flex items-center justify-center 
        bg-gradient-to-tr from-teal-100 via-blue-200 to-purple-200 
        dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e] 
        overflow-hidden px-4 py-12 transition-all duration-1000 ease-in-out"
      >
        {/* Blob vibrante */}
        <div
          className="absolute w-[900px] h-[900px] bg-gradient-to-br 
          from-fuchsia-600 via-sky-500 to-teal-400 dark:from-purple-600 dark:via-indigo-500 dark:to-teal-500 
          rounded-full blur-[150px] opacity-25 -z-10 animate-pulse"
        ></div>

        {/* Glassmorphism Card */}
        <div
          className="w-full max-w-md backdrop-blur-xl bg-white/60 dark:bg-white/5 
          shadow-2xl rounded-2xl p-8 space-y-6 border border-white/20 dark:border-white/10"
        >
          <h2 className="text-center text-3xl font-extrabold text-zinc-800 dark:text-white">
            Create Account
          </h2>
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-300">
            Sign up to access your board
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="your_username"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold text-lg transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link to="/" className="font-semibold text-sky-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
