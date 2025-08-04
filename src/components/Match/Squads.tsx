import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Avatar,
  Chip,
  alpha
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { themeColors, commonStyles } from '@/config/theme';
import PersonIcon from '@mui/icons-material/Person';
import { SquadsProps } from '@/types/match-details';

interface Player {
  name: string;
  number: number;
  position: string;
  role: string;
  isWicketKeeper?: boolean;
  isCaptain?: boolean;
  avatar?: string;
  stats?: {
    runs?: number;
    balls?: number;
    fours?: number;
    sixes?: number;
    strikeRate?: number;
    overs?: string;
    maidens?: number;
    wickets?: number;
    economy?: number;
    goals?: number;
    assists?: number;
    shots?: number;
    passes?: number;
    rating?: number;
  };
}

const Container = styled(Box)`
  padding: ${({ theme }) => theme.breakpoints.up('sm') ? theme.spacing(2) : theme.spacing(1)};
`;

const StyledCard = styled(Card)`
  ${commonStyles.card}
  flex: 1;
  min-height: ${({ theme }) => theme.breakpoints.up('md') ? '600px' : 'auto'};
`;

const StyledCardHeader = styled(CardHeader)`
  ${commonStyles.cardHeader}
  background: linear-gradient(135deg, ${themeColors.secondary} 0%, ${alpha(themeColors.primary, 0.2)} 100%);
`;

const StyledCardContent = styled(CardContent)`
  height: ${({ theme }) => theme.breakpoints.up('md') ? 'calc(100% - 80px)' : 'auto'};
  overflow-y: auto;
`;

const TeamAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
  border: 3px solid ${alpha(themeColors.primary, 0.3)};
`;

const TeamName = styled(Typography)`
  color: ${themeColors.text.primary};
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const TeamSubtitle = styled(Typography)`
  color: ${themeColors.text.secondary};
`;

const PlayerRow = styled(Box)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1.5)};
  background: rgba(15, 23, 42, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(15, 23, 42, 0.3);
    border-color: rgba(59, 130, 246, 0.2);
    transform: translateY(-1px);
  }
`;

const PlayerContent = styled(Box)`
  display: flex;
  align-items: center;
  flex: 1;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const PlayerAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  border: 2px solid rgba(59, 130, 246, 0.3);
`;

const PlayerInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PlayerName = styled(Typography)`
  color: ${themeColors.text.primary};
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const PlayerDetails = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const PlayerRole = styled(Typography)`
  color: ${themeColors.text.secondary};
  font-size: 0.75rem;
  font-weight: 500;
`;

const PlayerNumber = styled(Typography)`
  color: rgba(59, 130, 246, 0.8);
  font-size: 0.75rem;
  font-weight: 600;
`;

const CaptainChip = styled(Chip)`
  height: 16px;
  font-size: 0.6rem;
  background-color: rgba(59, 130, 246, 0.2);
  color: rgba(59, 130, 246, 0.8);
`;

const WicketKeeperChip = styled(Chip)`
  height: 16px;
  font-size: 0.6rem;
  background-color: rgba(16, 185, 129, 0.2);
  color: rgba(16, 185, 129, 0.8);
`;

const PlayerStats = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing(0.25)};
`;

const StatItem = styled(Typography)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  font-weight: 500;
`;

const PlayerRowComponent: React.FC<{ player: Player; isRight?: boolean }> = ({ player, isRight = false }) => {
  const getPlayerTitle = () => {
    let title = player.role;
    if (player.isCaptain && player.isWicketKeeper) {
      title = `${player.role} (C & WK)`;
    } else if (player.isCaptain) {
      title = `${player.role} (C)`;
    } else if (player.isWicketKeeper) {
      title = `${player.role} (WK)`;
    }
    return title;
  };

  return (
    <PlayerRow>
      <PlayerContent>
        <PlayerAvatar 
          src={player.avatar} 
          alt={player.name}
        >
          <PersonIcon />
        </PlayerAvatar>
        
        <PlayerInfo>
          <PlayerName>
            {player.name}
          </PlayerName>
          
          <PlayerDetails>
            <PlayerRole>
              {getPlayerTitle()}
            </PlayerRole>
            <PlayerNumber>
              #{player.number}
            </PlayerNumber>
            
            {/* Role badges */}
            {player.isCaptain && (
              <CaptainChip label="C" size="small" />
            )}
            {player.isWicketKeeper && (
              <WicketKeeperChip label="WK" size="small" />
            )}
          </PlayerDetails>
        </PlayerInfo>
        
        {/* Player Stats */}
        <PlayerStats>
          {player.stats?.runs !== undefined && (
            <StatItem>
              {player.stats.runs} runs
            </StatItem>
          )}
          {player.stats?.wickets !== undefined && (
            <StatItem>
              {player.stats.wickets} wkts
            </StatItem>
          )}
          {player.stats?.goals !== undefined && (
            <StatItem>
              {player.stats.goals} goals
            </StatItem>
          )}
          {player.stats?.rating !== undefined && (
            <StatItem>
              {player.stats.rating.toFixed(1)} rating
            </StatItem>
          )}
        </PlayerStats>
      </PlayerContent>
    </PlayerRow>
  );
};

const Squads: React.FC<SquadsProps> = ({ data }) => {
  const homeTeam = data.teams.home;
  const awayTeam = data.teams.away;
  const homePlayers = data.players.home;
  const awayPlayers = data.players.away;
  
  // Get all players (full squad of 11 for each team)
  const homeSquad = homePlayers.slice(0, 11);
  const awaySquad = awayPlayers.slice(0, 11);

  return (
    <Container>
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={3}
        sx={{ height: '100%' }}
      >
        {/* Home Team Squad */}
        <StyledCard>
          <StyledCardHeader
            title={
              <Stack direction="row" spacing={2} alignItems="center">
                <TeamAvatar 
                  src={homeTeam.logo} 
                  alt={homeTeam.name}
                />
                <Box>
                  <TeamName variant="h5">
                    {homeTeam.name}
                  </TeamName>
                  <TeamSubtitle variant="body2">
                    Full Squad ({homeSquad.length} Players)
                  </TeamSubtitle>
                </Box>
              </Stack>
            }
          />
          <StyledCardContent>
            <Stack spacing={2}>
              {homeSquad.map((player) => (
                <PlayerRowComponent key={player.number} player={player} />
              ))}
            </Stack>
          </StyledCardContent>
        </StyledCard>

        {/* Away Team Squad */}
        <StyledCard>
          <StyledCardHeader
            title={
              <Stack direction="row" spacing={2} alignItems="center">
                <TeamAvatar 
                  src={awayTeam.logo} 
                  alt={awayTeam.name}
                  sx={{ border: `3px solid ${alpha(themeColors.error, 0.3)}` }}
                />
                <Box>
                  <TeamName variant="h5">
                    {awayTeam.name}
                  </TeamName>
                  <TeamSubtitle variant="body2">
                    Full Squad ({awaySquad.length} Players)
                  </TeamSubtitle>
                </Box>
              </Stack>
            }
            sx={{ 
              background: `linear-gradient(135deg, ${themeColors.secondary} 0%, ${alpha(themeColors.error, 0.2)} 100%)`
            }}
          />
          <StyledCardContent>
            <Stack spacing={2}>
              {awaySquad.map((player) => (
                <PlayerRowComponent key={player.number} player={player} />
              ))}
            </Stack>
          </StyledCardContent>
        </StyledCard>
      </Stack>
    </Container>
  );
};

export default Squads;
