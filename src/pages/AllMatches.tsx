import React from 'react';
import { Layout } from '@/components/Layout';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Chip,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useLiveMatches, useUpcomingMatches } from '@/hooks/useMatchData';
import { dummyMatchesData, dummyUpcomingMatchesData } from '@/data/matchesData';

// Styles
const PageContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  padding: 2rem 0;
`;

const PageHeader = styled(Box)`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled(Typography)`
  color: rgba(255, 255, 255, 1);
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled(Typography)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto;
`;

const MatchCardContainer = styled(Card)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

const MatchHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const MatchInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MatchTitle = styled(Typography)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 600;
`;

const TournamentBadge = styled(Chip)`
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: white;
  font-weight: 700;
  font-size: 0.8rem;
  height: 24px;
`;

const TeamsSection = styled(Box)`
  padding: 1.5rem;
`;

const TeamRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TeamIcon = styled(Box)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
`;

const TeamName = styled(Typography)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
`;

const MatchTime = styled(Typography)`
  color: #f97316;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  margin: 1rem 0;
`;

const NavigationSection = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavButton = styled(Typography)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const SectionTitle = styled(Typography)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

const AllMatches: React.FC = () => {
  const navigate = useNavigate();
  
  // Use existing hooks for match data
  const { data: liveData, loading: liveLoading } = useLiveMatches();
  const { data: upcomingData, loading: upcomingLoading } = useUpcomingMatches();

  // Use data from the data folder
  const upcomingMatches = dummyUpcomingMatchesData.sports.flatMap(cardGroup => 
    cardGroup.matches.map((match, index) => ({
      id: `upcoming-${match.match_no}-${index}`,
      matchNumber: `Match #${match.match_no}`,
      tournament: cardGroup.card,
      tournamentNumber: cardGroup.fixture_no.toString(),
      team1: { name: match.player_a.name, icon: match.player_a.name.split(' ').map(n => n[0]).join('') },
      team2: { name: match.player_b.name, icon: match.player_b.name.split(' ').map(n => n[0]).join('') },
      time: new Date(`2025-08-06 ${match.start_time}`).toLocaleString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isLive: false,
      weightCategory: match.weight_category
    }))
  );

  const handleMatchClick = (matchId: string) => {
    navigate(`/match`);
  };

  const handleNavigationClick = (type: string) => {
    switch (type) {
      case 'FANTASY':
        // Navigate to fantasy page
        break;
      case 'TABLE':
        // Navigate to table/standings page
        break;
      case 'SCHEDULE':
        // Navigate to schedule page
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <PageContainer>
        <Container maxWidth="lg">
          <PageHeader>
            <PageTitle>All Matches</PageTitle>
            <PageSubtitle>
              View all upcoming and live matches across all tournaments. Click on any match to see detailed information and betting options.
            </PageSubtitle>
          </PageHeader>

          {/* Live Matches Section - Displayed First */}
          {!liveLoading && (
            <Box sx={{ mb: 6 }}>
              <SectionTitle>Live Matches</SectionTitle>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 3 
              }}>
                {(liveData.sports && liveData.sports.length > 0 ? liveData.sports : dummyMatchesData.sports).flatMap(cardGroup => 
                  cardGroup.matches.map((match, index) => (
                    <Box key={`live-${match.match_no}-${index}`}>
                      <MatchCardContainer onClick={() => navigate(`/match`)}>
                        <MatchHeader>
                          <MatchInfo>
                            <MatchTitle>Match #{match.match_no} • Live</MatchTitle>
                          </MatchInfo>
                          <Chip 
                            label="LIVE" 
                            size="small" 
                            sx={{ 
                              bgcolor: 'error.main', 
                              color: 'white',
                              fontWeight: 'bold'
                            }} 
                          />
                        </MatchHeader>

                        <TeamsSection>
                          <TeamRow>
                            <TeamIcon>{match.player_a.name.split(' ').map(n => n[0]).join('')}</TeamIcon>
                            <TeamName>{match.player_a.name}</TeamName>
                          </TeamRow>
                          
                          <TeamRow>
                            <TeamIcon>{match.player_b.name.split(' ').map(n => n[0]).join('')}</TeamIcon>
                            <TeamName>{match.player_b.name}</TeamName>
                          </TeamRow>

                          <MatchTime>{new Date(`2025-08-05 ${match.start_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</MatchTime>
                        </TeamsSection>

                        <NavigationSection>
                          <NavButton onClick={(e) => { e.stopPropagation(); handleNavigationClick('FANTASY'); }}>
                            FANTASY
                          </NavButton>
                          <NavButton onClick={(e) => { e.stopPropagation(); handleNavigationClick('TABLE'); }}>
                            TABLE
                          </NavButton>
                          <NavButton onClick={(e) => { e.stopPropagation(); handleNavigationClick('SCHEDULE'); }}>
                            SCHEDULE
                          </NavButton>
                        </NavigationSection>
                      </MatchCardContainer>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          )}

                    {/* Upcoming Matches Section */}
          <Box sx={{ mt: 6 }}>
            <SectionTitle>Upcoming Matches</SectionTitle>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3 
            }}>
              {upcomingMatches.map((match) => (
                <Box key={match.id}>
                  <MatchCardContainer onClick={() => handleMatchClick(match.id)}>
                    <MatchHeader>
                      <MatchInfo>
                        <MatchTitle>{match.matchNumber} • {match.tournament}</MatchTitle>
                      </MatchInfo>
                      <TournamentBadge label={match.tournamentNumber} size="small" />
                    </MatchHeader>

                    <TeamsSection>
                      <TeamRow>
                        <TeamIcon>{match.team1.icon}</TeamIcon>
                        <TeamName>{match.team1.name}</TeamName>
                      </TeamRow>
                      
                      <TeamRow>
                        <TeamIcon>{match.team2.icon}</TeamIcon>
                        <TeamName>{match.team2.name}</TeamName>
                      </TeamRow>

                      <MatchTime>{match.time}</MatchTime>
                    </TeamsSection>

                    <NavigationSection>
                      <NavButton onClick={(e) => { e.stopPropagation(); handleNavigationClick('FANTASY'); }}>
                        FANTASY
                      </NavButton>
                      <NavButton onClick={(e) => { e.stopPropagation(); handleNavigationClick('TABLE'); }}>
                        TABLE
                      </NavButton>
                      <NavButton onClick={(e) => { e.stopPropagation(); handleNavigationClick('SCHEDULE'); }}>
                        SCHEDULE
                      </NavButton>
                    </NavigationSection>
                  </MatchCardContainer>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </PageContainer>
    </Layout>
  );
};

export default AllMatches;
