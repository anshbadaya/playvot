import React from 'react';
import { Box, Button, alpha } from '@mui/material';
import { themeColors } from '@/config/theme';

interface MatchTabsNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MatchTabsNavigation: React.FC<MatchTabsNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { value: 'info', label: 'Info' },
    { value: 'live', label: 'Live' },
    { value: 'odds', label: 'Odds' },
    { value: 'scorecard', label: 'Scorecard' },
    { value: 'squads', label: 'Squads' },
    { value: 'highlights', label: 'Highlights' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        bgcolor: alpha(themeColors.background, 0.95),
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${alpha(themeColors.border, 0.1)}`,
        py: { xs: 1, sm: 1.5 }
      }}
    >
      <Box
        sx={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          px: { xs: 1, sm: 2 }
        }}
      >
        <Box sx={{ 
          display: 'flex',
          minWidth: 'fit-content',
          gap: { xs: 0.5, sm: 1 },
          mx: 'auto',
          width: 'fit-content'
        }}>
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              sx={{ 
                minWidth: 'unset',
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.25 },
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                fontWeight: 600,
                color: activeTab === tab.value ? themeColors.text.primary : alpha(themeColors.text.secondary, 0.7),
                bgcolor: activeTab === tab.value ? alpha(themeColors.primary, 0.15) : 'transparent',
                borderRadius: '100px',
                border: `1px solid ${activeTab === tab.value ? alpha(themeColors.primary, 0.3) : 'transparent'}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: activeTab === tab.value 
                    ? alpha(themeColors.primary, 0.2)
                    : alpha(themeColors.surface, 0.1),
                  transform: 'translateY(-1px)'
                }
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MatchTabsNavigation;