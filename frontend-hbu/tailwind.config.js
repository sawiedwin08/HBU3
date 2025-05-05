/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0DCAF0',
        'secondary': {
          100: '#FFFFFF',
          200: '#F1F2F7'
        },
      },
    },
  },
  plugins: [],
}

