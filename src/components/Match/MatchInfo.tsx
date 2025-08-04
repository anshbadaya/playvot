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
import { styled } from "@mui/material/styles";
import { MatchInfoProps } from '@/types/match-details';
import { themeColors, commonStyles } from '@/config/theme';
import MatchSummary from '@/components/Match/MatchSummary';
import WinProbabilityBar from '@/components/Match/WinProbabilityBar';

const StyledCard = styled(Card)`
  ${commonStyles.card}
`;

const TeamsContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const TeamBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`;

const TeamAvatar = styled(Avatar)`
  width: 60px;
  height: 60px;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  border: 2px solid rgba(59, 130, 246, 0.3);
`;

const LiveBadge = styled(Box)`
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  padding: ${({ theme }) => theme.spacing(0.5, 1)};
  border-radius: 20px;
  margin: ${({ theme }) => theme.spacing(0, 2)};
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const SummaryBox = styled(Box)`
  background: rgba(15, 23, 42, 0.3);
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

const SummaryTitle = styled(Typography)`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const DetailsRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1, 0)};
`;

const StyledDivider = styled(Divider)`
  border-color: rgba(255, 255, 255, 0.1);
  margin: ${({ theme }) => theme.spacing(0.5, 0)};
`;

const MatchInfo: React.FC<MatchInfoProps> = ({ data }) => {
  return (
    <Stack spacing={3}>
      {/* Match Info Card */}
      <StyledCard>
        <CardHeader title={<Typography variant="h6">Match Info</Typography>} />
        <CardContent>
          <Stack spacing={2}>
            {/* Teams and Scores */}
            <TeamsContainer>
              <TeamBox>
                <TeamAvatar 
                  src={data.teams.home.logo} 
                  alt={data.teams.home.name}
                />
                <Typography variant="subtitle1">{data.teams.home.name}</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {data.teams.home.score}
                </Typography>
              </TeamBox>
              
              <LiveBadge>
                <Typography variant="caption" fontWeight="bold" color="white">
                  LIVE
                </Typography>
              </LiveBadge>
              
              <TeamBox>
                <TeamAvatar 
                  src={data.teams.away.logo} 
                  alt={data.teams.away.name}
                />
                <Typography variant="subtitle1">{data.teams.away.name}</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {data.teams.away.score}
                </Typography>
              </TeamBox>
            </TeamsContainer>
            
            {/* Match Summary */}
            <SummaryBox>
              <SummaryTitle variant="subtitle1">Match Summary</SummaryTitle>
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
            </SummaryBox>
          </Stack>
        </CardContent>
      </StyledCard>
      
      {/* Top Performers */}
      <StyledCard>
        <CardHeader title={<Typography variant="h6">Top Performers</Typography>} />
        <CardContent>
          <MatchSummary data={data} />
        </CardContent>
      </StyledCard>
      
      {/* Win Probability */}
      <StyledCard>
        <CardHeader title={<Typography variant="h6">Win Probability</Typography>} />
        <CardContent>
          <WinProbabilityBar data={data} />
        </CardContent>
      </StyledCard>
      
      {/* Match Details */}
      <StyledCard>
        <CardHeader title={<Typography variant="h6">Match Details</Typography>} />
        <CardContent>
          <Stack spacing={1.5}>
            <DetailsRow>
              <Typography variant="body2" color="gray">Tournament</Typography>
              <Typography variant="body2">{data.league}</Typography>
            </DetailsRow>
            <StyledDivider />
            
            <DetailsRow>
              <Typography variant="body2" color="gray">Venue</Typography>
              <Typography variant="body2">{data.venue}</Typography>
            </DetailsRow>
            <StyledDivider />
            
            <DetailsRow>
              <Typography variant="body2" color="gray">Date & Time</Typography>
              <Typography variant="body2">{data.dateTime}</Typography>
            </DetailsRow>
            <StyledDivider />
            
            <DetailsRow>
              <Typography variant="body2" color="gray">Status</Typography>
              <Typography variant="body2" color="error.main" fontWeight="bold">{data.status}</Typography>
            </DetailsRow>
          </Stack>
        </CardContent>
      </StyledCard>
    </Stack>
  );
};

export default MatchInfo;