import React from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Artboard3 from '@/assets/images/Artboard 3.png';

const GlowText = styled('span')(({ theme }) => ({
  background: 'linear-gradient(135deg, #4461F2 0%, #8B5CF6 50%, #10B981 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: 'drop-shadow(0 0 20px rgba(68, 97, 242, 0.3))',
  fontWeight: 'inherit',
  fontSize: 'inherit',
  fontFamily: 'inherit',
}));



const WhatIsZoddzSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));



  return (
    <Box
      sx={{
        padding: theme.spacing(16, 0),
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(68, 97, 242, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 30%, rgba(68, 97, 242, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(12, 0),
        },
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={8} alignItems="center">
          <Box flex={1}>
            <Typography 
              variant="h2" 
              fontWeight={700}
              sx={{ 
                color: '#FFFFFF',
                mb: 4,
                fontSize: isMobile ? '2rem' : '2.8rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              What is{' '}
              <GlowText>
                Zoddz?
              </GlowText>
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#FFFFFF',
                mb: 4,
                lineHeight: 1.6,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                opacity: 0.95,
              }}
            >
              We deliver the fastest, most secure, and most credible pre-game & live-game betting/gaming odds from the Indian sports market.
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#4461F2',
                mb: 6,
                lineHeight: 1.5,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 600,
              }}
            >
              Built for speed, trust, and insight.
            </Typography>
            
            
          </Box>
          <Box flex={1} display="flex" justifyContent="center">
            <img 
              src={Artboard3} 
              alt="Zoddz Platform" 
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(68, 97, 242, 0.3)',
              }} 
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhatIsZoddzSection;
