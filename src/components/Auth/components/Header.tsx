import React from 'react';
import {
  Box,
  Button,
  Container,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/material/styles';



const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

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

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
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
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <LoginButton onClick={onLoginClick}>
            Login
          </LoginButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
