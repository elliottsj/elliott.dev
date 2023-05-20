/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        primary: '#635cb3',
        secondary: '#ffd615',
        black: '#292929',
      },
      fontFamily: {
        mono: ['var(--font-fira-code)'],
        sans: ['var(--font-ubuntu)'],
        serif: ['var(--font-merriweather)'],
      },
    },
  },
  plugins: [],
};
