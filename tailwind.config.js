const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/domain/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...colors,
      woodsmoke: {
        50: '#383B3F',
        100: '#35373B',
        200: '#2E3033',
        300: '#26282B',
        400: '#1F2123',
        500: '#18191B',
        600: '#111213',
        700: '#0A0A0B',
        800: '#020303',
        900: '#000000',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
}
