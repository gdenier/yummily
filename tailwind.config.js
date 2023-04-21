const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "rgba(62, 31, 55, 1)",
        "light-beige": "rgba(248, 245, 242, 1)",
        green: "rgba(7, 128, 128, 1)",
        orange: "rgba(251, 153, 59, 1)",
        "dark-70": "rgba(62, 31, 55, 0.7)",
      },
      boxShadow: {
        down: "2px 5px 10px rgba(62, 31, 55, 0.1)",
      },
      fontFamily: {
        sans: ["var(--poppins-font)", ...fontFamily.sans],
        source: ["var(--source-font)", ...fontFamily.sans],
        serif: ["var(--yeseva-font)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
}
