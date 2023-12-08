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

/** @type {import('tailwindcss').Config} */
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
      "secondary-content":
        "rgb(var(--color-secondary-content) / <alpha-value>)",
      white: "#FFFFFF",
      black: "#000000",
      body: {
        background: "#f2f4f8",
        backgrounddark: "#242933",
      },
      ...nord,
    },
    fontFamily: {
      display: ["rubik-black", "sans-serif"],
      body: ["rubik-regular", "sans-serif"],
      "rubik-black": ["rubik-black", "sans-serif"],
      "rubik-bold": ["rubik-bold", "sans-serif"],
      "rubik-medium": ["rubik-medium", "sans-serif"],
      "rubik-regular": ["rubik-regular", "sans-serif"],
      "rubik-light": ["rubik-light", "sans-serif"],
      code: ["monospace"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        md: "3rem",
      },
    },
  },
};
