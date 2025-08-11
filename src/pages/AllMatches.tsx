import React from 'react';
import { Layout } from '@/components/Layout';
import { 
  Box, 
  Container, 
  Typography, 
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLiveMatches, useUpcomingMatches } from '@/hooks/useMatchData';
import { dummyMatchesData, dummyUpcomingMatchesData } from '@/data/matchesData';

// Import styled components
import {
  PageBackground,
  PageHeader,
  PageTitle,
  PageSubtitle,
  MatchCardContainer,
  MatchHeader,
  MatchInfo,
  MatchTitle,
  TournamentBadge,
  TeamsSection,
  TeamRow,
  TeamIcon,
  TeamName,
  MatchTime,
  SectionTitle,
  GridContainer,
  SectionContainer
} from '@/styles/allMatches.styles';

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



  return (
    <Layout>
      <PageBackground>
        <Container maxWidth="lg">
          <PageHeader>
            <PageTitle>All Matches</PageTitle>
            <PageSubtitle>
              View all upcoming and live matches across all tournaments. Click on any match to see detailed information and betting options.
            </PageSubtitle>
          </PageHeader>

          {/* Live Matches Section - Displayed First */}
          {!liveLoading && (
            <SectionContainer>
              <SectionTitle>Live Matches</SectionTitle>
              <GridContainer>
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
                            <TeamIcon>TA</TeamIcon>
                            <TeamName>Team A</TeamName>
                          </TeamRow>
                          
                          <Box sx={{ textAlign: 'center', my: 2 }}>
                            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem', fontWeight: 600 }}>
                              VS
                            </Typography>
                          </Box>
                          
                          <TeamRow>
                            <TeamIcon>TB</TeamIcon>
                            <TeamName>Team B</TeamName>
                          </TeamRow>

                          <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <MatchTime>{new Date(`2025-08-05 ${match.start_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</MatchTime>
                          </Box>
                        </TeamsSection>
                      </MatchCardContainer>
                    </Box>
                  ))
                )}
              </GridContainer>
            </SectionContainer>
          )}

          {/* Upcoming Matches Section */}
          <SectionContainer>
            <SectionTitle>Upcoming Matches</SectionTitle>
            <GridContainer>
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
                        <TeamIcon>TA</TeamIcon>
                        <TeamName>Team A</TeamName>
                      </TeamRow>
                      
                      <Box sx={{ textAlign: 'center', my: 2 }}>
                        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem', fontWeight: 600 }}>
                          VS
                        </Typography>
                      </Box>
                      
                      <TeamRow>
                        <TeamIcon>TB</TeamIcon>
                        <TeamName>Team B</TeamName>
                      </TeamRow>

                      <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <MatchTime>{match.time}</MatchTime>
                      </Box>
                    </TeamsSection>
                  </MatchCardContainer>
                </Box>
              ))}
            </GridContainer>
          </SectionContainer>
        </Container>
      </PageBackground>
    </Layout>
  );
};

export default AllMatches;
