/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ['"Nunito Sans"', "sans-serif"],
        body: ['"Montserrat Alternates"', "sans-serif"],
      },
    },
    colors: {
      hero: "#F9FAFB",
      benefits: "#2F4F4F",
      benefits2: "#005F00",
      key: "#F0F4F8",
      community: "#004d00",
      works: "#F0F4F8",
      involved: "#FF6F61",
      footer1: "#2C3E50",
      footer2: "#003300",
    },
  },
  plugins: [daisyui],
};
