/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      'purple': '#9747FF',
      'pink': '#FF24BD',
      'blue': '#575ED2',
      'white': '#ffffff',
      'black': '#000000'
    },
    fontFamily: {
      sans: ['Pretendard', 'sans-serif'],
      pyeongchang: ['"PyeongChang Peace"', 'sans-serif'],
    },
  },
  plugins: [require('daisyui')],
};
