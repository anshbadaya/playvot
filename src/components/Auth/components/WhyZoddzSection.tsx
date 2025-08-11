import React from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import Artboard2 from '@/assets/images/Artboard 2.png';

const WhyZoddzSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const whyZoddz = [
    'Trusted ecosystem built for the Indian sports market',
    'Human-backed service for Reliability',
    'Infrastructure Designed for scale',
    'Data + Tech + Sports = Competitive Edge',
  ];

  return (
    <Box
      sx={{
        padding: theme.spacing(12, 0),
        position: 'relative',
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(10, 0),
        },
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={8} alignItems="center">
          <Box flex={1}>
            <Typography 
              variant="h2" 
              fontWeight={600}
              sx={{ 
                color: '#FFFFFF',
                mb: 6,
                fontSize: isMobile ? '2rem' : '2.5rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Why Zoddz?
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
              {whyZoddz.map((item, index) => (
                <Box component="li" key={index} sx={{ mb: 3, display: 'flex', alignItems: 'flex-start' }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      color: '#4461F2', 
                      fontSize: '1.5rem', 
                      mr: 2, 
                      mt: 0.5,
                      fontWeight: 'bold'
                    }}
                  >
                    ●
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#FFFFFF',
                      lineHeight: 1.6,
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box flex={1} display="flex" justifyContent="center">
            <img 
              src={Artboard2} 
              alt="Zoddz Team" 
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                borderRadius: '16px',
              }} 
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyZoddzSection;
