/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'white': '#ffffff',
      'gray-dark': '#273444',
      'gray': '#eaeaea',
      'gray-light': '#d3dce6',
      'dark': '#0f0f0f',
      'text-dark': '#262626',
      'text-dark-light': '#333333',
      'text-gray-light': '#d1d1d1',
      'text-gray': '#aeaeae',
      'text-gray-dark': '#888888',
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
