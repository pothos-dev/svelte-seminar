import colors from "tailwindcss/colors"
import { createThemes } from "tw-colors"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  variants: {
    extend: {
      textColor: ["placeholder"],
    },
  },
  theme: {},
  plugins: [
    createThemes({
      light: {
        background: "white",
        text: "black",
        primary: colors.yellow[600],
      },
      dark: {
        background: "black",
        text: "white",
        primary: colors.fuchsia[400],
      },
      forest: {
        background: colors.green[950],
        text: colors.green[100],
        primary: colors.stone[400],
      },
      ocean: {
        background: colors.blue[950],
        text: colors.blue[100],
        primary: colors.sky[400],
      },
      fire: {
        background: colors.red[950],
        text: colors.red[100],
        primary: colors.orange[400],
      },
    }),
  ],
}
