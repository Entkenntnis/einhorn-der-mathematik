module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '80%, 90%, 100%': {
            transform: 'rotate(0deg)',
          },
          '85%': {
            transform: 'rotate(-3deg)',
          },
          '95%': {
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
