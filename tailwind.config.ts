import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b3680b',
          dark: '#864e08',
        },
        success: '#11ba60',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
  darkMode: 'media',
} satisfies Config 