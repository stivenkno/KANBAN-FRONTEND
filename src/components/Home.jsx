import { useState } from "react";
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
import { useTheme } from "../context/ThemeContext"; // ajusta la ruta si es diferente

const menuItems = [
  { label: "Tablero", icon: <FaThLarge /> },
  { label: "Tareas", icon: <FaTasks /> },
  { label: "Calendario", icon: <FaCalendarAlt /> },
  { label: "Mensajes", icon: <FaEnvelope /> },
  { label: "Inbox", icon: <FaInbox /> },
  { label: "Reportes", icon: <FaChartBar /> },
  { label: "Equipo", icon: <FaUsers /> },
];

const Sidebar = ({ selected, setSelected, isOpen, toggle }) => {
  const { theme, toggleTheme } = useTheme();

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

const Tablero = ({ textColor }) => (
  <div className={`p-6 ${textColor}`}>
    <h2 className="text-2xl font-bold mb-4">Tablero de proyecto</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {["Por hacer", "En progreso", "En revisión", "Completado"].map((col) => (
        <div key={col} className="bg-[#1a1a1a] rounded-lg p-4 text-white">
          <h3 className="text-lg font-semibold mb-2">{col}</h3>
        </div>
      ))}
    </div>
  </div>
);

const Main = ({ selected, textColor }) => {
  switch (selected) {
    case "Tablero":
      return <Tablero textColor={textColor} />;
    default:
      return (
        <div className={`p-6 ${textColor}`}>
          <h2 className="text-2xl font-bold">{selected}</h2>
          <p className="text-sm text-gray-400">Contenido en construcción...</p>
        </div>
      );
  }
};

export default function Home() {
  const [selected, setSelected] = useState("Tablero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "bg-[#0e0e0e]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className={`${bgColor} min-h-screen flex`}>
      <Sidebar
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
