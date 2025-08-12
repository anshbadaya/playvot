import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/material';
import { colors } from '@/utils/colors';

export const PageBackground = styled(Box)(({ theme }) => ({
  background: colors.gradients.background,
  minHeight: '100vh',
  color: colors.text.primary,
  display: 'flex',
  flexDirection: 'column'
}));

export const TopBar = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 50,
  background: alpha(colors.background.primary, 0.95),
  borderBottom: `1px solid ${colors.border.primary}`,
  padding: theme.spacing(2),
  borderRadius: 0,
  backdropFilter: 'blur(10px)',
  '&:hover': {
    borderColor: colors.border.primary,
    boxShadow: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  }
}));

export const TabPanel = styled(Box)({
  padding: '16px',
  backgroundColor: colors.background.card,
  borderRadius: '12px',
  border: `1px solid ${colors.border.primary}`,
  backdropFilter: 'blur(8px)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: colors.primaryBorder,
    boxShadow: `0 4px 20px ${colors.primaryLight}`
  }
}); 