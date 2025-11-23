/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        neon: {
          blue: '#00eaff',
          cyan: '#00fff7',
          teal: '#00ffd0',
          purple: '#a259ff',
          green: '#00ff9d',
          red: '#ff0059',
        },
        glass: 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        'neon-blue': '0 0 16px #00eaff, 0 0 32px #00eaff44',
        'neon-green': '0 0 16px #00ff9d, 0 0 32px #00ff9d44',
        'hud': '0 4px 32px 0 #00eaff33, 0 1.5px 8px 0 #00ff9d22',
      },
      backgroundImage: {
        'hud-gradient': 'linear-gradient(135deg, #0f172a 60%, #00eaff22 100%)',
        'glass': 'linear-gradient(120deg, rgba(255,255,255,0.08) 60%, rgba(0,234,255,0.08) 100%)',
      },
      backdropBlur: {
        hud: '8px',
      },
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
