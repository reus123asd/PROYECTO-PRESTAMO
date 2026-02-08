/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector', // <-- Verifica que diga 'selector' y no 'class' o 'media'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}