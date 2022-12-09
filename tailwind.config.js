/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['"Roboto"'],
        'roboto-mono': ['"Roboto Mono"'],
        'roboto-cond': ['"Roboto Condensed"']
      },
    },
  },
  plugins: [],
}
