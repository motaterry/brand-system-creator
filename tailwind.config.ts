import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        'bg-body': 'hsl(45, 100%, 98%)',
        primary: {
          DEFAULT: '#ffc107',
          light: '#ffd451',
          dark: '#b38705',
        },
        complementary: {
          DEFAULT: '#0745ff',
          light: '#5a7fff',
          dark: '#0534cc',
        },
        tint: {
          10: '#ffc413',
          20: '#ffcd39',
          30: '#ffd451',
          40: '#ffda6a',
          50: '#ffe083',
          60: '#ffe69c',
          70: '#ffecb5',
          80: '#fff3cd',
          90: '#fff9e6',
        },
        shade: {
          10: '#f2b707',
          20: '#cc9a06',
          30: '#b38705',
          40: '#997404',
          50: '#806104',
          60: '#664d03',
          70: '#4d3a02',
          80: '#332701',
          90: '#191301',
        },
        'neutral-light': {
          10: '#8f8c84',
          20: '#a19e97',
          30: '#acaaa4',
          40: '#b8b6b1',
          50: '#c4c3be',
          60: '#d0cfcb',
          70: '#dcdbd8',
          80: '#e7e7e5',
          90: '#f3f3f2',
        },
        'neutral-dark': {
          10: '#827f77',
          20: '#6e6b64',
          30: '#605e58',
          40: '#52504b',
          50: '#45433f',
          60: '#373632',
          70: '#292826',
          80: '#1b1b19',
          90: '#0e0d0c',
        },
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  plugins: [],
};
export default config;
