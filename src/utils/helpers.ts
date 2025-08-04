import { SPORT_TYPES, MATCH_STATUS } from '@/utils/constants';

// Re-export from organized utility files
export * from './formatters';
export * from './validators';
export * from './storage';
export * from './performance';

// Type guards
export const isCricket = (sportType: string): boolean => sportType === SPORT_TYPES.CRICKET;
export const isFootball = (sportType: string): boolean => sportType === SPORT_TYPES.FOOTBALL;
export const isKabaddi = (sportType: string): boolean => sportType === SPORT_TYPES.KABADDI;
export const isVolleyball = (sportType: string): boolean => sportType === SPORT_TYPES.VOLLEYBALL;

export const isLiveMatch = (status: string): boolean => status === MATCH_STATUS.LIVE;
export const isUpcomingMatch = (status: string): boolean => status === MATCH_STATUS.UPCOMING;
export const isCompletedMatch = (status: string): boolean => status === MATCH_STATUS.COMPLETED;

// Date utilities
export const isToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return dateObj.toDateString() === today.toDateString();
};

export const isTomorrow = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return dateObj.toDateString() === tomorrow.toDateString();
};

// Array utilities
export const groupBy = <T, K extends keyof any>(array: T[], key: (item: T) => K): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const group = key(item);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}; 