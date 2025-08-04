import React from 'react';
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MatchSummaryProps } from '@/types/match-details';
import { themeColors } from '@/config/theme';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Header = styled(Box)`
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const Subtitle = styled(Typography)`
  color: gray;
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const ScoreRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Section = styled(Box)`
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const SectionTitle = styled(Typography)`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
`;

const StatsGrid = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const ScrollContainer = styled(Box)`
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.3);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.5);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(59, 130, 246, 0.7);
  }
`;

const StatsHeader = styled(Box)`
  display: grid;
  grid-template-columns: 1fr repeat(5, 40px);
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1, 0)};
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  min-width: min-content;
`;

const HeaderCell = styled(Box)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PlayerRow = styled(Box)`
  display: grid;
  grid-template-columns: 1fr repeat(5, 40px);
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1, 0)};
  align-items: center;
  min-width: min-content;
`;

const PlayerName = styled(Box)<{ $isSpecial?: boolean }>`
  color: ${themeColors.text.primary};
  font-weight: ${({ $isSpecial }) => $isSpecial ? '700' : '500'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: ${({ theme }) => theme.spacing(0.25)};
`;

const StatsCell = styled(Box)`
  text-align: right;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
`;

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
    <Container>
      <Header>
        <Subtitle variant="subtitle2">
          Day 2, Lunch Break • New Zealand lead by 25 runs
        </Subtitle>
        
        {/* Score summary */}
        <ScoreRow>
          <Typography variant="body2">
            {data.teams.home.name} 149
          </Typography>
          <Typography variant="body2">
            {data.teams.away.name} 174/3 (52)
          </Typography>
        </ScoreRow>
      </Header>

      {/* Top Batsmen */}
      <Section>
        <SectionTitle variant="subtitle2">
          Batting
        </SectionTitle>
        <StatsGrid>
          {/* Scrollable Container */}
          <ScrollContainer>
            {/* Stats Header */}
            <StatsHeader>
              <Box />
              <HeaderCell>R</HeaderCell>
              <HeaderCell>B</HeaderCell>
              <HeaderCell>4s</HeaderCell>
              <HeaderCell>6s</HeaderCell>
              <HeaderCell>SR</HeaderCell>
            </StatsHeader>
            
            {/* Batsmen List */}
            {topBatsmen.map((player, index) => (
              <PlayerRow key={index} sx={{
                borderBottom: index !== topBatsmen.length - 1 ? '1px solid rgba(59, 130, 246, 0.1)' : 'none'
              }}>
                {/* Player Name */}
                <PlayerName $isSpecial={Boolean(player.isWicketKeeper || player.isCaptain)}>
                  {player.name} {player.isWicketKeeper ? '†' : ''} {player.isCaptain ? '(c)' : ''}
                </PlayerName>
                
                {/* Stats Row */}
                <StatsCell>{player.stats?.runs}</StatsCell>
                <StatsCell>{player.stats?.balls}</StatsCell>
                <StatsCell>{player.stats?.fours}</StatsCell>
                <StatsCell>{player.stats?.sixes}</StatsCell>
                <StatsCell>{player.stats?.strikeRate?.toFixed(2)}</StatsCell>
              </PlayerRow>
            ))}
          </ScrollContainer>
        </StatsGrid>
      </Section>

      {/* Top Bowlers */}
      <Section>
        <SectionTitle variant="subtitle2">
          Bowling
        </SectionTitle>
        <StatsGrid>
          {/* Scrollable Container */}
          <ScrollContainer>
            {/* Stats Header */}
            <StatsHeader>
              <Box />
              <HeaderCell>O</HeaderCell>
              <HeaderCell>M</HeaderCell>
              <HeaderCell>R</HeaderCell>
              <HeaderCell>W</HeaderCell>
              <HeaderCell>ECON</HeaderCell>
            </StatsHeader>
            
            {/* Bowlers List */}
            {topBowlers.map((player, index) => (
              <PlayerRow key={index} sx={{
                borderBottom: index !== topBowlers.length - 1 ? '1px solid rgba(59, 130, 246, 0.1)' : 'none'
              }}>
                {/* Bowler Name */}
                <PlayerName $isSpecial={Boolean(player.isCaptain)}>
                  {player.name} {player.isCaptain ? '(c)' : ''}
                </PlayerName>
                
                {/* Stats Row */}
                <StatsCell>{player.stats?.overs}</StatsCell>
                <StatsCell>{player.stats?.maidens}</StatsCell>
                <StatsCell>{player.stats?.runs}</StatsCell>
                <StatsCell>{player.stats?.wickets}</StatsCell>
                <StatsCell>{player.stats?.economy?.toFixed(2)}</StatsCell>
              </PlayerRow>
            ))}
          </ScrollContainer>
        </StatsGrid>
      </Section>
    </Container>
  );
};

export default MatchSummary;