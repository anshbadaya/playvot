import React from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { PlayArrow, ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/material/styles';

import Artboard1 from '@/assets/images/Artboard 1.png';

const slideUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
`;

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

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: '#4461F2',
  borderRadius: '8px',
  padding: '12px 24px',
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  color: '#FFFFFF',
  '&:hover': {
    background: '#3451E2',
    boxShadow: '0 4px 12px rgba(68, 97, 242, 0.3)',
    color: '#FFFFFF',
  },
  '& .MuiButton-label': {
    color: '#FFFFFF',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '8px',
  padding: '12px 24px',
  color: '#FFFFFF',
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: '13px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    color: '#FFFFFF',
  },
  '& .MuiButton-label': {
    color: '#FFFFFF',
  },
}));

interface HeroSectionProps {
  onLoginClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLoginClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: theme.spacing(1, 0),
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(1, 0),
        },
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={6} alignItems="center">
          <Box 
            flex={1} 
            sx={{ 
              animation: `${slideUp} 0.8s ease-out`,
              order: isMobile ? 2 : 1
            }}
          >
            <Typography 
              variant="h1" 
              fontWeight={700}
              sx={{ 
                color: '#FFFFFF',
                mb: 3,
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                lineHeight: 1.2,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              A name you can trust in the{' '}
              <GlowText>
              Indian Sports Odds Market
              </GlowText>
            </Typography>
            <Typography 
              variant="h2" 
              fontWeight={600}
              sx={{ 
                color: '#4461F2',
                mb: 4,
                fontSize: isMobile ? '1.3rem' : '1.6rem',
                lineHeight: 1.4,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Fast. Secure. Credible. Profitable.
            </Typography>
            <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
              <PrimaryButton
                size="large"
                onClick={onLoginClick}
                startIcon={<PlayArrow />}
              >
                Start Betting Now
              </PrimaryButton>
              <SecondaryButton
                size="large"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                endIcon={<ArrowForward />}
              >
                Learn More
              </SecondaryButton>
            </Stack>
          </Box>
          <Box 
            flex={1}
            display="flex" 
            justifyContent="center"
            sx={{ 
              animation: `${slideUp} 0.8s ease-out 0.2s both`,
              order: isMobile ? 1 : 2
            }}
          >
            <img 
              src={Artboard1} 
              alt="Sports Betting" 
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

export default HeroSection;
