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
      colors: {
        'surface': '#15121a',
        'surface-container': '#211e27',
        'surface-elevated': '#202024',
        'bg-deep': '#09090A',
        'primary': '#d0bcff',
        'primary-container': '#8257e5',
        'inverse-primary': '#6c3fce',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A8A8B3',
        'text-muted': '#737380',
        'border-subtle': '#29292E',
        'outline': '#958e9f',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
