import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // ajusta la ruta si es diferente
import { useProjects } from "../context/ProjectsContext";
import { useColumns } from "../context/ColumnsContext";

import apiInstance from "../services/apiInstance";
import Main from "./Main";
import SideBar from "./SideBar";
import { IoNotifications } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";

export default function Home() {
  const [selected, setSelected] = useState("Tablero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const { projects, setProjects } = useProjects();
  const { columns, setColumns } = useColumns();

  console.log("Componente Home");
  console.log("Proyectos:", projects);
  console.log("Columnas:", columns);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiInstance.get("/projects/getprojects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProjects();

    const fetchColumns = async () => {
      try {
        const response = await apiInstance.get("/columns/getcolumns");
        setColumns(response.data);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchColumns();
  }, []);

  const bgColor = theme === "dark" ? "bg-[#0e0e0e]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className={`${bgColor} min-h-screen flex`}>
      <SideBar
        selected={selected}
        setSelected={setSelected}
        isOpen={sidebarOpen}
        toggle={toggleSidebar}
      />

      <div className="flex-1 ml-0">
        <div className="md:hidden p-4">
          <button onClick={toggleSidebar} className={`${textColor} text-2xl`}>
            <FaBars />
          </button>
        </div>

        <main className="overflow-y-auto">
          <header className="flex justify-between items-center px-9 py-4 shadow-md shadow-black/10 bg-white">
            <input
              type="text"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar..."
            />
            <div className="flex gap-4 justify-center items-center">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </button>
              <IoNotifications className={`${textColor} text-2xl`} />
              <IoSettingsOutline className={`${textColor} text-2xl`} />
              <FaCircleUser className={`${textColor} text-2xl`} />
            </div>
          </header>

          <Main
            selected={selected}
            setSelected={setSelected}
            textColor={textColor}
          />
        </main>
      </div>
    </div>
  );
}
