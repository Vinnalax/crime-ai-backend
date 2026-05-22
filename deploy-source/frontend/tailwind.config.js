/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050816",
        card: "#111827",
        accent: "#3B82F6",
        muted: "#9CA3AF",
      },

      boxShadow: {
        glow: "0 0 20px rgba(59,130,246,0.25)",
      },
    },
  },
  plugins: [],
}