/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      roboto: ["Roboto", "sans-serif"],
      "roboto-mono": ['"Roboto Mono"'],
      "roboto-cond": ['"Roboto Condensed"'],
    },
  },
  plugins: [],
};
