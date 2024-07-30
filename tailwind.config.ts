import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-circle-at-center': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-bottom': {
          '0%': { 
            transform: 'translateY(100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        }
      },

      animation: {
        'fade-in': 'fade-in .3s ease-in',
        'slide-in-bottom': 'slide-in-bottom 0.4s ease-in-out'
      },

      height: {
        'full+2': 'calc(100% + 2px)',
      },

      width: {
        'full+2': 'calc(100% + 2px)',
      },
    },
  },
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        '.airbnb-box-shadow': {
          boxShadow: '0 0 0 1px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.15)'
        },
        '.airbnb-box-shadow-sm': {
          boxShadow: '0 2px 16px rgba(0,0,0,0.12)'
        }
      })
    })
  ]
}
export default config
