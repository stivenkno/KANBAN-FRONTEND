import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaThLarge,
  FaTasks,
  FaCalendarAlt,
  FaEnvelope,
  FaInbox,
  FaChartBar,
  FaUsers,
  FaCog,
} from "react-icons/fa";

const menuItems = [
  { label: "Tablero", icon: <FaThLarge /> },
  { label: "Proyectos", icon: <FaTasks /> },
  { label: "Calendario", icon: <FaCalendarAlt /> },
  { label: "Mensajes", icon: <FaEnvelope /> },
  { label: "Inbox", icon: <FaInbox /> },
  { label: "Reportes", icon: <FaChartBar /> },
  { label: "Equipo", icon: <FaUsers /> },
];

const Sidebar = ({ selected, setSelected, isOpen, toggle }) => {
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const bgColor = theme === "dark" ? "bg-[#111111]" : "bg-gray-100";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const hoverColor =
    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300";
  const activeColor = theme === "dark" ? "bg-gray-700" : "bg-gray-300";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";

  return (
    <aside
      className={`${bgColor} ${textColor} w-60 min-h-screen flex flex-col justify-between 
          fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out
          md:static md:translate-x-0 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
    >
      <div>
        <div className="text-xl font-bold px-6 py-4 flex justify-between items-center md:block">
          <span>Kanban Pro</span>
          <button className="md:hidden" onClick={toggle}>
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setSelected(item.label);
                toggle();
              }}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${hoverColor} ${
                selected === item.label ? activeColor : ""
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            Logout
          </button>
        </nav>
      </div>
      <div
        className={`px-6 py-4 border-t ${borderColor} flex items-center gap-3`}
      >
        <FaCog />
        <span>Configuración</span>
      </div>
    </aside>
  );
};

export default Sidebar;
