import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'soft-blush': {
          50: '#fae3e3',
          100: '#f5c7c7',
          200: '#e9adad',
          300: '#dc9090',
          400: '#cc7070',
          500: '#bb5050',
          600: '#a33636',
          700: '#822020',
          800: '#5e0d0d',
          900: '#3b0606',
          950: '#280303',
        },
        'frosted-blue': {
          50: '#eafbff',
          100: '#d0f5ff',
          200: '#b1eeff',
          300: '#85e1f9',
          400: '#58d0f0',
          500: '#2cb8e3',
          600: '#1695c0',
          700: '#10739a',
          800: '#0a5272',
          900: '#05324a',
          950: '#021e2d',
        },
        'orange-accent': {
          50: '#fff8e0',
          100: '#ffedb3',
          200: '#ffe280',
          300: '#ffd44d',
          400: '#ffc31a',
          500: '#ffae00',
          600: '#cc8b00',
          700: '#996800',
          800: '#664600',
          900: '#332300',
          950: '#1a1200',
        },
        'pink-orchid': {
          50: '#faf5f7',
          100: '#f3e8ed',
          200: '#e7d1db',
          300: '#d9b9c7',
          400: '#cfa5b4',
          500: '#bd8ea0',
          600: '#a5728a',
          700: '#83566d',
          800: '#613b50',
          900: '#3f2033',
          950: '#2d1424',
        },
      },
    },
  },
  plugins: [],
}
export default config
