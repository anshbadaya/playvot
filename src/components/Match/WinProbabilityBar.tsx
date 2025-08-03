import React from 'react';
import { Box, Typography } from "@mui/material";
import { MatchData } from '../../types/match-details';

interface WinProbabilityBarProps {
  data: MatchData;
}

const WinProbabilityBar: React.FC<WinProbabilityBarProps> = ({ data }) => {
  // Calculate total percentage (home + away + draw)
  const totalPercentage = data.winProbability.home + data.winProbability.away + (data.bettingOdds.draw > 0 ? 100 - data.winProbability.home - data.winProbability.away : 0);
  
  // Calculate draw percentage if it exists
  const drawPercentage = data.bettingOdds.draw > 0 ? 100 - data.winProbability.home - data.winProbability.away : 0;
  
  // Calculate relative percentages for the progress bars
  const homeWidth = (data.winProbability.home / totalPercentage) * 100;
  const drawWidth = (drawPercentage / totalPercentage) * 100;
  const awayWidth = (data.winProbability.away / totalPercentage) * 100;

  return (
    <Box sx={{ mt: 1 }}>
      {/* Live win probability section */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'rgba(15, 23, 42, 0.3)',
        borderRadius: 2,
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}>
        
        {/* Team names and percentages */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" sx={{ color: '#3B82F6' }}>
            {data.teams.home.name}
            <Typography component="span" sx={{ ml: 1, color: '#3B82F6', fontWeight: 'bold' }}>
              {data.winProbability.home}%
            </Typography>
          </Typography>
          
          {drawPercentage > 0 && (
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Draw
              <Typography component="span" sx={{ ml: 1, color: 'gray', fontWeight: 'bold' }}>
                {drawPercentage}%
              </Typography>
            </Typography>
          )}
          
          <Typography variant="body2" sx={{ color: '#3B82F6', textAlign: 'right' }}>
            {data.teams.away.name}
            <Typography component="span" sx={{ ml: 1, color: '#3B82F6', fontWeight: 'bold' }}>
              {data.winProbability.away}%
            </Typography>
          </Typography>
        </Box>
        
        {/* Progress bar */}
        <Box sx={{ 
          display: 'flex', 
          height: 6, 
          borderRadius: 3, 
          overflow: 'hidden',
          bgcolor: 'rgba(15, 23, 42, 0.5)'
        }}>
          <Box sx={{ 
            width: `${homeWidth}%`, 
            bgcolor: '#3B82F6', 
            height: '100%' 
          }} />
          
          {drawPercentage > 0 && (
            <Box sx={{ 
              width: `${drawWidth}%`, 
              bgcolor: '#6B7280', 
              height: '100%' 
            }} />
          )}
          
          <Box sx={{ 
            width: `${awayWidth}%`, 
            bgcolor: '#3B82F6', 
            height: '100%' 
          }} />
        </Box>
      </Box>
    </Box>
  );
};

export default WinProbabilityBar;