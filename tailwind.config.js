/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill-25": "repeat(auto-fill, minmax(25rem, 1fr))",
        "auto-fit-25": "repeat(auto-fit, minmax(25rem, 1fr))",
      },
    },
  },
  plugins: [],
};
