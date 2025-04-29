import { useProjects } from "../context/ProjectsContext";

export default function Projectos({ textColor, selected, setSelected }) {
  const { projects, setprojects, createProject, deleteProject } = useProjects();

  const handleProjectClick = (e) => {
    e.preventDefault();
    const projectId = e.target.getAttribute("id_project");
    localStorage.setItem("id_project", projectId);
    setSelected("Tablero");
  };

  const handleCreateProject = () => {
    const nameProject = prompt("Ingrese el nombre del nuevo proyecto:");
    createProject({
      title_project: nameProject,
    });
  };

  const handleDeleteProject = (projectId) => {
    deleteProject(projectId);
  };

  return (
    <div className={`p-6 min-h-screen bg-white dark:bg-black ${textColor}`}>
      <div className="flex w-full justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Proyectos
        </h2>

        <button
          onClick={handleCreateProject}
          className="flex items-center gap-2 rounded-md border border-black dark:border-white text-black dark:text-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300  "
        >
          <span className="text-2xl font-bold">+</span> Nuevo Proyecto
        </button>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        onClick={handleProjectClick}
      >
        {projects.map((project) => (
          <div
            key={project.id_project}
            id_project={project.id_project}
            className="bg-[#313030] rounded-xl p-4 flex justify-between items-center border border-neutral-800 hover:bg-neutral-700 transition cursor-pointer"
            onClick={handleProjectClick}
          >
            <h3 className="text-white font-semibold truncate">
              {project.title_project}
            </h3>

            <button
              className="text-gray-400 hover:text-red-500 transition"
              onClick={(e) => {
                e.stopPropagation(); // Evitar que también seleccione el proyecto
                handleDeleteProject(project.id_project);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
