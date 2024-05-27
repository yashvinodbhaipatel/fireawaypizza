module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // Include this if using app directory in Next.js 13+
  ],
  theme: {
    extend: {
      colors: {
        primary: 'orange', // Define your custom primary color here
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
