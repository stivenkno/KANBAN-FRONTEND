import { createContext, useContext, useEffect, useState } from "react";
import { apiInstance } from "../services/apiInstance.js";

const ColumnsContext = createContext();

export const ColumnsProvider = ({ children }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
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

  return (
    <ColumnsContext.Provider value={{ columns, setColumns }}>
      {children}
    </ColumnsContext.Provider>
  );
};

export const useColumns = () => useContext(ColumnsContext);
