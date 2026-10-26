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
        background: '#0b0b0c',
        canvas: '#121110',
        surface: {
          DEFAULT: '#171615',
          secondary: '#1c1a18',
          tertiary: '#23211e',
          elevated: '#282522',
          border: 'rgba(255, 245, 235, 0.08)',
          hover: 'rgba(217, 119, 6, 0.18)',
        },
        bronze: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // warm amber
          600: '#d97706', // warm metallic bronze
          700: '#b45309', // burnt bronze
          800: '#92400e', // dark espresso bronze
          900: '#78350f',
          950: '#451a03',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4', // ivory white
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        status: {
          online: '#10b981',
          warning: '#f59e0b',
          amber: '#d97706',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Geist Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-warm': 'pulseWarm 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer-bronze': 'shimmerBronze 3s infinite linear',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        pulseWarm: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.96)' },
        },
        shimmerBronze: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'bronze-sm': '0 2px 8px -2px rgba(217, 119, 6, 0.15)',
        'bronze-md': '0 8px 24px -4px rgba(217, 119, 6, 0.2)',
        'bronze-lg': '0 16px 40px -8px rgba(217, 119, 6, 0.25)',
        'inner-rim': 'inset 0 1px 0 0 rgba(251, 191, 36, 0.15)',
        'inner-rim-subtle': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
}
