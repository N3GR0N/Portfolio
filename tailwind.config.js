/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#000000',
        paper: '#ffffff',
        inkstone: '#181818',
        'felt-gray': '#6d6d6d',
        'slate-pill': '#636363',
      },
      borderRadius: {
        none: '0px',
        pill: '75px',
      },
      fontFamily: {
        sans: ['"Inter"', 'Roobert', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        cinematic: '1000ms',
        slow: '1250ms',
      },
      maxWidth: {
        editorial: '1078px',
      },
    },
  },
  plugins: [],
}
