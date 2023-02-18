/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/pages/*.tsx",
    "./src/components/*.tsx",
    "./src/main.tsx",
  ],
  theme: {
    screens: {
      'sm': '376px',
      'md': '600px',
      'lg': '924px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      spacing: {
        'chat': '45.5rem'
      }
    },
  },
  plugins: [],
}
