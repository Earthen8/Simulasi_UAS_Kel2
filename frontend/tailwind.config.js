/** @type {import('tailwindcss').Config} */
module.exports = { 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0FA36B',   
        'primary-dark': '#0B3D2E',
        'secondary-sand': '#E6D9C5',
        'secondary-clay': '#B07A4A', 
        'neutral-charcoal': '#232323',
        'neutral-gray': '#F3F4F5',  
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}