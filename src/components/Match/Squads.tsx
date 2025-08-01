import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Avatar,
  Divider
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';

const themeColors = {
  primary: '#3B82F6',
  primaryLight: 'rgba(59, 130, 246, 0.1)',
  primaryBorder: 'rgba(59, 130, 246, 0.2)',
  secondary: '#1E293B',
  background: '#0F172A',
  surface: 'rgba(30, 41, 59, 0.4)',
  border: 'rgba(59, 130, 246, 0.15)',
  text: {
    primary: '#FFFFFF',
    secondary: '#94A3B8',
  }
};

const commonStyles = {
  card: {
    backgroundColor: themeColors.surface,
    borderRadius: '12px',
    border: `1px solid ${themeColors.border}`,
    backdropFilter: 'blur(8px)',
  },
  cardHeader: {
    backgroundColor: themeColors.secondary,
    borderBottom: `1px solid ${themeColors.border}`,
    padding: '16px',
    borderRadius: '12px 12px 0 0'
  },
};

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
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      flexDirection: isRight ? 'row-reverse' : 'row',
      mb: 1.5
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        flexDirection: isRight ? 'row-reverse' : 'row',
        gap: 1.5
      }}>
        <Avatar 
          src={player.avatar} 
          alt={player.name}
          sx={{ 
            width: 40, 
            height: 40,
            bgcolor: player.avatar ? 'transparent' : 'rgba(255, 255, 255, 0.1)'
          }}
        />
        <Box sx={{ textAlign: isRight ? 'right' : 'left' }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {player.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getPlayerTitle()}
          </Typography>
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
  
  // Split players into playing XI and bench
  const homePlayingXI = homePlayers.filter((p, i) => i < 11);
  const homeBench = homePlayers.filter((p, i) => i >= 11);
  const awayPlayingXI = awayPlayers.filter((p, i) => i < 11);
  const awayBench = awayPlayers.filter((p, i) => i >= 11);

  return (
    <Card sx={{ ...commonStyles.card }}>
      <CardHeader 
        title="Playing XI" 
        sx={{ 
          ...commonStyles.cardHeader,
          textAlign: 'center'
        }} 
      />
      <CardContent sx={{ p: 3 }}>
        {/* Team Flags */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
              component="img" 
              src={homeTeam.logo || "/teams/default.png"} 
              alt={homeTeam.name}
              sx={{ width: 24, height: 16, objectFit: 'contain' }}
            />
            <Typography variant="body2" fontWeight="bold">{homeTeam.name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">{awayTeam.name}</Typography>
            <Box 
              component="img" 
              src={awayTeam.logo || "/teams/default.png"} 
              alt={awayTeam.name}
              sx={{ width: 24, height: 16, objectFit: 'contain' }}
            />
          </Box>
        </Box>

        {/* Playing XI */}
        <Box sx={{ mb: 3 }}>
          {homePlayingXI.map((player, index) => (
            <Box key={player.number} sx={{ display: 'flex' }}>
              <Box sx={{ flex: 1 }}>
                <PlayerRow player={player} />
              </Box>
              <Box sx={{ width: '1px', bgcolor: 'rgba(255, 255, 255, 0.1)', mx: 2 }} />
              <Box sx={{ flex: 1 }}>
                {awayPlayingXI[index] && (
                  <PlayerRow player={awayPlayingXI[index]} isRight={true} />
                )}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bench Section */}
        {(homeBench.length > 0 || awayBench.length > 0) && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
              Bench
            </Typography>
            <Box>
              {homeBench.map((player, index) => (
                <Box key={player.number} sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <PlayerRow player={player} />
                  </Box>
                  <Box sx={{ width: '1px', bgcolor: 'rgba(255, 255, 255, 0.1)', mx: 2 }} />
                  <Box sx={{ flex: 1 }}>
                    {awayBench[index] && (
                      <PlayerRow player={awayBench[index]} isRight={true} />
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Squads;
