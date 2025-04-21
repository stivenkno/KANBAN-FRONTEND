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

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
