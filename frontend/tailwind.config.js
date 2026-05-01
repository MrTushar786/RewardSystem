/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: "#4F46E5",
        secondary: "#6366F1",
        lightBg: "#F8FAFC",
        cardBg: "#FFFFFF",
        status: {
          green: "#10B981",
          yellow: "#F59E0B",
          red: "#EF4444",
        },
        dark: {
          bg: "#0B1120",
          card: "#1E293B",
          text: "#F1F5F9",
          muted: "#94A3B8",
          border: "#334155"
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'soft-dark': '0 4px 24px -2px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 20px rgba(79, 70, 229, 0.15)',
      }
    },
  },
  plugins: [],
}
