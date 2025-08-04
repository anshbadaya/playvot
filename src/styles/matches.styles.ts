import { SxProps, Theme } from '@mui/material';
import { themeColors } from '@/config/theme';
import { sharedStyles } from './shared.styles';

// Main container styles
export const matchesContainerStyles: SxProps<Theme> = {
  backgroundColor: themeColors.background,
  minHeight: '100vh',
  pt: { xs: 3, sm: 4 }
};

export const matchesContentStyles: SxProps<Theme> = {
  ...sharedStyles.container
};

// Section title styles
export const sectionTitleContainerStyles: SxProps<Theme> = {
  ...sharedStyles.sectionTitle
};

export const sectionTitleStyles: SxProps<Theme> = {
  ...sharedStyles.sectionTitleText,
  color: themeColors.text.primary,
  fontSize: { xs: '0.875rem', sm: '1rem' },
  fontWeight: 500
};

// Swiper container styles
export const swiperContainerStyles: SxProps<Theme> = {
  position: 'relative',
  '.swiper': { 
    pb: 4,
    overflow: 'hidden !important',
    px: { xs: 0, md: 5 }
  },
  '.swiper-pagination': {
    bottom: 0,
  },
  '.swiper-pagination-bullet': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    opacity: 0.5,
    '&-active': {
      backgroundColor: 'white',
      opacity: 1
    }
  },
  '.swiper-button-next, .swiper-button-prev': {
    color: 'rgba(255, 255, 255, 0.8)',
    width: '32px',
    height: '32px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '50%',
    '&:hover': {
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    '&::after': {
      fontSize: '16px',
      fontWeight: 'bold'
    }
  },
  '.swiper-button-prev': {
    left: { xs: 4, md: 0 }
  },
  '.swiper-button-next': {
    right: { xs: 4, md: 0 }
  },
  '.swiper-button-disabled': {
    opacity: '0.35 !important',
    cursor: 'not-allowed'
  }
};

// Grid layout styles
export const gridContainerStyles: SxProps<Theme> = {
  ...sharedStyles.gridContainer,
  ...sharedStyles.grid3Cols
};

// Section wrapper styles
export const sectionWrapperStyles: SxProps<Theme> = {
  ...sharedStyles.section
};

// Loading and error states
export const loadingContainerStyles: SxProps<Theme> = {
  ...sharedStyles.loadingContainer
};

export const errorContainerStyles: SxProps<Theme> = {
  ...sharedStyles.errorContainer
};

export const errorTextStyles: SxProps<Theme> = {
  color: themeColors.error,
  mb: 2
};

export const retryButtonStyles: SxProps<Theme> = {
  mt: 2,
  ...sharedStyles.primaryButton,
  bgcolor: themeColors.error,
  '&:hover': {
    bgcolor: '#DC2626'
  }
};

// Empty state styles
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

// MatchCard Styles
export const matchCardContainerStyles: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  cursor: 'pointer',
  '&:hover': {
    '& .card-content': {
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 20px ${themeColors.primaryLight}`,
    },
    '& .shine': {
      opacity: 1,
    }
  }
};

export const matchCardShineStyles: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  padding: '1px',
  borderRadius: '12px',
  background: `linear-gradient(120deg, ${themeColors.primaryLight}, rgba(0, 89, 255, 0.1) 25%, transparent 45%, transparent 55%, rgba(0, 89, 255, 0.1) 75%, ${themeColors.primaryLight})`,
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor',
  maskComposite: 'exclude',
  opacity: 0.8,
  transition: 'opacity 0.3s ease'
};

export const matchCardStyles: SxProps<Theme> = {
  width: '100%',
  background: `linear-gradient(180deg, ${themeColors.primaryLight} 0%, rgba(0, 89, 255, 0.02) 100%)`,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  position: 'relative'
};

export const matchCardContentStyles: SxProps<Theme> = {
  p: '16px !important'
};

export const matchTypeStyles: SxProps<Theme> = {
  fontSize: '13px',
  fontWeight: 500,
  mb: 0.5,
  textTransform: 'uppercase'
};

export const matchTitleStyles: SxProps<Theme> = {
  fontSize: '14px',
  lineHeight: 1.4,
  mb: 2
};

export const teamsSectionStyles: SxProps<Theme> = {
  mb: 2
};

export const teamRowStyles: SxProps<Theme> = {
  mb: 1.5
};

export const teamNameStyles: SxProps<Theme> = {
  fontSize: '15px',
  letterSpacing: '0.5px'
};

export const matchStatusStyles: SxProps<Theme> = {
  fontSize: '13px'
}; 