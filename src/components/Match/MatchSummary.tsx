import React from 'react';
import { Box, Typography } from "@mui/material";
import { MatchData } from '../../types/match-details';
import { themeColors } from './styles/theme-constants';

interface MatchSummaryProps {
  data: MatchData;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({ data }) => {
  // Find the top 2 batsmen based on runs
  const topBatsmen = [...data.players.home, ...data.players.away]
    .filter(player => player.stats?.runs)
    .sort((a, b) => (b.stats?.runs || 0) - (a.stats?.runs || 0))
    .slice(0, 2);

  // Find the top 2 bowlers based on wickets and economy
  const topBowlers = [...data.players.home, ...data.players.away]
    .filter(player => player.stats?.wickets)
    .sort((a, b) => {
      if ((b.stats?.wickets || 0) !== (a.stats?.wickets || 0)) {
        return (b.stats?.wickets || 0) - (a.stats?.wickets || 0);
      }
      return (a.stats?.economy || 999) - (b.stats?.economy || 999);
    })
    .slice(0, 2);

  return (
    <Box sx={{ 
      mt: 2,
      p: 2,
      bgcolor: 'rgba(15, 23, 42, 0.3)',
      borderRadius: 2,
      border: '1px solid rgba(59, 130, 246, 0.3)'
    }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="gray" sx={{ mb: 1 }}>
          Day 2, Lunch Break • New Zealand lead by 25 runs
        </Typography>
        
        {/* Score summary */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">
            {data.teams.home.name} 149
          </Typography>
          <Typography variant="body2">
            {data.teams.away.name} 174/3 (52)
          </Typography>
        </Box>
      </Box>

      {/* Top Batsmen */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Batting
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gap: { xs: 1, sm: 1.5 }, // Reduced vertical gap
          fontSize: '0.875rem',
          overflow: 'hidden'
        }}>
          {/* Scrollable Container */}
          <Box sx={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            width: '100%',
            '&::-webkit-scrollbar': { height: 4 }, // Reduced scrollbar height
            '&::-webkit-scrollbar-track': { bgcolor: 'rgba(0,0,0,0.1)' },
            '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }
          }}>
            {/* Stats Header */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 40px)', // Slightly reduced column width
              gap: { xs: 2, sm: 2.5 }, // Reduced horizontal gap
              justifyContent: 'end',
              borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
              pb: 0.5, // Reduced padding
              minWidth: 'min-content'
            }}>
              <Box sx={{ color: 'gray', textAlign: 'right' }}>R</Box>
              <Box sx={{ color: 'gray', textAlign: 'right' }}>B</Box>
              <Box sx={{ color: 'gray', textAlign: 'right' }}>4s</Box>
              <Box sx={{ color: 'gray', textAlign: 'right' }}>6s</Box>
              <Box sx={{ color: 'gray', textAlign: 'right' }}>SR</Box>
            </Box>
            
            {/* Batsmen List */}
            {topBatsmen.map((player, index) => (
              <Box key={index} sx={{
                display: 'grid',
                gap: 0.5, // Reduced gap between name and stats
                borderBottom: index !== topBatsmen.length - 1 ? '1px solid rgba(59, 130, 246, 0.1)' : 'none',
                pb: 1 // Reduced bottom padding
              }}>
                {/* Player Name */}
                <Box sx={{ 
                  fontWeight: player.isWicketKeeper || player.isCaptain ? 'bold' : 'normal',
                  color: themeColors.text.primary,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  mb: 0.25 // Small margin bottom
                }}>
                  {player.name} {player.isWicketKeeper ? '†' : ''} {player.isCaptain ? '(c)' : ''}
                </Box>
                
                {/* Stats Row */}
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 40px)', // Slightly reduced column width
                  gap: { xs: 2, sm: 2.5 }, // Reduced horizontal gap
                  justifyContent: 'end',
                  minWidth: 'min-content'
                }}>
                  <Box sx={{ textAlign: 'right' }}>{player.stats?.runs}</Box>
                  <Box sx={{ textAlign: 'right' }}>{player.stats?.balls}</Box>
                  <Box sx={{ textAlign: 'right' }}>{player.stats?.fours}</Box>
                  <Box sx={{ textAlign: 'right' }}>{player.stats?.sixes}</Box>
                  <Box sx={{ textAlign: 'right' }}>{player.stats?.strikeRate?.toFixed(2)}</Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Top Bowlers */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Bowling
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gap: { xs: 1, sm: 1.5 }, // Reduced vertical gap
          fontSize: '0.875rem',
          overflow: 'hidden'
        }}>
          {/* Scrollable Container */}
          <Box sx={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            width: '100%',
            '&::-webkit-scrollbar': { height: 4 }, // Reduced scrollbar height
            '&::-webkit-scrollbar-track': { bgcolor: 'rgba(0,0,0,0.1)' },
            '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }
          }}>
            {/* Stats Header */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 40px)', // Slightly reduced column width
              gap: { xs: 2, sm: 2.5 }, // Reduced horizontal gap
              justifyContent: 'end',
              borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
              pb: 0.5, // Reduced padding
              minWidth: 'min-content'
            }}>
              <Box sx={{ color: 'gray', textAlign: 'right' }}>O</Box>
              <Box sx={{ color: 'gray', textAlign: 'right' }}>M</Box>
              <Box sx={{ color: 'gray', textAlign: 'right' }}>R</Box>
              <Box sx={{ color: 'gray', textAlign: 'right' }}>W</Box>
              <Box sx={{ color: 'gray', textAlign: 'right' }}>ECON</Box>
            </Box>
            
            {/* Bowlers List */}
            {topBowlers.map((player, index) => (
              <Box key={index} sx={{
                display: 'grid',
                gap: 0.5, // Reduced gap between name and stats
                borderBottom: index !== topBowlers.length - 1 ? '1px solid rgba(59, 130, 246, 0.1)' : 'none',
                pb: 1 // Reduced bottom padding
              }}>
                {/* Bowler Name */}
                <Box sx={{ 
                  fontWeight: player.isCaptain ? 'bold' : 'normal',
                  color: themeColors.text.primary,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  mb: 0.25 // Small margin bottom
                }}>
                  {player.name} {player.isCaptain ? '(c)' : ''}
                </Box>
                
                {/* Stats Row */}
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 40px)', // Slightly reduced column width
                  gap: { xs: 2, sm: 2.5 }, // Reduced horizontal gap
                  justifyContent: 'end',
                  minWidth: 'min-content'
                }}>
                  <Box sx={{ textAlign: 'right' }}>{player.stats?.overs}</Box>
                  <Box sx={{ textAlign: 'right' }}>{player.stats?.maidens}</Box>
                  <Box sx={{ textAlign: 'right' }}>{player.stats?.runs}</Box>
                  <Box sx={{ textAlign: 'right' }}>{player.stats?.wickets}</Box>
                  <Box sx={{ textAlign: 'right' }}>{player.stats?.economy?.toFixed(2)}</Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchSummary;