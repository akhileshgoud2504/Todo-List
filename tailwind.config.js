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
      },
      width: {
        '310p': '310px',
        '480': '30rem',
        '576': '36rem',
        '640': '40rem',
        '864': '54rem',
        '107p':'107px',
        '20r': '12rem'
      },
      height: {
        '20': '12rem'
      }
    }
  },
  plugins: [],
}

