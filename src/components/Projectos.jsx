import { useProjects } from "../context/ProjectsContext";
import { MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";

export default function Projectos({ selected, setSelected }) {
  const { projects, createProject, deleteProject } = useProjects();
  const [loading, setLoading] = useState(false);

  const handleProjectClick = (projectId) => {
    localStorage.setItem("id_project", projectId);
    setSelected("Tablero");
  };

  const handleCreateProject = async () => {
    const name = prompt("Nombre del nuevo proyecto:");
    if (name) {
      setLoading(true);
      await createProject({ title_project: name });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-zinc-900 dark:to-black p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-zinc-800 dark:text-white">
            Mis Proyectos
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Visualiza y administra tus proyectos fácilmente
          </p>
        </div>

        <button
          onClick={handleCreateProject}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60 transition"
        >
          <FiPlus className="text-xl" />
          {loading ? "Creando..." : "Nuevo Proyecto"}
        </button>
      </div>

      {/* Grid de Proyectos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects === null ? (
          <div className="col-span-full text-zinc-500 dark:text-zinc-400">
            Cargando proyectos...
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full text-zinc-500 dark:text-zinc-400">
            No tienes proyectos aún.
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id_project}
              onClick={() => handleProjectClick(project.id_project)}
              className="group bg-white dark:bg-zinc-800 rounded-2xl shadow-sm hover:shadow-xl border border-transparent hover:border-teal-400 transition cursor-pointer p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-white group-hover:text-teal-500 truncate">
                  {project.title_project}
                </h3>
                <p className="text-sm text-zinc-500 mt-1 dark:text-zinc-400 ">
                  ID: {project.id_project}
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(project.id_project);
                  }}
                  className="text-zinc-400 hover:text-red-500 transition"
                  title="Eliminar proyecto"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
