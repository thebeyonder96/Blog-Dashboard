/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#026467",
        secondary: "#e5f5ea",
        body: "#596392",
        nav: "#f9f9f9",
      },
    fontFamily: {
      logo: "Skranji",
    },
    },
  },
  plugins: [],
};
