import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { formatScore, SPORT_TYPES } from '@/utils';
import { MatchCardProps, TeamInfo } from '@/types/match';

const MatchCardContainer = styled(Box)`
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  
  &:hover {
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
`;

const CardContentStyled = styled(CardContent)`
  padding: ${({ theme }) => theme.spacing(2.5)};
  position: relative;
  z-index: 2;
`;

const MatchTypeText = styled(Typography)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const MatchTitleText = styled(Typography)`
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const TeamsSection = styled(Box)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const TeamRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TeamNameText = styled(Typography)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
`;

const MatchStatusText = styled(Typography)`
  color: #10B981;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(0.5, 1)};
  background: rgba(16, 185, 129, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

const MatchCard: React.FC<MatchCardProps> = ({
  matchType,
  matchTitle,
  team1,
  team2,
  status,
  isLive = false,
  sportType,
  slug
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/match/${slug}`);
  };

  // Function to format score based on sport type
  const getFormattedScore = (team: TeamInfo, sport: string) => {
    switch (sport) {
      case SPORT_TYPES.CRICKET:
        return formatScore(team.score, sport) + (team.overs ? ` (${team.overs})` : '');
      case SPORT_TYPES.FOOTBALL:
        return formatScore(team.goals, sport);
      case SPORT_TYPES.KABADDI:
      case SPORT_TYPES.VOLLEYBALL:
        return formatScore(team.points, sport);
      default:
        return formatScore(team.score, sport);
    }
  };

  return (
    <MatchCardContainer onClick={handleClick}>
      <ShineEffect className="shine" />
      
      <StyledCard>
        <CardContentStyled>
          <MatchTypeText>
            {matchType}
          </MatchTypeText>

          <MatchTitleText>
            {matchTitle}
          </MatchTitleText>

          <TeamsSection>
            <TeamRow>
              <TeamNameText>
                {team1.name}
              </TeamNameText>
              <TeamNameText>
                {getFormattedScore(team1, sportType)}
              </TeamNameText>
            </TeamRow>

            <TeamRow>
              <TeamNameText>
                {team2.name}
              </TeamNameText>
              <TeamNameText>
                {getFormattedScore(team2, sportType)}
              </TeamNameText>
            </TeamRow>
          </TeamsSection>

          <MatchStatusText>
            {status}
          </MatchStatusText>
        </CardContentStyled>
      </StyledCard>
    </MatchCardContainer>
  );
};

export default MatchCard; 