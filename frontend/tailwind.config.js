module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      montserrat: ["'Montserrat'", "sans-serif"],
    },
    screens: {
      "2xs": "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1180px", //overwriting 1280px
      "2xl": "1536px",
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
        purple: {
          DEFAULT: "#fBFAFF",
        },
        green: {
          DEFAULT: "#00A653",
        },
        yellow: {
          DEFAULT: "#EE9100",
        },
        red: {
          DEFAULT: "#E60B00",
        },
        grey: {
          400: "#E9E9F7",
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
      animation: {
        dots1: "dots1 1s infinite steps(1) 1s",
        dots2: "dots2 1s infinite steps(1) 1s",
        dots3: "dots3 1s infinite steps(1) 1s",
      },
      keyframes: {
        dots1: {
          "0%": { opacity: 0 },
          "25%": { opacity: 1 },
        },
        dots2: {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
        dots3: {
          "0%": { opacity: 0 },
          "75%": { opacity: 1 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [require("@tailwindcss/line-clamp")],
}
