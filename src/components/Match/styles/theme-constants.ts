// Theme Constants
export const themeColors = {
  primary: '#3B82F6',
  primaryLight: 'rgba(59, 130, 246, 0.1)',
  primaryBorder: 'rgba(59, 130, 246, 0.2)',
  secondary: '#1E293B',
  secondaryLight: 'rgba(30, 41, 59, 0.6)',
  success: '#10B981',
  successLight: 'rgba(16, 185, 129, 0.1)',
  warning: '#F59E0B',
  warningLight: 'rgba(245, 158, 11, 0.1)',
  error: '#EF4444',
  errorLight: 'rgba(239, 68, 68, 0.1)',
  purple: '#A855F7',
  purpleLight: 'rgba(168, 85, 247, 0.1)',
  background: '#0F172A',
  surface: 'rgba(30, 41, 59, 0.4)',
  border: 'rgba(59, 130, 246, 0.15)',
  text: {
    primary: '#FFFFFF',
    secondary: '#94A3B8',
    disabled: '#64748B'
  }
};

export const commonStyles = {
  card: {
    backgroundColor: themeColors.surface,
    borderRadius: '12px',
    border: `1px solid ${themeColors.border}`,
    backdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: themeColors.primaryBorder,
      boxShadow: `0 4px 20px ${themeColors.primaryLight}`
    }
  },
  cardHeader: {
    backgroundColor: themeColors.secondary,
    borderBottom: `1px solid ${themeColors.border}`,
    padding: '16px',
    borderRadius: '12px 12px 0 0'
  },
  button: {
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 12px ${themeColors.primaryLight}`
    }
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.5px'
  },
  gridItem: {
    padding: '12px',
    borderRadius: '8px',
    border: `1px solid ${themeColors.border}`,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: themeColors.primaryLight,
      borderColor: themeColors.primaryBorder
    }
  }
};