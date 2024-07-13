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
    {
      pattern: /(from|to)-(blue|cyan|fuchsia|violet|green|lime)-(100|300)/,
    },
  ],
};
export default config;
