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
import { colors } from '@/utils/colors';
import { styled } from '@mui/material/styles';
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

// Enhanced VS separator styling
const VSContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  margin: theme.spacing(3, 0),
  position: 'relative',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    width: '30%',
    height: '1px',
    background: `linear-gradient(90deg, 
      transparent 0%, 
      rgba(148, 163, 184, 0.3) 50%, 
      transparent 100%)`,
    transform: 'translateY(-50%)'
  },
  '&::before': {
    left: 0
  },
  '&::after': {
    right: 0
  }
}));

const VSText = styled(Typography)(({ theme }) => ({
  color: colors.text.secondary,
  fontSize: '1.1rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  background: `linear-gradient(135deg, 
    rgba(148, 163, 184, 0.8) 0%, 
    rgba(203, 213, 225, 0.9) 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  padding: theme.spacing(1, 2),
  borderRadius: 8,
  border: '1px solid rgba(148, 163, 184, 0.2)',
  backdropFilter: 'blur(10px)',
  display: 'inline-block'
}));

// Enhanced live indicator
const LiveIndicator = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    rgba(239, 68, 68, 0.9) 0%, 
    rgba(220, 38, 38, 0.9) 100%)`,
  color: colors.text.primary,
  fontWeight: 700,
  fontSize: '0.75rem',
  height: 28,
  borderRadius: 14,
  border: '1px solid rgba(239, 68, 68, 0.3)',
  boxShadow: `
    0 4px 6px -1px rgba(239, 68, 68, 0.2),
    0 2px 4px -1px rgba(239, 68, 68, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)
  `,
  animation: 'pulse 2s ease-in-out infinite',
  '& .MuiChip-label': {
    padding: '0 12px',
    letterSpacing: '0.05em'
  },
  '@keyframes pulse': {
    '0%, 100%': {
      boxShadow: `
        0 4px 6px -1px rgba(239, 68, 68, 0.2),
        0 2px 4px -1px rgba(239, 68, 68, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `
    },
    '50%': {
      boxShadow: `
        0 6px 12px -2px rgba(239, 68, 68, 0.3),
        0 4px 8px -1px rgba(239, 68, 68, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.2)
      `
    }
  }
}));

const Fixtures: React.FC = () => {
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
    navigate(`/fixture/${matchId}/`);
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
                      <MatchCardContainer onClick={() => navigate(`/match/${match.match_no}`)}>
                        <MatchHeader>
                          <MatchInfo>
                            <MatchTitle>Match #{match.match_no} • Live</MatchTitle>
                          </MatchInfo>
                          <LiveIndicator label="LIVE" size="small" />
                        </MatchHeader>

                        <TeamsSection>
                          <TeamRow>
                            <TeamIcon>TA</TeamIcon>
                            <TeamName>Team A</TeamName>
                          </TeamRow>
                          
                          <VSContainer>
                            <VSText variant="h6">VS</VSText>
                          </VSContainer>
                          
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
                      
                      <VSContainer>
                        <VSText variant="h6">VS</VSText>
                      </VSContainer>
                      
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

export default Fixtures;
