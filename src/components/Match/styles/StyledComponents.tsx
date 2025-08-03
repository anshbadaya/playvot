import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/material';
import { themeColors, commonStyles } from './theme-constants';

export const PageBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${themeColors.background} 0%, ${themeColors.secondary} 100%)`,
  minHeight: '100vh',
  color: themeColors.text.primary,
  display: 'flex',
  flexDirection: 'column'
}));

export const TopBar = styled(Box)(({ theme }) => ({
  ...commonStyles.card,
  position: 'sticky',
  top: 0,
  zIndex: 50,
  background: alpha(themeColors.background, 0.95),
  borderBottom: `1px solid ${themeColors.border}`,
  padding: theme.spacing(2),
  borderRadius: 0,
  '&:hover': {
    borderColor: themeColors.border,
    boxShadow: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  }
}));

export const TabPanel = styled(Box)({
  padding: '16px',
  ...commonStyles.card,
  '&:hover': {
    borderColor: themeColors.border,
    boxShadow: 'none'
  }
});