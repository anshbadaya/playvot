import { colors } from '@/utils/colors';
import React from 'react';
import { Stack, Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import { 
  fancyCardStyles,
  fancyHeaderStyles,
  fancyRowStyles,
  fancyButtonStyles
} from '@/styles/matchDetails.styles';
import { dummyFallOfWicket, dummyMethodOfDismissal } from '@/data/matchDetailsData';

/**
 * Fall of Wicket Section component
 */
export const FallOfWicketSection: React.FC = () => (
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
            <TrophyIcon sx={{ color: 'colors.primary', fontSize: 24 }} />
          </Box>
          <Typography variant="h6" sx={{
            color: 'colors.text.primary',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            Fall of Wicket
          </Typography>
        </Stack>
      }
      sx={fancyHeaderStyles}
    />
    <CardContent sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* Fall of Next Wicket */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: 'colors.text.primary', mb: 2, fontWeight: 600 }}>
            Fall of Next Wicket
          </Typography>
          <Stack spacing={2.5}>
            {dummyFallOfWicket.map((bet, index) => (
              <Box key={index} sx={fancyRowStyles}>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                  {bet.type}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" sx={{ color: 'colors.text.muted', fontWeight: 500 }}>{bet.description}</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={fancyButtonStyles('rgba(239, 68, 68, ')}
                  >
                    {bet.odds}
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Method of Next Dismissal */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: 'colors.text.primary', mb: 2, fontWeight: 600 }}>
            Method of Next Dismissal
          </Typography>
          <Stack spacing={2.5}>
            {dummyMethodOfDismissal.map((bet, index) => (
              <Box key={index} sx={fancyRowStyles}>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                  {bet.type}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" sx={{ color: 'colors.text.muted', fontWeight: 500 }}>{bet.description}</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={fancyButtonStyles('rgba(239, 68, 68, ')}
                  >
                    {bet.odds}
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </CardContent>
  </Card>
); 