import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Библиотеки меняются реже кода сайта: отдельные чанки дольше живут в кэше браузера.
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return undefined;
          if (/\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return "motion";
          if (/\/(react|react-dom|scheduler|react-router|react-router-dom|@remix-run)\//.test(id)) return "react";
          return "vendor";
        },
      },
    },
  },
  ssr: {
    // Пакеты с CSS и ESM-only зависимостями собираются вместе с SSR-бандлом.
    noExternal: ["@fontsource-variable/inter"],
  },
});
