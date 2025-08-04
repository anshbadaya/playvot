import React from 'react';
import { Box, Typography } from "@mui/material";
import { MatchSummaryProps } from '@/types/match-details';
import { themeColors } from '@/config/theme';
import {
  matchSummaryContainerStyles,
  matchSummaryHeaderStyles,
  matchSummarySubtitleStyles,
  matchSummaryScoreRowStyles,
  matchSummarySectionStyles,
  matchSummarySectionTitleStyles,
  matchSummaryStatsGridStyles,
  matchSummaryScrollContainerStyles,
  matchSummaryStatsHeaderStyles,
  matchSummaryStatsHeaderCellStyles,
  matchSummaryPlayerRowStyles,
  matchSummaryPlayerNameStyles
} from '@/styles/matchDetails.styles';

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
    <Box sx={matchSummaryContainerStyles}>
      <Box sx={matchSummaryHeaderStyles}>
        <Typography variant="subtitle2" color="gray" sx={matchSummarySubtitleStyles}>
          Day 2, Lunch Break • New Zealand lead by 25 runs
        </Typography>
        
        {/* Score summary */}
        <Box sx={matchSummaryScoreRowStyles}>
          <Typography variant="body2">
            {data.teams.home.name} 149
          </Typography>
          <Typography variant="body2">
            {data.teams.away.name} 174/3 (52)
          </Typography>
        </Box>
      </Box>

      {/* Top Batsmen */}
      <Box sx={matchSummarySectionStyles}>
        <Typography variant="subtitle2" sx={matchSummarySectionTitleStyles}>
          Batting
        </Typography>
        <Box sx={matchSummaryStatsGridStyles}>
          {/* Scrollable Container */}
          <Box sx={matchSummaryScrollContainerStyles}>
            {/* Stats Header */}
            <Box sx={matchSummaryStatsHeaderStyles}>
              <Box sx={matchSummaryStatsHeaderCellStyles}>R</Box>
              <Box sx={matchSummaryStatsHeaderCellStyles}>B</Box>
              <Box sx={matchSummaryStatsHeaderCellStyles}>4s</Box>
              <Box sx={matchSummaryStatsHeaderCellStyles}>6s</Box>
              <Box sx={matchSummaryStatsHeaderCellStyles}>SR</Box>
            </Box>
            
            {/* Batsmen List */}
            {topBatsmen.map((player, index) => (
              <Box key={index} sx={{
                ...matchSummaryPlayerRowStyles,
                borderBottom: index !== topBatsmen.length - 1 ? '1px solid rgba(59, 130, 246, 0.1)' : 'none'
              }}>
                {/* Player Name */}
                <Box sx={{ 
                  ...matchSummaryPlayerNameStyles(Boolean(player.isWicketKeeper || player.isCaptain)),
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
      <Box sx={matchSummarySectionStyles}>
        <Typography variant="subtitle2" sx={matchSummarySectionTitleStyles}>
          Bowling
        </Typography>
        <Box sx={matchSummaryStatsGridStyles}>
          {/* Scrollable Container */}
          <Box sx={matchSummaryScrollContainerStyles}>
            {/* Stats Header */}
            <Box sx={matchSummaryStatsHeaderStyles}>
              <Box sx={matchSummaryStatsHeaderCellStyles}>O</Box>
              <Box sx={matchSummaryStatsHeaderCellStyles}>M</Box>
              <Box sx={matchSummaryStatsHeaderCellStyles}>R</Box>
              <Box sx={matchSummaryStatsHeaderCellStyles}>W</Box>
              <Box sx={matchSummaryStatsHeaderCellStyles}>ECON</Box>
            </Box>
            
            {/* Bowlers List */}
            {topBowlers.map((player, index) => (
              <Box key={index} sx={{
                ...matchSummaryPlayerRowStyles,
                borderBottom: index !== topBowlers.length - 1 ? '1px solid rgba(59, 130, 246, 0.1)' : 'none'
              }}>
                {/* Bowler Name */}
                                  <Box sx={{ 
                    ...matchSummaryPlayerNameStyles(Boolean(player.isCaptain)),
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