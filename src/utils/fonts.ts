import { fonts } from '@/config/styledTheme';

// Font utility functions
export const fontUtils = {
  // Get primary font (for headings and odds)
  primary: (weight: 'normal' | 'bold' = 'normal') => ({
    fontFamily: fonts.primary,
    fontWeight: weight === 'bold' ? 700 : 400,
    fontStyle: 'normal' as const
  }),

  // Get secondary font (for subheadings and branding)
  secondary: (weight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' = 'normal') => ({
    fontFamily: fonts.secondary,
    fontWeight: weight === 'light' ? 300 : 
               weight === 'normal' ? 400 :
               weight === 'medium' ? 500 :
               weight === 'semibold' ? 600 : 700,
    fontStyle: 'normal' as const
  }),

  // Get body font (for UI text)
  body: (weight: 'light' | 'normal' | 'medium' | 'bold' = 'normal') => ({
    fontFamily: fonts.body,
    fontWeight: weight === 'light' ? 300 :
               weight === 'normal' ? 400 :
               weight === 'medium' ? 500 : 700,
    fontStyle: 'normal' as const
  }),

  // Get data font (for stats and numbers)
  data: (weight: 'light' | 'normal' | 'semibold' | 'bold' = 'normal') => ({
    fontFamily: fonts.data,
    fontWeight: weight === 'light' ? 300 :
               weight === 'normal' ? 400 :
               weight === 'semibold' ? 600 : 700,
    fontStyle: 'normal' as const
  }),

  // Get fallback font
  fallback: () => ({
    fontFamily: fonts.fallback,
    fontWeight: 400,
    fontStyle: 'normal' as const
  })
};

// Typography presets for common use cases
export const typography = {
  // Page titles and main headings
  pageTitle: {
    ...fontUtils.secondary('bold'),
    fontSize: { xs: '2rem', sm: '3rem' },
    lineHeight: 1.2,
    letterSpacing: '0.5px'
  },

  // Section headings
  sectionTitle: {
    ...fontUtils.secondary('semibold'),
    fontSize: { xs: '1.5rem', sm: '2rem' },
    lineHeight: 1.3,
    letterSpacing: '0.25px'
  },

  // Card titles
  cardTitle: {
    ...fontUtils.primary('bold'),
    fontSize: '1.25rem',
    lineHeight: 1.4
  },

  // Odds and betting numbers
  odds: {
    ...fontUtils.primary('bold'),
    fontSize: '1.1rem',
    lineHeight: 1.2
  },

  // Live scores and match data
  liveScore: {
    ...fontUtils.data('bold'),
    fontSize: '1.5rem',
    lineHeight: 1.1
  },

  // Statistics and data
  stats: {
    ...fontUtils.data('semibold'),
    fontSize: '1rem',
    lineHeight: 1.3
  },

  // Body text
  body: {
    ...fontUtils.body('normal'),
    fontSize: '1rem',
    lineHeight: 1.6
  },

  // Small text and captions
  caption: {
    ...fontUtils.body('normal'),
    fontSize: '0.875rem',
    lineHeight: 1.4
  },

  // Button text
  button: {
    ...fontUtils.body('medium'),
    fontSize: '0.9rem',
    lineHeight: 1.2,
    textTransform: 'none' as const
  }
};

// Export fonts for direct access
export { fonts };

// Export default for easy importing
export default {
  fonts,
  fontUtils,
  typography
};
