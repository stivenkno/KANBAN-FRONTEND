import { createContext, useContext, useEffect, useState } from "react";
import { apiInstance } from "../services/apiInstance.js";

const ColumnsContext = createContext();

export const ColumnsProvider = ({ children }) => {
  const [columns, setColumns] = useState(null);

  const fetchColumns = async () => {
    try {
      const response = await apiInstance.get("/columns/getcolumns");
      setColumns(response.data);
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchColumns(); // solo si hay token
    }
  }, []);

  const createColumn = async (columnData) => {
    try {
      const response = await apiInstance.post(
        "/columns/createcolumn",
        columnData
      );
      setColumns([...columns, response.data]);
    } catch (error) {
      console.error("Error al crear la columna:", error);
    }
  };

  const deleteColumn = async (columnId) => {
    console.log("columnIddelete", columnId);
    try {
      await apiInstance.delete(`/columns/deletecolumn`, {
        data: { id_column: columnId }, // ✅ aquí el cambio importante
      });
      setColumns(columns.filter((column) => column.id_column !== columnId));
    } catch (error) {
      console.error("Error al eliminar la columna:", error);
    }
  };

  const updateColumns = async (columnsData) => {
    try {
      const response = await apiInstance.put(
        "/columns/updatecolumn",
        columnsData
      );

      console.log("Columnas actualizadas correctamente");
    } catch (error) {
      console.error("Error al actualizar columnas:", error);
    }
  };

  return (
    <ColumnsContext.Provider
      value={{
        columns,
        setColumns,
        fetchColumns,
        createColumn,
        deleteColumn,
        updateColumns,
      }}
    >
      {children}
    </ColumnsContext.Provider>
  );
};

export const useColumns = () => useContext(ColumnsContext);
