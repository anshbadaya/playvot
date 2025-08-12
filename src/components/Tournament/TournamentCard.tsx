import { colors } from '@/utils/colors';
import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Tournament } from '@/types/tournament';
import { CalendarToday, LocationOn, SportsSoccer, Event } from '@mui/icons-material';

const TournamentCardContainer = styled(Box)`
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 20px;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
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
    rgba(255, 255, 255, 0.15),
    transparent
  );
  transition: transform 0.8s ease;
  z-index: 1;
  pointer-events: none;
`;

const StyledCard = styled(Card)`
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 100%);
  border: 2px solid rgba(59, 130, 246, 0.4);
  backdrop-filter: blur(15px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
  height: 100%;
  
  &:hover {
    border-color: rgba(59, 130, 246, 0.7);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  }
`;

const CardContentStyled = styled(CardContent)`
  padding: 28px;
  position: relative;
  z-index: 2;
`;

const TournamentHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const StatusChip = styled(Chip)<{ status: string }>`
  background-color: ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return 'rgba(59, 130, 246, 0.2)';
      case 'ongoing':
        return 'rgba(16, 185, 129, 0.2)';
      case 'completed':
        return 'rgba(107, 114, 128, 0.2)';
      default:
        return 'rgba(59, 130, 246, 0.2)';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return 'colors.primary';
      case 'ongoing':
        return 'colors.success';
      case 'completed':
        return 'colors.text.muted';
      default:
        return 'colors.primary';
    }
  }};
  border: 1px solid ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return 'rgba(59, 130, 246, 0.4)';
      case 'ongoing':
        return 'rgba(16, 185, 129, 0.4)';
      case 'completed':
        return 'rgba(107, 114, 128, 0.4)';
      default:
        return 'rgba(59, 130, 246, 0.4)';
    }
  }};
  font-size: 0.75rem;
  font-weight: 700;
  height: 32px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TournamentTitle = styled(Typography)`
  color: rgba(255, 255, 255, 1);
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 16px;
  text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const InfoSection = styled(Box)`
  margin-bottom: 20px;
`;

const InfoRow = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  margin-right: 16px;
  color: colors.primary;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InfoContent = styled(Box)`
  flex: 1;
`;

const InfoLabel = styled(Typography)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 2px;
`;

const InfoValue = styled(Typography)`
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  font-weight: 700;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
`;



const ActionButtons = styled(Box)`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const ActionButton = styled(Button)`
  flex: 1;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  &.primary {
    background: linear-gradient(135deg, colors.primary 0%, colors.primaryDark 100%);
    color: white;
    border: 1px solid rgba(59, 130, 246, 0.5);
    
    &:hover {
      background: linear-gradient(135deg, colors.primaryHover 0%, colors.primaryHover 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
    }
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
  }
`;

const SportIcon = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%);
  border: 2px solid rgba(59, 130, 246, 0.4);
  color: colors.primary;
  font-size: 1.5rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
`;

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  const navigate = useNavigate();
  
  const handleViewFixtures = () => {
    navigate(`/tournaments/${tournament.slug}`);
  };
  
  const handleViewEventData = () => {
    navigate(`/tournament/${tournament.slug}/event-data`);
  };
  
  const getSportIcon = (sportType: string) => {
    switch (sportType) {
      case 'cricket':
        return '🏏';
      case 'kabaddi':
        return '🤼';
      case 'football':
        return '⚽';
      case 'basketball':
        return '🏀';
      case 'volleyball':
        return '🏐';
      case 'table-tennis':
        return '🏓';
      default:
        return '🏆';
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <TournamentCardContainer>
      <ShineEffect className="shine" />
      
      <StyledCard>
        <CardContentStyled>
          <TournamentHeader>
            <SportIcon>
              {getSportIcon(tournament.sportType)}
            </SportIcon>
            <StatusChip 
              label={tournament.status} 
              status={tournament.status}
              size="small"
            />
          </TournamentHeader>
          
          <TournamentTitle>
            {tournament.name}
          </TournamentTitle>
          
          <InfoSection>
            <InfoRow>
              <InfoIcon>
                <CalendarToday sx={{ fontSize: '1.2rem' }} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Date</InfoLabel>
                <InfoValue>{formatDate(tournament.date)}</InfoValue>
              </InfoContent>
            </InfoRow>
            
            <InfoRow>
              <InfoIcon>
                <LocationOn sx={{ fontSize: '1.2rem' }} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Location</InfoLabel>
                <InfoValue>{tournament.city}, {tournament.country}</InfoValue>
              </InfoContent>
            </InfoRow>
            
            {tournament.venue && (
              <InfoRow>
                <InfoIcon>
                  <Event sx={{ fontSize: '1.2rem' }} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Venue</InfoLabel>
                  <InfoValue>{tournament.venue}</InfoValue>
                </InfoContent>
              </InfoRow>
            )}
          </InfoSection>
          

          
          <ActionButtons>
            <ActionButton
              className="primary"
              onClick={handleViewFixtures}
              startIcon={<Event />}
            >
              Full Fixtures
            </ActionButton>
            <ActionButton
              className="secondary"
              onClick={handleViewEventData}
              startIcon={<SportsSoccer />}
            >
              Event Data
            </ActionButton>
          </ActionButtons>
        </CardContentStyled>
      </StyledCard>
    </TournamentCardContainer>
  );
};

export default TournamentCard;
