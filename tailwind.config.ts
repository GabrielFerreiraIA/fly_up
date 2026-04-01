import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // FlyUp CRM Design Tokens
        sky: {
          900: '#0C1B2E',
          800: '#152640',
          700: '#1E3A5F',
          600: '#2A4F7A',
          500: '#3B6EA8',
          400: '#5B8DC4',
          300: '#8BB3D8',
          200: '#BBD3EC',
          100: '#E5EFF8',
        },
        accent: {
          primary: '#00B4D8',
          energy: '#FF6B35',
        },
        lead: {
          quente: '#FF6B35',
          morno: '#F39C12',
          frio: '#3B82F6',
          vip: '#FFD700',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'slide-in': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
