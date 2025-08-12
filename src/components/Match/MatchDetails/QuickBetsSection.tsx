import { colors } from '@/utils/colors';
import React from 'react';
import { Stack, Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { 
  fancyCardStyles,
  fancyHeaderStyles,
  quickBetButtonStyles,
  quickBetLabelStyles,
  quickBetOddsStyles
} from '@/styles/matchDetails.styles';
import { dummyQuickBets } from '@/data/matchDetailsData';

/**
 * Quick Bets Section component
 */
export const QuickBetsSection: React.FC = () => (
  <Card sx={{ ...fancyCardStyles, mt: 3 }}>
    <CardHeader
      title={
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{
            p: 1,
            bgcolor: 'rgba(59, 130, 246, 0.2)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <StarIcon sx={{ color: 'colors.primary', fontSize: 24 }} />
          </Box>
          <Typography variant="h6" sx={{
            color: 'colors.text.primary',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            Quick Bets - Next Ball
          </Typography>
        </Stack>
      }
      sx={fancyHeaderStyles}
    />
    <CardContent sx={{ p: 3 }}>
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={2}>
          {dummyQuickBets.slice(0, 2).map((bet, index) => (
            <Button key={index} sx={quickBetButtonStyles(bet.color.replace('#', 'rgba(').replace(')', ', 0.2)'))}>
              <Typography variant="body1" fontWeight={600} sx={quickBetLabelStyles(bet.color)}>
                {bet.type}
              </Typography>
              <Typography variant="body2" sx={quickBetOddsStyles}>
                {bet.odds}
              </Typography>
            </Button>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          {dummyQuickBets.slice(2, 4).map((bet, index) => (
            <Button key={index} sx={quickBetButtonStyles(bet.color.replace('#', 'rgba(').replace(')', ', 0.2)'))}>
              <Typography variant="body1" fontWeight={600} sx={quickBetLabelStyles(bet.color)}>
                {bet.type}
              </Typography>
              <Typography variant="body2" sx={quickBetOddsStyles}>
                {bet.odds}
              </Typography>
            </Button>
          ))}
        </Stack>
      </Stack>
    </CardContent>
  </Card>
); 