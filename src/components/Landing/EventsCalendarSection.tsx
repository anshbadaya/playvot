import React from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { colors, colorUtils, gradients } from '@/utils/colors';

const EventsCalendarSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  return (
    <Box
      sx={{
        padding: theme.spacing(12, 0),
        position: 'relative',
        background: `linear-gradient(135deg, ${colorUtils.withOpacity(colors.primary, 0.03)} 0%, ${colorUtils.withOpacity(colors.secondary, 0.03)} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, ${colorUtils.withOpacity(colors.primary, 0.05)} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${colorUtils.withOpacity(colors.secondary, 0.03)} 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(10, 0),
        },
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={10}>
          <Typography 
            variant="h2" 
            fontWeight={700}
            sx={{ 
              color: colors.text.primary,
              mb: 3,
              fontSize: isMobile ? '2rem' : '2.8rem',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              position: 'relative',
              display: 'inline-block',
              paddingBottom: theme.spacing(1.5),
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '3px',
                borderRadius: '3px',
                background: gradients.primaryToSecondary,
                opacity: 0.6,
              },
            }}
          >
            Events Calendar{' '}
            <Box component="span" sx={{ color: colors.primary }}>
              2025–26
            </Box>
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: colors.text.primary,
              mb: 4,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              opacity: 0.9,
            }}
          >
            We're powering odds for{' '}
            <Box component="span" sx={{ color: colors.success, fontWeight: 600 }}>
              2500+ matches
            </Box>
            {' '}across multiple sports
          </Typography>
          <Box 
            sx={{ 
              display: 'inline-block',
              background: gradients.primaryToSecondary,
              border: `1px solid ${colors.primaryBorder}`,
              borderRadius: '14px',
              padding: theme.spacing(1.75, 4),
              mb: 6,
              boxShadow: `0 10px 24px ${colors.shadows.primary}`,
              cursor: 'default',
            }}
          >
            <Typography 
              variant="h6" 
              fontWeight={600} 
              sx={{ 
                color: colors.text.primary,
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Global Betting Rights Available
            </Typography>
          </Box>
        </Box>
        
        <Box display="flex" justifyContent="center" mb={8}>
          <Box 
            sx={{ 
              position: 'relative',
              width: isMobile ? 300 : 400,
              height: isMobile ? 300 : 400,
               '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isMobile ? 200 : 280,
                height: isMobile ? 200 : 280,
                 border: `2px dashed ${colorUtils.withOpacity(colors.primary, 0.25)}`,
                borderRadius: '50%',
                animation: 'rotate 20s linear infinite',
                 boxShadow: `0 0 0 1px ${colorUtils.withOpacity(colors.primary, 0.06)} inset`,
              },
              '@keyframes rotate': {
                '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
              },
            }}
          >
            {sports.map((sport, index) => {
              const angle = (index * 72) - 90; // 360° / 5 sports = 72° each, start from top
              const radius = isMobile ? 120 : 160;
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
                     background: `radial-gradient(circle at 30% 30%, ${colorUtils.withOpacity(colors.primary, 0.18)} 0%, ${colorUtils.withOpacity(colors.secondary, 0.12)} 100%)`,
                     border: `1px solid ${colorUtils.withOpacity(colors.primary, 0.35)}`,
                    borderRadius: '50%',
                    width: isMobile ? 90 : 110,
                    height: isMobile ? 90 : 110,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(15px)',
                     transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease, border-color 0.35s ease',
                    cursor: 'pointer',
                     boxShadow: `0 12px 28px ${colors.shadows.primary}`,
                    '&:hover': {
                      background: `radial-gradient(circle at 30% 30%, ${colorUtils.withOpacity(colors.primary, 0.25)} 0%, ${colorUtils.withOpacity(colors.secondary, 0.2)} 100%)`,
                      borderColor: colorUtils.withOpacity(colors.primary, 0.6),
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1.15)`,
                      boxShadow: `0 18px 40px ${colors.shadows.primary}`,
                    },
                     '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      borderRadius: '50%',
                       background: `linear-gradient(135deg, ${colorUtils.withOpacity(colors.primary, 0.25)}, ${colorUtils.withOpacity(colors.secondary, 0.25)})`,
                      zIndex: -1,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover::before': {
                      opacity: 1,
                    },
                     '&::after': {
                       content: '""',
                       position: 'absolute',
                       inset: 0,
                       borderRadius: '50%',
                       padding: '1px',
                       background: gradients.primaryToSecondary,
                       mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                       WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                       WebkitMaskComposite: 'xor',
                       maskComposite: 'exclude',
                       opacity: 0.35,
                       pointerEvents: 'none',
                     },
                  }}
                >
                  <Box sx={{ 
                    color: colors.text.primary,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                  }}>
                    {sport.icon}
                  </Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: colors.text.primary,
                      textAlign: 'center',
                      fontSize: isMobile ? '0.75rem' : '0.85rem',
                      fontWeight: 600,
                      lineHeight: 1.2,
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
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
              color: colors.text.primary,
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
    </Box>
  );
};

export default EventsCalendarSection;
