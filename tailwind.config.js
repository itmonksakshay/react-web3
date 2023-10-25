/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      caption: ['"Tactic Round"', "sans-serif"],
      body: ["Aeroport", "sans-serif"],
      helvetica: ["Helvetica"],
      tactic: ["Tactic Round"]
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    backgroundImage: {
      none: "none",
      texture: `url(./assets/img/bg-texture.png)`,
      gradient1:
        "linear-gradient(97.67deg, #111111 3.48%, rgba(63, 60, 60, 0.19) 97.28%)",
      gradient2:
        "linear-gradient(97.67deg, #D6D6D6 3.48%, rgba(191, 191, 191, 0.19) 97.28%)",
      gradient3: "linear-gradient(72.65deg, #41ADC5 16.26%, #67B5A1 82.05%)",
    },
    backgroundPosition: {
      "left-10": "10px",
    },
    boxShadow: {
      sm: "0px 0px 6px #E8B844",
      "sm-grey": "0px 0px 6px rgba(0, 0, 0, 0.47)",
      md: "0px 0px 22px rgba(0, 0, 0, 0.47)",
      lg: "2px 29px 39px rgba(0, 0, 0, 0.23)",
      main: "0px 4px 6px 0px #0000000F",
      toast:
        "14.025590896606445px 9.596456527709961px 17.716535568237305px 0px #0000001A",
      xl: "0.8198004364967346px 9.427704811096191px 14.756404876708984px 0px #0000001A",
      xxl: "1.8314350843429565px 21.061504364013672px 32.9658317565918px 0px #0000001A",
      xxl2: "1.185185194015503px 17.185184478759766px 23.11111068725586px 0px #0000003B",
    },
    dropShadow: {
      sm: "2.45161px 35.5484px 47.8065px rgba(0, 0, 0, 0.23)",
      green: "0px 0px 6px 0px #32CC868C",
    },
    backdropBlur: {
      sm: "8.58065px",
      xs: "7px",
    },
    extend: {
      colors: {
        yellow: {
          main: "#F3CF7A",
          dark: "#E9BE5C",
          light: "#FFE3A1",
          deep: "#F0B93A",
          lighter: "#FCF6E8",
          lighter2: "#FAF6EB",
          darker: "#E3AB1C",
          darker2: "#CE9B24",
          lightest: "#FFF6E2",
          darkest: "#644900",
          mild: "#FBF8F0",
          modalYellow: "#E9BE5C",
        },
        grey: {
          dark: "#1E1E1E",
          darker: "#8c8c8f",
          darker2: "#5C5C5C",
          darker3: "#3C3C3C",
          darker4: "#1F1010",
          deep: "#A7A7A7",
          black: "#19191E",
          darkest: "#010106",
          light: "#31383D",
          lighter: "#828282",
          lighter2: "rgba(208, 208, 208, 0.4)",
          lighter3: "#ACACAC",
          lighter4: "#F9F9F9",
          lighter5: "#FEFCF9",
          lighter6: "#C3C3C3",
          lighter7: "#2B261D",
          lighter8: "#E1E1E1",
          lighter9: "#EFEFEF",
          lighter10: "#F4F4F4",
          lightest: "#D0D0D0",
          bright: "#F7F7F7",
          white: "#FFEFEF",
          "lightest-20": "#D0D0D033",
          "lightest-40": "#D0D0D066",
          white5: "rgba(255, 255, 255, 0.05)",
          black43: "rgba(0, 0, 0, 0.43)",
          light38: "rgba(208, 208, 208, 0.38)",
        },
        green: {
          light: "#00B67A",
          lighter1: "#32CC86",
          dark: "#067651",
        },
        red: {
          light: "#E31818",
          lighter: "#FF3939",
          lighter2: "#EB2727",
          lighter3: "#FF6153",
          dark: "#AA1515",
          mild: "#FFF4F4",
          "light-05": "#E318180D",
        },
        blue: {
          light: "#1DA1F2",
          dark: "#2488C6",
          customblue1: "#0C192B"
        },
        purple: {
          light: "#5865F2",
          dark: "#3A45B6",
        },
      },

      keyframes: {
        ripple: {
          from: {
            opacity: 0.3,
            transform: "scale(0)",
          },
          to: {
            opacity: 0,
            transform: "scale(2)",
          },
        },
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        fadeOut: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
        delayedFadeIn: {
          "0%": {
            opacity: 0,
          },
          "50%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        slideDown: {
          "0%": {
            maxHeight: 0,
          },
          "100%": {
            maxHeight: 188,
          },
        },
      },
      animation: {
        ripple: "ripple .8s ease-in-out",
        fadeIn: "fadeIn .3s ease-in-out",
        fadeOut: "fadeOut .3s ease-in-out",
        delayedFadeIn: "delayedFadeIn .6s ease-in-out",
        slideDown: "slideDown .3s ease-in-out",
      },
      gradientcolorstops: theme => ({
        'primary': '#ff8c00',
        'secondary': '#ffa500',
        'danger': '#ffd700',
    }),
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child-span", "& > span");
    },
  ],
};
