import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // ajusta la ruta si es diferente
import { useProjects } from "../context/ProjectsContext";
import { useColumns } from "../context/ColumnsContext";
import { useNavigate } from "react-router-dom";
import apiInstance from "../services/apiInstance";
import Main from "./Main";
import SideBar from "./SideBar";

export default function Home() {
  const [selected, setSelected] = useState("Tablero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

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
          <Main selected={selected} textColor={textColor} />
        </main>
      </div>
    </div>
  );
}
