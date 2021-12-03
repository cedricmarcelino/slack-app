module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "100":"800px",
        "50": "400px"
      },
      height: {
        "100":"850px",
      },
      maxHeight: {
        "90":"800px",
        "90%": "93vh"
      }
    }
  },
  variants: {
    extend: {
      translate:["group-focus"]
    },
  },
  plugins: [],
}
