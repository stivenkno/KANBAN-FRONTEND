import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { ColumnsProvider } from "./context/ColumnsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectsProvider>
      <ColumnsProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ColumnsProvider>
    </ProjectsProvider>
  </StrictMode>
);
