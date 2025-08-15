/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-cream',
    'bg-primary',
    'bg-accent', 
    'bg-secondary',
    'text-cream',
    'text-primary',
    'text-accent',
    'text-secondary',
    'border-cream',
    'border-primary',
    'border-accent',
    'border-secondary',
    'hover:bg-cream',
    'hover:bg-primary',
    'hover:bg-accent',
    'hover:bg-secondary',
    // Variantes mIAm
    'bg-miam-cream-100',
    'bg-miam-cream-200',
    'bg-miam-cream-300',
    'bg-miam-cream-400',
    'bg-miam-primary-100',
    'bg-miam-primary-600',
    'bg-miam-primary-700',
    'bg-miam-primary-800',
    'bg-miam-accent-700',
    'text-miam-primary-800',
    'text-miam-cream-200',
    'border-miam-cream-200',
    'border-miam-cream-300',
    'hover:bg-miam-cream-100',
    'hover:bg-miam-cream-400',
    'hover:bg-miam-primary-600',
    'hover:bg-miam-accent-700',
  ],
  theme: {
    extend: {
      colors: {
        // Palette mIAm personnalisée
        cream: '#FAF3E0',        // Toile de fond principale
        primary: '#8BC34A',      // Actions clés (swipe, panier, validation)
        accent: '#C62828',       // CTA & alertes
        secondary: '#2E7D32',    // Éléments secondaires (liens, survols)
        
        // Variantes pour plus de flexibilité
        miam: {
          cream: {
            50: '#FEFBF5',
            100: '#FAF3E0',
            200: '#F5EBCB',
            300: '#F0E3B6',
            400: '#EBDBA1',
            500: '#E6D38C',
            600: '#E1CB77',
            700: '#DCC362',
            800: '#D7BB4D',
            900: '#D2B338'
          },
          primary: {
            50: '#F1F8E9',
            100: '#DCEDC8',
            200: '#C5E1A5',
            300: '#AED581',
            400: '#9CCC65',
            500: '#8BC34A',
            600: '#7CB342',
            700: '#689F38',
            800: '#558B2F',
            900: '#33691E'
          },
          accent: {
            50: '#FFEBEE',
            100: '#FFCDD2',
            200: '#EF9A9A',
            300: '#E57373',
            400: '#EF5350',
            500: '#F44336',
            600: '#E53935',
            700: '#D32F2F',
            800: '#C62828',
            900: '#B71C1C'
          },
          secondary: {
            50: '#E8F5E8',
            100: '#C8E6C8',
            200: '#A5D6A7',
            300: '#81C784',
            400: '#66BB6A',
            500: '#4CAF50',
            600: '#43A047',
            700: '#388E3C',
            800: '#2E7D32',
            900: '#1B5E20'
          }
        }
      },
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}