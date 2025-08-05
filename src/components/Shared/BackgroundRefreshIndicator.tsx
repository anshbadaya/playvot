import React from 'react';
import { Box, Fade, LinearProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Pulse animation for the refresh indicator
const pulse = keyframes`
  0% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
`;

// Slide in animation for the progress bar
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const RefreshDot = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  animation: `${pulse} 2s ease-in-out infinite`,
  position: 'absolute',
  top: '8px',
  right: '8px',
  zIndex: 1,
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '2px',
  backgroundColor: 'rgba(59, 130, 246, 0.1)',
  zIndex: 2,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '30%',
    backgroundColor: theme.palette.primary.main,
    animation: `${slideIn} 1.5s ease-in-out infinite`,
  },
}));

interface BackgroundRefreshIndicatorProps {
  isRefreshing: boolean;
  children: React.ReactNode;
  showProgressBar?: boolean;
}

/**
 * Component that wraps content and shows a subtle background refresh indicator
 * @param isRefreshing - Whether background refresh is currently happening
 * @param children - The content to wrap
 * @param showProgressBar - Whether to show a progress bar instead of just a dot
 */
const BackgroundRefreshIndicator: React.FC<BackgroundRefreshIndicatorProps> = ({
  isRefreshing,
  children,
  showProgressBar = false
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      <Fade in={isRefreshing} timeout={300}>
        {showProgressBar ? (
          <ProgressContainer />
        ) : (
          <RefreshDot />
        )}
      </Fade>
    </Box>
  );
};

export default BackgroundRefreshIndicator; 