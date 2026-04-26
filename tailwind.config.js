/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rouge: '#C8231A',
        jaune: '#F5C518',
        vert: '#1B7A3E',
        'rouge-light': '#FFF0EF',
        'jaune-light': '#FFFBEA',
        'vert-light': '#EEF7F1',
        cream: '#FAF8F4',
        dark: '#1A1109',
        mid: '#4A3728',
        muted: '#8A7060',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        'hero': '72px',
        'section': '48px',
        'card': '24px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
