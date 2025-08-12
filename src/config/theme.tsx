// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";
import { colors } from "./styledTheme";

declare module '@mui/material/styles' {
  interface TypeBackground {
    gradient: string;
  }
}

// Use the same color definitions from styledTheme
export const themeColors = {
  primary: colors.primary,
  primaryLight: colors.primaryLight,
  primaryBorder: colors.primaryBorder,
  secondary: colors.secondary,
  secondaryLight: colors.secondaryLight,
  success: colors.success,
  successLight: colors.successLight,
  warning: colors.warning,
  warningLight: colors.warningLight,
  error: colors.error,
  errorLight: colors.errorLight,
  purple: colors.secondary,
  purpleLight: colors.secondaryLight,
  background: colors.background.tertiary,
  surface: colors.background.surface,
  border: colors.border.secondary,
  text: {
    primary: colors.text.primary,
    secondary: colors.text.muted,
    disabled: colors.text.disabled
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
    backgroundColor: colors.background.secondary,
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
      paper: colors.background.secondary,
      gradient: colors.gradients.background,
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
          background: colors.gradients.background,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          borderBottom: `1px solid ${colors.primaryBorder}`,
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
});
