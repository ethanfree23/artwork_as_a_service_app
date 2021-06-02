module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      montserrat: ["'Montserrat'", "sans-serif"],
    },
    extend: {
      colors: {
        pink: {
          DEFAULT: "#FE00C6",
          600: "#F102BC",
        },
        grey: {
          DEFAULT: "#C9C9D8",
        },
      },
      zIndex: {
        "-10": "-10",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
