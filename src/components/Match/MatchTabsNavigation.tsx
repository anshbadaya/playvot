import React from 'react';
import { Box, Button } from '@mui/material';
import { MatchTabsNavigationProps } from '@/types/match-details';
import {
  matchTabsContainerStyles,
  matchTabsScrollContainerStyles,
  matchTabsButtonContainerStyles,
  matchTabsButtonStyles
} from '@/styles/matchDetails.styles';

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
    <Box sx={matchTabsContainerStyles}>
      <Box sx={matchTabsScrollContainerStyles}>
        <Box sx={matchTabsButtonContainerStyles}>
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              sx={matchTabsButtonStyles(activeTab === tab.value)}
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