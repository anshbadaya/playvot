import { colors } from '@/utils/colors';
import { SxProps, Theme } from '@mui/material';
import { sharedStyles } from '@/styles/shared.styles';

// Main container styles
export const matchesContainerStyles: SxProps<Theme> = {
  backgroundColor: colors.background.primary,
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
  color: colors.text.primary,
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
    background: colors.primary,
    transform: 'translateY(-50%)'
  },
  '&:before': {
    left: { xs: '-30px', sm: '-50px' },
  },
  '&:after': {
    right: { xs: '-30px', sm: '-50px' },
    background: colors.primary
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
    backgroundColor: colors.primaryLight,
    opacity: 0.5,
    width: '10px',
    height: '10px',
    margin: '0 6px',
    transition: 'all 0.3s ease',
    '&-active': {
      backgroundColor: colors.primary,
      opacity: 1,
      transform: 'scale(1.2)'
    }
  },
  '.swiper-button-next, .swiper-button-prev': {
    color: colors.primary,
    width: '40px',
    height: '40px',
    backgroundColor: colors.background.card,
    borderRadius: '50%',
    boxShadow: colors.shadows.dark,
    transition: 'all 0.3s ease',
    '&:hover': {
      color: colors.text.primary,
      backgroundColor: colors.primary,
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
    opacity: 0.3,
    cursor: 'not-allowed',
    '&:hover': {
      transform: 'none',
      backgroundColor: colors.background.card,
      color: colors.text.muted
    }
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
  color: colors.text.secondary,
  mb: 1
};

export const emptyStateSubtextStyles: SxProps<Theme> = {
  color: colors.text.disabled,
  fontSize: '0.875rem'
}; 

// Match card styles
export const matchCardContainerStyles: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: colors.primaryLight
  }
};

export const matchCardShineStyles: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  left: '-100%',
  width: '100%',
  height: '100%',
  background: `linear-gradient(120deg, ${colors.primaryLight}, rgba(0, 89, 255, 0.1))`,
  transition: 'left 0.5s ease',
  zIndex: 1,
  '&:hover': {
    left: '100%'
  }
};

export const matchCardStyles: SxProps<Theme> = {
  position: 'relative',
  zIndex: 2,
  background: `linear-gradient(180deg, ${colors.primaryLight} 0%, rgba(0, 89, 255, 0.02))`,
  borderRadius: '16px',
  border: `1px solid ${colors.primaryBorder}`,
  padding: 3,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backdropFilter: 'blur(10px)',
  boxShadow: colors.shadows.dark,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: colors.primary,
    boxShadow: `0 8px 32px ${colors.shadows.primary}`
  }
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