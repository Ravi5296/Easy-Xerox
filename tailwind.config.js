/** @type {import('tailwindcss').Config} */
const { withAnimations } = require('animated-tailwindcss')

module.exports = withAnimations({
  content: ["*"],
  theme: {
    fontFamily: {
      display: ['Gentium Book Plus', 'serif'],
    },

    extend: {},

    animation: {
      typing1: 'typing 2s steps(20) infinite',
    },
    keyframes: {
      typing: {
        from: { width: '0' },
        to: { width: '100%' },
      },
    },

  },
  plugins: [
    require('@tailwindcss/forms')
  ],
})