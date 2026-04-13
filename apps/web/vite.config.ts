import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: './tests/setup.js',
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      port: Number(env.VITE_DEV_PORT) || 5173,
    },

    preview: {
      port: Number(env.VITE_PREVIEW_PORT) || 4173,
    },
  };
});