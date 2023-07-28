import { resolve } from "path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve("src"),
      "@": resolve("assets"),
      wails: resolve("wailsjs"),
    },
  },
  plugins: [solid()],
});
