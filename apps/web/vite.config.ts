import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://stackoverflow.com/a/66389044
export default ({ mode }: { mode: any }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: Number(process.env.VITE_DEV_PORT) || 5173,
    },
    preview: {
      port: Number(process.env.VITE_PREVIEW_PORT) || 4173,
    },
  });
};
