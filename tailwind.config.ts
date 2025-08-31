/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F5F5F5",         // светлый фон
        text: "#222222",       // основной текст
        primary: "#FF6600",    // фирменный оранжевый
        accent: "#FF9933",     // более мягкий оранжевый
      },
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
        ptsans: ["var(--font-pt-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
