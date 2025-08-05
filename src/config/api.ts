// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://zodds-client-uat-506191930239.asia-south1.run.app',
  API_KEY: 'd5651733-9ba2-4831-b7f0-9b9614c75053',
  ENDPOINTS: {
    BOXING_FIXTURES: '/ppl_upcoming_fixtures'
  }
} as const;

// API Headers
export const getApiHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_CONFIG.API_KEY}`
}); 