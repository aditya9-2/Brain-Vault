/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f8f9fb", // primary bg
          400: "#c4c4c6",
          999: "#f8f9fb"
        },
        purple: {
          100: "#dee5ff", // button bg
          400: "#676baa",
          500: "#9592DB",
          600: "#6165a4", // button text
          900: "#4443d8",
          999: "#4d4d95"  // Brain logo color
        }
      }
    },
  },
  plugins: [],
}