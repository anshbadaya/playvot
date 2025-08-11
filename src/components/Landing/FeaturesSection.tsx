import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { 
  Security,
  Speed,
  TrendingUp,
  SportsCricket,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

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

const FeatureCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  padding: theme.spacing(4),
  height: '100%',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(68, 97, 242, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    background: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(68, 97, 242, 0.4)',
    boxShadow: '0 20px 40px rgba(68, 97, 242, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)',
    '&::before': {
      opacity: 1,
    },
    '& .feature-icon::before': {
      opacity: 1,
    },
  },
  '&:active': {
    transform: 'translateY(-8px) scale(1.01)',
  },
}));

const FeaturesSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const keyFeatures = [
    {
      icon: <Security sx={{ fontSize: 40, color: '#4461F2' }} />,
      title: 'Secure Interface',
      description: 'Private & Secure login for each client with enterprise-grade encryption',
      highlight: '100% Secure',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: '#10B981' }} />,
      title: 'LIVE Manual Support',
      description: 'Full 360° degree support Pre game and during LIVE game. Quick Support options on Teams, Google Chats Or Whatsapp.',
      highlight: '24/7 Support',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#F59E0B' }} />,
      title: 'Micro-level pre-game data sheets',
      description: 'Advanced analytics & accuracy with real-time data feeds and predictive modeling',
      highlight: 'Data-Driven',
    },
    {
      icon: <SportsCricket sx={{ fontSize: 40, color: '#EF4444' }} />,
      title: 'LIVE Game odds',
      description: 'Real-time LIVE GAME Odds Management with instant updates and market analysis',
      highlight: 'Real-Time',
    },
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
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h2" 
            fontWeight={600}
            sx={{ 
              color: '#FFFFFF',
              mb: 3,
              fontSize: isMobile ? '2rem' : '2.5rem',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            }}
          >
            Why Choose{' '}
            <GlowText>
              Zoddz?
            </GlowText>
          </Typography>
        </Box>
        
        <Box 
          display="grid" 
          gridTemplateColumns={isMobile ? '1fr' : 'repeat(4, 1fr)'} 
          gap={4}
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {keyFeatures.map((feature, index) => (
            <FeatureCard key={index}>
              <Box textAlign="center" mb={3}>
                <Box 
                  sx={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    background: 'rgba(68, 97, 242, 0.1)',
                    border: '2px solid rgba(68, 97, 242, 0.3)',
                    mb: 2,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(68, 97, 242, 0.3), rgba(139, 92, 246, 0.3))',
                      zIndex: -1,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                  }}
                  className="feature-icon"
                >
                  {feature.icon}
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#4461F2',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    fontSize: '0.75rem',
                  }}
                >
                  {feature.highlight}
                </Typography>
              </Box>
              <Typography 
                variant="h5" 
                fontWeight={600}
                sx={{ 
                  color: '#FFFFFF',
                  mb: 2,
                  textAlign: 'center',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#FFFFFF',
                  textAlign: 'center',
                  lineHeight: 1.6,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                  fontSize: isMobile ? '0.875rem' : '0.9rem',
                  opacity: 0.9,
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                {feature.description}
              </Typography>
            </FeatureCard>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
