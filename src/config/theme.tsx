// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface TypeBackground {
    gradient: string;
  }
}

// Centralized theme colors and constants
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

export const AppTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: themeColors.primary,
    },
    secondary: {
      main: themeColors.text.secondary,
    },
    background: {
      default: themeColors.background,
      paper: themeColors.secondary,
      gradient: `
        radial-gradient(circle at 20% 20%, rgba(29, 78, 216, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
        linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)
      `,
    },
    error: {
      main: themeColors.error,
    },
    success: {
      main: themeColors.success,
    },
    warning: {
      main: themeColors.warning,
    },
    text: {
      primary: themeColors.text.primary,
      secondary: themeColors.text.secondary,
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    body1: {
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    body2: {
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: themeColors.surface,
          border: `1px solid ${themeColors.border}`,
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: themeColors.primaryBorder,
            boxShadow: `0 4px 20px ${themeColors.primaryLight}`,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)`,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          borderBottom: "1px solid rgba(29, 78, 216, 0.2)",
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
});
