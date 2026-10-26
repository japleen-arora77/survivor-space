
/**
 * File: main.jsx
 * Purpose: Entry point for the Survivor: Space React application.
 * Owner: Team Lead.
 * Responsibilities: Loads Bootstrap, shared game styles and the root component.
 */

import React from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";
import "./styles/global.css";
import "./styles/game-shell.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
