import React from 'react';
import { Stack, Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { 
  fancyCardStyles,
  fancyHeaderStyles,
  fancyRowStyles,
  fancyButtonStyles
} from '@/styles/matchDetails.styles';
import { dummyNextOverRuns } from '@/data/matchDetailsData';

/**
 * Next Over Runs Section component
 */
export const NextOverRunsSection: React.FC = () => (
  <Card sx={fancyCardStyles}>
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
            <AccessTimeIcon sx={{ color: '#3B82F6', fontSize: 24 }} />
          </Box>
          <Typography variant="h6" sx={{
            color: '#FFFFFF',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            Next Over Runs
          </Typography>
        </Stack>
      }
      sx={fancyHeaderStyles}
    />
    <CardContent sx={{ p: 3 }}>
      <Stack spacing={2.5}>
        {dummyNextOverRuns.map((bet, index) => (
          <Box key={index} sx={fancyRowStyles}>
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
              {bet.type}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>{bet.description}</Typography>
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
    </CardContent>
  </Card>
); 