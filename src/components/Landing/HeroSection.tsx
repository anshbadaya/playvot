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
import { colors, gradients, colorUtils } from '@/utils/colors';

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
  background: gradients.rainbow,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: `drop-shadow(0 0 20px ${colors.shadows.primary})`,
  fontWeight: 'inherit',
  fontSize: 'inherit',
  fontFamily: 'inherit',
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: colors.primary,
  borderRadius: '8px',
  padding: '12px 24px',
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  color: colors.text.primary,
  '&:hover': {
    background: colors.primaryHover,
    boxShadow: `0 4px 12px ${colors.shadows.primary}`,
    color: colors.text.primary,
  },
  '& .MuiButton-label': {
    color: colors.text.primary,
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: colors.background.surface,
  border: `1px solid ${colors.border.primary}`,
  borderRadius: '8px',
  padding: '12px 24px',
  color: colors.text.primary,
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: '13px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: colorUtils.withOpacity(colors.background.surface, 1),
    borderColor: colors.border.secondary,
    color: colors.text.primary,
  },
  '& .MuiButton-label': {
    color: colors.text.primary,
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
                color: colors.text.primary,
                mb: 3,
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                lineHeight: 1.2,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              A name you can trust from the{' '}
              <GlowText>
              Indian Sports Market
              </GlowText>
            </Typography>
            <Typography 
              variant="h2" 
              fontWeight={600}
              sx={{ 
                color: colors.primary,
                mb: 4,
                fontSize: isMobile ? '1.3rem' : '1.6rem',
                lineHeight: 1.4,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Fast. Secure. Credible.
            </Typography>
            <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
              <PrimaryButton
                size="large"
                onClick={onLoginClick}
                startIcon={<PlayArrow />}
              >
               See LIVE ODDS now
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
