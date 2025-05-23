const srcDir = '.';

const nord = {
  polarnight: {
    'nord-0': 'hsl(var(--color-nord-0) / <alpha-value>)',
    'nord-1': 'hsl(var(--color-nord-1) / <alpha-value>)',
    'nord-2': 'hsl(var(--color-nord-2) / <alpha-value>)',
    'nord-3': 'hsl(var(--color-nord-3) / <alpha-value>)',
  },
  snowstorm: {
    'nord-4': 'hsl(var(--color-nord-4) / <alpha-value>)',
    'nord-5': 'hsl(var(--color-nord-5) / <alpha-value>)',
    'nord-6': 'hsl(var(--color-nord-6) / <alpha-value>)',
  },
  frost: {
    'nord-7': 'hsl(var(--color-nord-7) / <alpha-value>)',
    'nord-8': 'hsl(var(--color-nord-8) / <alpha-value>)',
    'nord-9': 'hsl(var(--color-nord-9) / <alpha-value>)',
    'nord-10': 'hsl(var(--color-nord-10) / <alpha-value>)',
  },
  aurora: {
    'nord-11': 'hsl(var(--color-nord-11) / <alpha-value>)',
    'nord-12': 'hsl(var(--color-nord-12) / <alpha-value>)',
    'nord-13': 'hsl(var(--color-nord-13) / <alpha-value>)',
    'nord-14': 'hsl(var(--color-nord-14) / <alpha-value>)',
    'nord-15': 'hsl(var(--color-nord-15) / <alpha-value>)',
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [`${srcDir}/content/**/*.{vue,md}`],
  safelist: [
    'fade-enter-active',
    'fade-leave-active',
    'fade-enter-from',
    'fade-leave-to',
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'primary': 'hsl(var(--color-primary) / <alpha-value>)',
      'primary-content': 'hsl(var(--color-primary-content) / <alpha-value>)',
      'secondary': 'hsl(var(--color-secondary) / <alpha-value>)',
      'secondary-content':
        'hsl(var(--color-secondary-content) / <alpha-value>)',
      'accent': 'hsl(var(--color-accent) / <alpha-value>)',
      'accent-content': 'hsl(var(--color-accent-content) / <alpha-value>)',
      'neutral': 'hsl(var(--color-neutral) / <alpha-value>)',
      'neutral-content': 'hsl(var(--color-neutral-content) / <alpha-value>)',
      'warning': 'hsl(var(--color-warning) / <alpha-value>)',
      'warning-content': 'hsl(var(--color-warning-content) / <alpha-value>)',
      'success': 'hsl(var(--color-success) / <alpha-value>)',
      'success-content': 'hsl(var(--color-success-content) / <alpha-value>)',
      'danger': 'hsl(var(--color-danger) / <alpha-value>)',
      'danger-content': 'hsl(var(--color-danger-content) / <alpha-value>)',
      'info': 'hsl(var(--color-info) / <alpha-value>)',
      'info-content': 'hsl(var(--color-info-content) / <alpha-value>)',
      'white': 'hsl(var(--color-white) / <alpha-value>)',
      'black': 'hsl(var(--color-black) / <alpha-value>)',
      'body': {
        background: 'hsl(var(--color-body-background) / <alpha-value>)',
        txt: 'hsl(var(--color-body-text) / <alpha-value>)',
      },
      'muted': {
        text: 'var(--color-muted-text-hex)',
      },
      ...nord,
    },
    fontFamily: {
      display: ['Rubik', 'system-ui', 'sans-serif'],
      body: ['system-ui', 'sans-serif'],
      code: ['monospace'],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        md: '3rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
    require('@headlessui/tailwindcss'),
  ],
};
