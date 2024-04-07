/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        260: "260px",
      },
      fontSize: {
        "22px": "22px",
      }
    },
  },
  plugins: [],
}

