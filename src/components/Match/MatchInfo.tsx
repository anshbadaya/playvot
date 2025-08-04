import React from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardHeader,
  CardContent,
  Divider,
  Stack,
  Chip,
  alpha
} from "@mui/material";
import { MatchInfoProps } from '@/types/match-details';
import { themeColors, commonStyles } from '@/config/theme';
import MatchSummary from '@/components/Match/MatchSummary';
import WinProbabilityBar from '@/components/Match/WinProbabilityBar';
import {
  matchInfoTeamsContainerStyles,
  matchInfoTeamBoxStyles,
  matchInfoTeamAvatarStyles,
  matchInfoLiveBadgeStyles,
  matchInfoSummaryBoxStyles,
  matchInfoSummaryTitleStyles,
  matchInfoDetailsRowStyles,
  matchInfoDividerStyles
} from '@/styles/matchDetails.styles';

const MatchInfo: React.FC<MatchInfoProps> = ({ data }) => {
  return (
    <Stack spacing={3}>
      {/* Match Info Card */}
      <Card sx={{ ...commonStyles.card }}>
        <CardHeader title={<Typography variant="h6">Match Info</Typography>} />
        <CardContent>
          <Stack spacing={2}>
            {/* Teams and Scores */}
            <Box sx={matchInfoTeamsContainerStyles}>
              <Box sx={matchInfoTeamBoxStyles}>
                <Avatar 
                  src={data.teams.home.logo} 
                  alt={data.teams.home.name}
                  sx={matchInfoTeamAvatarStyles}
                />
                <Typography variant="subtitle1">{data.teams.home.name}</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {data.teams.home.score}
                </Typography>
              </Box>
              
              <Box sx={matchInfoLiveBadgeStyles}>
                <Typography variant="caption" fontWeight="bold" color="white">
                  LIVE
                </Typography>
              </Box>
              
              <Box sx={matchInfoTeamBoxStyles}>
                <Avatar 
                  src={data.teams.away.logo} 
                  alt={data.teams.away.name}
                  sx={matchInfoTeamAvatarStyles}
                />
                <Typography variant="subtitle1">{data.teams.away.name}</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {data.teams.away.score}
                </Typography>
              </Box>
            </Box>
            
            {/* Match Summary */}
            <Box sx={matchInfoSummaryBoxStyles}>
              <Typography variant="subtitle1" sx={matchInfoSummaryTitleStyles}>Match Summary</Typography>
              <Typography variant="body2">
                {data.status}
              </Typography>
              {data.venue && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Venue: {data.venue}
                </Typography>
              )}
              {data.league && (
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {data.league}
                </Typography>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
      
      {/* Top Performers */}
      <Card sx={{ ...commonStyles.card }}>
        <CardHeader title={<Typography variant="h6">Top Performers</Typography>} />
        <CardContent>
          <MatchSummary data={data} />
        </CardContent>
      </Card>
      
      {/* Win Probability */}
      <Card sx={{ ...commonStyles.card }}>
        <CardHeader title={<Typography variant="h6">Win Probability</Typography>} />
        <CardContent>
          <WinProbabilityBar data={data} />
        </CardContent>
      </Card>
      
      {/* Match Details */}
      <Card sx={{ ...commonStyles.card }}>
        <CardHeader title={<Typography variant="h6">Match Details</Typography>} />
        <CardContent>
          <Stack spacing={1.5}>
            <Box sx={matchInfoDetailsRowStyles}>
              <Typography variant="body2" color="gray">Tournament</Typography>
              <Typography variant="body2">{data.league}</Typography>
            </Box>
            <Divider sx={matchInfoDividerStyles} />
            
            <Box sx={matchInfoDetailsRowStyles}>
              <Typography variant="body2" color="gray">Venue</Typography>
              <Typography variant="body2">{data.venue}</Typography>
            </Box>
            <Divider sx={matchInfoDividerStyles} />
            
            <Box sx={matchInfoDetailsRowStyles}>
              <Typography variant="body2" color="gray">Date & Time</Typography>
              <Typography variant="body2">{data.dateTime}</Typography>
            </Box>
            <Divider sx={matchInfoDividerStyles} />
            
            <Box sx={matchInfoDetailsRowStyles}>
              <Typography variant="body2" color="gray">Status</Typography>
              <Typography variant="body2" color="error.main" fontWeight="bold">{data.status}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default MatchInfo;