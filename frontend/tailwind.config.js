/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6200ee",
        secondary: "#03dac6",
        background: "#f6f6f6",
        surface: "#ffffff",
        error: "#b00020",
        onPrimary: "#ffffff",
        onSecondary: "#000000",
        onBackground: "#000000",
        onSurface: "#000000",
        onError: "#ffffff",
      },
    },
  },
  plugins: [],
}
