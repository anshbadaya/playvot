import { SxProps, Theme } from '@mui/material';
import { themeColors } from '@/config/theme';
import { sharedStyles } from '@/styles/shared.styles';

// Main container styles
export const tournamentsContainerStyles: SxProps<Theme> = {
  backgroundColor: themeColors.background,
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
  color: '#fff',
  fontSize: { xs: '2rem', sm: '3rem' },
  fontWeight: 800,
  mb: 2,
  textShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
  background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
};

export const pageSubtitleStyles: SxProps<Theme> = {
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: { xs: '1rem', sm: '1.2rem' },
  fontWeight: 500,
  maxWidth: 600,
  mx: 'auto',
  lineHeight: 1.6
};

// Controls section styles
export const controlsSectionStyles: SxProps<Theme> = {
  mb: 6,
  p: { xs: 3, sm: 4 },
  backgroundColor: 'rgba(15, 23, 42, 0.8)',
  borderRadius: '20px',
  border: '1px solid rgba(59, 130, 246, 0.2)',
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
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '12px',
    padding: '12px 24px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    minWidth: '120px',
    '&:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgba(59, 130, 246, 0.5)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    },
    '&.Mui-selected': {
      background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      color: 'white',
      borderColor: 'rgba(59, 130, 246, 0.8)',
      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
      '&:hover': {
        background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)'
      }
    }
  }
};

// Search field styles
export const searchFieldStyles: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'rgba(255, 255, 255, 0.9)',
    padding: '16px 20px',
    '&:hover': {
      borderColor: 'rgba(59, 130, 246, 0.5)'
    },
    '&.Mui-focused': {
      borderColor: '#3B82F6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
    },
    '& .MuiOutlinedInput-input': {
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: 500,
      fontSize: '1rem',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 1
      }
    },
    '& .MuiInputAdornment-root': {
      color: 'rgba(255, 255, 255, 0.6)'
    }
  }
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
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '1.5rem',
  fontWeight: 700
};

export const resultsCountStyles: SxProps<Theme> = {
  backgroundColor: 'rgba(59, 130, 246, 0.2)',
  color: '#3B82F6',
  border: '1px solid rgba(59, 130, 246, 0.4)',
  fontWeight: 600
};

// Grid styles
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

export const emptyStateContainerStyles: SxProps<Theme> = {
  ...sharedStyles.emptyStateContainer
};

export const emptyStateTextStyles: SxProps<Theme> = {
  color: themeColors.text.secondary,
  mb: 1
};

export const emptyStateSubtextStyles: SxProps<Theme> = {
  color: themeColors.text.disabled,
  fontSize: '0.875rem'
};
