/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3056d3',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
        160: '40rem',
      },
    },
  },
  plugins: [require('preline/plugin')],
};
