// Sport types
export const SPORT_TYPES = {
  CRICKET: 'cricket',
  FOOTBALL: 'football',
  KABADDI: 'kabaddi',
  VOLLEYBALL: 'volleyball',
} as const;

// Match status
export const MATCH_STATUS = {
  UPCOMING: 'upcoming',
  LIVE: 'live',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Formatting utilities
export const formatScore = (score: string | number | undefined, sportType: string): string => {
  if (!score) return '0';
  
  switch (sportType) {
    case SPORT_TYPES.CRICKET:
      return typeof score === 'string' ? score : score.toString();
    case SPORT_TYPES.FOOTBALL:
    case SPORT_TYPES.KABADDI:
    case SPORT_TYPES.VOLLEYBALL:
      return score.toString();
    default:
      return score.toString();
  }
}; 