module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      logo: ['Varta', 'sans-serif'],
      app: ['Varta', 'sans-serif']
    },
    extend: {
      fontSize: { base: '18px' },
      height: { nav: '70px', modal: '33.33%', '1/2': '50%' },
      minHeight: { content: 'calc(100vh - 70px)' },
      maxHeight: { content: 'calc(100vh - 70px)' },
      width: { posts: 'calc(33.33% - 1.0rem)', modal: '33.33%' },
      inset: {
        '1/2': '50%'
      }
    }
  },
  variants: {
    borderWidth: ['responsive', 'hover'],
    borderStyle: ['responsive', 'hover'],
    display: ['responsive', 'hover'],
    opacity: ['responsive', 'hover', 'focus', 'disabled']
  },
  plugins: []
}
