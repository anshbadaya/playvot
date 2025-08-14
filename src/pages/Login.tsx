import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '@/contexts/AuthContext';
import { usePublicGuard } from '@/hooks/useAuthGuard';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { colors } from '@/utils/colors';
import {
  HeroSection,
  WhatIsZoddzSection,
  FeaturesSection,
  EventsCalendarSection,
} from '@/components/Landing';

// Background with landing page content
const BackgroundContainer = styled(Box)(({ theme }) => ({
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

// Floating animation for background elements
const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '6px',
  height: '6px',
  background: 'rgba(29, 78, 216, 0.4)',
  borderRadius: '50%',
  animation: 'float 15s ease-in-out infinite',
  
  '@keyframes float': {
    '0%, 100%': { 
      transform: 'translateY(0px) rotate(0deg)' 
    },
    '33%': { 
      transform: 'translateY(-20px) rotate(5deg)' 
    },
    '66%': { 
      transform: 'translateY(10px) rotate(-3deg)' 
    }
  },
  
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

// Login overlay container
const LoginOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(15, 23, 42, 0.85)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  zIndex: 1000,
}));

// Login card container
const LoginCard = styled(Box)(({ theme }) => ({
  background: 'rgba(15, 23, 42, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 420,
  position: 'relative',
  zIndex: 2,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    maxWidth: 380,
  },
}));

// Styled text field
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
        borderColor: colors.primary,
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
    [theme.breakpoints.down('sm')]: {
      height: '48px',
      '& .MuiOutlinedInput-input': {
        padding: '12px 16px',
        fontSize: '14px',
      },
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.5)',
    '&.Mui-focused': {
      color: colors.primary,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px',
    },
  },
}));

// Primary login button
const PrimaryButton = styled(Button)(({ theme }) => ({
  background: colors.primary,
  borderRadius: '12px',
  padding: '14px 24px',
  fontWeight: 700,
  fontSize: '14px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  color: colors.text.primary,
  height: '56px',
  '&:hover': {
    background: colors.primaryDark,
    boxShadow: `0 4px 12px ${colors.primary}40`,
    color: colors.text.primary,
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '12px 20px',
    fontSize: '13px',
    height: '48px',
  },
}));



// Back button
const BackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  left: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.1)',
  color: colors.text.primary,
  borderRadius: '12px',
  padding: '8px 16px',
  minWidth: 'auto',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.2s ease',
  zIndex: 1002,
  
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-1px)',
  },
  
  [theme.breakpoints.down('sm')]: {
    top: theme.spacing(2),
    left: theme.spacing(2),
    padding: '6px 12px',
  },
}));

// Footer slogan
const FooterSlogan = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  left: '50%',
  transform: 'translateX(-50%)',
  color: colors.primary,
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  textAlign: 'center',
  zIndex: 1001,
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    bottom: theme.spacing(2),
  },
}));

const Login: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect authenticated users away from login page
  usePublicGuard();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setErrors({ password: 'Please fill in all fields' });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const result = await login(username, password);
      
      if (result.success) {
        // Redirect to the page they were trying to access, or tournaments as default
        const from = location.state?.from?.pathname || '/tournaments';
        navigate(from, { replace: true });
      } else {
        setErrors({ password: result.error || 'Invalid credentials' });
      }
    } catch (error) {
      setErrors({ password: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Background with landing page content */}
      <BackgroundContainer>
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
        
        <HeroSection onLoginClick={() => {}} />
        <WhatIsZoddzSection />
        <FeaturesSection />
        <EventsCalendarSection />
      </BackgroundContainer>

      {/* Login overlay */}
      <LoginOverlay>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <BackButton
            startIcon={<ArrowBack />}
            size="small"
          >
            Back
          </BackButton>
        </Link>
        
        <LoginCard>
          <Box textAlign="center" mb={4}>
            <Typography 
              variant={isMobile ? "h5" : "h4"}
              fontWeight={700}
              sx={{ color: colors.text.primary, mb: 1 }}
            >
              Welcome Back
            </Typography>
            <Typography 
              variant={isMobile ? "body2" : "body1"}
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Sign in to access your betting dashboard
            </Typography>
          </Box>
      
          <Box component="form" onSubmit={handleSubmit}>
            <Box mb={3}>
              <StyledTextField
                placeholder="Username *"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={Boolean(errors.username)}
                helperText={errors.username}
              />
            </Box>

            <Box mb={3}>
              <StyledTextField
                placeholder="Password *"
                variant="outlined"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <PrimaryButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{ mb: 3 }}
            >
              {isLoading ? <CircularProgress size={20} color="inherit" /> : 'LOGIN'}
            </PrimaryButton>
          </Box>
        </LoginCard>
        
        <FooterSlogan>
          Fast. Secure. Credible. Profitable.
        </FooterSlogan>
      </LoginOverlay>
    </>
  );
};

export default Login;
