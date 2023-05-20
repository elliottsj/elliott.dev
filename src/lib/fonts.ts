import { Merriweather, Ubuntu, Fira_Code } from 'next/font/google';

export const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-merriweather',
});

export const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-ubuntu',
});

export const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});
