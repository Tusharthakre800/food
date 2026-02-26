/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        dark: {
          bg: 'var(--dark-bg)',
          card: 'var(--dark-card)',
          input: 'var(--dark-input)',
          border: 'var(--dark-border)',
          text: 'var(--dark-text)',
          secondary: 'var(--dark-secondary)',
        },
        light: {
          bg: 'var(--light-bg)',
          card: 'var(--light-card)',
          input: 'var(--light-input)',
          border: 'var(--light-border)',
          text: 'var(--light-text)',
          secondary: 'var(--light-secondary)',
        }
      },
      keyframes: {
        'like-pop': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'dislike-shake': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '20%': { transform: 'scale(1.1)', opacity: '1' },
          '40%': { transform: 'rotate(-10deg)' },
          '60%': { transform: 'rotate(10deg)' },
          '80%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        'like-pop': 'like-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'dislike-shake': 'dislike-shake 0.5s ease-in-out forwards',
      }
    },
  },
  plugins: [],
}
