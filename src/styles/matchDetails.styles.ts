import { SxProps, Theme } from '@mui/material';

// Main container styles
export const matchDetailsContainerStyles: SxProps<Theme> = {
  minHeight: '100vh',
  backgroundColor: '#0F1421'
};

// Tab content styles
export const tabContentStyles: SxProps<Theme> = {
  p: { xs: 1, sm: 1.5, md: 2 },
  '& .MuiCard-root': {
    mb: { xs: 1.5, sm: 2, md: 2.5 },
    '& .MuiCardHeader-root': {
      px: { xs: 1.5, sm: 2, md: 2.5 },
      py: { xs: 1, sm: 1.5, md: 2 },
      '& .MuiTypography-h6': {
        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
      }
    },
    '& .MuiCardContent-root': {
      px: { xs: 1.5, sm: 2, md: 2.5 },
      py: { xs: 1, sm: 1.5, md: 2 },
      '& .MuiTypography-body1': {
        fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
      },
      '& .MuiTypography-body2': {
        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' }
      }
    }
  }
};

// Loading state styles
export const loadingContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh'
};

export const loadingSpinnerStyles: SxProps<Theme> = {
  color: '#3B82F6'
};

// Odds section styles
export const quickStatsContainerStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(1, 1fr)',
    sm: 'repeat(3, 1fr)'
  },
  gap: { xs: 1.5, sm: 2 },
  mb: { xs: 2, sm: 1 }
};

export const quickStatItemStyles = (color: string): SxProps<Theme> => ({
  p: { xs: 2, sm: 2.5 },
  textAlign: 'center',
  bgcolor: 'rgba(15, 23, 42, 0.6)',
  border: `1px solid rgba(${color.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ')}, 0.3)`,
  borderRadius: { xs: 1.5, sm: 2 },
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: { xs: 'row', sm: 'column' },
  alignItems: 'center',
  justifyContent: { xs: 'space-between', sm: 'center' },
  gap: { xs: 2, sm: 0 },
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: `0 8px 24px rgba(${color.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ')}, 0.2)`,
    bgcolor: 'rgba(15, 23, 42, 0.8)'
  }
});

export const quickStatValueStyles = (color: string): SxProps<Theme> => ({
  color: color,
  mb: { xs: 0, sm: 1 },
  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
  fontWeight: 700,
  order: { xs: 2, sm: 1 }
});

export const quickStatLabelStyles: SxProps<Theme> = {
  color: '#E2E8F0',
  fontWeight: 500,
  fontSize: { xs: '0.875rem', sm: '0.9rem' },
  order: { xs: 1, sm: 2 }
};

// Betting tabs styles
export const bettingTabsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  p: 1,
  bgcolor: 'rgba(15, 23, 42, 0.8)',
  borderRadius: 2,
  border: '1px solid rgba(59, 130, 246, 0.3)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
};

export const bettingTabButtonStyles = (isActive: boolean): SxProps<Theme> => ({
  flex: 1,
  py: 2,
  px: 3,
  bgcolor: isActive 
    ? 'rgba(59, 130, 246, 0.2)'
    : 'transparent',
  color: isActive 
    ? '#FFFFFF' 
    : '#94A3B8',
  border: `1px solid ${isActive 
    ? 'rgba(59, 130, 246, 0.4)' 
    : 'rgba(51, 65, 85, 0.4)'}`,
  borderRadius: 1.5,
  fontWeight: isActive ? 600 : 500,
  letterSpacing: '0.5px',
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: isActive 
      ? 'rgba(59, 130, 246, 0.25)' 
      : 'rgba(51, 65, 85, 0.2)',
    transform: 'translateY(-1px)',
    boxShadow: isActive 
      ? '0 4px 12px rgba(59, 130, 246, 0.25)'
      : '0 2px 8px rgba(51, 65, 85, 0.3)'
  }
});

// Match winner card styles
export const matchWinnerCardStyles: SxProps<Theme> = {
  bgcolor: 'rgba(15, 23, 42, 0.8)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  borderRadius: 2,
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)'
  }
};

export const matchWinnerHeaderStyles: SxProps<Theme> = {
  bgcolor: 'rgba(15, 23, 42, 0.9)',
  borderBottom: '1px solid rgba(59, 130, 246, 0.3)',
  py: 2.5
};

export const teamRowStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: 2.5,
  bgcolor: 'rgba(15, 23, 42, 0.7)',
  borderRadius: 1.5,
  border: '1px solid rgba(59, 130, 246, 0.25)',
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: 'rgba(15, 23, 42, 0.9)',
    border: '1px solid rgba(59, 130, 246, 0.4)'
  }
};

export const teamAvatarStyles: SxProps<Theme> = {
  width: 32,
  height: 32,
  border: '1px solid rgba(59, 130, 246, 0.3)'
};

export const teamNameStyles: SxProps<Theme> = {
  color: 'white',
  fontWeight: 600
};

export const oddsButtonStyles = (isBack: boolean): SxProps<Theme> => ({
  bgcolor: isBack 
    ? 'rgba(59, 130, 246, 0.8)'
    : 'rgba(239, 68, 68, 0.8)',
  color: 'white',
  px: 3,
  py: 1.2,
  borderRadius: 1,
  fontWeight: 600,
  minWidth: 80,
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: isBack 
      ? 'rgba(59, 130, 246, 1)'
      : 'rgba(239, 68, 68, 1)',
    transform: 'translateY(-1px)',
    boxShadow: isBack 
      ? '0 4px 12px rgba(59, 130, 246, 0.3)'
      : '0 4px 12px rgba(239, 68, 68, 0.3)'
  }
});

// Fancy betting styles
export const fancyCardStyles: SxProps<Theme> = {
  bgcolor: 'rgba(15, 23, 42, 1)',
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none'
};

export const fancyHeaderStyles: SxProps<Theme> = {
  bgcolor: 'rgba(15, 23, 42, 1)',
  borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
  py: 2.5
};

export const fancyRowStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: 2,
  bgcolor: 'rgba(15, 23, 42, 0.9)',
  borderRadius: 0,
  borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: 'rgba(15, 23, 42, 1)'
  }
};

export const fancyButtonStyles = (color: string): SxProps<Theme> => ({
  bgcolor: `${color}0.8`,
  color: 'white',
  px: 2,
  py: 0.5,
  borderRadius: 1,
  fontWeight: 600,
  minWidth: 50,
  fontSize: '0.875rem',
  '&:hover': {
    bgcolor: `${color}1`,
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 12px ${color}0.3`
  }
});

// Quick bets styles
export const quickBetButtonStyles = (color: string): SxProps<Theme> => ({
  flex: 1,
  bgcolor: 'rgba(15, 23, 42, 0.7)',
  border: `1px solid ${color}0.3`,
  borderRadius: 1.5,
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: 'rgba(15, 23, 42, 0.9)',
    border: `1px solid ${color}0.5`,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${color}0.2`
  }
});

export const quickBetLabelStyles = (color: string): SxProps<Theme> => ({
  color: color,
  fontWeight: 600
});

export const quickBetOddsStyles: SxProps<Theme> = {
  color: '#94A3B8',
  fontWeight: 500
};

// Error state styles
export const errorContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  color: '#EF4444',
  textAlign: 'center',
  p: 3
};

export const errorTextStyles: SxProps<Theme> = {
  color: '#EF4444',
  mb: 2
};

export const retryButtonStyles: SxProps<Theme> = {
  mt: 2,
  bgcolor: '#EF4444',
  color: 'white',
  '&:hover': {
    bgcolor: '#DC2626'
  }
}; 