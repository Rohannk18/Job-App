import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Job-App/",
  plugins: [react()],
  server: {
    port: 5173
  }
});
