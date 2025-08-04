import React from 'react';
import { Stack, Card, CardHeader, CardContent, Typography, Button, Avatar, Box } from '@mui/material';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import { 
  matchWinnerCardStyles,
  matchWinnerHeaderStyles,
  matchWinnerTeamRowStyles,
  matchWinnerTeamAvatarStyles,
  matchWinnerTeamNameStyles,
  oddsButtonStyles
} from '@/styles/matchDetails.styles';
import { dummyMatchWinnerOdds } from '@/data/matchDetailsData';

/**
 * Match Winner Section component
 */
export const MatchWinnerSection: React.FC = () => (
  <Card sx={matchWinnerCardStyles}>
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
            <TrophyIcon sx={{ color: '#3B82F6', fontSize: 24 }} />
          </Box>
          <Typography variant="h6" sx={{ 
            color: '#FFFFFF',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            Match Winner
          </Typography>
        </Stack>
      }
      sx={matchWinnerHeaderStyles}
    />
    <CardContent sx={{ p: 3 }}>
      <Stack spacing={2.5}>
        {dummyMatchWinnerOdds.map((odds, index) => (
          <Box key={index} sx={matchWinnerTeamRowStyles}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                src={`/teams/${odds.team.toLowerCase().replace(' ', '')}.png`}
                alt={odds.team} 
                sx={matchWinnerTeamAvatarStyles}
              />
              <Typography variant="body1" sx={matchWinnerTeamNameStyles}>
                {odds.team}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="contained"
                size="small"
                sx={oddsButtonStyles(true)}
              >
                <Typography variant="body2" fontWeight={600}>{odds.back}</Typography>
              </Button>
              <Button sx={oddsButtonStyles(false)}>
                <Typography variant="body2" fontWeight={600}>{odds.lay}</Typography>
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </CardContent>
  </Card>
); 