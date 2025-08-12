import { colors } from '@/utils/colors';
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
  background: colors.gradients.rainbow,
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
    background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.secondaryLight} 100%)`,
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    background: 'rgba(255, 255, 255, 0.08)',
    borderColor: colors.primaryBorder,
    boxShadow: `0 20px 40px ${colors.shadows.primary}, 0 8px 16px rgba(0, 0, 0, 0.2)`,
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
      icon: <Security sx={{ fontSize: 40, color: colors.primary }} />,
      title: 'Secure Interface',
      description: 'Private & Secure login for each client with enterprise-grade encryption',
      highlight: '100% Secure',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: colors.success }} />,
      title: 'LIVE Manual Support',
      description: 'Full 360° degree support Pre game and during LIVE game. Quick Support options on Teams, Google Chats Or Whatsapp.',
      highlight: '24/7 Support',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: colors.warning }} />,
      title: 'Micro-level pre-game data sheets',
      description: 'Advanced analytics & accuracy with real-time data feeds and predictive modeling',
      highlight: 'Data-Driven',
    },
    {
      icon: <SportsCricket sx={{ fontSize: 40, color: colors.error }} />,
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
          padding: theme.spacing(8, 0),
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: theme.spacing(8),
            [theme.breakpoints.down('md')]: {
              marginBottom: theme.spacing(6),
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 700,
              marginBottom: theme.spacing(3),
              color: colors.text.primary,
              textShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Why Choose <GlowText>Zoddz</GlowText>?
          </Typography>
          
          <Typography
            variant="h3"
            sx={{
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              fontWeight: 400,
              color: colors.text.secondary,
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Experience the next generation of sports betting with cutting-edge features designed for modern bettors.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: theme.spacing(4),
            [theme.breakpoints.up('lg')]: {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
          }}
        >
          {keyFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              sx={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.secondaryLight} 100%)`,
                    marginBottom: theme.spacing(3),
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '20px',
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    },
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    marginBottom: theme.spacing(2),
                    color: colors.text.primary,
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    marginBottom: theme.spacing(3),
                    color: colors.text.secondary,
                    flex: 1,
                  }}
                >
                  {feature.description}
                </Typography>

                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: theme.spacing(1, 2),
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.secondaryLight} 100%)`,
                    border: `1px solid ${colors.primaryBorder}`,
                    alignSelf: 'flex-start',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: colors.primary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {feature.highlight}
                  </Typography>
                </Box>
              </Box>
            </FeatureCard>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
