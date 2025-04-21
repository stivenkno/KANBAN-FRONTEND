import { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectsContext";
import { useColumns } from "../context/ColumnsContext";
import { VscAdd } from "react-icons/vsc";
import { CiMenuKebab } from "react-icons/ci";

const Tablero = ({ textColor }) => {
  const { projects, setprojects } = useProjects();
  const { columns, setColumns } = useColumns();

  console.log("projects", projects);
  console.log("columns", columns);

  const id_project = localStorage.getItem("id_project");

  const filteredColumns = columns.filter(
    (column) => column.id_project == id_project
  );

  const title_project = projects.map((project) => {
    if (project.id_project == id_project) {
      return project.title_project;
    }
  });

  console.log(filteredColumns);

  return (
    <div className={`p-6 ${textColor}`}>
      <div className="flex w-full  justify-between mb-[10px]">
        <h2 className="text-2xl font-bold ">{title_project}</h2>
        <div className="flex justify-center items-center gap-4 rounded bg-white text-black p-2 max-h-[40px] min-w-[150px]">
          <div className="text-[30px] flex justify-center items-center h-full">
            +
          </div>
          <div className="h-full flex justify-center items-center">
            Nueva Tarea
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 min-h-[300px]">
        {filteredColumns.map((column) => (
          <div
            id_column={column.id_column}
            key={column.id_column}
            className="bg-[#1a1a1a] rounded-lg p-4 text-white cursor-pointer hover:bg-gray-700"
          >
            <div className="w-full max-h-[50px] flex justify-between items-start ">
              <div className="flex gap-2">
                {column.title_column}
                <div className="rounded-full w-5 h-5 text-center bg-gray-600 ">
                  {/*tasks.length*/}
                </div>
              </div>

              <div className="flex justify-center items-center">
                <VscAdd className="w-5 h-5" />
                <CiMenuKebab className="w-5 h-5" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 "></div>

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
};

export default Tablero;
