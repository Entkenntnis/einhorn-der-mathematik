module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 10%, 20%': {
            transform: 'rotate(0deg)',
          },
          '5%': {
            transform: 'rotate(-3deg)',
          },
          '15%': {
            transform: 'rotate(3deg)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 4s cubic-bezier(.36,.07,.19,.97) infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
