import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { ColumnsProvider } from "./context/ColumnsContext";
import { TasksProvider } from "./context/TasksContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectsProvider>
      <ColumnsProvider>
        <TasksProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </TasksProvider>
      </ColumnsProvider>
    </ProjectsProvider>
  </StrictMode>
);
