import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { formatScore } from '@/utils';
import { BoxingMatchCardProps } from '@/types/match';

const MatchCardContainer = styled(Box)`
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
  
  &:hover .shine {
    transform: translateX(100%);
  }
`;

const ShineEffect = styled(Box)`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: transform 0.6s ease;
  z-index: 1;
  pointer-events: none;
`;

const StyledCard = styled(Card)`
  background: linear-gradient(135deg, rgba(13, 20, 36, 0.9) 0%, rgba(23, 32, 48, 0.95) 100%);
  border: 1px solid rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  height: 100%;
  
  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
`;

const CardContentStyled = styled(CardContent)`
  padding: ${({ theme }) => theme.spacing(3)};
  position: relative;
  z-index: 2;
`;

const MatchTypeText = styled(Typography)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const MatchTitleText = styled(Typography)`
  color: rgba(255, 255, 255, 1);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

const TeamsSection = styled(Box)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const TeamRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(1, 0)};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PlayerInfoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PlayerNameText = styled(Typography)`
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.1rem;
  font-weight: 700;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
`;

const TeamText = styled(Typography)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

const OddsText = styled(Typography)`
  color: #10B981;
  font-size: 1rem;
  font-weight: 700;
  padding: ${({ theme }) => theme.spacing(0.8, 1.5)};
  background: rgba(16, 185, 129, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(16, 185, 129, 0.3);
  min-width: 70px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(16, 185, 129, 0.15);
    transform: scale(1.05);
  }
`;

const WeightCategoryChip = styled(Chip)`
  background-color: rgba(59, 130, 246, 0.15);
  color: #3B82F6;
  border: 1px solid rgba(59, 130, 246, 0.3);
  font-size: 0.75rem;
  font-weight: 600;
  height: 28px;
  margin-top: ${({ theme }) => theme.spacing(1.5)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
`;

const FixtureHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1.2, 2)};
  background-color: rgba(30, 41, 59, 0.8);
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const FixtureText = styled(Typography)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const DateText = styled(Typography)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MatchCard: React.FC<BoxingMatchCardProps> = (props) => {
  const navigate = useNavigate();
  const { fixture_no, match_date, match, isLive } = props;
  const { match_no, player_a, player_b, pre_match_odds, live_match_odds, weight_category } = match;
  
  // Use live odds if available and match is live, otherwise fall back to pre-match odds
  const oddsToDisplay = (live_match_odds && isLive) ? live_match_odds : pre_match_odds;
  
  // Generate a slug for navigation
  const slug = `boxing-${match_no}-${player_a.name.toLowerCase().replace(/\s+/g, '-')}-vs-${player_b.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  const handleClick = () => {
    navigate(`/match/${slug}`);
  };
  
  return (
    <MatchCardContainer>
      <ShineEffect className="shine" />
      
      <Box sx={{ borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
        <FixtureHeader>
          <FixtureText>Fixture #{fixture_no}</FixtureText>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isLive && (
              <Box sx={{ 
                px: 1, 
                py: 0.3, 
                bgcolor: 'error.main', 
                color: 'white', 
                borderRadius: 0.5, 
                fontSize: '0.7rem',
                fontWeight: 'bold',
                animation: 'pulse 2s infinite'
              }}>
                LIVE
              </Box>
            )}
            <DateText>
              {new Date(match_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </DateText>
          </Box>
        </FixtureHeader>
        
        <StyledCard>
          <CardContentStyled>
            <MatchTypeText>
              Match #{match_no}
            </MatchTypeText>
            
            <MatchTitleText>
              {player_a.name} vs {player_b.name}
            </MatchTitleText>
            
            <Divider sx={{ my: 1.8, opacity: 0.2 }} />
            
            <TeamsSection>
              <TeamRow>
                <PlayerInfoContainer>
                  <PlayerNameText>{player_a.name}</PlayerNameText>
                  <TeamText>{player_a.team}</TeamText>
                </PlayerInfoContainer>
                <OddsText>{formatScore(oddsToDisplay.a, 'boxing')}</OddsText>
              </TeamRow>
              
              <Divider sx={{ my: 1.5, opacity: 0.1 }} />
              
              <TeamRow>
                <PlayerInfoContainer>
                  <PlayerNameText>{player_b.name}</PlayerNameText>
                  <TeamText>{player_b.team}</TeamText>
                </PlayerInfoContainer>
                <OddsText>{formatScore(oddsToDisplay.b, 'boxing')}</OddsText>
              </TeamRow>
            </TeamsSection>
            
            <WeightCategoryChip label={weight_category} />
          </CardContentStyled>
        </StyledCard>
      </Box>
    </MatchCardContainer>
  );
};

export default MatchCard;