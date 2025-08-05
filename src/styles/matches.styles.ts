import { SxProps, Theme } from '@mui/material';
import { themeColors } from '@/config/theme';
import { sharedStyles } from '@/styles/shared.styles';

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
  mb: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const sectionTitleStyles: SxProps<Theme> = {
  color: '#fff',
  fontSize: { xs: '1.5rem', sm: '2rem' },
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  position: 'relative',
  textAlign: 'center',
  padding: '0 20px',
  '&:before, &:after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    width: { xs: '30px', sm: '50px' },
    height: '2px',
    background: 'linear-gradient(90deg, rgba(59, 130, 246, 0), rgba(59, 130, 246, 1))',
    transform: 'translateY(-50%)'
  },
  '&:before': {
    left: { xs: '-30px', sm: '-50px' },
  },
  '&:after': {
    right: { xs: '-30px', sm: '-50px' },
    background: 'linear-gradient(90deg, rgba(59, 130, 246, 1), rgba(59, 130, 246, 0))'
  }
};

// Swiper container styles
export const swiperContainerStyles: SxProps<Theme> = {
  position: 'relative',
  '.swiper': { 
    pb: 5,
    overflow: 'hidden !important',
    px: { xs: 1, md: 6 },
    pt: 1
  },
  '.swiper-pagination': {
    bottom: 0,
  },
  '.swiper-pagination-bullet': {
    backgroundColor: 'rgba(59, 130, 246, 0.5)',
    opacity: 0.5,
    width: '10px',
    height: '10px',
    margin: '0 6px',
    transition: 'all 0.3s ease',
    '&-active': {
      backgroundColor: '#3B82F6',
      opacity: 1,
      transform: 'scale(1.2)'
    }
  },
  '.swiper-button-next, .swiper-button-prev': {
    color: '#3B82F6',
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: 'white',
      backgroundColor: '#3B82F6',
      transform: 'scale(1.1)'
    },
    '&::after': {
      fontSize: '18px',
      fontWeight: 'bold'
    }
  },
  '.swiper-button-prev': {
    left: { xs: 4, md: -5 }
  },
  '.swiper-button-next': {
    right: { xs: 4, md: -5 }
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
    xs: '1fr', 
    sm: 'repeat(2, 1fr)', 
    md: 'repeat(3, 1fr)' 
  },
  gap: 3,
  width: '100%',
  mt: 2
};

// Section wrapper styles
export const sectionWrapperStyles: SxProps<Theme> = {
  mb: 5,
  pb: 3,
  position: 'relative'
};

// Loading and error states
export const loadingContainerStyles: SxProps<Theme> = {
  ...sharedStyles.loadingContainer
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