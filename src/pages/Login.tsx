import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  useMediaQuery,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { colors } from '@/utils/colors';

// Background container
const BackgroundContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  background: '#0F172A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
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

// Login card
const LoginCard = styled(Paper)(({ theme }) => ({
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
  '& .MuiFormHelperText-root': {
    color: '#ef4444',
    fontSize: '12px',
    marginLeft: '4px',
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

const Login: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Basic validation
    if (!username.trim()) {
      setErrors(prev => ({ ...prev, username: 'Username is required' }));
      return;
    }
    
    if (!password.trim()) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await login(username.trim(), password);
      
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

  // Show loading if auth is still initializing
  if (authLoading) {
    return (
      <BackgroundContainer>
        <CircularProgress size={40} sx={{ color: colors.primary }} />
      </BackgroundContainer>
    );
  }

  return (
    <BackgroundContainer>
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
            Sign in to access the odds dashboard
          </Typography>
        </Box>
    
        <Box component="form" onSubmit={handleSubmit}>
          <Box mb={3}>
            <StyledTextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username}
              disabled={isLoading}
              autoComplete="username"
            />
          </Box>

          <Box mb={3}>
            <StyledTextField
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              disabled={isLoading}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                      disabled={isLoading}
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
    </BackgroundContainer>
  );
};

export default Login;
