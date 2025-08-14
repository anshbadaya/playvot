import { DefaultTheme } from 'styled-components';

// Font families - Centralized font system
export const fonts = {
  // Primary Headings & Odds (Impact + Recognition)
  primary: '"Alternate Gothic", "United Sans", "Impact", sans-serif',
  
  // Secondary Headings & Branding
  secondary: '"Montserrat", "ITC Avant Garde Gothic", sans-serif',
  
  // Body & UI Text
  body: '"Roboto", sans-serif',
  
  // Data / Stats & Accent Numbers
  data: '"Open Sans Condensed", "Benton Sans", sans-serif',
  
  // Fallback system
  fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
};

// Single source of truth for all colors
export const colors = {
  // Primary colors
  primary: '#3B82F6',
  primaryHover: '#2563EB',
  primaryLight: 'rgba(59, 130, 246, 0.1)',
  primaryBorder: 'rgba(59, 130, 246, 0.2)',
  primaryDark: '#1D4ED8',
  
  // Secondary colors
  secondary: '#8B5CF6',
  secondaryHover: '#7C3AED',
  secondaryLight: 'rgba(139, 92, 246, 0.1)',
  secondaryBorder: 'rgba(139, 92, 246, 0.2)',
  
  // Status colors
  success: '#10B981',
  successHover: '#059669',
  successLight: 'rgba(16, 185, 129, 0.1)',
  successBorder: 'rgba(16, 185, 129, 0.2)',
  
  warning: '#F59E0B',
  warningHover: '#D97706',
  warningLight: 'rgba(245, 158, 11, 0.1)',
  warningBorder: 'rgba(245, 158, 11, 0.2)',
  
  error: '#EF4444',
  errorHover: '#DC2626',
  errorLight: 'rgba(239, 68, 68, 0.1)',
  errorBorder: 'rgba(239, 68, 68, 0.2)',
  
  // Background colors
  background: {
    primary: '#0A0A23',
    secondary: '#111827',
    tertiary: '#0F172A',
    card: 'rgba(15, 23, 42, 0.3)',
    surface: 'rgba(30, 41, 59, 0.4)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.8)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    muted: '#94A3B8',
    inverse: '#0F172A',
  },
  
  // Border colors
  border: {
    primary: 'rgba(255, 255, 255, 0.1)',
    secondary: 'rgba(59, 130, 246, 0.15)',
    accent: 'rgba(139, 92, 246, 0.15)',
  },
  
  // Gradient definitions
  gradients: {
    primary: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    secondary: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    background: 'linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)',
    rainbow: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #10B981 100%)',
    card: 'linear-gradient(135deg, rgba(13, 20, 36, 0.9) 0%, rgba(23, 32, 48, 0.95) 100%)',
  },
  
  // Shadow colors
  shadows: {
    primary: 'rgba(59, 130, 246, 0.2)',
    secondary: 'rgba(139, 92, 246, 0.2)',
    success: 'rgba(16, 185, 129, 0.2)',
    error: 'rgba(239, 68, 68, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  }
};

export const styledTheme: DefaultTheme = {
  colors,
  fonts,
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
};

// Extend the DefaultTheme interface
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    fonts: typeof fonts;
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
  }
} 