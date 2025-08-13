import React from 'react';
import {
  Box,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { colors, colorUtils } from '@/utils/colors';

import {
  HeroSection,
  WhatIsZoddzSection,
  FeaturesSection,  EventsCalendarSection,
  SportsBettingRightsSection,
} from '@/components/Landing';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(5deg); }
  66% { transform: translateY(10px) rotate(-3deg); }
`;

const Background = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  background: colors.gradients.background,
  position: 'relative',
  overflow: 'auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, ${colorUtils.withOpacity(colors.primary, 0.12)} 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, ${colorUtils.withOpacity(colors.secondary, 0.08)} 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(180deg, transparent 0%, ${colorUtils.withOpacity(colors.primary, 0.06)} 30%, transparent 60%)`,
    maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
    pointerEvents: 'none',
  },
}));

const AccentDivider = styled('div')(({ theme }) => ({
  height: '1px',
  width: '100%',
  background: `linear-gradient(90deg, transparent, ${colorUtils.withOpacity(colors.primary, 0.45)}, ${colorUtils.withOpacity(colors.secondary, 0.45)}, transparent)`,
  boxShadow: `0 0 24px ${colors.shadows.primary}`,
  opacity: 0.7,
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '6px',
  height: '6px',
  background: colorUtils.withOpacity(colors.primary, 0.4),
  borderRadius: '50%',
  animation: `${float} 15s ease-in-out infinite`,
  '&:nth-of-type(1)': {
    top: '20%',
    left: '15%',
    animationDelay: '0s',
  },
  '&:nth-of-type(2)': {
    top: '60%',
    right: '20%',
    animationDelay: '5s',
    background: colorUtils.withOpacity(colors.secondary, 0.4),
  },
  '&:nth-of-type(3)': {
    bottom: '30%',
    left: '25%',
    animationDelay: '10s',
    background: colorUtils.withOpacity(colors.success, 0.4),
  },
}));

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Layout onLoginClick={() => navigate('/login')}>
      <Background>
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
        
        <HeroSection onLoginClick={() => navigate('/login')} />
        <AccentDivider />
        
        <WhatIsZoddzSection />
        <AccentDivider />
        <FeaturesSection />
        <AccentDivider />
        <EventsCalendarSection />
        <AccentDivider />
        <SportsBettingRightsSection />
      </Background>
    </Layout>
  );
};

export default LandingPage;