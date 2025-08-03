import { SxProps, Theme } from '@mui/material';

// Main container styles
export const matchesContainerStyles: SxProps<Theme> = {
  backgroundColor: '#0F1421',
  minHeight: '100vh',
  pt: { xs: 3, sm: 4 }
};

export const matchesContentStyles: SxProps<Theme> = {
  px: { xs: 2, sm: 3 },
  pb: { xs: 6, sm: 8 }
};

// Section title styles
export const sectionTitleContainerStyles: SxProps<Theme> = {
  position: 'relative',
  textAlign: 'center',
  mb: { xs: 3, sm: 4 },
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    zIndex: 0
  }
};

export const sectionTitleStyles: SxProps<Theme> = {
  color: '#FFFFFF',
  fontSize: { xs: '0.875rem', sm: '1rem' },
  fontWeight: 500,
  letterSpacing: '0.1em',
  backgroundColor: '#0F1421',
  padding: '0 24px',
  position: 'relative',
  zIndex: 1,
  textTransform: 'uppercase'
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
  display: 'grid', 
  gridTemplateColumns: {
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)'
  },
  gap: { xs: 2, sm: 3 }
};

// Section wrapper styles
export const sectionWrapperStyles: SxProps<Theme> = {
  mb: { xs: 6, sm: 8 }
};

// Loading and error states
export const loadingContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  color: '#FFFFFF'
};

export const errorContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  color: '#EF4444',
  textAlign: 'center',
  p: 3
};

export const errorTextStyles: SxProps<Theme> = {
  color: '#EF4444',
  mb: 2
};

export const retryButtonStyles: SxProps<Theme> = {
  mt: 2,
  bgcolor: '#EF4444',
  color: 'white',
  '&:hover': {
    bgcolor: '#DC2626'
  }
};

// Empty state styles
export const emptyStateContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  color: '#94A3B8',
  textAlign: 'center',
  p: 3
};

export const emptyStateTextStyles: SxProps<Theme> = {
  color: '#94A3B8',
  mb: 1
};

export const emptyStateSubtextStyles: SxProps<Theme> = {
  color: '#64748B',
  fontSize: '0.875rem'
}; 