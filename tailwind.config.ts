import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}", // ✅ Remix + Vite
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Ensure it catches all components
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      backdropBlur: {
        xs: "2px",
        sm: "5px",
        md: "10px",
        lg: "20px",
      },
      colors: {
        theme: {
          navy: "#0a1445",
          orange: "#ff6b00",
          yellow: "#ffd700",
          red: "#ff0000",
          blue: "#1e3a8a",
        },
        glass: "rgba(255, 255, 255, 0.1)", // ✅ Glassmorphism background
      },
    },
  },
  plugins: [],
} satisfies Config;
