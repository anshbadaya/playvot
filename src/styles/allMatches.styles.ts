import { styled } from '@mui/material/styles';
import { Box, Typography, Card, Chip } from '@mui/material';
import { colors } from '@/utils/colors';

export const PageBackground = styled(Box)(({ theme }) => ({
  background: colors.gradients.background,
  minHeight: '100vh',
  color: colors.text.primary,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4, 0),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(29, 78, 216, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  }
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  padding: theme.spacing(0, 2)
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  color: colors.text.primary,
  fontSize: '2.5rem',
  fontWeight: 800,
  marginBottom: theme.spacing(2),
  textShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  background: colors.gradients.primary,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem'
  }
}));

export const PageSubtitle = styled(Typography)(({ theme }) => ({
  color: colors.text.secondary,
  fontSize: '1.1rem',
  fontWeight: 500,
  maxWidth: 600,
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem'
  }
}));

export const MatchCardContainer = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    rgba(30, 41, 59, 0.8) 0%, 
    rgba(15, 23, 42, 0.9) 50%, 
    rgba(30, 41, 59, 0.8) 100%)`,
  border: `1px solid rgba(148, 163, 184, 0.1)`,
  backdropFilter: 'blur(20px) saturate(180%)',
  borderRadius: 24,
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: `
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.05)
  `,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      rgba(29, 78, 216, 0.05) 0%, 
      transparent 30%, 
      rgba(139, 92, 246, 0.03) 70%, 
      rgba(16, 185, 129, 0.05) 100%)`,
    pointerEvents: 'none',
    zIndex: 0,
    transition: 'all 0.4s ease'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.03), 
      transparent)`,
    transition: 'left 0.6s ease',
    zIndex: 1
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(148, 163, 184, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    '&::before': {
      background: `linear-gradient(135deg, 
        rgba(29, 78, 216, 0.1) 0%, 
        transparent 30%, 
        rgba(139, 92, 246, 0.08) 70%, 
        rgba(16, 185, 129, 0.1) 100%)`
    },
    '&::after': {
      left: '100%'
    }
  }
}));

export const MatchHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2.5, 3),
  borderBottom: `1px solid rgba(148, 163, 184, 0.08)`,
  position: 'relative',
  zIndex: 2,
  background: 'rgba(15, 23, 42, 0.3)',
  backdropFilter: 'blur(10px)'
}));

export const MatchInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
});

export const MatchTitle = styled(Typography)(({ theme }) => ({
  color: colors.text.primary,
  fontSize: '0.95rem',
  fontWeight: 600,
  letterSpacing: '0.025em',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
}));

export const TournamentBadge = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    rgba(29, 78, 216, 0.9) 0%, 
    rgba(139, 92, 246, 0.9) 100%)`,
  color: colors.text.primary,
  fontWeight: 700,
  fontSize: '0.75rem',
  height: 26,
  borderRadius: 13,
  border: '1px solid rgba(148, 163, 184, 0.2)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  '& .MuiChip-label': {
    padding: '0 12px'
  }
}));

export const TeamsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3.5),
  position: 'relative',
  zIndex: 2
}));

export const TeamRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(1, 0),
  '&:last-child': {
    marginBottom: 0
  }
}));

export const TeamIcon = styled(Box)(({ theme }) => ({
  width: 42,
  height: 42,
  borderRadius: '50%',
  background: `linear-gradient(135deg, 
    rgba(29, 78, 216, 0.9) 0%, 
    rgba(139, 92, 246, 0.9) 100%)`,
  border: `2px solid rgba(148, 163, 184, 0.2)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.9rem',
  fontWeight: 700,
  color: colors.text.primary,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: `
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)
  `,
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    borderColor: 'rgba(148, 163, 184, 0.4)',
    boxShadow: `
      0 8px 15px -3px rgba(0, 0, 0, 0.15),
      0 4px 6px -2px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `
  }
}));

export const TeamName = styled(Typography)(({ theme }) => ({
  color: colors.text.primary,
  fontSize: '1.05rem',
  fontWeight: 600,
  flex: 1,
  letterSpacing: '0.025em',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
}));

export const MatchTime = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.95)',
  fontSize: '0.95rem',
  fontWeight: 700,
  textAlign: 'center',
  margin: theme.spacing(3.5, 0),
  padding: theme.spacing(0.75, 1.75),
  borderRadius: 12,
  display: 'inline-block',
  whiteSpace: 'nowrap',
  background: 'rgba(59, 130, 246, 0.15)',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 24px rgba(0, 0, 0, 0.25)'
}));

export const NavigationSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${colors.border.primary}`
}));

export const NavButton = styled(Typography)(({ theme }) => ({
  color: colors.text.secondary,
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: colors.text.primary
  }
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: colors.text.primary,
  fontSize: '1.8rem',
  fontWeight: 800,
  marginBottom: theme.spacing(5),
  textAlign: 'center',
  position: 'relative',
  letterSpacing: '0.05em',
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  background: `linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(203, 213, 225, 0.9) 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    width: '40px',
    height: '3px',
    background: `linear-gradient(90deg, 
      transparent 0%, 
      rgba(29, 78, 216, 0.8) 50%, 
      transparent 100%)`,
    transform: 'translateY(-50%)',
    borderRadius: '2px'
  },
  '&::before': {
    left: '-50px'
  },
  '&::after': {
    right: '-50px',
    background: `linear-gradient(90deg, 
      transparent 0%, 
      rgba(139, 92, 246, 0.8) 50%, 
      transparent 100%)`
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.2rem',
    '&::before, &::after': {
      width: '60px'
    },
    '&::before': {
      left: '-70px'
    },
    '&::after': {
      right: '-70px'
    }
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
    '&::before, &::after': {
      width: '80px'
    },
    '&::before': {
      left: '-100px'
    },
    '&::after': {
      right: '-100px'
    }
  }
}));

export const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4),
  width: '100%',
  '& > *': {
    animation: 'fadeInUp 0.6s ease-out forwards',
    opacity: 0,
    transform: 'translateY(20px)',
    '&:nth-child(1)': { animationDelay: '0.1s' },
    '&:nth-child(2)': { animationDelay: '0.2s' },
    '&:nth-child(3)': { animationDelay: '0.3s' },
    '&:nth-child(4)': { animationDelay: '0.4s' },
    '&:nth-child(5)': { animationDelay: '0.5s' },
    '&:nth-child(6)': { animationDelay: '0.6s' }
  },
  '@keyframes fadeInUp': {
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(3.5)
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(4)
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(5)
  }
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6)
}));
