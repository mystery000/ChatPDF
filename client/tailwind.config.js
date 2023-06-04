/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fe4801"
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}