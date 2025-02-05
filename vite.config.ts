import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    react(), // ✅ Ensures React support in Vite
    tsconfigPaths(),
  ],
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
