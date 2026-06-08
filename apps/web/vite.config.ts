import { defineConfig, loadEnv, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), visualizer({ template: 'flamegraph' }) as PluginOption],

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.js',
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      port: Number(env.VITE_DEV_PORT) || 5173,
      host: '0.0.0.0',
    },

    preview: {
      port: Number(env.VITE_PREVIEW_PORT) || 4173,
      host: '0.0.0.0',
    },
  };
});
