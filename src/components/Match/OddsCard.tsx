import { colors } from '@/utils/colors';
import { typography } from '@/utils/fonts';
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Divider,
  Modal,
  IconButton,
  Paper
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { formatScore, formatTimeToAMPM } from '@/utils';
import { SportsMatchCardProps } from '@/types/match';
import CloseIcon from '@mui/icons-material/Close';

// Live pulse animation
const livePulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`;

const liveGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
  }
`;

const liveBorderGlow = keyframes`
  0%, 100% {
    border-color: rgba(59, 130, 246, 0.5);
  }
  50% {
    border-color: rgba(59, 130, 246, 0.8);
  }
`;

const MatchCardContainer = styled(Box)<{ isLive?: boolean }>`
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  
  ${({ isLive }) => isLive ? `
    animation: ${liveGlow} 3s ease-in-out infinite;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
    }
  ` : `
    opacity: 0.9;
    filter: grayscale(0.1);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
      opacity: 1;
      filter: grayscale(0);
    }
  `}
  
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

const StyledCard = styled(Card)<{ isLive?: boolean }>`
  background: ${({ isLive }) => isLive 
    ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 100%)'
    : 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
  };
  border: 1px solid ${({ isLive }) => isLive 
    ? 'rgba(59, 130, 246, 0.5)' 
    : 'rgba(100, 116, 139, 0.4)'
  };
  backdrop-filter: blur(12px);
  box-shadow: ${({ isLive }) => isLive 
    ? '0 8px 32px rgba(59, 130, 246, 0.2)' 
    : '0 8px 32px rgba(0, 0, 0, 0.2)'
  };
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  height: 100%;
  
  ${({ isLive }) => isLive ? `
    animation: ${liveBorderGlow} 2s ease-in-out infinite;
    
    &:hover {
      border-color: rgba(59, 130, 246, 0.8);
      box-shadow: 0 12px 40px rgba(59, 130, 246, 0.3);
      background: linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 1) 100%);
    }
  ` : `
    &:hover {
      border-color: rgba(100, 116, 139, 0.6);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    }
  `}
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
  font-family: ${typography.cardTitle.fontFamily};
  font-size: ${typography.cardTitle.fontSize};
  font-weight: ${typography.cardTitle.fontWeight};
  line-height: ${typography.cardTitle.lineHeight};
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

const OddsText = styled(Typography)<{ isLive?: boolean }>`
  color: ${({ isLive }) => isLive ? '#10B981' : 'rgba(255, 255, 255, 0.8)'};
  font-family: ${typography.odds.fontFamily};
  font-size: ${typography.odds.fontSize};
  font-weight: ${typography.odds.fontWeight};
  line-height: ${typography.odds.lineHeight};
  padding: ${({ theme }) => theme.spacing(0.8, 1.5)};
  background: ${({ isLive }) => isLive 
    ? 'rgba(16, 185, 129, 0.15)' 
    : 'rgba(100, 116, 139, 0.15)'
  };
  border-radius: 6px;
  border: 1px solid ${({ isLive }) => isLive 
    ? 'rgba(16, 185, 129, 0.4)' 
    : 'rgba(100, 116, 139, 0.3)'
  };
  min-width: 70px;
  text-align: center;
  box-shadow: ${({ isLive }) => isLive 
    ? '0 2px 8px rgba(16, 185, 129, 0.2)' 
    : '0 2px 6px rgba(0, 0, 0, 0.15)'
  };
  transition: all 0.2s ease;
  
  ${({ isLive }) => isLive ? `
    &:hover {
      background: rgba(16, 185, 129, 0.25);
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
  ` : `
    &:hover {
      background: rgba(100, 116, 139, 0.2);
      transform: scale(1.02);
    }
  `}
`;

const WeightCategoryChip = styled(Chip)<{ isLive?: boolean }>`
  background-color: ${({ isLive }) => isLive 
    ? 'rgba(59, 130, 246, 0.2)' 
    : 'rgba(100, 116, 139, 0.2)'
  };
  color: ${({ isLive }) => isLive ? '#3B82F6' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid ${({ isLive }) => isLive 
    ? 'rgba(59, 130, 246, 0.4)' 
    : 'rgba(100, 116, 139, 0.3)'
  };
  font-size: 0.75rem;
  font-weight: 600;
  height: 28px;
  margin-top: ${({ theme }) => theme.spacing(1.5)};
  box-shadow: ${({ isLive }) => isLive 
    ? '0 2px 8px rgba(59, 130, 246, 0.2)' 
    : '0 2px 6px rgba(0, 0, 0, 0.15)'
  };
  letter-spacing: 0.5px;
`;

const FixtureHeader = styled(Box)<{ isLive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1.2, 2)};
  background-color: ${({ isLive }) => isLive 
    ? 'rgba(15, 23, 42, 0.95)' 
    : 'rgba(30, 41, 59, 0.95)'
  };
  border-bottom: 1px solid ${({ isLive }) => isLive 
    ? 'rgba(59, 130, 246, 0.3)' 
    : 'rgba(100, 116, 139, 0.3)'
  };
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  position: relative;
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
  gap: 8px;
`;

const TimeText = styled(Typography)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

const TimeInfoContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(1, 1.5)};
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

const TimeLabel = styled(Typography)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  overflow: hidden;
`;

const ModalHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2, 3)};
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(15, 23, 42, 0.9);
`;

const ModalContent = styled(Box)`
  padding: ${({ theme }) => theme.spacing(3)};
  max-height: 70vh;
  overflow-y: auto;
`;

const IframeContainer = styled(Box)`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

const VideoContainer = styled(Box)`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

const OddsCard: React.FC<SportsMatchCardProps> = (props) => {
  const navigate = useNavigate();
  const { fixture_no, match_date, match, isLive } = props;
  const { match_no, player_a, player_b, pre_match_odds, live_match_odds, weight_category, start_time, end_time } = match;
  

  
  // Use live odds if available and match is live, otherwise fall back to pre-match odds
  const oddsToDisplay = (live_match_odds && isLive) ? live_match_odds : pre_match_odds;
  
  // Generate a slug for navigation
  const slug = `sports-${match_no}-${player_a.name.toLowerCase().replace(/\s+/g, '-')}-vs-${player_b.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  const handleClick = () => {
    navigate(`/fixture/${slug}`);
  };
  
  const handleScorecardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Redirect to Cricbuzz website instead of opening modal
    window.open('https://www.cricbuzz.com/live-cricket-scores', '_blank');
  };
  
  const handleStreamsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.onStreamsClick) {
      props.onStreamsClick(match);
    }
  };
  

  
  return (
    <MatchCardContainer isLive={isLive}>
      <ShineEffect className="shine" />
      
      <Box sx={{ borderRadius: '16px', overflow: 'hidden', height: '100%' }}>

        
        <StyledCard isLive={isLive}>
          <CardContentStyled>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                padding: { xs: '4px 8px', sm: '6px 12px' },
                borderRadius: '8px',
                background: isLive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(100, 116, 139, 0.15)',
                border: `1px solid ${isLive ? 'rgba(59, 130, 246, 0.4)' : 'rgba(100, 116, 139, 0.2)'}`,
                boxShadow: isLive ? '0 2px 8px rgba(59, 130, 246, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                minWidth: { xs: '70px', sm: 'auto' }
              }}>
                <Typography sx={{ 
                  color: isLive ? '#3B82F6' : 'rgba(255, 255, 255, 0.6)',
                  fontSize: { xs: '0.65rem', sm: '0.75rem' }, 
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  lineHeight: { xs: 1.2, sm: 1.4 }
                }}>
                  {weight_category}
                </Typography>
              </Box>
                             <Box sx={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: { xs: 0.5, sm: 1 },
                 padding: { xs: '3px 6px', sm: '4px 8px' },
                 borderRadius: '6px',
                 background: isLive ? 'rgba(59, 130, 246, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                 border: `1px solid ${isLive ? 'rgba(59, 130, 246, 0.3)' : 'rgba(100, 116, 139, 0.25)'}`,
                 flexDirection: 'row',
                 minWidth: { xs: '120px', sm: 'auto' }
               }}>
                 <Typography sx={{ 
                   color: isLive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.7)', 
                   fontSize: { xs: '0.65rem', sm: '0.75rem' }, 
                   fontWeight: 500,
                   whiteSpace: 'nowrap'
                 }}>
                   {new Date(match_date).toLocaleDateString('en-US', { 
                     month: 'short', 
                     day: 'numeric', 
                     year: 'numeric' 
                   })}
                 </Typography>
                 <Typography sx={{ 
                   color: isLive ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.5)', 
                   fontSize: { xs: '0.55rem', sm: '0.65rem' }, 
                   fontWeight: 500,
                   textTransform: 'uppercase',
                   letterSpacing: '0.5px'
                 }}>
                   at
                 </Typography>
                 <Typography sx={{ 
                   color: isLive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)', 
                   fontSize: { xs: '0.65rem', sm: '0.75rem' }, 
                   fontWeight: 600,
                   whiteSpace: 'nowrap'
                 }}>
                   {formatTimeToAMPM(start_time)}
                 </Typography>
               </Box>
            </Box>
            
            <MatchTitleText>
              {player_a.name} vs {player_b.name}
            </MatchTitleText>
            
            <Divider sx={{ my: 1.8, opacity: isLive ? 0.2 : 0.1 }} />
            
            <TeamsSection>
              <TeamRow>
                <PlayerInfoContainer>
                  <PlayerNameText>{player_a.name}</PlayerNameText>
                  <TeamText>{player_a.team}</TeamText>
                </PlayerInfoContainer>
                <OddsText isLive={isLive}>{oddsToDisplay.a}</OddsText>
              </TeamRow>
              
              <Divider sx={{ my: 1.5, opacity: isLive ? 0.1 : 0.05 }} />
              
              <TeamRow>
                <PlayerInfoContainer>
                  <PlayerNameText>{player_b.name}</PlayerNameText>
                  <TeamText>{player_b.team}</TeamText>
                </PlayerInfoContainer>
                <OddsText isLive={isLive}>{oddsToDisplay.b}</OddsText>
              </TeamRow>
            </TeamsSection>
            
            {/* Action Buttons */}
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              mt: 2,
              pt: 2,
              borderTop: `1px solid ${isLive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(100, 116, 139, 0.2)'}`
            }}>
              <Box 
                onClick={handleScorecardClick}
                sx={{
                  flex: 1,
                  py: 1,
                  px: 1.5,
                  borderRadius: '6px',
                                  background: isLive ? 'rgba(59, 130, 246, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                border: `1px solid ${isLive ? 'rgba(59, 130, 246, 0.3)' : 'rgba(100, 116, 139, 0.25)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  '&:hover': {
                    background: isLive ? 'rgba(59, 130, 246, 0.25)' : 'rgba(100, 116, 139, 0.15)',
                    transform: 'translateY(-1px)',
                    boxShadow: isLive ? '0 4px 12px rgba(59, 130, 246, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <Typography sx={{
                  color: isLive ? '#3B82F6' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.3px'
                }}>
                  Scorecard
                </Typography>
              </Box>
              
              <Box 
                onClick={handleStreamsClick}
                sx={{
                  flex: 1,
                  py: 1,
                  px: 1.5,
                  borderRadius: '6px',
                                  background: isLive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                border: `1px solid ${isLive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(100, 116, 139, 0.25)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  '&:hover': {
                    background: isLive ? 'rgba(16, 185, 129, 0.25)' : 'rgba(100, 116, 139, 0.15)',
                    transform: 'translateY(-1px)',
                    boxShadow: isLive ? '0 4px 12px rgba(16, 185, 129, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <Typography sx={{
                  color: isLive ? '#10B981' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.3px'
                }}>
                  Streams
                </Typography>
              </Box>
            </Box>
          </CardContentStyled>
        </StyledCard>
      </Box>
      

      

    </MatchCardContainer>
  );
};

export default OddsCard;