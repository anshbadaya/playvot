import { colors } from '@/utils/colors';
import React from 'react';
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { WinProbabilityBarProps } from '@/types/match-details';

const Container = styled(Box)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const CardContainer = styled(Box)`
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const TeamsRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
`;

const TeamText = styled(Typography)`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`;

const TeamPercentage = styled(Typography)`
  color: colors.success;
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`;

const DrawText = styled(Typography)`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 0.5;
`;

const DrawPercentage = styled(Typography)`
  color: colors.warning;
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`;

const ProgressContainer = styled(Box)`
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.5);
`;

const HomeBar = styled(Box)`
  background: linear-gradient(90deg, colors.success 0%, colors.successHover 100%);
  height: 100%;
  transition: width 0.3s ease;
`;

const DrawBar = styled(Box)`
  background: linear-gradient(90deg, colors.warning 0%, colors.warningHover 100%);
  height: 100%;
  transition: width 0.3s ease;
`;

const AwayBar = styled(Box)`
  background: linear-gradient(90deg, colors.primary 0%, colors.primaryHover 100%);
  height: 100%;
  transition: width 0.3s ease;
`;

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
    <Container>
      {/* Live win probability section */}
      <CardContainer>
        
        {/* Team names and percentages */}
        <TeamsRow>
          <TeamText variant="body2">
            {data.teams.home.name}
            <TeamPercentage as="span">
              {data.winProbability.home}%
            </TeamPercentage>
          </TeamText>
          
          {drawPercentage > 0 && (
            <DrawText variant="body2">
              Draw
              <DrawPercentage as="span">
                {drawPercentage}%
              </DrawPercentage>
            </DrawText>
          )}
          
          <TeamText variant="body2" sx={{ textAlign: 'right' }}>
            {data.teams.away.name}
            <TeamPercentage as="span">
              {data.winProbability.away}%
            </TeamPercentage>
          </TeamText>
        </TeamsRow>
        
        {/* Progress bar */}
        <ProgressContainer>
          <HomeBar sx={{ width: `${homeWidth}%` }} />
          
          {drawPercentage > 0 && (
            <DrawBar sx={{ width: `${drawWidth}%` }} />
          )}
          
          <AwayBar sx={{ width: `${awayWidth}%` }} />
        </ProgressContainer>
      </CardContainer>
    </Container>
  );
};

export default WinProbabilityBar;