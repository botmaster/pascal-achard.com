// import { darken } from "color2k";

const srcDir = ".";

const nord = {
  polarnight: {
    "nord-0": "rgb(var(--color-nord-0) / <alpha-value>)",
    "nord-1": "rgb(var(--color-nord-1) / <alpha-value>)",
    "nord-2": "rgb(var(--color-nord-2) / <alpha-value>)",
    "nord-3": "rgb(var(--color-nord-3) / <alpha-value>)",
  },
  snowstorm: {
    "nord-4": "rgb(var(--color-nord-4) / <alpha-value>)",
    "nord-5": "rgb(var(--color-nord-5) / <alpha-value>)",
    "nord-6": "rgb(var(--color-nord-6) / <alpha-value>)",
  },
  frost: {
    "nord-7": "rgb(var(--color-nord-7) / <alpha-value>)",
    "nord-8": "rgb(var(--color-nord-8) / <alpha-value>)",
    "nord-9": "rgb(var(--color-nord-9) / <alpha-value>)",
    "nord-10": "rgb(var(--color-nord-10) / <alpha-value>)",
  },
  aurora: {
    "nord-11": "rgb(var(--color-nord-11) / <alpha-value>)",
    "nord-12": "rgb(var(--color-nord-12) / <alpha-value>)",
    "nord-13": "rgb(var(--color-nord-13) / <alpha-value>)",
    "nord-14": "rgb(var(--color-nord-14) / <alpha-value>)",
    "nord-15": "rgb(var(--color-nord-15) / <alpha-value>)",
  },
};

module.exports = {
  darkMode: "class",
  content: [`${srcDir}/content/**/*.{vue,md}`],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      "primary-content": "rgb(var(--color-primary-content) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#EEEEEE",
        300: "#E0E0E0",
        400: "#BDBDBD",
        500: "#9E9E9E",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
        950: "#151414",
      },
      body: {
        background: "#f2f4f8",
        backgrounddark: "#242933",
      },
      ...nord,
    },
    fontFamily: {
      display: ["rubik_blackregular", "sans-serif"],
      body: ["rubikregular", "sans-serif"],
      "rubik-black": ["rubik_blackregular", "sans-serif"],
      "rubik-bold": ["rubikbold", "sans-serif"],
      "rubik-medium": ["rubik_mediumregular", "sans-serif"],
      "rubik-regular": ["rubikregular", "sans-serif"],
      "rubik-light": ["rubik_lightregular", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        md: "3rem",
      },
    },
  },
};
