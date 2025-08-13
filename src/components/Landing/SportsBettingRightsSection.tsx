import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@/utils/colors';

const SportCard = styled(Card)(({ theme }) => ({
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
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    background: 'rgba(255, 255, 255, 0.08)',
    borderColor: colors.primaryBorder,
    boxShadow: `0 20px 40px ${colors.shadows.primary}, 0 8px 16px rgba(0, 0, 0, 0.2)`,
  },
}));

const BettingRightsButton = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4461F2 0%, #8B5CF6 100%)',
  borderRadius: '12px',
  padding: theme.spacing(1.5, 3),
  display: 'inline-block',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(68, 97, 242, 0.4)',
  },
}));

const SportsBettingRightsSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sportsData = [
    {
      name: 'CRICKET',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#4461F2"/>
          <path d="M19 15L19.5 17L22 17.5L19.5 18L19 20L18.5 18L16 17.5L18.5 17L19 15Z" fill="#4461F2"/>
          <path d="M5 15L5.5 17L8 17.5L5.5 18L5 20L4.5 18L2 17.5L4.5 17L5 15Z" fill="#4461F2"/>
        </svg>
      ),
      color: '#4461F2',
      description: 'Over 1000 Indian domestic games (State and District level)',
      features: [
        'Full Anti Corruption Measures',
        'Low Latency Video Streams',
        'LIVE Odds'
      ]
    },
    {
      name: 'Kabaddi',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
          <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="#8B5CF6" strokeWidth="2"/>
        </svg>
      ),
      color: '#8B5CF6',
      description: 'Pro Kabaddi league - Starts 29th August',
      features: [
        '1500 State level Kabaddi Games',
        'Full Anti Corruption Measures',
        'Low Latency Video Streams + LIVE Odds'
      ]
    },
    {
      name: 'ARM WRESTLING',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#10B981"/>
          <path d="M8 12L10 14L12 12L14 14L16 12" stroke="#10B981" strokeWidth="2" fill="none"/>
        </svg>
      ),
      color: '#10B981',
      description: 'Pro Panja League - Starts 5th August',
      features: [
        '175+ Matches',
        '1000 games in the annual calendar 2025-26',
        'Low Latency Video Streams + LIVE Odds'
      ]
    },
    {
      name: 'Volleyball',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" fill="none"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#F59E0B" strokeWidth="2" fill="none"/>
          <path d="M12 2v20M2 12h20" stroke="#F59E0B" strokeWidth="2"/>
        </svg>
      ),
      color: '#F59E0B',
      description: 'Everest Women\'s Volleyball league - Nepal Starts 5th September',
      features: [
        'Low Latency Video Streams + LIVE Odds'
      ]
    },
    {
      name: 'Football',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#EF4444"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#EF4444"/>
        </svg>
      ),
      color: '#EF4444',
      description: '1000+ Games of Mumbai',
      features: [
        'Full Anti Corruption Measures',
        'Low Latency Video Streams + LIVE Odds'
      ]
    }
  ];

  return (
    <Box
      sx={{
        padding: theme.spacing(12, 0),
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
            radial-gradient(circle at 20% 20%, rgba(68, 97, 242, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(10, 0),
        },
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h2" 
            fontWeight={700}
            sx={{ 
              color: '#FFFFFF',
              mb: 3,
              fontSize: isMobile ? '2rem' : '2.8rem',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            }}
          >
            DOMINANT SUPPLY OF SPORTS DATA FROM THE INDIAN MARKET
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: theme.spacing(4),
            [theme.breakpoints.up('lg')]: {
              gridTemplateColumns: 'repeat(3, 1fr)',
            },
          }}
        >
          {sportsData.map((sport, index) => (
            <SportCard
              key={index}
              sx={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                gridColumn: isMobile ? '1' : index === 3 ? '1' : index === 4 ? '2' : 'auto',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${sport.color}20 0%, ${sport.color}10 100%)`,
                    marginBottom: theme.spacing(3),
                    border: `2px solid ${sport.color}30`,
                  }}
                >
                  {sport.icon}
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: theme.spacing(2),
                    color: sport.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {sport.name}
                </Typography>

                <BettingRightsButton sx={{ mb: 3 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Global Betting Rights Available
                  </Typography>
                </BettingRightsButton>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    marginBottom: theme.spacing(3),
                    color: '#FFFFFF',
                    opacity: 0.9,
                    flex: 1,
                  }}
                >
                  {sport.description}
                </Typography>

                <Box component="ul" sx={{ pl: 0, listStyle: 'none', mt: 'auto' }}>
                  {sport.features.map((feature, featureIndex) => (
                    <Box component="li" key={featureIndex} sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
                      <Box 
                        component="span" 
                        sx={{ 
                          color: '#10B981', 
                          fontSize: '1rem', 
                          mr: 2, 
                          mt: 0.25,
                          fontWeight: 'bold'
                        }}
                      >
                        ✓
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#FFFFFF',
                          opacity: 0.8,
                          lineHeight: 1.5,
                          fontSize: '0.9rem',
                        }}
                      >
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </SportCard>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SportsBettingRightsSection;
