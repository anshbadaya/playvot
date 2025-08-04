import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Chip,
  alpha
} from '@mui/material';
import { themeColors, commonStyles } from '@/config/theme';
import CricketIcon from '@mui/icons-material/SportsCricket';
import LocationIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { MatchInfoProps } from './types';

interface MatchInfoCardProps {
  matchInfo: MatchInfoProps;
}

const MatchInfoCard: React.FC<MatchInfoCardProps> = ({ matchInfo }) => {
  return (
    <Card sx={{ ...commonStyles.card, mb: 3 }}>
      <CardHeader
        title={
          <Stack direction="row" spacing={2} alignItems="center">
            <CricketIcon sx={{ color: themeColors.primary }} />
            <Typography variant="h6" sx={{ 
              color: themeColors.text.primary,
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              Match Information
            </Typography>
          </Stack>
        }
        sx={{ 
          bgcolor: alpha(themeColors.secondary, 0.5),
          borderBottom: `1px solid ${themeColors.border}`,
          py: 2
        }}
      />
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <LocationIcon sx={{ color: themeColors.text.secondary }} />
            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
              {matchInfo.venue}
            </Typography>
          </Stack>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <ScheduleIcon sx={{ color: themeColors.text.secondary }} />
            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
              {matchInfo.time}
            </Typography>
          </Stack>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <EmojiEventsIcon sx={{ color: themeColors.text.secondary }} />
            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
              {matchInfo.toss}
            </Typography>
          </Stack>
          
          <Box>
            <Typography variant="body2" sx={{ 
              color: themeColors.text.secondary,
              mb: 1
            }}>
              Series: {matchInfo.series}
            </Typography>
            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
              Points: {matchInfo.points}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MatchInfoCard; 