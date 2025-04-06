module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx}"],
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // textColor: theme => theme('colors'),,
    extend: {
      colors: {
        'app': '#ce39b6'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
