/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08080c',
          900: '#0c0c12',
          800: '#13131c',
          700: '#1c1c28',
          600: '#262635',
          500: '#353548',
          400: '#4a4a5e',
        },
        cream: {
          50: '#faf7f2',
          100: '#f5f0e8',
          200: '#e8e0d0',
          300: '#d4c8b0',
          400: '#b8a888',
          500: '#9a8a6e',
          600: '#7a6e58',
        },
        amber: {
          400: '#f0c050',
          500: '#e8a838',
          600: '#d09028',
          700: '#a87020',
        },
        teal: {
          400: '#4dbfa0',
          500: '#2d9a7f',
          600: '#1d7a65',
          700: '#155a4a',
        },
        rust: {
          400: '#e08060',
          500: '#c96848',
          600: '#a85030',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 6vw, 4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-in': 'slideIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
