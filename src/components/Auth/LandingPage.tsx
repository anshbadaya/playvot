import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  FormHelperText,
  CircularProgress,
  Container,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { 
  Visibility, 
  VisibilityOff,
  MailOutlineRounded,
  SportsCricket,
  TrendingUp,
  Security,
  Speed,
  Verified,
  ArrowForward,
  PlayArrow,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import Logo from '@/assets/images/Logo.png';
import Artboard1 from '@/assets/images/Artboard 1.png';
import Artboard2 from '@/assets/images/Artboard 2.png';
import Artboard3 from '@/assets/images/Artboard 3.png';
import Artboard4 from '@/assets/images/Artboard 4.png';
import Artboard5 from '@/assets/images/Artboard 5.png';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(5deg); }
  66% { transform: translateY(10px) rotate(-3deg); }
`;

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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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

const Header = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  background: 'rgba(15, 23, 42, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(2, 0),
  animation: `${fadeIn} 0.5s ease-out`,
}));

const LoginButton = styled(Button)(({ theme }) => ({
  background: '#4461F2',
  borderRadius: '8px',
  padding: '10px 24px',
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  color: '#FFFFFF',
  '&:hover': {
    background: '#3451E2',
    boxShadow: '0 4px 12px rgba(68, 97, 242, 0.3)',
    color: '#FFFFFF',
  },
  '& .MuiButton-label': {
    color: '#FFFFFF',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: theme.spacing(12, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

const FeatureSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(10, 0),
  },
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
  },
  '&:active': {
    transform: 'translateY(-8px) scale(1.01)',
  },
}));

const LoginModal = styled(Paper)(({ theme }) => ({
  background: 'rgba(15, 23, 42, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  width: '90%',
  maxWidth: 400,
  animation: `${slideUp} 0.5s ease-out`,
    [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    width: '95%',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    height: '56px',
    backdropFilter: 'blur(8px)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.05)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
    },
    '&.Mui-focused': {
      background: 'rgba(255, 255, 255, 0.07)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#4B4EF9',
        borderWidth: '2px',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: '1px',
      transition: 'all 0.2s ease',
    },
    '& .MuiOutlinedInput-input': {
      padding: '16px',
      fontSize: '15px',
      color: 'rgba(255, 255, 255, 0.9)',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 1,
      },
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.5)',
    '&.Mui-focused': {
      color: '#4B4EF9',
    },
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: '#4461F2',
  borderRadius: '8px',
  padding: '12px 24px',
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  color: '#FFFFFF',
  '&:hover': {
    background: '#3451E2',
    boxShadow: '0 4px 12px rgba(68, 97, 242, 0.3)',
    color: '#FFFFFF',
  },
  '& .MuiButton-label': {
    color: '#FFFFFF',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '8px',
  padding: '12px 24px',
  color: '#FFFFFF',
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: '13px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    color: '#FFFFFF',
  },
  '& .MuiButton-label': {
    color: '#FFFFFF',
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(2, 0),
  '&::before, &::after': {
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  '& .MuiDivider-wrapper': {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '12px',
    fontWeight: 400,
    letterSpacing: '0.5px',
    padding: '0 12px',
    textTransform: 'uppercase',
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { login } = useAuth();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const keyFeatures = [
    {
      icon: <Security sx={{ fontSize: 40, color: '#4461F2' }} />,
      title: 'Secure Interface',
      description: 'Private & Secure login for each client',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: '#10B981' }} />,
      title: 'LIVE Manual Support',
      description: 'Full 360° degree support Pre game and during LIVE game. Quick Support options on Teams, Google Chats Or Whatsapp.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#F59E0B' }} />,
      title: 'Micro-level pre-game data sheets',
      description: 'for deeper analytics & accuracy',
    },
    {
      icon: <SportsCricket sx={{ fontSize: 40, color: '#EF4444' }} />,
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
      name: 'Cricket', 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
          <path d="M19 15L19.5 17L22 17.5L19.5 18L19 20L18.5 18L16 17.5L18.5 17L19 15Z" fill="currentColor"/>
          <path d="M5 15L5.5 17L8 17.5L5.5 18L5 20L4.5 18L2 17.5L4.5 17L5 15Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'Kabaddi', 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    { 
      name: 'Football', 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'Volleyball', 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    { 
      name: 'Panja (Arm Wrestling)', 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
          <path d="M8 12L10 14L12 12L14 14L16 12" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
  ];

  const validateField = (field: 'username' | 'password', value: string) => {
    if (!value.trim()) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (field === 'username' && value.length < 3) {
      return 'Username must be at least 3 characters';
    }
    return '';
  };

  const handleChange = (field: 'username' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (field === 'username') setUsername(value);
    else setPassword(value);
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: 'username' | 'password') => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = field === 'username' ? username : password;
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      return;
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
          navigate('/');
        }, 500);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'An error occurred during login',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Background>
      <FloatingElement />
      <FloatingElement />
      <FloatingElement />
      
      {/* Header */}
      <Header>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <img src={Logo} alt="ZOODS Logo" style={{ height: 40, width: 'auto' }} />
            </Box>
            <LoginButton onClick={() => setShowLoginModal(true)}>
              Login
            </LoginButton>
          </Box>
        </Container>
      </Header>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={6} alignItems="center">
            <Box flex={1} sx={{ animation: `${slideUp} 0.8s ease-out` }}>
              <Typography 
                variant="h1" 
                fontWeight={700}
                sx={{ 
                  color: '#FFFFFF',
                  mb: 3,
                  fontSize: isMobile ? '2.5rem' : '3.5rem',
                  lineHeight: 1.2,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                A name you can trust in the Indian Sports Odds Market.
              </Typography>
              <Typography 
                variant="h2" 
                fontWeight={600}
                sx={{ 
                  color: '#4461F2',
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
                  onClick={() => setShowLoginModal(true)}
                  startIcon={<PlayArrow />}
                >
                  Get Started
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
              sx={{ animation: `${slideUp} 0.8s ease-out 0.2s both` }}
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
      </HeroSection>

      {/* Key Features Section */}
      <FeatureSection>
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
              Key Features
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
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'rgba(68, 97, 242, 0.1)',
                      border: '2px solid rgba(68, 97, 242, 0.3)',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
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
      </FeatureSection>

      {/* Why Zoddz Section */}
      <FeatureSection>
        <Container maxWidth="lg">
          <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={8} alignItems="center">
            <Box flex={1}>
              <Typography 
                variant="h2" 
                fontWeight={600}
                sx={{ 
                  color: '#FFFFFF',
                  mb: 6,
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                Why Zoddz?
              </Typography>
              <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                {whyZoddz.map((item, index) => (
                  <Box component="li" key={index} sx={{ mb: 3, display: 'flex', alignItems: 'flex-start' }}>
                    <Box 
                      component="span" 
                      sx={{ 
                        color: '#4461F2', 
                        fontSize: '1.5rem', 
                        mr: 2, 
                        mt: 0.5,
                        fontWeight: 'bold'
                      }}
                    >
                      ●
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#FFFFFF',
                        lineHeight: 1.6,
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box flex={1} display="flex" justifyContent="center">
              <img 
                src={Artboard2} 
                alt="Zoddz Team" 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  borderRadius: '16px',
                }} 
              />
            </Box>
          </Box>
        </Container>
      </FeatureSection>

      {/* Events Calendar Section */}
      <FeatureSection>
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
              Events Calendar | 2025–26
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#FFFFFF',
                mb: 3,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              We're powering odds for 2500+ matches across:
            </Typography>
            <Typography 
              variant="h4" 
              fontWeight={600} 
              sx={{ 
                color: '#4461F2',
                mb: 6,
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              GLOBAL BETTING RIGHTS AVAILABLE
            </Typography>
          </Box>
          
          <Box display="flex" justifyContent="center" mb={8}>
            <Box 
              sx={{ 
                position: 'relative',
                width: isMobile ? 250 : 350,
                height: isMobile ? 250 : 350,
              }}
            >
              {sports.map((sport, index) => {
                const angle = (index * 72) - 90; // 360° / 5 sports = 72° each, start from top
                const radius = isMobile ? 100 : 140;
                const x = Math.cos(angle * Math.PI / 180) * radius;
                const y = Math.sin(angle * Math.PI / 180) * radius;
                
                return (
                  <Box
                    key={index}
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      background: 'rgba(68, 97, 242, 0.1)',
                      border: '2px solid rgba(68, 97, 242, 0.3)',
                      borderRadius: '50%',
                      width: isMobile ? 80 : 100,
                      height: isMobile ? 80 : 100,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(68, 97, 242, 0.2)',
                        borderColor: 'rgba(68, 97, 242, 0.5)',
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1.1)`,
                      },
                    }}
                  >
                    <Box sx={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      mb: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {sport.icon}
                    </Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'center',
                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                        fontWeight: 600,
                        lineHeight: 1.2,
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      }}
                    >
                      {sport.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
          
          <Box textAlign="center">
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#FFFFFF',
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Schedule spread across top tournaments, leagues, and grassroots events throughout the year.
            </Typography>
          </Box>
        </Container>
      </FeatureSection>

      {/* Login Modal */}
      {showLoginModal && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor="rgba(0, 0, 0, 0.8)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={2000}
          onClick={() => setShowLoginModal(false)}
        >
          <LoginModal onClick={(e) => e.stopPropagation()}>
            <Box textAlign="center" mb={3}>
              <img src={Logo} alt="ZOODS Logo" style={{ height: 50, width: 'auto', marginBottom: 16 }} />
              <Typography 
                variant="h4" 
                fontWeight={600}
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                Welcome Back
              </Typography>
            </Box>
        
            <Box component="form" onSubmit={handleSubmit}>
              <Box mb={3}>
                <StyledTextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={touched.username && Boolean(errors.username)}
                  required
                />
                {touched.username && errors.username && (
                  <FormHelperText error sx={{ ml: 1.5, mt: 0.5 }}>
                    {errors.username}
                  </FormHelperText>
                )}
              </Box>

              <Box mb={3}>
                <StyledTextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && Boolean(errors.password)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {touched.password && errors.password && (
                  <FormHelperText error sx={{ ml: 1.5, mt: 0.5 }}>
                    {errors.password}
                  </FormHelperText>
                )}
              </Box>

              <PrimaryButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{ mb: 2 }}
              >
                {isLoading ? <CircularProgress size={24} /> : 'LOGIN'}
              </PrimaryButton>
              
              <StyledDivider>OR</StyledDivider>
              
              <Stack spacing={1.5}>
                <SecondaryButton
                  variant="outlined"
                  fullWidth
                  startIcon={<MailOutlineRounded />}
                  onClick={() => alert('Email login not implemented yet.')}
                >
                  Login with Email
                </SecondaryButton>
                
                <SecondaryButton
                  variant="outlined"
                  fullWidth
                  startIcon={<GoogleIcon />}
                  onClick={() => alert('Google login not implemented yet.')}
                >
                  Login with Google
                </SecondaryButton>
              </Stack>
            </Box>
          </LoginModal>
        </Box>
      )}

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
  );
};

export default LandingPage;