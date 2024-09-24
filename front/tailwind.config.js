import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        pyeongchang: ['"PyeongChang Peace"', 'sans-serif'],
      },
      colors: {
        'input-text': '#CCCCCC',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#9747FF', // main color_purple
          secondary: '#575ED2', // Color
          accent: '#D34ADE', // Color 2-2
          neutral: '#FF24BD', //Color 2
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
};
