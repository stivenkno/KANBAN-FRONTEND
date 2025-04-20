import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Register() {
  const { theme, toggleTheme } = useTheme();
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
      console.log(response.data);
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
          className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>

      {/* Formulario */}
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-md w-full max-w-md shadow-lg">
          <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-8">
            Create an account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
              onChange={handleChange}
              value={formData.username}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
              onChange={handleChange}
              value={formData.password}
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all"
            >
              Create account
            </button>
            <p className="text-center text-black dark:text-white mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
