import React from 'react';
import { Layout } from '@/components/Layout';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckCircle,
  Security,
  Support,
  TrendingUp,
  SportsCricket,
  SportsKabaddi,
  SportsVolleyball,
  SportsSoccer,
  FitnessCenter,
} from '@mui/icons-material';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)',
  padding: theme.spacing(8, 0),
  color: '#FFFFFF',
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(8),
}));

const ContentCard = styled(Card)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.4)',
  borderRadius: theme.spacing(1.5),
  border: '1px solid rgba(59, 130, 246, 0.15)',
  backdropFilter: 'blur(8px)',
  height: '100%',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: 'rgba(59, 130, 246, 0.3)',
    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
  },
}));

const GlowText = styled('span')(({ theme }) => ({
  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #10B981 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))',
  fontWeight: 'inherit',
  fontSize: 'inherit',
  fontFamily: 'inherit',
}));

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Security sx={{ fontSize: 40, color: '#3B82F6' }} />,
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
      icon: <SportsCricket sx={{ fontSize: 40, color: '#3B82F6' }} />,
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
          <Section sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 400, 
                mb: 3,
                fontFamily: 'Inter, sans-serif',
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
                color: '#3B82F6', 
                fontWeight: 400, 
                mb: 4,
                fontFamily: 'Inter, sans-serif',
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Fast. Secure. Credible.
            </Typography>
          </Section>

          {/* What is Zoddz Section */}
          <Section>
            <ContentCard>
              <CardContent sx={{ padding: 4 }}>
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 400, 
                    mb: 3,
                    color: '#3B82F6',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  What is Zoddz?
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}
                >
                  We deliver the fastest, most secure, and most credible pre-game & live-game betting/gaming odds for the Indian sports market.
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#8B5CF6', 
                    fontWeight: 400,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Built for speed, trust, and insight, Zoddz is your edge in real-time sports gaming.
                </Typography>
              </CardContent>
            </ContentCard>
          </Section>

          {/* Who We Are Section */}
          <Section>
            <ContentCard>
              <CardContent sx={{ padding: 4 }}>
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 400, 
                    mb: 3,
                    color: '#3B82F6',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Who We Are
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}
                >
                  Founded by veterans from the online gaming and sports data industry, with deep expertise in:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      background: 'rgba(59, 130, 246, 0.1)', 
                      color: '#3B82F6', 
                      padding: '8px 16px', 
                      borderRadius: 1,
                      fontWeight: 400,
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Data trading
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      background: 'rgba(139, 92, 246, 0.1)', 
                      color: '#8B5CF6', 
                      padding: '8px 16px', 
                      borderRadius: 1,
                      fontWeight: 400,
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Sponsorships
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      background: 'rgba(16, 185, 129, 0.1)', 
                      color: '#10B981', 
                      padding: '8px 16px', 
                      borderRadius: 1,
                      fontWeight: 400,
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Sports Broadcasting
                  </Typography>
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#10B981', 
                    fontWeight: 400,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Together, we bring experience managing over $100 million in data, trade, and sponsorship value.
                </Typography>
              </CardContent>
            </ContentCard>
          </Section>

          {/* Key Features Section */}
          <Section>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 400, 
                mb: 6,
                textAlign: 'center',
                color: '#3B82F6',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Key Features
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
              {features.map((feature, index) => (
                <ContentCard key={index}>
                  <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 400, 
                        mb: 2,
                        color: '#3B82F6',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        lineHeight: 1.6,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 300,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </ContentCard>
              ))}
            </Box>
          </Section>

          {/* Why Zoddz Section */}
          <Section>
            <ContentCard>
              <CardContent sx={{ padding: 4 }}>
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 400, 
                    mb: 3,
                    color: '#3B82F6',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Why Zoddz?
                </Typography>
                <List>
                  {whyZoddz.map((item, index) => (
                    <ListItem key={index} sx={{ paddingLeft: 0 }}>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: '#10B981' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item} 
                        primaryTypographyProps={{ 
                          variant: 'h6', 
                          sx: { 
                            color: '#FFFFFF',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 300,
                          } 
                        }} 
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </ContentCard>
          </Section>

          {/* Events Calendar Section */}
          <Section>
            <ContentCard>
              <CardContent sx={{ padding: 4 }}>
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 400, 
                    mb: 2,
                    textAlign: 'center',
                    color: '#3B82F6',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Events Calendar | 2025–26
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    textAlign: 'center', 
                    mb: 3, 
                    color: '#8B5CF6',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}
                >
                  We're powering odds for 2500+ matches across:
                </Typography>
                
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', 
                      color: 'white', 
                      padding: '8px 16px', 
                      borderRadius: 1,
                      fontWeight: 400,
                      display: 'inline-block',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    GLOBAL BETTING RIGHTS AVAILABLE
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  {sports.map((sport, index) => (
                    <Typography 
                      key={index}
                      variant="body1" 
                      sx={{ 
                        background: 'rgba(255, 255, 255, 0.1)', 
                        color: '#FFFFFF', 
                        padding: '8px 16px', 
                        borderRadius: 1,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        fontWeight: 400,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {sport.name}
                    </Typography>
                  ))}
                </Box>

                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#8B5CF6', 
                      fontWeight: 300, 
                      mb: 2,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Schedule spread across top tournaments, leagues, and grassroots events throughout the year.
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 400, 
                      color: '#3B82F6',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Zoddz - Annual Calendar 2025-26
                  </Typography>
                </Box>
              </CardContent>
            </ContentCard>
          </Section>

          {/* DOMINANT SUPPLY Section */}
          <Section>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 400, 
                mb: 6,
                textAlign: 'center',
                color: '#3B82F6',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              DOMINANT SUPPLY OF SPORTS DATA FROM THE INDIAN MARKET
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
              {sports.map((sport, index) => (
                <ContentCard key={index}>
                  <CardContent sx={{ padding: 3 }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      {sport.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 400, 
                        mb: 2, 
                        textAlign: 'center',
                        color: '#3B82F6',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {sport.name}
                    </Typography>
                    
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', 
                          color: 'white', 
                          padding: '4px 8px', 
                          borderRadius: 1,
                          fontWeight: 400,
                          fontSize: '0.75rem',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        GLOBAL BETTING RIGHTS AVAILABLE
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 2, 
                        textAlign: 'center', 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 300,
                      }}
                    >
                      {sport.description}
                    </Typography>
                    
                    <List dense>
                      {sport.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ padding: 0, marginBottom: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircle sx={{ fontSize: 16, color: '#10B981' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature} 
                            primaryTypographyProps={{ 
                              variant: 'body2', 
                              sx: { 
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 300,
                              } 
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </ContentCard>
              ))}
            </Box>
          </Section>

          {/* Footer Section */}
          <Section sx={{ textAlign: 'center' }}>
            <Divider sx={{ background: 'rgba(255, 255, 255, 0.2)', mb: 4 }} />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 400, 
                mb: 2,
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Thank you
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 400, 
                color: '#3B82F6',
                fontFamily: 'Inter, sans-serif',
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
