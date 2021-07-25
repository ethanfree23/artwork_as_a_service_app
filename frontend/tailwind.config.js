module.exports = {
  mode: "jit",
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
          700: "#EE257E",
        },
        blue: {
          DEFAULT: "#2F80ED",
        },
        grey: {
          DEFAULT: "#C9C9D8",
          600: "#666666",
        },
      },
      zIndex: {
        "-10": "-10",
      },
      height: {
        104: "26rem",
        112: "28rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
        9: "9 9 0%",
        10: "10 10 0%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
