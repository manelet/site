const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  colors: {
    gray: colors.blueGray,
  },
  theme: {
    extend: {
      colors: {
        first: 'rgb(255, 255, 255)',
        second: 'rgb(15, 23, 42)',
        'btn-1': '#D65DB1',
        'btn-2': '#FF6F91',
      },
    },
  },
}
