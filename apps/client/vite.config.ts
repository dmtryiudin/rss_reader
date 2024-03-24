import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), TanStackRouterVite()],
//   server: {
//     proxy: {
//       '/api': {
//         target: process.env.VITE_API_URL,
//         changeOrigin: true,
//       },
//     },
//   },
// });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react(), TanStackRouterVite()],
    server: {
      proxy: {
        '/api': {
          target: env.API_URL,
          changeOrigin: true,
        },
      },
    },
  });
});
