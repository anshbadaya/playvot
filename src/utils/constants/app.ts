// Application constants
export const APP_NAME = 'PlayVot';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Sports betting and match tracking platform';

// API constants
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.playvot.com';
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;

// Pagination constants
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Cache constants
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
export const CACHE_PREFIX = 'playvot_';

// Local storage keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'playvot_user_token',
  USER_DATA: 'playvot_user_data',
  THEME: 'playvot_theme',
  LANGUAGE: 'playvot_language',
  PREFERENCES: 'playvot_preferences'
} as const;

// Route constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  MATCH_DETAILS: '/match/:slug',
  PROFILE: '/profile',
  SETTINGS: '/settings'
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  LIVE_COMMENTARY: true,
  BETTING_FEATURES: true,
  PUSH_NOTIFICATIONS: false,
  DARK_MODE: true
} as const; 