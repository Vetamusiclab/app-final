import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6F00",
          lime: "#6BCB77",
          black: "#000000",
          sand: "#FFE0B2",
          text: "#333333",
          white: "#FFFFFF",
        }
      },
      borderRadius: {
        '2xl': '1.25rem'
      },
      boxShadow: {
        soft: "0 6px 24px rgba(0,0,0,0.08)"
      }
    },
    fontFamily: {
      sans: ["Roboto", "PT Sans", "system-ui", "Arial", "sans-serif"]
    }
  },
  plugins: [],
} satisfies Config;
