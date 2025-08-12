import React from 'react';
import {
  Box,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';

import {
  HeroSection,
  WhatIsZoddzSection,
  FeaturesSection,
  WhyZoddzSection,
  EventsCalendarSection,
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
  background: '#0F172A',
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
      radial-gradient(circle at 20% 20%, rgba(41, 63, 157, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(56, 78, 183, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '6px',
  height: '6px',
  background: 'rgba(29, 78, 216, 0.4)',
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
    background: 'rgba(139, 92, 246, 0.4)',
  },
  '&:nth-of-type(3)': {
    bottom: '30%',
    left: '25%',
    animationDelay: '10s',
    background: 'rgba(16, 185, 129, 0.4)',
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
        
        <WhatIsZoddzSection />
        
        <FeaturesSection />
        
        <WhyZoddzSection />
        
        <EventsCalendarSection />
      </Background>
    </Layout>
  );
};

export default LandingPage;