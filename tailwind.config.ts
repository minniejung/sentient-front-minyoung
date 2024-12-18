import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": "1680px",
      xl: "1440px",
      lg: "1280px",
      md: "1024px",
      sm: "768px",
      xs: "525px",
    },
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        primary: "#ffffff",
        secondary: "#212121",
        stroke: "#e5e5e5",
        gray: {
          DEFAULT: "#808080",
          a9: "#a9a9a9",
          ae: "#aeaeae",
          d7: "#d7d7d7",
          eb: "#ebebeb",
          f1: "#f1f1f1",
          f4: "#f4f4f4",
          f5: "#f5f5f5",
          f6: "#f6f6f6",
          "9c": "#9c9c9c",
          "70": "#707070",
          "80": "#808080",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
