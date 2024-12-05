import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css";

const container = document.getElementById("root");
const root = createRoot(container); // Create a root

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
