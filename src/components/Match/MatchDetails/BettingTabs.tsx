import React from 'react';
import { Box, Button } from '@mui/material';
import { 
  bettingTabsContainerStyles,
  bettingTabButtonStyles
} from '@/styles/matchDetails.styles';
import { dummyBettingTabs } from '@/data/matchDetailsData';

interface BettingTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

/**
 * Betting Tabs component
 */
export const BettingTabs: React.FC<BettingTabsProps> = ({ activeTab, onTabChange }) => (
  <Box sx={bettingTabsContainerStyles}>
    {dummyBettingTabs.map((type) => (
      <Button
        key={type}
        onClick={() => onTabChange(type)}
        sx={bettingTabButtonStyles(type === activeTab)}
      >
        {type}
      </Button>
    ))}
  </Box>
); 