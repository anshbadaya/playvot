import { SxProps, Theme } from '@mui/material';
import { colors, colorUtils, colorCombinations } from '@/utils/colors';

// Common style patterns
export const sharedStyles = {
  // Layout patterns
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: { xs: 2, sm: 3, md: 4 }
  },

  // Card patterns
  card: {
    backgroundColor: colors.background.card,
    borderRadius: '12px',
    border: `1px solid ${colors.border.primary}`,
    backdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease-in-out',
    padding: { xs: 2, sm: 2.5, md: 3 },
    '&:hover': {
      borderColor: colors.primaryBorder,
      boxShadow: `0 4px 20px ${colors.primaryLight}`
    }
  },

  cardHeader: {
    backgroundColor: colors.background.secondary,
    borderBottom: `1px solid ${colors.border.primary}`,
    padding: '16px',
    borderRadius: '12px 12px 0 0',
    marginBottom: 2
  },

  // Button patterns
  primaryButton: {
    borderRadius: 8,
    textTransform: 'none',
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
    backgroundColor: colors.primary,
    color: colors.text.primary,
    '&:hover': {
      backgroundColor: colors.primaryHover,
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 12px ${colors.primaryLight}`
    }
  },

  secondaryButton: {
    borderRadius: 8,
    textTransform: 'none',
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
    backgroundColor: 'transparent',
    color: colors.text.primary,
    border: `1px solid ${colors.border.secondary}`,
    '&:hover': {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primaryBorder,
      transform: 'translateY(-1px)'
    }
  },

  // Text patterns
  heading: {
    color: colors.text.primary,
    fontWeight: 600,
    letterSpacing: '0.5px'
  },

  subheading: {
    color: colors.text.secondary,
    fontWeight: 500,
    letterSpacing: '0.25px'
  },

  bodyText: {
    color: colors.text.primary,
    fontWeight: 400,
    lineHeight: 1.6
  },

  caption: {
    color: colors.text.secondary,
    fontSize: '0.875rem',
    fontWeight: 400
  },

  // Status patterns
  status: {
    success: {
      backgroundColor: colors.successLight,
      color: colors.success,
      border: `1px solid ${colors.successBorder}`
    },
    warning: {
      backgroundColor: colors.warningLight,
      color: colors.warning,
      border: `1px solid ${colors.warningBorder}`
    },
    error: {
      backgroundColor: colors.errorLight,
      color: colors.error,
      border: `1px solid ${colors.errorBorder}`
    },
    info: {
      backgroundColor: colors.primaryLight,
      color: colors.primary,
      border: `1px solid ${colors.primaryBorder}`
    }
  },

  // Loading patterns
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    color: colors.primary
  },

  // Error patterns
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    color: colors.error,
    textAlign: 'center',
    padding: 3
  },

  // Empty state patterns
  emptyStateContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    color: colors.text.secondary,
    textAlign: 'center',
    padding: 3
  },

  // Grid patterns
  gridContainer: {
    display: 'grid',
    gap: { xs: 2, sm: 3, md: 4 }
  },

  grid2Cols: {
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)'
    }
  },

  grid3Cols: {
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)'
    }
  },

  grid4Cols: {
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)'
    }
  },

  // Flex patterns
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },

  // Spacing patterns
  section: {
    marginBottom: { xs: 4, sm: 6, md: 8 }
  },

  sectionTitle: {
    marginBottom: { xs: 2, sm: 3, md: 4 },
    textAlign: 'center',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      top: '50%',
      height: '1px',
      backgroundColor: colorUtils.withOpacity(colors.text.primary, 0.08),
      zIndex: 0
    }
  },

  sectionTitleText: {
    backgroundColor: colors.background.primary,
    padding: '0 24px',
    position: 'relative',
    zIndex: 1,
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  }
};

// Utility functions for dynamic styles
export const createHoverStyle = (
  baseStyle: SxProps<Theme>,
  hoverStyle: SxProps<Theme>
): SxProps<Theme> => ({
  ...baseStyle,
  transition: 'all 0.2s ease-in-out',
  '&:hover': hoverStyle
} as any);

export const createStatusStyle = (status: 'success' | 'warning' | 'error' | 'info') => 
  sharedStyles.status[status];

// Animation styles
export const animationStyles = {
  fadeIn: {
    animation: 'fadeIn 0.3s ease-in-out'
  },
  slideUp: {
    animation: 'slideUp 0.3s ease-out'
  },
  pulse: {
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  }
}; 