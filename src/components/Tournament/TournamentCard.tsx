import { colors, colorUtils, gradients } from '@/utils/colors';
import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Tournament } from '@/types/tournament';
import { CalendarToday, LocationOn, SportsSoccer, Event, FormatListNumbered } from '@mui/icons-material';

const TournamentCardContainer = styled(Box)`
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 16px;
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
  background: linear-gradient(135deg, rgba(13, 20, 36, 0.9) 0%, rgba(23, 32, 48, 0.95) 100%);
  border: 1px solid ${colors.primaryBorder};
  backdrop-filter: blur(14px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  position: relative;
  z-index: 2;
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: ${gradients.primaryToSecondary};
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    opacity: 0.35;
    pointer-events: none;
  }

  &:hover {
    border-color: ${colors.primaryBorder};
    box-shadow: 0 22px 56px rgba(0, 0, 0, 0.55);
    transform: translateY(-4px);
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
  background: ${({ status }) =>
    status === 'ongoing'
      ? `linear-gradient(135deg, ${colorUtils.withOpacity(colors.success, 0.25)} 0%, ${colorUtils.withOpacity(colors.primary, 0.2)} 100%)`
      : status === 'upcoming'
      ? `linear-gradient(135deg, ${colorUtils.withOpacity(colors.primary, 0.25)} 0%, ${colorUtils.withOpacity(colors.secondary, 0.2)} 100%)`
      : colorUtils.withOpacity(colors.text.muted, 0.15)};
  color: ${colors.text.primary};
  border: 1px solid
    ${({ status }) =>
      status === 'ongoing'
        ? colors.successBorder
        : status === 'upcoming'
        ? colors.primaryBorder
        : 'rgba(148, 163, 184, 0.4)'};
  font-size: 0.7rem;
  font-weight: 800;
  height: 30px;
  text-transform: uppercase;
  letter-spacing: 0.9px;
  box-shadow: 0 6px 14px ${colors.shadows.primary};
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
  background: radial-gradient(circle at 30% 30%, ${colorUtils.withOpacity(colors.primary, 0.18)} 0%, ${colorUtils.withOpacity(colors.secondary, 0.12)} 100%);
  border: 1px solid ${colorUtils.withOpacity(colors.primary, 0.35)};
  margin-right: 16px;
  color: ${colors.primary};
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
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
    color: ${colors.text.primary};
    border: 1px solid ${colors.primaryBorder};
    
    &:hover {
      background: linear-gradient(135deg, ${colors.primaryHover} 0%, ${colors.primaryHover} 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
    }
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: ${colors.text.primary};
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
  color: ${colors.primary};
  font-size: 1.5rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
`;

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  
    const handleViewFixtures = () => {
    // Navigation will be handled by Link component
  };

  const handleViewEventData = () => {
    // Navigation will be handled by Link component
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
                <InfoValue>
                  {tournament.endDate ? `${formatDate(tournament.date)} — ${formatDate(tournament.endDate)}` : formatDate(tournament.date)}
                </InfoValue>
              </InfoContent>
            </InfoRow>
            
            <InfoRow>
              <InfoIcon>
                <LocationOn sx={{ fontSize: '1.2rem' }} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>City/Country</InfoLabel>
                <InfoValue>{tournament.city}, {tournament.country}</InfoValue>
              </InfoContent>
            </InfoRow>

            <InfoRow>
              <InfoIcon>
                <FormatListNumbered sx={{ fontSize: '1.2rem' }} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Number of Matches</InfoLabel>
                <InfoValue>{tournament.numberOfMatches}</InfoValue>
              </InfoContent>
            </InfoRow>
          </InfoSection>
          

          
          <ActionButtons>
            <Link to={`/tournaments/${tournament.slug}`} style={{ textDecoration: 'none' }}>
              <ActionButton
                className="primary"
                startIcon={<Event />}
              >
                Full Fixtures
              </ActionButton>
            </Link>
            <Link to={`/tournament/${tournament.slug}/event-data`} style={{ textDecoration: 'none' }}>
              <ActionButton
                className="secondary"
                startIcon={<SportsSoccer />}
              >
                Event Data
              </ActionButton>
            </Link>
          </ActionButtons>
        </CardContentStyled>
      </StyledCard>
    </TournamentCardContainer>
  );
};

export default TournamentCard;
