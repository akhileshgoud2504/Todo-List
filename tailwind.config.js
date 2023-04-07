/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js}'
  ],
  theme: {
    extend: {
      boxShadow :{
        '515xl' : '0 5px 15px rgba(0, 0, 0, 0.1)',
      },
      colors : {
        'chinesesilver': '#ccc',
        'purple': '#9d0191',
        'whiteextend':'#fff'
      }
    },
  },
  plugins: [],
}

