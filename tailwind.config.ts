import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'light-blue': '#EBF3FF',
        'light-orange': '#FFEEE6',
        'blue-violet': '#3A86FF',
        'blue-darker': '#1971FF',
        purple: '#8338EC',
        rose: '#FF006E',
        yellow: '#FFBE0B',
        orange: '#FB5607',
        'orange-darker': '#CD4303'
      },
      screens: {
        'xs': '480px',
      }
    },
  },
  plugins: [],
};
export default config;
