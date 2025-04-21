import { useProjects } from "../context/ProjectsContext";

export default function Projectos({ textColor, selected, setSelected }) {
  const { projects, setprojects } = useProjects();

  console.log(projects);

  const handleProjectClick = (e) => {
    e.preventDefault();

    const projectId = e.target.getAttribute("id_project");
    localStorage.setItem("id_project", projectId);

    setSelected("Tablero");
  };

  return (
    <div className={`p-6 ${textColor}`}>
      <div className="flex w-full  justify-between mb-[10px]">
        <h2 className="text-2xl font-bold ">Proyectos</h2>
        <div className="flex justify-center items-center gap-4 rounded bg-white text-black p-2 max-h-[40px] min-w-[150px]">
          <div className="text-[30px] flex justify-center items-center h-full">
            +
          </div>
          <div className="h-full flex justify-center items-center">
            Nuevo Proyecto
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-4 min-h-[500px]">
        {projects.map((project) => (
          <div
            key={project.id_project}
            id_project={project.id_project}
            className="bg-[#1a1a1a] rounded-lg p-4 text-white cursor-pointer hover:bg-gray-700"
            onClick={handleProjectClick}
          >
            <h3 className="text-lg font-semibold mb-2">
              {project.title_project}
            </h3>
            {/*
              <div className="grid grid-cols-1 gap-2 ">
                {columns
                  .filter((column) => column.id_project === project.id_project)
                  .map((column) => (
                    <div
                      key={column.id_column}
                      className="bg-gray-700 rounded-lg p-4 text-white"
                    >
                      <h4 className="text-sm font-semibold mb-2">
                        {column.title_column}
                      </h4>
                      <ul className="list-disc pl-4"></ul>
                    </div>
                  ))}
              </div>
              */}
          </div>
        ))}
      </div>
    </div>
  );
}
