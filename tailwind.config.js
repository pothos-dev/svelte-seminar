import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      primary: colors.rose,
      secondary: colors.teal,
      background: colors.slate["950"],
      foreground: colors.slate["50"],
    },
  },
  plugins: [],
}
