/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#04C39A',
          50: '#B8F5E8',
          100: '#A3F2E1',
          200: '#7AECD4',
          300: '#51E6C6',
          400: '#28E0B9',
          500: '#04C39A',
          600: '#039577',
          700: '#026754',
          800: '#013931',
          900: '#000B0E'
        },
        secondary: {
          DEFAULT: '#00B4D8',
          50: '#E6F7FC',
          100: '#CCF0F9',
          200: '#99E1F3',
          300: '#66D2ED',
          400: '#33C3E7',
          500: '#00B4D8',
          600: '#0090AD',
          700: '#006C82',
          800: '#004856',
          900: '#00242B'
        }
      },
      backgroundImage: {
        'gradient-primary-secondary': 'linear-gradient(135deg, #04C39A 0%, #00B4D8 100%)',
        'gradient-primary-secondary-hover': 'linear-gradient(135deg, #039577 0%, #0090AD 100%)',
        'gradient-secondary-primary': 'linear-gradient(135deg, #00B4D8 0%, #04C39A 100%)',
        'gradient-radial-primary-secondary': 'radial-gradient(circle, #04C39A 0%, #00B4D8 100%)',
        'gradient-diagonal-primary-secondary': 'linear-gradient(45deg, #04C39A 0%, #00B4D8 50%, #04C39A 100%)'
      },
      fontFamily: {
        sans: ['Instrument Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'Consolas', 'Ubuntu Mono', 'monospace'],
        kufi: ['Reem Kufi', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      }
    },
  },
  plugins: [],
}
