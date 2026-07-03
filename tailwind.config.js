/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#08090a',
        ink: '#0d1712',
        panel: '#111b16',
        line: '#213028',
        steel: '#3a423e',
        emerald: {
          DEFAULT: '#1be996',
          dim: '#0f6b4d',
        },
        crimson: {
          DEFAULT: '#ff3b52',
          dim: '#7a1424',
        },
        bone: '#eae7dd',
        ash: '#8b948d',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}
