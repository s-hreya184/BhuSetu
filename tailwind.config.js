/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        npci: {
          blue: '#004B87',
          orange: '#F37021',
          teal: '#00838F',
          dark: '#0B1E38',
          accent: '#10B981'
        },
        drunix: {
          primary: '#4338CA',
          light: '#6366F1',
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(59, 130, 246, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
