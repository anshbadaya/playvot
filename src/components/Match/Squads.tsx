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

interface Team {
  name: string;
  logo: string;
  score: number;
  stats: {
    possession: number;
    shots: number;
    shotsOnTarget: number;
    corners: number;
    fouls: number;
    wickets?: number;
  };
}

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

interface MatchData {
  teams: {
    home: Team;
    away: Team;
  };
  players: {
    home: Player[];
    away: Player[];
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
    <Box 
      sx={{ 
        p: 2, 
        bgcolor: alpha(themeColors.secondary, 0.3),
        borderRadius: 1,
        border: `1px solid ${themeColors.border}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: alpha(themeColors.secondary, 0.5),
          border: `1px solid ${alpha(themeColors.primary, 0.3)}`,
          transform: 'translateY(-1px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar 
          src={player.avatar} 
          alt={player.name}
          sx={{ 
            width: 40, 
            height: 40,
            border: `2px solid ${themeColors.border}`,
            bgcolor: alpha(themeColors.primary, 0.2)
          }}
        >
          <PersonIcon sx={{ color: themeColors.text.secondary }} />
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="body2" sx={{ 
              color: themeColors.text.primary,
              fontWeight: 600
            }}>
              {player.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {player.isCaptain && (
                <Chip 
                  label="C" 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(themeColors.warning, 0.2),
                    color: themeColors.warning,
                    fontSize: '0.6rem',
                    height: 18,
                    minWidth: 18
                  }} 
                />
              )}
              {player.isWicketKeeper && (
                <Chip 
                  label="WK" 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(themeColors.success, 0.2),
                    color: themeColors.success,
                    fontSize: '0.6rem',
                    height: 18,
                    minWidth: 18
                  }} 
                />
              )}
            </Box>
          </Box>
          <Typography variant="caption" sx={{ 
            color: themeColors.text.secondary,
            display: 'block',
            mb: 0.5
          }}>
            {player.position} • {getPlayerTitle()}
          </Typography>
          {player.stats && (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {player.stats.runs !== undefined && (
                <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>
                  Runs: {player.stats.runs}
                </Typography>
              )}
              {player.stats.wickets !== undefined && (
                <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>
                  Wickets: {player.stats.wickets}
                </Typography>
              )}
              {player.stats.strikeRate !== undefined && (
                <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>
                  SR: {player.stats.strikeRate}
                </Typography>
              )}
              {player.stats.economy !== undefined && (
                <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>
                  ECO: {player.stats.economy}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const Squads: React.FC<{ data: MatchData }> = ({ data }) => {
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
