import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vitePlugin as remix } from "@remix-run/dev";

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    port: 5173,
  },
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      external: ["@vanilla-extract/sprinkles/createUtils"], // Externalize problematic module
      output: {
        manualChunks(id) {
          if (id.includes("@rainbow-me/rainbowkit")) {
            return "rainbowkit"; // Create a separate chunk for rainbowkit
          }
        },
      },
    },
  },
});
