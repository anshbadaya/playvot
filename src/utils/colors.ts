import { colors } from '@/config/styledTheme';

// Re-export colors for easy access
export { colors };

// Color utility functions
export const colorUtils = {
  // Get color with opacity
  withOpacity: (color: string, opacity: number) => {
    // Handle hex colors
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    // Handle rgba colors
    if (color.startsWith('rgba')) {
      return color.replace(/[\d.]+\)$/, `${opacity})`);
    }
    // Handle rgb colors
    if (color.startsWith('rgb')) {
      return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    }
    return color;
  },

  // Get lighter version of a color
  lighter: (color: string, amount: number = 0.1) => {
    return colorUtils.withOpacity(color, 1 - amount);
  },

  // Get darker version of a color
  darker: (color: string, amount: number = 0.1) => {
    return colorUtils.withOpacity(color, 1 + amount);
  },

  // Get status color based on type
  getStatusColor: (status: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary') => {
    const statusColors = {
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.primary,
      primary: colors.primary,
      secondary: colors.secondary,
    };
    return statusColors[status];
  },

  // Get status background color
  getStatusBackground: (status: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary') => {
    const statusBackgrounds = {
      success: colors.successLight,
      warning: colors.warningLight,
      error: colors.errorLight,
      info: colors.primaryLight,
      primary: colors.primaryLight,
      secondary: colors.secondaryLight,
    };
    return statusBackgrounds[status];
  },

  // Get status border color
  getStatusBorder: (status: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary') => {
    const statusBorders = {
      success: colors.successBorder,
      warning: colors.warningBorder,
      error: colors.errorBorder,
      info: colors.primaryBorder,
      primary: colors.primaryBorder,
      secondary: colors.secondaryBorder,
    };
    return statusBorders[status];
  },
};

// Common color combinations
export const colorCombinations = {
  // Button styles
  button: {
    primary: {
      background: colors.primary,
      color: colors.text.primary,
      hover: colors.primaryHover,
      border: colors.primaryBorder,
    },
    secondary: {
      background: 'transparent',
      color: colors.text.primary,
      hover: colors.primaryLight,
      border: colors.border.secondary,
    },
    success: {
      background: colors.success,
      color: colors.text.primary,
      hover: colors.successHover,
      border: colors.successBorder,
    },
    warning: {
      background: colors.warning,
      color: colors.text.primary,
      hover: colors.warningHover,
      border: colors.warningBorder,
    },
    error: {
      background: colors.error,
      color: colors.text.primary,
      hover: colors.errorHover,
      border: colors.errorBorder,
    },
  },

  // Card styles
  card: {
    default: {
      background: colors.background.card,
      border: colors.border.primary,
      shadow: colors.shadows.dark,
    },
    primary: {
      background: colors.background.card,
      border: colors.primaryBorder,
      shadow: colors.shadows.primary,
    },
    secondary: {
      background: colors.background.card,
      border: colors.secondaryBorder,
      shadow: colors.shadows.secondary,
    },
  },

  // Text styles
  text: {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    disabled: colors.text.disabled,
    muted: colors.text.muted,
    inverse: colors.text.inverse,
  },

  // Background styles
  background: {
    primary: colors.background.primary,
    secondary: colors.background.secondary,
    tertiary: colors.background.tertiary,
    card: colors.background.card,
    surface: colors.background.surface,
    overlay: colors.background.overlay,
  },
};

// Extended gradients with additional combinations
export const gradients = {
  ...colors.gradients,
  // Additional gradient combinations
  primaryToSecondary: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
  primaryHover: `linear-gradient(135deg, ${colors.primaryHover} 0%, ${colors.primaryDark} 100%)`,
  successToPrimary: `linear-gradient(135deg, ${colors.success} 0%, ${colors.primary} 100%)`,
  rainbow: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 25%, ${colors.success} 50%, ${colors.warning} 75%, ${colors.error} 100%)`,
  subtle: `linear-gradient(135deg, ${colorUtils.withOpacity(colors.primary, 0.1)} 0%, ${colorUtils.withOpacity(colors.secondary, 0.1)} 100%)`,
};

// Export everything for easy importing
export default {
  colors,
  colorUtils,
  colorCombinations,
  gradients,
};
