// Sport types
export const SPORT_TYPES = {
  CRICKET: 'cricket',
  FOOTBALL: 'football',
  KABADDI: 'kabaddi',
  VOLLEYBALL: 'volleyball',
  SPORTS: 'sports',
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
    case SPORT_TYPES.SPORTS:
      return typeof score === 'number' ? score.toFixed(2) : score.toString();
    default:
      return score.toString();
  }
};

/**
 * Converts 24-hour time format to 12-hour format with AM/PM
 * @param timeString - Time in format "HH:MM:SS" or "HH:MM"
 * @returns Formatted time string with AM/PM
 */
export const formatTimeToAMPM = (timeString: string): string => {
  if (!timeString) return '';
  
  try {
    // Handle both "HH:MM:SS" and "HH:MM" formats
    const timeParts = timeString.split(':');
    if (timeParts.length < 2) return timeString;
    
    const hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];
    
    if (isNaN(hours) || hours < 0 || hours > 23) return timeString;
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    
    return `${displayHours}:${minutes} ${period}`;
  } catch (error) {
    console.warn('Error formatting time:', error);
    return timeString;
  }
}; 