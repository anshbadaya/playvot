import { SPORT_TYPES } from '@/utils/constants';

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

export const formatOvers = (overs: string | number | undefined): string => {
  if (!overs) return '';
  return `(${overs})`;
};

export const formatCricketScore = (score: string | number, overs?: string | number): string => {
  const scoreStr = formatScore(score, SPORT_TYPES.CRICKET);
  const oversStr = formatOvers(overs);
  return oversStr ? `${scoreStr} ${oversStr}` : scoreStr;
};

// Date and time utilities
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return `${formatDate(dateObj)} at ${formatTime(dateObj)}`;
};

// Number utilities
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatPercentage = (num: number): string => {
  return `${num.toFixed(1)}%`;
};

export const formatOdds = (odds: number): string => {
  return odds.toFixed(2);
};

// String utilities
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}; 