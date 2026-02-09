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
          DEFAULT: '#ff6b6b',
          hover: '#fa5252',
        },
        dark: {
          bg: '#121212',
          card: '#1e1e1e',
          input: '#1e1e1e',
          border: '#333333',
          text: '#e0e0e0',
          secondary: '#aaaaaa',
        },
        light: {
          bg: '#ffffff',
          card: '#ffffff',
          input: '#f9f9f9',
          border: '#e0e0e0',
          text: '#333333',
          secondary: '#666666',
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
