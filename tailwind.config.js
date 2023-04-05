/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js}'
  ],
  theme: {
    extend: {
      boxShadow :{
        '--box-shadow' : '0 5px 15px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
}

