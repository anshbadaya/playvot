import { styled, alpha } from '@mui/material/styles';
import { Box, Typography, Card, Chip } from '@mui/material';
import { colors, gradients } from '@/utils/colors';

export const PageBackground = styled(Box)(({ theme }) => ({
  background: colors.gradients.background,
  minHeight: '100vh',
  color: colors.text.primary,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4, 0)
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
  background: colors.gradients.card,
  border: `2px solid ${colors.primaryBorder}`,
  backdropFilter: 'blur(12px)',
  borderRadius: 20,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${colors.primaryLight} 0%, transparent 50%, ${alpha(colors.primary, 0.02)} 100%)`,
    pointerEvents: 'none',
    zIndex: 0
  },
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: `0 25px 50px ${colors.shadows.primary}`,
    borderColor: colors.primaryBorder,
    '&::before': {
      background: `linear-gradient(135deg, ${alpha(colors.primary, 0.1)} 0%, transparent 50%, ${alpha(colors.primary, 0.05)} 100%)`
    }
  }
}));

export const MatchHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${colors.border.secondary}`,
  position: 'relative',
  zIndex: 1
}));

export const MatchInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
});

export const MatchTitle = styled(Typography)(({ theme }) => ({
  color: colors.text.primary,
  fontSize: '0.9rem',
  fontWeight: 600
}));

export const TournamentBadge = styled(Chip)(({ theme }) => ({
  background: gradients.primaryToSecondary,
  color: colors.text.primary,
  fontWeight: 700,
  fontSize: '0.8rem',
  height: 24
}));

export const TeamsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  position: 'relative',
  zIndex: 1
}));

export const TeamRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0
  }
}));

export const TeamIcon = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.secondaryLight} 100%)`,
  border: `1px solid ${colors.primaryBorder}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.9rem',
  fontWeight: 700,
  color: colors.text.primary,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: colors.primaryBorder
  }
}));

export const TeamName = styled(Typography)(({ theme }) => ({
  color: colors.text.primary,
  fontSize: '1rem',
  fontWeight: 600,
  flex: 1
}));

export const MatchTime = styled(Typography)(({ theme }) => ({
  color: colors.warning,
  fontSize: '1rem',
  fontWeight: 700,
  textAlign: 'center',
  margin: theme.spacing(3, 0),
  padding: theme.spacing(1, 2),
  background: `linear-gradient(135deg, ${colors.warningLight} 0%, ${alpha(colors.warning, 0.05)} 100%)`,
  borderRadius: 8,
  border: `1px solid ${colors.warningBorder}`,
  display: 'inline-block',
  position: 'relative',
  zIndex: 1
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
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    width: '30px',
    height: '2px',
    background: `linear-gradient(90deg, ${alpha(colors.primary, 0)} 0%, ${colors.primary} 100%)`,
    transform: 'translateY(-50%)'
  },
  '&::before': {
    left: '-30px'
  },
  '&::after': {
    right: '-30px',
    background: `linear-gradient(90deg, ${colors.primary} 0%, ${alpha(colors.primary, 0)} 100%)`
  },
  [theme.breakpoints.up('sm')]: {
    '&::before, &::after': {
      width: '50px'
    },
    '&::before': {
      left: '-50px'
    },
    '&::after': {
      right: '-50px'
    }
  }
}));

export const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  }
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6)
}));
