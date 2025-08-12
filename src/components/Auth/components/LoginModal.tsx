import { colors } from '@/utils/colors';
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Divider,
  FormHelperText,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { 
  Visibility, 
  VisibilityOff,
  MailOutlineRounded,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/material/styles';



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

const LoginModalStyled = styled(Paper)(({ theme }) => ({
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
        borderColor: 'colors.primary',
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
      color: 'colors.primary',
    },
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: 'colors.primary',
  borderRadius: '8px',
  padding: '12px 24px',
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  color: 'colors.text.primary',
  '&:hover': {
    background: 'colors.primaryHover',
    boxShadow: '0 4px 12px rgba(68, 97, 242, 0.3)',
    color: 'colors.text.primary',
  },
  '& .MuiButton-label': {
    color: 'colors.text.primary',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '8px',
  padding: '12px 24px',
  color: 'colors.text.primary',
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: '13px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    color: 'colors.text.primary',
  },
  '& .MuiButton-label': {
    color: 'colors.text.primary',
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

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (username: string, password: string) => Promise<boolean>;
  isLoading: boolean;
  errors: { username?: string; password?: string };
  touched: { username: boolean; password: boolean };
  onFieldChange: (field: 'username' | 'password') => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFieldBlur: (field: 'username' | 'password') => () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onSubmit,
  isLoading,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(username, password);
    if (success) {
      setUsername('');
      setPassword('');
    }
  };

  if (!open) return null;

  return (
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
      onClick={onClose}
    >
      <LoginModalStyled onClick={(e) => e.stopPropagation()}>
        <Box textAlign="center" mb={3}>
          <Typography 
            variant="h4" 
            fontWeight={600}
            sx={{ 
              color: 'rgba(255, 255, 255, 0.95)',
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              mb: 2,
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            }}
          >
            Sign in to access your betting dashboard
          </Typography>
        </Box>
    
        <Box component="form" onSubmit={handleSubmit}>
          <Box mb={3}>
            <StyledTextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                onFieldChange('username')(e);
              }}
              onBlur={onFieldBlur('username')}
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
              onChange={(e) => {
                setPassword(e.target.value);
                onFieldChange('password')(e);
              }}
              onBlur={onFieldBlur('password')}
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
      </LoginModalStyled>
    </Box>
  );
};

export default LoginModal;
