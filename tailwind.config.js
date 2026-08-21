/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070B14',
          900: '#0B1220',
          850: '#0E1626',
          800: '#131D31',
          700: '#1B2740',
          600: '#26324D',
          500: '#3A4767',
        },
        mist: {
          400: '#8592AD',
          300: '#A8B3CC',
          200: '#C7D0E3',
          100: '#E7EBF5',
        },
        brand: {
          600: '#2563EB',
          500: '#3B82F6',
          400: '#5B9CFF',
        },
        cyan: {
          400: '#22D3EE',
          300: '#67E8F9',
        },
        amber: {
          500: '#F59E0B',
          400: '#FBBF24',
        },
        good: '#34D399',
        bad: '#FB7185',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 15% 0%, rgba(91,156,255,0.16), transparent 45%), radial-gradient(circle at 85% 10%, rgba(34,211,238,0.10), transparent 40%)',
        'card-sheen':
          'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(3,7,18,0.45)',
        glow: '0 0 0 1px rgba(91,156,255,0.15), 0 0 24px rgba(59,130,246,0.15)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: .6 } },
      },
      animation: {
        fadeUp: 'fadeUp .5s ease-out both',
        pulseSoft: 'pulseSoft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
