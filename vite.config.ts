import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './',
  plugins: [react()],
  define: {
    __DEBUG__: process.env.NODE_ENV === "development",
  },
  server: {
    port: 3000,
  },
});
