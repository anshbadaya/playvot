import React from 'react';
import { Stack, Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';
import TargetIcon from '@mui/icons-material/MyLocation';
import { themeColors, commonStyles } from '@/config/theme';
import { dummyTeamTotalRuns } from '@/data/matchDetailsData';

/**
 * Team Total Runs Section component
 */
export const TeamTotalRunsSection: React.FC = () => (
  <Card sx={{ ...commonStyles.card }}>
    <CardHeader 
      title={
        <Stack direction="row" spacing={2} alignItems="center">
          <TargetIcon sx={{ color: themeColors.warning }} />
          <Typography variant="h6" sx={{ 
            color: themeColors.text.primary,
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            Team Total Runs
          </Typography>
        </Stack>
      }
      sx={{ 
        bgcolor: 'rgba(15, 23, 42, 0.5)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.3)',
        py: 2
      }}
    />
    <CardContent>
      <Stack spacing={3}>
        {dummyTeamTotalRuns.map((teamRuns, index) => (
          <Box key={index}>
            <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
              {teamRuns.team} Total Runs
            </Typography>
            <Stack spacing={2}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                bgcolor: 'rgba(15, 23, 42, 0.5)',
                borderRadius: 1,
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                  Under {teamRuns.under.runs}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    ...commonStyles.button,
                    bgcolor: themeColors.primary,
                    color: themeColors.text.primary,
                    '&:hover': {
                      bgcolor: 'rgba(59, 130, 246, 0.9)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
                    }
                  }}
                >
                  Back {teamRuns.under.odds}
                </Button>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                bgcolor: 'rgba(15, 23, 42, 0.5)',
                borderRadius: 1,
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                  Over {teamRuns.over.runs}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    ...commonStyles.button,
                    bgcolor: themeColors.primary,
                    color: themeColors.text.primary,
                    '&:hover': {
                      bgcolor: 'rgba(59, 130, 246, 0.9)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
                    }
                  }}
                >
                  Back {teamRuns.over.odds}
                </Button>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </CardContent>
  </Card>
); 