import { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectsContext";
import { useColumns } from "../context/ColumnsContext";
import { useTasks } from "../context/TasksContext";
import { VscAdd } from "react-icons/vsc";
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Tablero = ({ textColor }) => {
  const { projects, setprojects } = useProjects();
  const { columns, setColumns, createColumn, deleteColumn } = useColumns();
  const { tasks, setTasks, createTask, deleteTask } = useTasks();

  const id_project = localStorage.getItem("id_project");

  const filteredColumns = columns.filter(
    (column) => column.id_project == id_project
  );

  const title_project = projects.map((project) => {
    if (project.id_project == id_project) {
      return project.title_project;
    }
  });

  const handleCreateColumn = () => {
    const nameColumn = prompt("Ingrese el nombre de la nueva columna:");
    const columnData = {
      title_column: nameColumn,
      id_project: id_project,
    };
    setColumns([...columns, columnData]);
    createColumn(columnData);
  };

  const handleDeleteColumn = (columnId) => {
    setColumns(columns.filter((column) => column.id_column !== columnId));
    deleteColumn(columnId);
  };

  const handleCreateTask = (id_columnn) => {
    const nameTask = prompt("Ingrese el nombre de la nueva tarea:");
    const taskData = {
      title_task: nameTask,
      id_column: id_columnn,
    };
    setTasks([...tasks, taskData]);
    createTask(taskData);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id_task !== taskId));
    deleteTask(taskId);
  };

  return (
    <div className={`p-6 ${textColor}`}>
      <div className="flex w-full  justify-between mb-[10px]">
        <h2 className="text-2xl font-bold ">{title_project}</h2>
        <div
          className="flex justify-center items-center gap-4 rounded bg-white text-black p-2 max-h-[40px] min-w-[150px] cursor-pointer"
          onClick={handleCreateColumn}
        >
          <div className="text-[30px] flex justify-center items-center h-full">
            +
          </div>
          <div className="h-full flex justify-center items-center">
            Nueva Tarea
          </div>
        </div>
      </div>
      <div className="flex gap-4 min-h-[calc(100vh-300px)] max-w-[calc(100vw-300px)]  overflow-x-scroll absolute ">
        {filteredColumns.map((column) => (
          <div
            id_column={column.id_column}
            key={column.id_column}
            className="column bg-[#313030] rounded-lg p-4 text-white cursor-pointer min-h-[300px] min-w-[300px]  "
          >
            <div className="w-full max-h-[50px] flex justify-between items-start ">
              <div className="flex gap-2">
                {column.title_column}
                <div className="rounded-full w-5 h-5 text-center bg-gray-600 ">
                  {
                    tasks.filter((task) => task.id_column == column.id_column)
                      .length
                  }
                </div>
              </div>

              <div className="flex justify-center items-center mb-2 gap-2">
                <p
                  className="text-white"
                  onClick={() => handleDeleteColumn(column.id_column)}
                >
                  <MdDelete className="hover:text-red-600 cursor-pointer" />
                </p>
                <VscAdd
                  className="w-5 h-5 hover:text-green-600 cursor-pointer"
                  onClick={() => handleCreateTask(column.id_column)}
                />
                <CiMenuKebab className="w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              {tasks.map((task) => {
                if (task.id_column == column.id_column) {
                  return (
                    <div
                      key={task.id_task}
                      className="bg-[#929292] rounded-lg p-4  cursor-pointer flex justify-between items-center"
                    >
                      {task.title_task}
                      <p
                        className=""
                        onClick={() => handleDeleteTask(task.id_task)}
                      >
                        <MdDelete className="hover:text-red-600 cursor-pointer" />
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tablero;
