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
import { themeColors, commonStyles } from '@/config/theme';
import PersonIcon from '@mui/icons-material/Person';
import { SquadsProps } from '@/types/match-details';
import {
  squadsPlayerRowStyles,
  squadsPlayerContentStyles,
  squadsPlayerAvatarStyles,
  squadsPlayerInfoStyles,
  squadsPlayerNameStyles,
  squadsPlayerDetailsStyles,
  squadsPlayerRoleStyles,
  squadsPlayerNumberStyles,
  squadsPlayerStatsStyles,
  squadsPlayerStatItemStyles
} from '@/styles/matchDetails.styles';

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

const PlayerRow: React.FC<{ player: Player; isRight?: boolean }> = ({ player, isRight = false }) => {
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
    <Box sx={squadsPlayerRowStyles}>
      <Box sx={squadsPlayerContentStyles}>
        <Avatar 
          src={player.avatar} 
          alt={player.name}
          sx={squadsPlayerAvatarStyles}
        >
          <PersonIcon />
        </Avatar>
        
        <Box sx={squadsPlayerInfoStyles}>
          <Typography sx={squadsPlayerNameStyles}>
            {player.name}
          </Typography>
          
          <Box sx={squadsPlayerDetailsStyles}>
            <Typography sx={squadsPlayerRoleStyles}>
              {getPlayerTitle()}
            </Typography>
            <Typography sx={squadsPlayerNumberStyles}>
              #{player.number}
            </Typography>
            
            {/* Role badges */}
            {player.isCaptain && (
              <Chip 
                label="C" 
                size="small" 
                sx={{ 
                  height: 16, 
                  fontSize: '0.6rem',
                  bgcolor: 'rgba(59, 130, 246, 0.2)',
                  color: 'rgba(59, 130, 246, 0.8)'
                }} 
              />
            )}
            {player.isWicketKeeper && (
              <Chip 
                label="WK" 
                size="small" 
                sx={{ 
                  height: 16, 
                  fontSize: '0.6rem',
                  bgcolor: 'rgba(16, 185, 129, 0.2)',
                  color: 'rgba(16, 185, 129, 0.8)'
                }} 
              />
            )}
          </Box>
        </Box>
        
        {/* Player Stats */}
        <Box sx={squadsPlayerStatsStyles}>
          {player.stats?.runs !== undefined && (
            <Typography sx={squadsPlayerStatItemStyles}>
              {player.stats.runs} runs
            </Typography>
          )}
          {player.stats?.wickets !== undefined && (
            <Typography sx={squadsPlayerStatItemStyles}>
              {player.stats.wickets} wkts
            </Typography>
          )}
          {player.stats?.goals !== undefined && (
            <Typography sx={squadsPlayerStatItemStyles}>
              {player.stats.goals} goals
            </Typography>
          )}
          {player.stats?.rating !== undefined && (
            <Typography sx={squadsPlayerStatItemStyles}>
              {player.stats.rating.toFixed(1)} rating
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
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
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={3}
        sx={{ height: '100%' }}
      >
        {/* Home Team Squad */}
        <Card sx={{ 
          ...commonStyles.card,
          flex: 1,
          minHeight: { xs: 'auto', md: '600px' }
        }}>
          <CardHeader
            title={
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar 
                  src={homeTeam.logo} 
                  alt={homeTeam.name}
                  sx={{ 
                    width: 48, 
                    height: 48,
                    border: `3px solid ${alpha(themeColors.primary, 0.3)}`
                  }}
                />
                <Box>
                  <Typography variant="h5" sx={{ 
                    color: themeColors.text.primary,
                    fontWeight: 700,
                    letterSpacing: '0.5px'
                  }}>
                    {homeTeam.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                    Full Squad ({homeSquad.length} Players)
                  </Typography>
                </Box>
              </Stack>
            }
            sx={{ 
              ...commonStyles.cardHeader,
              background: `linear-gradient(135deg, ${themeColors.secondary} 0%, ${alpha(themeColors.primary, 0.2)} 100%)`
            }}
          />
          <CardContent sx={{ 
            height: { xs: 'auto', md: 'calc(100% - 80px)' },
            overflowY: 'auto'
          }}>
            <Stack spacing={2}>
              {homeSquad.map((player) => (
                <PlayerRow key={player.number} player={player} />
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Away Team Squad */}
        <Card sx={{ 
          ...commonStyles.card,
          flex: 1,
          minHeight: { xs: 'auto', md: '600px' }
        }}>
          <CardHeader
            title={
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar 
                  src={awayTeam.logo} 
                  alt={awayTeam.name}
                  sx={{ 
                    width: 48, 
                    height: 48,
                    border: `3px solid ${alpha(themeColors.error, 0.3)}`
                  }}
                />
                <Box>
                  <Typography variant="h5" sx={{ 
                    color: themeColors.text.primary,
                    fontWeight: 700,
                    letterSpacing: '0.5px'
                  }}>
                    {awayTeam.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                    Full Squad ({awaySquad.length} Players)
                  </Typography>
                </Box>
              </Stack>
            }
            sx={{ 
              ...commonStyles.cardHeader,
              background: `linear-gradient(135deg, ${themeColors.secondary} 0%, ${alpha(themeColors.error, 0.2)} 100%)`
            }}
          />
          <CardContent sx={{ 
            height: { xs: 'auto', md: 'calc(100% - 80px)' },
            overflowY: 'auto'
          }}>
            <Stack spacing={2}>
              {awaySquad.map((player) => (
                <PlayerRow key={player.number} player={player} />
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default Squads;
