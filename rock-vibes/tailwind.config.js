
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ki-black': '#000000',
        'ki-dark-gray': '#1A1A1A',
        'ki-medium-gray': '#333333',
        'ki-light-gray': '#F5F5F5',
        'ki-border-gray': '#E0E0E0',
        'ki-orange': '#FF6B35',
        'ki-warm-orange': '#FF8C42',
        'ki-yellow': '#FFD23F',
        'ki-secondary': '#DE951B',
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
        'accent': ['Bebas Neue', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 16px rgba(0, 0, 0, 0.15)',
        'nav': '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      maxWidth: {
        'container': '1440px',
      }
    },
  },
  plugins: [],
}
