/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 👈 Esta línea es CLAVE
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
