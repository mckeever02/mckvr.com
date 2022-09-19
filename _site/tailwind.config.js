const defaultTheme = require('tailwindcss/defaultTheme');


module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
    standardFontWeights: true,
  },
  purge: {
    content: ['./**/*.html', './**/*.md'],
    options: {
      whitelist: ['scale-90']
    }
  },
  theme: {
    screens: {
      xs: '500px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1920px'
    },
    extend: {
      fontFamily: {
        sans: ['Studio Feixen Sans', ...defaultTheme.fontFamily.sans],
        edgy: [
          'Studio Feixen Sans Edgy',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      inset: {
        '-20': '-5rem',
      },
      margin: {
        '-2px': '-2px',
      },
      spacing: {
        '2px': '2px',
        7: '1.75rem',
        14: '3.5rem',
      },
      fontSize: {
        '1xl': '1.375rem',
        '3-75xl': '2.125rem'
      },
      opacity: {
        5: '.05',
        10: '.1',
      },
      maxWidth: {
        '7xl': '80rem'
      },
      lineHeight: {
        'extra-relaxed': '1.75'
      },
      width: {
        7: '1.75rem'
      },
      scale: {
        102: '1.02'
      },
      colors: {
        altGray: {
          100: '#F9FAFA',
          200: '#F1F2F3',
          300: '#E7E9EB',
          400: '#D1D5DA',
          500: '#A8AFB8',
          600: '#5C6470',
          700: '#393E46',
          800: '#22252A',
          900: '#1d1e21',
          1000: '#0B0C0E',
        },
        neutralGray: {
          700: '#8e8e90'
        },
        lavender: '#D8C9DD',
        'beryl-green': '#dce6c7',
        janna: '#f7ebd5',
        cosmos: '#C9E8E3',
        skeptic: '#c1e6cf',
        'water-leaf': '#a3f4de',
        'gray-nurse': '#ebe9e4',
      },
      typography: (theme) => ({
        default: {
          css: {
            color: theme('colors.altGray.900'),
            strong: {
              fontWeight: theme('fontWeight.medium'),
            },
            h2: {
              fontWeight: theme('fontWeight.medium'),
            },
            a: {
              color: 'inherit',
              textDecoration: 'underline',
              '&:hover': {
                opacity: '.75'
              }
            },
          },
        },
      }),
    },
  },
  variants: {
    padding: ['responsive', 'hover'],
    scale: ['responsive', 'hover', 'active', 'group-hover'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    backgroundOpacity: ['responsive', 'hover', 'focus', 'group-hover'],
    translate: ['responsive', 'hover', 'focus', 'group-hover'],
    margin: ['responsive', 'last'],
    gap: ['responsive']
  },
  plugins: [require('@tailwindcss/typography')],
};