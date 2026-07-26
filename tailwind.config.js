/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Industrial palette
        bg: {
          primary: '#111111',
          surface: '#1E1E1E',
          elevated: '#262626',
          hover: '#2A2A2A',
        },
        ink: {
          main: '#F4F4F4',
          muted: '#A8A8A8',
          faint: '#6B6B6B',
        },
        accent: {
          DEFAULT: '#FF8C00',
          yellow: '#F5A623',
          soft: 'rgba(255, 140, 0, 0.12)',
          ring: 'rgba(255, 140, 0, 0.35)',
        },
        steel: {
          50: '#E8E8E8',
          100: '#C4C4C4',
          200: '#9A9A9A',
          300: '#6B6B6B',
          400: '#4A4A4A',
          500: '#2E2E2E',
          600: '#1E1E1E',
          700: '#161616',
          800: '#0E0E0E',
        },
        success: '#3FBF7F',
        warning: '#F5A623',
        danger: '#E5484D',
      },
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
        display: ['Cairo', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        industrial: '4px',
        'industrial-lg': '8px',
      },
      boxShadow: {
        industrial: '0 2px 8px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset',
        'industrial-lg': '0 12px 32px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.05) inset',
        glow: '0 0 0 1px rgba(255,140,0,0.5), 0 0 24px rgba(255,140,0,0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-in-left': 'slide-in-left 0.3s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
};
