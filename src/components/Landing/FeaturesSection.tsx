import { colors, gradients, colorUtils } from '@/utils/colors';
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
  background: gradients.rainbow,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: `drop-shadow(0 0 20px ${colors.shadows.primary})`,
  fontWeight: 'inherit',
  fontSize: 'inherit',
  fontFamily: 'inherit',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: colors.background.card,
  backdropFilter: 'blur(16px)',
  border: `1px solid ${colors.border.primary}`,
  borderRadius: '20px',
  padding: theme.spacing(4),
  height: '100%',
  transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease, border-color 0.35s ease',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(135deg, ${colorUtils.withOpacity(colors.primary, 0.08)} 0%, ${colorUtils.withOpacity(colors.secondary, 0.08)} 100%)`,
    opacity: 0,
    transition: 'opacity 0.35s ease',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '20px',
    padding: '1px',
    background: gradients.primaryToSecondary,
    mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0.4,
    pointerEvents: 'none',
  },
  '&:hover': {
    transform: 'translateY(-10px) scale(1.01)',
    borderColor: colors.primaryBorder,
    boxShadow: `0 24px 48px ${colors.shadows.primary}, 0 10px 20px rgba(0, 0, 0, 0.2)`,
    '&::before': { opacity: 1 },
    '& .feature-icon': {
      transform: 'translateY(-2px)',
      boxShadow: `0 10px 24px ${colors.shadows.primary}`,
    },
  },
  '&:active': {
    transform: 'translateY(-6px) scale(1.005)',
  },
}));

const FeaturesSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const keyFeatures = [
    {
      icon: <Security sx={{ fontSize: 40, color: colors.primary }} />,
      title: 'Agentic Traders using AI',
      description: 'Ready to manage and handle games at high volumes, with super precision, using AI. All odds are generated and managed by AI Agent Traders.',
      highlight: 'AI-Powered',
    },
  
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: colors.warning }} />,
      title: 'Micro-level pre-game data sheets',
      description: 'For deeper analytics',
      highlight: 'Data-Driven',
    },
    {
      icon: <SportsCricket sx={{ fontSize: 40, color: colors.error }} />,
      title: 'Secure Interface',
      description: 'Private & Secure login for each client',
      highlight: '100% Secure',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: colors.success }} />,
      title: 'LIVE Manual Support',
      description: 'Full 360° degree support Pre game and during LIVE game. Quick Support options on Teams, Google Chats Or Whatsapp.',
      highlight: '24/7 Support',
    },
  ];

  return (
    <Box
      sx={{
        padding: theme.spacing(12, 0),
        position: 'relative',
        background: `linear-gradient(135deg, ${colorUtils.withOpacity(colors.primary, 0.03)} 0%, ${colorUtils.withOpacity(colors.secondary, 0.03)} 100%)`,
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
              position: 'relative',
              display: 'inline-block',
              paddingBottom: theme.spacing(1.5),
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '3px',
                borderRadius: '3px',
                background: gradients.primaryToSecondary,
                opacity: 0.6,
              },
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
              gap: theme.spacing(4.5),
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
                    border: `1px solid ${colors.primaryBorder}`,
                    boxShadow: `0 6px 18px ${colors.shadows.primary}`,
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
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
                    letterSpacing: '0.2px',
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
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
