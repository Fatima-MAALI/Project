import daisyui from "daisyui"
import typography from "@tailwindcss/typography"
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    typography
  ],

  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "dim",
      "nord",
      "sunset",
      "winter",
      {
        mytheme: {
          "color-scheme": "light",
          "primary": "#034F66",
          "secondary": "#463AA2",
          "accent": "#C148AC",
          "neutral": "#021431",
          "base-100": "oklch(100% 0 0)",
          "base-200": "#F2F7FF",
          "base-300": "#E3E9F4",
          "base-content": "#394E6A",
          "info": "#93E7FB",
          "success": "#81CFD1",
          "warning": "#EFD7BB",
          "error": "#E58B8B",
        },
      }
    ],
  },
};
