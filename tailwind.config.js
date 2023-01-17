/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  content: [
    './src/common/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  extend: {
    fontFamily: {
      poppins: [
        'Poppins', 'sans-serif'],
    }
  }
}
