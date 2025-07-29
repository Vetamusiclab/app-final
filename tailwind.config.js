/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6F00",
        accent: "#6BCB77",
        contrast: "#000000",
        background: "#FFFFFF",
        sand: "#FFE0B2",
        text: "#333333"
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        pt: ["PT Sans", "sans-serif"]
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      }
    }
  },
  plugins: []
};