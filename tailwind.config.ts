import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark-card-background': '#252525',
      },
    },
  },
  safelist: [
    'bg-gradient-to-r',
    'from-cyan-100',
    'to-blue-100',
    'dark:from-cyan-300',
    'dark:to-blue-300',
    'from-violet-100',
    'to-fuchsia-100',
    'dark:from-violet-300',
    'dark:to-fuchsia-300',
    'from-green-100',
    'to-lime-100',
    'dark:from-green-300',
    'dark:to-lime-300',
  ],
};
export default config;
