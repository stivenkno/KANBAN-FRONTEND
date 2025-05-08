import { createContext, useContext, useEffect, useState } from "react";
import { apiInstance } from "../services/apiInstance.js";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await apiInstance.get("/tasks/gettasks");
      console.log("accediendo al context task");
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchTasks(); // solo si hay token
    }
  }, []);

  const createTask = async (taskData) => {
    try {
      const response = await apiInstance.post("/tasks/createtask", taskData);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await apiInstance.delete(`/tasks/deletetask`, {
        data: { id_task: taskId },
      });
      setTasks(tasks.filter((task) => task.id_task !== taskId));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, createTask, deleteTask, fetchTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
