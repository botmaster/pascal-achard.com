const srcDir = ".";

export default {
  darkMode: "class",
  content: [`${srcDir}/content/**/*.{vue,md}`],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
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
        backgrounddark: "#2E3440",
      },
      polarnight: {
        "nord-0": "#2E3440",
        "nord-1": "#3B4252",
        "nord-2": "#434C5E",
        "nord-3": "#4C566A",
      },
      snowstorm: {
        "nord-4": "#D8DEE9",
        "nord-5": "#E5E9F0",
        "nord-6": "#ECEFF4",
      },
      frost: {
        "nord-7": "#8FBCBB",
        "nord-8": "#88C0D0",
        "nord-9": "#81A1C1",
        "nord-10": "#5E81AC",
      },
      aurora: {
        "nord-11": "#BF616A",
        "nord-12": "#D08770",
        "nord-13": "#EBCB8B",
        "nord-14": "#A3BE8C",
        "nord-15": "#B48EAD",
      },
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
