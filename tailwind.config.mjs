const {
  default: flattenColorPalette
} = require('tailwindcss/lib/util/flattenColorPalette')

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      fontFamily: {
        sans: ['var(--font-productsans)', 'sans-serif']
      },
      animation: {
        first: 'moveHorizontal 30s ease infinite',
        second: 'moveInCircle 20s reverse infinite',
        third: 'moveInCircle 20s ease infinite',
        fourth: 'moveHorizontal 40s ease infinite',
        fifth: 'moveInCircle 20s ease infinite',
        'meteor-effect': 'meteor 1s linear infinite'
      },
      keyframes: {
        moveHorizontal: {
          '0%': { transform: 'translateX(-50%) translateY(-10%)' },
          '50%': { transform: 'translateX(50%) translateY(10%)' },
          '100%': { transform: 'translateX(-50%) translateY(-10%)' }
        },
        moveInCircle: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        moveVertical: {
          '0%': { transform: 'translateY(-50%)' },
          '50%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(-50%)' }
        },
        meteor: {
          '0%': { transform: 'rotate(90deg) translateX(-20px)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(90deg) translateX(-300px)',
            opacity: '0'
          }
        }
      }
    }
  },
  plugins: [addVariablesForColors]
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars
  })
}
