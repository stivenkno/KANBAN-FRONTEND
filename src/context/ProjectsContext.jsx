import { createContext, useContext, useEffect, useState } from "react";
import { apiInstance } from "../services/apiInstance.js";

const ProjectsContext = createContext({
  projects: null,
  loading: true,
  error: null,
  setProjects: () => {},
  createProject: () => {},
  deleteProject: () => {},
});

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(null); // null mientras carga
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Dentro de ProjectsProvider

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await apiInstance.get("/projects/getprojects");
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error("Error al obtener los proyectos:", err);
      setError("No se pudieron cargar los proyectos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchProjects(); // solo si hay token
    }
  }, []);

  const createProject = async (projectData) => {
    try {
      const response = await apiInstance.post(
        "/projects/createproject",
        projectData
      );
      setProjects((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await apiInstance.delete(`/projects/deleteproject`, {
        data: { id_project: projectId },
      });
      setProjects((prev) =>
        prev.filter((project) => project.id_project !== projectId)
      );
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        setProjects,
        fetchProjects,
        createProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
