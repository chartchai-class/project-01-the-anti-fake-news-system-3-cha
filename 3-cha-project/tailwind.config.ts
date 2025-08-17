import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow : {
        'sp' : '0 3px 12px 0 rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      // animation classes
      animation: {
        fade: 'yellowFade 3s ease-in-out',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards', 
      },
      keyframes: {
        yellowFade: {
          '0%': { backgroundColor: 'yellow' },
          '100%': { backgroundColor: 'transparent' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    }
  },
  plugins: [],
} satisfies Config
