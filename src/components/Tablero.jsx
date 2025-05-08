import { useState, useMemo, useEffect } from "react";
import { useProjects } from "../context/ProjectsContext";
import { useColumns } from "../context/ColumnsContext";
import { useTasks } from "../context/TasksContext";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import ColumnContainer from "./ColumnContainer";

const Tablero = ({ textColor }) => {
  const { projects } = useProjects();
  const { columns, setColumns, createColumn, deleteColumn } = useColumns();
  const { tasks, setTasks, createTask, deleteTask } = useTasks();

  const [activeColumn, setActiveColumn] = useState(null);

  useEffect(() => {
    console.log("columns", columns);
  }, [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const id_project = localStorage.getItem("id_project");

  // Filtrar columnas por proyecto y mantener el orden actualizado
  const filteredColumns = useMemo(() => {
    return columns.filter((column) => column.id_project == id_project);
  }, [columns, id_project]);

  const columnsId = useMemo(
    () => filteredColumns.map((column) => column.id_column),
    [filteredColumns]
  );

  const title_project =
    projects.find((project) => project.id_project == id_project)
      ?.title_project || "";

  const handleCreateColumn = () => {
    const nameColumn = prompt("Ingrese el nombre de la nueva columna:");
    if (!nameColumn) return;
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
    if (!nameTask) return;
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

  const onDragStart = (event) => {
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
    }
  };

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeColumnIndex = filteredColumns.findIndex(
      (col) => col.id_column === active.id
    );
    const overColumnIndex = filteredColumns.findIndex(
      (col) => col.id_column === over.id
    );

    if (activeColumnIndex === -1 || overColumnIndex === -1) return;

    console.log("Antes del orden:");
    console.log(filteredColumns.map((c) => c.id_column));

    const reordered = arrayMove(
      filteredColumns,
      activeColumnIndex,
      overColumnIndex
    );

    console.log("Después del orden:");
    console.log(reordered.map((c) => c.id_column));

    // Actualizamos el array global `columns` con el nuevo orden para este proyecto
    const newColumns = [
      ...columns.filter((col) => col.id_project != id_project), // otras columnas
      ...reordered, // columnas de este proyecto reordenadas
    ];

    setColumns(newColumns);
  };

  return (
    <div className={`p-6 ${textColor}`}>
      <div className="flex w-full justify-between mb-[10px]">
        <h2 className="text-2xl font-bold">{title_project}</h2>
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

      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-4 min-h-[calc(100vh-300px)] max-w-[calc(100vw-300px)] overflow-x-scroll absolute">
          <SortableContext items={columnsId}>
            {filteredColumns.map((column) => (
              <ColumnContainer key={column.id_column} column={column} />
            ))}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default Tablero;
