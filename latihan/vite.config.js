import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173,
    open: true, // otomatis buka browser
  },
  build: {
    outDir: "dist",
  },
});
