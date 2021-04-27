const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  colors: {
    gray: colors.coolGray,
  },
  theme: {
    extend: {
      colors: {
        'btn-1': '#D65DB1',
        'btn-2': '#FF6F91',
      },
    },
  },
}
