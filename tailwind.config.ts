/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6F00",
          lime: "#6BCB77",
          sand: "#FFE0B2",
          black: "#000000",
          gray: "#333333",
          white: "#FFFFFF"
        }
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        pt: ["PT Sans", "sans-serif"]
      }
    }
  },
  plugins: []
};
