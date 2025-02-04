import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "atom",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "react",
        },
      },
    },
  },
});
