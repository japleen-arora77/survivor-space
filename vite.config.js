
/**
 * File: vite.config.js
 * Purpose: Configures Vite for the Survivor: Space React application.
 * Owner: Team Lead.
 * Responsibilities: Enables React support during development and builds.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
