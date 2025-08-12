import { colors } from '@/utils/colors';
import React from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: colors.primary,
  borderRadius: '8px',
  padding: '12px 24px',
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  color: colors.text.primary,
  '&:hover': {
    background: colors.primaryHover,
    boxShadow: '0 4px 12px rgba(68, 97, 242, 0.3)',
    color: colors.text.primary,
  },
  '& .MuiButton-label': {
    color: colors.text.primary,
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '8px',
  padding: '12px 24px',
  color: colors.text.primary,
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: '13px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    color: colors.text.primary,
  },
  '& .MuiButton-label': {
    color: colors.text.primary,
  },
}));

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: colors.gradients.background,
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.border.primary}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing(2, 0),
            [theme.breakpoints.down('md')]: {
              padding: theme.spacing(1.5, 0),
            },
          }}
        >
          {/* Logo */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: colors.text.primary,
              fontSize: isMobile ? '1.5rem' : '2rem',
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            Zoddz
          </Typography>

          {/* Navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                gap: theme.spacing(4),
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: colors.text.secondary,
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: colors.text.primary,
                  },
                }}
              >
                Home
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: colors.text.secondary,
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: colors.text.primary,
                  },
                }}
              >
                About
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: colors.text.secondary,
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: colors.text.primary,
                  },
                }}
              >
                Features
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: theme.spacing(2),
              alignItems: 'center',
            }}
          >
            <SecondaryButton
              onClick={() => window.location.href = '/about'}
              sx={{ display: isMobile ? 'none' : 'block' }}
            >
              Learn More
            </SecondaryButton>
            <PrimaryButton onClick={onLoginClick}>
              Get Started
            </PrimaryButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
