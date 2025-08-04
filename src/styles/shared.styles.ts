import { SxProps, Theme, useTheme } from '@mui/material';
import { themeColors, commonStyles } from '@/config/theme';

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
    ...commonStyles.card,
    padding: { xs: 2, sm: 2.5, md: 3 }
  },

  cardHeader: {
    ...commonStyles.cardHeader,
    marginBottom: 2
  },

  // Button patterns
  primaryButton: {
    ...commonStyles.button,
    backgroundColor: themeColors.primary,
    color: themeColors.text.primary,
    '&:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.9)',
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 12px ${themeColors.primaryLight}`
    }
  },

  secondaryButton: {
    ...commonStyles.button,
    backgroundColor: 'transparent',
    color: themeColors.text.primary,
    border: `1px solid ${themeColors.border}`,
    '&:hover': {
      backgroundColor: themeColors.primaryLight,
      borderColor: themeColors.primaryBorder,
      transform: 'translateY(-1px)'
    }
  },

  // Text patterns
  heading: {
    color: themeColors.text.primary,
    fontWeight: 600,
    letterSpacing: '0.5px'
  },

  subheading: {
    color: themeColors.text.secondary,
    fontWeight: 500,
    letterSpacing: '0.25px'
  },

  bodyText: {
    color: themeColors.text.primary,
    fontWeight: 400,
    lineHeight: 1.6
  },

  caption: {
    color: themeColors.text.secondary,
    fontSize: '0.875rem',
    fontWeight: 400
  },

  // Status patterns
  status: {
    success: {
      backgroundColor: themeColors.successLight,
      color: themeColors.success,
      border: `1px solid ${themeColors.success}`
    },
    warning: {
      backgroundColor: themeColors.warningLight,
      color: themeColors.warning,
      border: `1px solid ${themeColors.warning}`
    },
    error: {
      backgroundColor: themeColors.errorLight,
      color: themeColors.error,
      border: `1px solid ${themeColors.error}`
    },
    info: {
      backgroundColor: themeColors.primaryLight,
      color: themeColors.primary,
      border: `1px solid ${themeColors.primary}`
    }
  },

  // Loading patterns
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    color: themeColors.primary
  },

  // Error patterns
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    color: themeColors.error,
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
    color: themeColors.text.secondary,
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
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      zIndex: 0
    }
  },

  sectionTitleText: {
    backgroundColor: themeColors.background,
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