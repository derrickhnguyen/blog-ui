module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      logo: ['Fondamento', 'cursive'],
      app: ['Lato', 'sans-serif']
    },
    extend: {
      fontSize: { base: '18px' },
      height: { nav: '80px' },
      minHeight: { content: 'calc(100vh - 80px)' },
      width: { posts: 'calc(33.33% - 1.0rem)' }
    }
  },
  variants: {
    borderWidth: ['responsive', 'hover'],
    borderStyle: ['responsive', 'hover']
  },
  plugins: []
}
