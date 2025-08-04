import React from 'react';
import { Box, Typography } from '@mui/material';
import { 
  quickStatsContainerStyles,
  quickStatItemStyles,
  quickStatValueStyles,
  quickStatLabelStyles
} from '@/styles/matchDetails.styles';
import { dummyQuickStatsData } from '@/data/matchDetailsData';

/**
 * Quick Stats component
 */
export const QuickStats: React.FC = () => (
  <Box sx={quickStatsContainerStyles}>
    {dummyQuickStatsData.map((stat, index) => (
      <Box key={index} sx={quickStatItemStyles(stat.color)}>
        <Typography variant="h3" sx={quickStatValueStyles(stat.color)}>
          {stat.value}
        </Typography>
        <Typography variant="body2" sx={quickStatLabelStyles}>
          {stat.label}
        </Typography>
      </Box>
    ))}
  </Box>
); 