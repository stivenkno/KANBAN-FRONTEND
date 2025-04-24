import { createContext, useContext, useEffect, useState } from "react";
import { apiInstance } from "../services/apiInstance.js";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

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
  }, []);

  const createProject = async (projectData) => {
    try {
      const response = await apiInstance.post(
        "/projects/createproject",
        projectData
      );
      setProjects([...projects, response.data]);
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await apiInstance.delete(`/projects/deleteproject`, {
        data: { id_project: projectId },
      });
      setProjects(
        projects.filter((project) => project.id_project !== projectId)
      );
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, setProjects, createProject, deleteProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
