import React, { useState } from 'react';
import {
  Box,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';

import {
  HeroSection,
  WhatIsZoddzSection,
  FeaturesSection,
  WhyZoddzSection,
  EventsCalendarSection,
} from '@/components/Landing';
import { LoginModal } from '@/components/Auth';

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

const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '8px',
  '& .MuiAlert-icon': {
    color: 'rgba(255, 255, 255, 0.9)',
  },
}));

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { login } = useAuth();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ username: boolean; password: boolean }>({
    username: false,
    password: false,
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
  }>({
    open: false,
    message: '',
    severity: 'error',
  });

  const validateField = (field: 'username' | 'password', value: string) => {
    if (!value.trim()) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (field === 'username' && value.length < 3) {
      return 'Username must be at least 3 characters';
    }
    return '';
  };

  const handleFieldChange = (field: 'username' | 'password') => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleFieldBlur = (field: 'username' | 'password') => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleLoginSubmit = async (username: string, password: string) => {
    const usernameError = validateField('username', username);
    const passwordError = validateField('password', password);
    
    setTouched({ username: true, password: true });
    setErrors({ username: usernameError, password: passwordError });

    if (usernameError || passwordError) {
      setSnackbar({
        open: true,
        message: 'Please fix the errors before submitting',
        severity: 'error',
      });
      return false;
    }

    try {
      setIsLoading(true);
      const success = await login(username, password);
      
      if (success) {
        setSnackbar({
          open: true,
          message: 'Login successful!',
          severity: 'success',
        });
        setTimeout(() => {
          navigate('/tournaments');
        }, 500);
        return true;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'An error occurred during login',
        severity: 'error',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Layout onLoginClick={() => setShowLoginModal(true)}>
      <Background>
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
        
        <HeroSection onLoginClick={() => setShowLoginModal(true)} />
        
        <WhatIsZoddzSection />
        
        <FeaturesSection />
        
        <WhyZoddzSection />
        
        <EventsCalendarSection />

        <LoginModal
          open={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSubmit={handleLoginSubmit}
          isLoading={isLoading}
          errors={errors}
          touched={touched}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <StyledAlert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </StyledAlert>
        </Snackbar>
      </Background>
    </Layout>
  );
};

export default LandingPage;