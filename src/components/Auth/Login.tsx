import React, { useState } from 'react';
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
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { 
  Visibility, 
  VisibilityOff,
  MailOutlineRounded,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '@/assets/images/Logo.png';

// Floating animation for background elements
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

const Background = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  background: '#0A0B1A',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'auto',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
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

const SkipButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 24,
  right: 24,
  color: 'rgba(255, 255, 255, 0.5)',
  fontWeight: 600,
  letterSpacing: 1,
  fontSize: 12,
  padding: '8px 16px',
  transition: 'all 0.2s ease',
  zIndex: 10,
  '&:hover': {
    color: 'rgba(255, 255, 255, 0.8)',
    background: 'rgba(255, 255, 255, 0.05)',
  },
  [theme.breakpoints.down('sm')]: {
    top: 16,
    right: 16,
  },
}));

const LoginPaper = styled(Paper)<{ component?: React.ElementType; }>(({ theme }) => ({
  background: 'transparent',
  padding: theme.spacing(0, 3),
  paddingTop: 0,
  width: '90%',
  maxWidth: 360,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: 'none',
  animation: `${slideUp} 0.8s ease-out`,
  position: 'relative',
  minHeight: '100%',
  overflowY: 'visible',
  [theme.breakpoints.down('sm')]: {
    width: '85%',
    padding: theme.spacing(0, 2),
    paddingBottom: theme.spacing(8), // Add padding at bottom for skip button
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  '& img': {
    width: '280px',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '320px',
      marginTop: theme.spacing(2),
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  position: 'relative',
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
    '&.Mui-error': {
      background: 'rgba(255, 75, 108, 0.05)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FF4B6C',
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
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 1,
      },
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.5)',
    transform: 'translate(16px, 16px) scale(1)',
    '&.Mui-focused': {
      color: '#4B4EF9',
    },
    '&.Mui-error': {
      color: '#FF4B6C',
    },
    '&.MuiInputLabel-shrink': {
      transform: 'translate(16px, -9px) scale(0.75)',
      backdropFilter: 'blur(8px)',
      padding: '0 4px',
      backgroundColor: 'rgba(10, 11, 26, 0.8)',
    },
  },
  '& .MuiInputBase-input': {
    color: 'rgba(255, 255, 255, 0.9)',
    '&:-webkit-autofill': {
      '-webkit-box-shadow': '0 0 0 30px #0A0B1A inset !important',
      '-webkit-text-fill-color': 'rgba(255, 255, 255, 0.9) !important',
      'caret-color': 'rgba(255, 255, 255, 0.9)',
    },
  },
  '& .MuiInputAdornment-root': {
    marginRight: 8,
    '& .MuiIconButton-root': {
      padding: 8,
      transition: 'all 0.2s ease',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
      },
      '& .MuiSvgIcon-root': {
        fontSize: 20,
        color: 'rgba(255, 255, 255, 0.5)',
        transition: 'all 0.2s ease',
      },
    },
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: '#4461F2',
  borderRadius: '6px',
  padding: '0',
  height: '44px',
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: '#3451E2',
    boxShadow: 'none',
  },
  '&:active': {
    background: '#2441D2',
  },
  '&.Mui-disabled': {
    background: 'rgba(68, 97, 242, 0.5)',
  },
  [theme.breakpoints.down('sm')]: {
    height: '40px',
    fontSize: '13px',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '6px',
  padding: '0',
  height: '44px',
  color: 'rgba(255, 255, 255, 0.9)',
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: '13px',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  '&:active': {
    background: 'rgba(255, 255, 255, 0.01)',
  },
  [theme.breakpoints.down('sm')]: {
    height: '40px',
    fontSize: '12px',
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(1.5, 0),
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
  '& .MuiAlert-message': {
    padding: '8px 0',
  },
  '& .MuiAlert-action': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const Login = () => {
  const navigate = useNavigate();
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
    
    // Validate all fields
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Always succeed for now
      setSnackbar({
        open: true,
        message: 'Login successful!',
        severity: 'success',
      });

      // Navigate after a short delay
      setTimeout(() => {
        navigate('/');
      }, 500);
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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Background>
      <Link to="/"><SkipButton variant="text">SKIP</SkipButton></Link>
      <FloatingElement />
      <FloatingElement />
      <FloatingElement />
      
      <LoginPaper elevation={0} component="form" onSubmit={handleSubmit}>
        <LogoContainer>
          <img src={Logo} alt="Zoddz Logo" />
        </LogoContainer>
        
        <Typography 
          variant="h5" 
          fontWeight={600} 
          align="center"
          sx={(theme) => ({ 
            color: 'rgba(255, 255, 255, 0.95)',
            mb: 2.5,
            fontSize: '22px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '20px',
              mb: 2,
            },
          })}
        >
          Welcome to Zoddz
        </Typography>
        
        <Box sx={{ width: '100%', mb: 3, position: 'relative' }}>
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

        <Box sx={{ width: '100%', mb: 3, position: 'relative' }}>
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
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
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
        
        <PrimaryButton
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
          sx={{ 
            mt: 2, 
            mb: 1,
            position: 'relative',
            '& .MuiCircularProgress-root': {
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255, 255, 255, 0.7)',
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'LOGIN'}
        </PrimaryButton>
        
        <StyledDivider>OR</StyledDivider>
        
        <Stack spacing={1.5} width="100%">
          <SecondaryButton
            variant="outlined"
            fullWidth
            startIcon={
              <MailOutlineRounded sx={{ fontSize: 20 }} />
            }
            onClick={() => alert('Login with email functionality not implemented yet.')}
          >
            Login with Email
          </SecondaryButton>
          
          <SecondaryButton
            variant="outlined"
            fullWidth
            onClick={() => alert('Login with google functionality not implemented yet.')}
            startIcon={
              <GoogleIcon sx={{ fontSize: 20 }} />
            }
          >
            Login with Google
          </SecondaryButton>
        </Stack>
      </LoginPaper>
    </Background>
  );
};

export default Login;