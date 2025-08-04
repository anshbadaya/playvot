import React from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardHeader,
  CardContent,
  Divider,
  Stack
} from "@mui/material";
import { MatchData } from '../../types/match-details';
import { commonStyles } from '@/config/theme';
import MatchSummary from './MatchSummary';
import WinProbabilityBar from './WinProbabilityBar';

interface MatchInfoProps {
  data: MatchData;
}

const MatchInfo: React.FC<MatchInfoProps> = ({ data }) => {
  return (
    <Stack spacing={3}>
      {/* Match Info Card */}
      <Card sx={{ ...commonStyles.card }}>
        <CardHeader title={<Typography variant="h6">Match Info</Typography>} />
        <CardContent>
          <Stack spacing={2}>
            {/* Teams and Scores */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              bgcolor: 'rgba(15, 23, 42, 0.3)',
              borderRadius: 1,
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Avatar 
                  src={data.teams.home.logo} 
                  alt={data.teams.home.name}
                  sx={{ width: 48, height: 48, mx: 'auto', mb: 1 }}
                />
                <Typography variant="subtitle1">{data.teams.home.name}</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {data.teams.home.score}
                </Typography>
              </Box>
              
              <Box sx={{ 
                mx: 2,
                px: 2,
                py: 0.5, 
                bgcolor: 'error.main',
                borderRadius: 1,
                alignSelf: 'center'
              }}>
                <Typography variant="caption" fontWeight="bold" color="white">
                  LIVE
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Avatar 
                  src={data.teams.away.logo} 
                  alt={data.teams.away.name}
                  sx={{ width: 48, height: 48, mx: 'auto', mb: 1 }}
                />
                <Typography variant="subtitle1">{data.teams.away.name}</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {data.teams.away.score}
                </Typography>
              </Box>
            </Box>
            
            {/* Match Summary */}
            <Box sx={{ 
              p: 2,
              bgcolor: 'rgba(15, 23, 42, 0.3)',
              borderRadius: 1,
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Match Summary</Typography>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="gray">Tournament</Typography>
              <Typography variant="body2">{data.league}</Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.2)' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="gray">Venue</Typography>
              <Typography variant="body2">{data.venue}</Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.2)' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="gray">Date & Time</Typography>
              <Typography variant="body2">{data.dateTime}</Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.2)' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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