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
        background: '#090a0f',
        surface: {
          DEFAULT: '#10121a',
          secondary: '#161824',
          tertiary: '#1c1f2e',
          glass: 'rgba(16, 18, 26, 0.7)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.07)',
          hover: 'rgba(255, 255, 255, 0.16)',
          glow: 'rgba(99, 102, 241, 0.35)',
        },
        cosmic: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          purple: '#a855f7',
        },
        accent: {
          green: '#10b981',
          emerald: '#34d399',
        }
      },
      fontFamily: {
        sans: ['Geist Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'glowSpin 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backgroundImage: {
        'radial-spotlight': 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
        'gradient-cosmic': 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%)',
        'grid-pattern': 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
