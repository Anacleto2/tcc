
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flyonui/dist/js/*.js",
  ],

  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },

      animation: {
        fadeIn: "fadeIn .5s ease-in-out",
      },
    },
  },

  plugins: [tailwindcssAnimate],
};
