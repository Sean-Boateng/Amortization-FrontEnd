import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 70% 30%, var(--tw-gradient-stops))',
      },
      buttons: {
        'primary': 'bg-blue-500 text-white px-4 py-2 rounded-md border',
        // Define additional button styles here
      },
    },
  },
  variants: {
    extend: {
      buttons: ['hover', 'focus'],
      spacing: {
        // Define your custom width classes here
        'custom-width1': '18.75rem',
        'custom-width2': '50rem',
      },
      // Add variants for your custom button theme here, if needed
    },
  },
  plugins: [require('daisyui')],
};

export default config;
