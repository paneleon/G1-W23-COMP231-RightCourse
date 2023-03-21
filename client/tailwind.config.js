/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#80CC2B',
        'green-secondary': '#47780D',
        'green-tertiary': 'rgba(128, 204, 43, 0.2)',
        "blue-primary": "#3592E9",
        "blue-secondary": "#0D4578",
        "orange-primary": "#E97635",
        "orange-secondary": "#78340D",
        "yellow-primary": "#FFE91F",
        "yellow-secondary": "#857700",
        "gray-primary": "#ADADAD",
        "gray-secondary": "#B9B9B9",
        "gray-tertiary": "#F5F5F5",
        "red": "#CC352B",
      },
      screens: {
        'tall-sm': { 'raw': '(max-height: 500px)' },
        'tall-md': { 'raw': '(max-height: 768px)' },
      }
    },
  },
  plugins: [],
};
