import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { 
  matchDetailsErrorContainerStyles, 
  matchDetailsErrorTextStyles, 
  matchDetailsRetryButtonStyles 
} from '@/styles/matchDetails.styles';

interface MatchDetailsErrorProps {
  error: string;
  onRetry: () => void;
}

/**
 * Error component for MatchDetails page
 */
const MatchDetailsError: React.FC<MatchDetailsErrorProps> = ({ error, onRetry }) => (
  <Box sx={matchDetailsErrorContainerStyles}>
    <Typography variant="h6" sx={matchDetailsErrorTextStyles}>
      Something went wrong
    </Typography>
    <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
      {error}
    </Typography>
    <Button 
      variant="contained" 
      onClick={onRetry}
      sx={matchDetailsRetryButtonStyles}
    >
      Try Again
    </Button>
  </Box>
);

export default MatchDetailsError; 