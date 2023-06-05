/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false,
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "logo-navbar": "url('/src/assets/logoOnly.svg')",
      },
    },

    colors: {
      "color-black": "#1D1C29",
      "color-blue": "#102038",
      "color-white": "#F9F9F9",
      "color-green": "#00B88B",
      "color-purple": "#A836DA",
      "color-orange": "#E4A74A",
      "color-yellow": "#F9F01F",
      "color-red": "#EB8686",
      "color-gray": "#969696",
      "color-purple": "rgba(168, 54, 218, 0.38)",
      "color-teal": "rgba(33, 130, 143, 1)",
      "color-opacity-40": "rgba(255, 255, 255, 0.4)",
      "color-opacity-20": "rgba(255, 255, 255, 0.2)",
      "color-opacity-10": "rgba(255, 255, 255, 0.1)",
      "color-yellow-75": "rgba(249,249,249,.75)",
      // "color-yellow-75": "rgba(249,240,31,.75)",
      "color-orange": "#E4A74A",
    },
    fontFamily: {
      sans: ["Gill sans, Tahoma, sans-serif"],
      serif: ["var(--font-playfair)"],
    },
  },
  plugins: [],
};
