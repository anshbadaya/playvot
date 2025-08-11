import React from 'react';
import { Layout } from '@/components/Layout';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Security,
  Support,
  TrendingUp,
  SportsCricket,
  SportsKabaddi,
  SportsVolleyball,
  SportsSoccer,
  FitnessCenter,
  CheckCircle,
  Star,
  LocationOn,
  Phone,
} from '@mui/icons-material';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
  padding: theme.spacing(8, 0),
  color: 'white',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  padding: theme.spacing(4, 0),
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(8),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(2),
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
  },
}));

const SportCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
  },
}));

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

const GlobalRightsBadge = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4461F2, #8B5CF6)',
  color: 'white',
  fontWeight: 600,
  fontSize: '0.8rem',
  marginBottom: theme.spacing(2),
  '& .MuiChip-label': {
    padding: theme.spacing(0.5, 1),
  },
}));

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Security sx={{ fontSize: 40, color: '#4461F2' }} />,
      title: 'Secure Interface',
      description: 'Private & Secure login for each client. Micro-level pre-game data sheets for deeper analytics & accuracy.',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: '#8B5CF6' }} />,
      title: 'LIVE Manual Support',
      description: 'Full 360° degree support Pre game and during LIVE game. Quick Support options on Teams, Google Chats Or Whatsapp.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#10B981' }} />,
      title: 'LIVE Game odds',
      description: 'LIVE GAME Odds Management',
    },
  ];

  const whyZoddz = [
    'Trusted ecosystem built for the Indian sports market',
    'Human-backed service for Reliability',
    'Infrastructure Designed for scale',
    'Data + Tech + Sports = Competitive Edge',
  ];

  const sports = [
    {
      icon: <SportsCricket sx={{ fontSize: 40, color: '#4461F2' }} />,
      name: 'CRICKET',
      description: 'Over 1000 Indian domestic games (State and District level)',
      features: ['Full Anti Corruption Measures', 'Low Latency Video Streams', 'LIVE Odds'],
    },
    {
      icon: <SportsKabaddi sx={{ fontSize: 40, color: '#8B5CF6' }} />,
      name: 'Kabaddi',
      description: 'Pro Kabaddi league - Starts 29th August',
      features: ['1500 State level Kabaddi Games', 'Full Anti Corruption Measures', 'Low Latency Video Streams + LIVE Odds'],
    },
    {
      icon: <FitnessCenter sx={{ fontSize: 40, color: '#10B981' }} />,
      name: 'ARM WRESTLING',
      description: 'Pro Panja League - Starts 5th August',
      features: ['175+ Matches', '1000 games in the annual calendar 2025-26', 'Low Latency Video Streams + LIVE Odds'],
    },
    {
      icon: <SportsVolleyball sx={{ fontSize: 40, color: '#F59E0B' }} />,
      name: 'Volleyball',
      description: "Everest Women's Volleyball league - Nepal Starts 5th September",
      features: ['Low Latency Video Streams + LIVE Odds'],
    },
    {
      icon: <SportsSoccer sx={{ fontSize: 40, color: '#EF4444' }} />,
      name: 'Football',
      description: '1000+ Games of Mumbai',
      features: ['Full Anti Corruption Measures', 'Low Latency Video Streams + LIVE Odds'],
    },
  ];

  return (
    <Layout>
      <PageContainer>
        <Container maxWidth="lg">
          {/* Hero Section */}
          <HeroSection>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
              }}
            >
              A name you can trust in the{' '}
              <GlowText>Indian Sports Odds Market</GlowText>
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#4461F2', 
                fontWeight: 600, 
                mb: 4,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Fast. Secure. Credible.
            </Typography>
          </HeroSection>

          {/* What is Zoddz Section */}
          <Section>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 4, 
                textAlign: 'center',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              What is Zoddz?
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                textAlign: 'center', 
                mb: 3, 
                lineHeight: 1.6,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              We deliver the fastest, most secure, and most credible pre-game & live-game betting/gaming odds for the Indian sports market.
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center', 
                color: '#8B5CF6', 
                fontWeight: 500,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Built for speed, trust, and insight, Zoddz is your edge in real-time sports gaming.
            </Typography>
          </Section>

          {/* Who We Are Section */}
          <Section>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 4, 
                textAlign: 'center',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Who We Are
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center', 
                mb: 3, 
                lineHeight: 1.6,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              Founded by veterans from the online gaming and sports data industry, with deep expertise in:
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
              <Chip label="Data trading" sx={{ background: '#4461F2', color: 'white', fontSize: '1rem', padding: 1, fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }} />
              <Chip label="Sponsorships" sx={{ background: '#8B5CF6', color: 'white', fontSize: '1rem', padding: 1, fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }} />
              <Chip label="Sports Broadcasting" sx={{ background: '#10B981', color: 'white', fontSize: '1rem', padding: 1, fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }} />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center', 
                color: '#10B981', 
                fontWeight: 600,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Together, we bring experience managing over $100 million in data, trade, and sponsorship value.
            </Typography>
          </Section>

          {/* Key Features Section */}
          <Section>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 6, 
                textAlign: 'center',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Key Features
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
              {features.map((feature, index) => (
                <FeatureCard key={index}>
                  <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        lineHeight: 1.6,
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              ))}
            </Box>
          </Section>

          {/* Why Zoddz Section */}
          <Section>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 4, 
                textAlign: 'center',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Why Zoddz?
            </Typography>
            <List>
              {whyZoddz.map((item, index) => (
                <ListItem key={index} sx={{ justifyContent: 'center' }}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: '#10B981' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item} 
                    primaryTypographyProps={{ 
                      variant: 'h6', 
                      sx: { 
                        color: 'white',
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      } 
                    }} 
                  />
                </ListItem>
              ))}
            </List>
          </Section>

          {/* Events Calendar Section */}
          <Section>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 2, 
                textAlign: 'center',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Events Calendar | 2025–26
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                textAlign: 'center', 
                mb: 4, 
                color: '#8B5CF6',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              We're powering odds for 2500+ matches across:
            </Typography>
            
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <GlobalRightsBadge 
                label="GLOBAL BETTING RIGHTS AVAILABLE" 
                sx={{ 
                  fontSize: '1.1rem', 
                  padding: 2,
                  fontWeight: 600
                }} 
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 6 }}>
              {sports.map((sport, index) => (
                <Chip 
                  key={index}
                  label={sport.name} 
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    color: 'white', 
                    fontSize: '1rem', 
                    padding: 1,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                  }} 
                />
              ))}
            </Box>

            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#8B5CF6', 
                  fontWeight: 600, 
                  mb: 2,
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                Schedule spread across top tournaments, leagues, and grassroots events throughout the year.
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#4461F2',
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                Zoddz - Annual Calendar 2025-26
              </Typography>
            </Box>
          </Section>

          {/* DOMINANT SUPPLY Section */}
          <Section>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 6, 
                textAlign: 'center',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                color: '#4461F2',
              }}
            >
              DOMINANT SUPPLY OF SPORTS DATA FROM THE INDIAN MARKET
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
              {sports.map((sport, index) => (
                <SportCard key={index}>
                  <CardContent sx={{ padding: 3 }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      {sport.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        textAlign: 'center',
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                        color: '#4461F2',
                      }}
                    >
                      {sport.name}
                    </Typography>
                    
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <GlobalRightsBadge 
                        label="GLOBAL BETTING RIGHTS AVAILABLE" 
                        size="small"
                      />
                    </Box>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 2, 
                        textAlign: 'center', 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      }}
                    >
                      {sport.description}
                    </Typography>
                    
                    <List dense>
                      {sport.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ padding: 0, marginBottom: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <Star sx={{ fontSize: 16, color: '#10B981' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature} 
                            primaryTypographyProps={{ 
                              variant: 'body2', 
                              sx: { 
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                              } 
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </SportCard>
              ))}
            </Box>
          </Section>

          {/* Footer Section */}
          <Section sx={{ textAlign: 'center' }}>
            <Divider sx={{ background: 'rgba(255, 255, 255, 0.2)', mb: 4 }} />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Thank you
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                color: '#4461F2',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Let's Zoddz!
            </Typography>
          </Section>
        </Container>
      </PageContainer>
    </Layout>
  );
};

export default AboutPage;
