import { colors, gradients } from '@/utils/colors';
import { SxProps, Theme } from '@mui/material';
import { sharedStyles } from '@/styles/shared.styles';

// Main container styles
export const tournamentsContainerStyles: SxProps<Theme> = {
  backgroundColor: colors.background.primary,
  minHeight: '100vh',
  pt: { xs: 3, sm: 4 },
  pb: { xs: 4, sm: 6 }
};

export const tournamentsContentStyles: SxProps<Theme> = {
  ...sharedStyles.container,
  maxWidth: '1200px',
  mx: 'auto',
  px: { xs: 2, sm: 3, md: 4 },
  pb: 6
};

// Page header styles
export const pageHeaderStyles: SxProps<Theme> = {
  textAlign: 'center',
  mb: 6
};

export const pageTitleStyles: SxProps<Theme> = {
  color: colors.text.primary,
  fontSize: { xs: '2rem', sm: '3rem' },
  fontWeight: 700,
  mb: 2,
  textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  letterSpacing: '0.5px'
};

export const pageSubtitleStyles: SxProps<Theme> = {
  color: colors.text.secondary,
  fontSize: { xs: '1.1rem', sm: '1.3rem' },
  fontWeight: 400,
  maxWidth: '800px',
  margin: '0 auto',
  lineHeight: 1.6,
};

// Controls section styles
export const controlsSectionStyles: SxProps<Theme> = {
  mb: 6,
  p: { xs: 3, sm: 4 },
  backgroundColor: colors.background.secondary,
  borderRadius: '20px',
  border: `1px solid ${colors.primaryBorder}`,
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
};

// Sport selector styles
export const sportSelectorStyles: SxProps<Theme> = {
  mb: 4,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
  justifyContent: 'center',
  '& .MuiToggleButton-root': {
    color: colors.text.secondary,
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.primaryBorder}`,
    borderRadius: '12px',
    padding: '12px 24px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    minWidth: '120px',
    '&:hover': {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primaryBorder,
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    },
    '&.Mui-selected': {
      background: colors.gradients.primary,
      color: colors.text.primary,
      borderColor: colors.primaryBorder,
      boxShadow: `0 8px 20px ${colors.shadows.primary}`,
      '&:hover': {
        background: gradients.primaryHover
      }
    }
  }
};

// Search field styles
export const searchFieldStyles: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: colors.background.secondary,
    borderRadius: '12px',
    border: `1px solid ${colors.border.secondary}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: colors.primaryBorder,
      backgroundColor: colors.background.tertiary,
    },
    '&.Mui-focused': {
      borderColor: colors.primary,
      backgroundColor: colors.background.tertiary,
      boxShadow: `0 0 0 2px ${colors.primaryLight}`,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiInputBase-input': {
      color: colors.text.primary,
      '&::placeholder': {
        color: colors.text.muted,
        opacity: 1,
      },
    },
    '& .MuiInputAdornment-root': {
      color: colors.text.muted,
    },
  },
};

// Results section styles
export const resultsSectionStyles: SxProps<Theme> = {
  mt: 4,
  mb: 4
};

export const resultsHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 3,
  py: 2
};

export const resultsTitleStyles: SxProps<Theme> = {
  color: colors.text.primary,
  fontSize: '1.5rem',
  fontWeight: 700
};

export const resultsCountStyles: SxProps<Theme> = {
  backgroundColor: colors.primaryLight,
  color: colors.primary,
  border: `1px solid ${colors.primaryBorder}`,
  fontWeight: 600
};

// Tournament grid styles
export const tournamentGridStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: { xs: 2, sm: 3 },
  mt: 4
};

// Legacy grid styles for backward compatibility
export const tournamentsGridStyles: SxProps<Theme> = {
  display: 'grid',
  gap: 4,
  width: '100%',
  maxWidth: '100%',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)'
  },
  pb: 4
};

// Loading and error states
export const loadingContainerStyles: SxProps<Theme> = {
  ...sharedStyles.loadingContainer
};

export const errorContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 8
};

// Empty state styles
export const emptyStateStyles: SxProps<Theme> = {
  textAlign: 'center',
  py: 8,
  color: colors.text.secondary,
  '& .MuiTypography-h6': {
    color: colors.text.primary,
    mb: 2,
  },
  '& .MuiTypography-body1': {
    color: colors.text.secondary,
    mb: 3,
  },
};

export const emptyStateContainerStyles: SxProps<Theme> = {
  ...sharedStyles.emptyStateContainer
};

export const emptyStateTextStyles: SxProps<Theme> = {
  color: colors.text.secondary,
  mb: 1
};

export const emptyStateSubtextStyles: SxProps<Theme> = {
  color: colors.text.disabled,
  fontSize: '0.875rem'
};

// Loading state styles
export const loadingStateStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  color: colors.primary,
};

// Error state styles
export const errorStateStyles: SxProps<Theme> = {
  textAlign: 'center',
  py: 8,
  color: colors.error,
  '& .MuiTypography-h6': {
    color: colors.error,
    mb: 2,
  },
  '& .MuiTypography-body1': {
    color: colors.text.secondary,
    mb: 3,
  },
};
