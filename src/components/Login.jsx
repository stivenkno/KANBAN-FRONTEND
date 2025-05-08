import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { setToken } from "../services/apiInstance";
import { useProjects } from "../context/ProjectsContext";
import { useColumns } from "../context/ColumnsContext";
import { useTasks } from "../context/TasksContext";

export default function Login() {
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { projects, setProjects, fetchProjects } = useProjects();
  const { columns, setColumns, fetchColumns } = useColumns();
  const { tasks, setTasks, fetchTasks } = useTasks();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://kanban-backend-pqc0.onrender.com/auth/login",
        formData
      );
      if (response.status === 200) {
        const token = response.data.token;
        if (setToken(token)) {
          await fetchProjects();
          await fetchColumns();
          await fetchTasks();
          navigate("/home");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white dark:bg-black text-black dark:text-white p-4 flex justify-between items-center shadow-sm">
        <Link to="/" className="text-xl font-bold">
          KANBAN
        </Link>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>

      {/* Formulario */}
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-md w-full max-w-md shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-center text-black dark:text-white">
            Sign In
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all"
            >
              Sign In
            </button>
            <p className="text-center text-sm text-black dark:text-white pt-4">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
