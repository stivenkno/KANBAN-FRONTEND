import React from "react";

import { useProjects } from "../context/ProjectsContext";
import { useColumns } from "../context/ColumnsContext";
import { useTasks } from "../context/TasksContext";

import { VscAdd } from "react-icons/vsc";
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export default function ColumnContainer(column, tasks) {
  console.log("column", column);
  console.log("tasks", tasks);
  const { setColumns, createColumn, deleteColumn } = useColumns();
  const { setTasks, createTask, deleteTask } = useTasks();
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
    <div
      id_column={column.id_column}
      key={column.id_column}
      className="column bg-[#313030] rounded-lg p-4 text-white cursor-pointer min-h-[300px] min-w-[300px]  "
    >
      <div className="w-full max-h-[50px] flex justify-between items-start ">
        <div className="flex gap-2">
          {column.title_column}
          <div className="rounded-full w-5 h-5 text-center bg-gray-600 ">
            {tasks.filter((task) => task.id_column == column.id_column).length}
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
                <p className="" onClick={() => handleDeleteTask(task.id_task)}>
                  <MdDelete className="hover:text-red-600 cursor-pointer" />
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
