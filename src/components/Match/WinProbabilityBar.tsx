import React from 'react';
import { Box, Typography } from "@mui/material";
import { WinProbabilityBarProps } from '@/types/match-details';
import {
  winProbabilityContainerStyles,
  winProbabilityCardStyles,
  winProbabilityTeamsRowStyles,
  winProbabilityTeamStyles,
  winProbabilityTeamPercentageStyles,
  winProbabilityDrawStyles,
  winProbabilityDrawPercentageStyles,
  winProbabilityProgressContainerStyles,
  winProbabilityHomeBarStyles,
  winProbabilityDrawBarStyles,
  winProbabilityAwayBarStyles
} from '@/styles/matchDetails.styles';

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
    <Box sx={winProbabilityContainerStyles}>
      {/* Live win probability section */}
      <Box sx={winProbabilityCardStyles}>
        
        {/* Team names and percentages */}
        <Box sx={winProbabilityTeamsRowStyles}>
          <Typography variant="body2" sx={winProbabilityTeamStyles}>
            {data.teams.home.name}
            <Typography component="span" sx={winProbabilityTeamPercentageStyles}>
              {data.winProbability.home}%
            </Typography>
          </Typography>
          
          {drawPercentage > 0 && (
            <Typography variant="body2" sx={winProbabilityDrawStyles}>
              Draw
              <Typography component="span" sx={winProbabilityDrawPercentageStyles}>
                {drawPercentage}%
              </Typography>
            </Typography>
          )}
          
          <Typography variant="body2" sx={{ ...winProbabilityTeamStyles, textAlign: 'right' }}>
            {data.teams.away.name}
            <Typography component="span" sx={winProbabilityTeamPercentageStyles}>
              {data.winProbability.away}%
            </Typography>
          </Typography>
        </Box>
        
        {/* Progress bar */}
        <Box sx={winProbabilityProgressContainerStyles}>
          <Box sx={{ ...winProbabilityHomeBarStyles, width: `${homeWidth}%` }} />
          
          {drawPercentage > 0 && (
            <Box sx={{ ...winProbabilityDrawBarStyles, width: `${drawWidth}%` }} />
          )}
          
          <Box sx={{ ...winProbabilityAwayBarStyles, width: `${awayWidth}%` }} />
        </Box>
      </Box>
    </Box>
  );
};

export default WinProbabilityBar;