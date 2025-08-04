// Re-export from organized constant files
export * from './constants/app';
export * from './constants/sports';

// API Endpoints
export const API_ENDPOINTS = {
  MATCHES: '/matches',
  MATCH_DETAILS: '/matches/:id',
  COMMENTARY: '/matches/:id/commentary',
  ODDS: '/matches/:id/odds',
  PROBABILITY: '/matches/:id/probability',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  FAVORITES: 'favorites',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

// Animation Durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 200,
  slow: 300,
  verySlow: 500,
} as const;

// Z-Index Values
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const; 