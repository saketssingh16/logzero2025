// tailwind.config.js
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // for Next.js pages
    "./components/**/*.{js,ts,jsx,tsx}", // for reusable components
    "./app/**/*.{js,ts,jsx,tsx}", // if using the app directory
  ],
  theme: {
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1170px",
        "2xl": "1320px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
        sumana: ["Sumana", "serif"],
      },
      keyframes: {
        zoomIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        zoomUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        zoomIn: "zoomIn 0.6s ease-out forwards",
        zoomUp: "zoomUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
