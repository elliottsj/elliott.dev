/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{mdx}',
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
