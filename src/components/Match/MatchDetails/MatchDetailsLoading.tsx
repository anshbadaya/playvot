import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { matchDetailsLoadingContainerStyles, matchDetailsLoadingSpinnerStyles } from '@/styles/matchDetails.styles';

/**
 * Loading component for MatchDetails page
 */
const MatchDetailsLoading: React.FC = () => (
  <Box sx={matchDetailsLoadingContainerStyles}>
    <CircularProgress sx={matchDetailsLoadingSpinnerStyles} />
  </Box>
);

export default MatchDetailsLoading; 