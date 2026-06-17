/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        bg3: 'var(--bg3)',
        text: 'var(--text)',
        text2: 'var(--text2)',
        text3: 'var(--text3)',
        borderc: 'var(--border)',
        accent: 'var(--accent)',
        accentFg: 'var(--accent-fg)',
      },
      boxShadow: {
        lens: '0 0 20px rgba(74,222,128,0.15)',
      },
    },
  },
  plugins: [],
};
