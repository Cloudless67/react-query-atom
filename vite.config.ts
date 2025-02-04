import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [dts({ tsconfigPath: "./tsconfig.app.json" })],
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
