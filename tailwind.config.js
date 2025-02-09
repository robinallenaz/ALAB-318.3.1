/** @type {import('tailwindcss').Config} */
module.exports = {
  // Configure paths to purge unused styles in production
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  
  // Enable dark mode using class strategy
  darkMode: 'class',
  
  theme: {
    extend: {
      // Custom color palette
      colors: {
        primary: '#1D4ED8', // Primary brand color
        secondary: '#9333EA', // Secondary brand color
      },
      // Custom font families
      fontFamily: {
        sans: ['Graphik', 'sans-serif'], // Sans-serif font
        serif: ['Merriweather', 'serif'], // Serif font
      },
      // Custom spacing values
      spacing: {
        '128': '32rem', // Large spacing value
        '144': '36rem', // Extra-large spacing value
      },
    },
  },
  
  // Extend variants for additional styling options
  variants: {
    extend: {},
  },
  
  // Plugins can be added here
  plugins: [],
}
