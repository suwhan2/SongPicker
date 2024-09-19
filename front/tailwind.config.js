module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#9747FF', // main color_purple
          'secondary': '#575ED2', // Color
          'accent': '#D34ADE', // Color 2-2
          'neutral': '#FF24BD', //Color 2
          // 'base-100': '#000000', // 검은 배경색
          'info': '#3ABFF8',
          'success': '#36D399',
          'warning': '#FBBD23',
          'error': '#F87272',
        },
      },
    ],
  },
}