import React from 'react';
import { Layout } from '@/components/Layout';
import { 
  Box, 
  Container, 
  Typography, 
  Chip,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useLiveMatches, useUpcomingMatches } from '@/hooks/useMatchData';
import { dummyMatchesData, dummyUpcomingMatchesData } from '@/data/matchesData';
import { dummyTournamentsData } from '@/data/tournamentsData';
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

// Enhanced VS separator styling (centered)
const VSContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2.5),
  margin: theme.spacing(3, 0),
  '&::before, &::after': {
    content: '""',
    flex: 1,
    height: '1px',
    background: `linear-gradient(90deg,
      rgba(148, 163, 184, 0.15) 0%,
      rgba(148, 163, 184, 0.35) 50%,
      rgba(148, 163, 184, 0.15) 100%)`
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
  const { slug } = useParams();
  const [selectedCategory, setSelectedCategory] = React.useState<'ongoing' | 'upcoming' | 'past' | null>(null);
  
  // Use existing hooks for match data
  const { data: liveData, loading: liveLoading } = useLiveMatches();
  const { data: upcomingData, loading: upcomingLoading } = useUpcomingMatches();

  // Resolve tournament name from slug
  const selectedTournament = React.useMemo(() => dummyTournamentsData.find(t => t.slug === slug), [slug]);
  const tournamentName = React.useMemo(() => {
    if (selectedTournament) return selectedTournament.name;
    if (!slug) return 'All Matches';
    return slug
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }, [selectedTournament, slug]);

  const titleLogo = (selectedTournament as any)?.logo || '/Logo.png';

  const formatISTDateTime = (dateLike: Date | string) => {
    const date = dateLike instanceof Date ? dateLike : new Date(dateLike);
    const datePart = date.toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
      timeZone: 'Asia/Kolkata'
    });
    const timePart = date.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: true,
      timeZone: 'Asia/Kolkata'
    });
    return `${datePart}, ${timePart} IST`;
  };

  // Resolve team logo; fallback to Zoddz logo in public folder
  const getTeamLogo = (teamName?: string) => {
    // If you later add team-specific logos, resolve here
    return '/Logo.png';
  };

  // Categorize upcoming dataset into upcoming vs past based on current time
  const now = React.useMemo(() => new Date(), []);
  const { upcomingMatches, pastMatches } = React.useMemo(() => {
    const source = (upcomingData?.sports && upcomingData.sports.length > 0) ? upcomingData.sports : dummyUpcomingMatchesData.sports;
    
    const toDisplayObj = (card: typeof source[number], match: typeof source[number]['matches'][number], index: number) => {
      // Create proper date objects for comparison
      const startDate = new Date(`${card.match_date}T${match.start_time}`);
      const endDate = new Date(`${card.match_date}T${match.end_time || match.start_time}`);
      
      return {
        id: `match-${match.match_no}-${index}`,
        matchNumber: `Match #${match.match_no}`,
        tournament: card.card,
        tournamentNumber: card.fixture_no.toString(),
        team1: { name: match.player_a.name, icon: match.player_a.name.split(' ').map(n => n[0]).join('') },
        team2: { name: match.player_b.name, icon: match.player_b.name.split(' ').map(n => n[0]).join('') },
        time: startDate.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        isLive: Boolean(match.isLive || (now >= startDate && now <= endDate)),
        start: startDate,
        end: endDate,
        weightCategory: match.weight_category
      };
    };

    const upcomingList: Array<ReturnType<typeof toDisplayObj>> = [];
    const pastList: Array<ReturnType<typeof toDisplayObj>> = [];

    source.forEach(cardGroup => {
      cardGroup.matches.forEach((m, idx) => {
        const obj = toDisplayObj(cardGroup, m, idx);
        
        // For debugging - let's see what's happening
        console.log(`Match ${m.match_no}:`, {
          start: obj.start,
          end: obj.end,
          now: now,
          isLive: obj.isLive,
          startAfterNow: obj.start > now
        });
        
        if (obj.isLive) {
          // Skip here; live will be shown from liveData section
          return;
        }
        
        // Simplified logic: if start time is in the future, it's upcoming
        if (obj.start > now) {
          upcomingList.push(obj);
        } else {
          // If it's not live and not in the future, it's past
          pastList.push(obj);
        }
      });
    });

    // Sort for readability: upcoming ascending by start, past descending by end
    upcomingList.sort((a, b) => a.start.getTime() - b.start.getTime());
    pastList.sort((a, b) => b.end.getTime() - a.end.getTime());

    console.log('Upcoming matches found:', upcomingList.length);
    console.log('Past matches found:', pastList.length);

    // For testing: if no upcoming matches found, show some from the data anyway
    if (upcomingList.length === 0) {
      console.log('No upcoming matches found, showing test data...');
      source.forEach(cardGroup => {
        cardGroup.matches.forEach((m, idx) => {
          const obj = toDisplayObj(cardGroup, m, idx);
          if (!obj.isLive) {
            upcomingList.push(obj);
          }
        });
      });
      console.log('Test upcoming matches:', upcomingList.length);
    }

    return { upcomingMatches: upcomingList, pastMatches: pastList };
  }, [upcomingData, now]);



  return (
    <Layout>
      <PageBackground>
        <Container maxWidth="lg">
          <PageHeader>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 1 }}>
              <Box
                component="img"
                src={titleLogo}
                alt="Tournament Logo"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  objectFit: 'contain',
                  border: '1px solid rgba(148, 163, 184, 0.25)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.35)'
                }}
              />
              <PageTitle sx={{ m: 0 }}>{tournamentName}</PageTitle>
            </Box>

          </PageHeader>

          {/* Category Selector */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <ToggleButtonGroup
              value={selectedCategory}
              exclusive
              onChange={(e, val) => setSelectedCategory(val)}
              aria-label="match category selection"
              color="primary"
            >
              <ToggleButton value="ongoing">Ongoing</ToggleButton>
              <ToggleButton value="upcoming">Upcoming</ToggleButton>
              <ToggleButton value="past">Past</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Live/Ongoing Matches Section */}
          {(selectedCategory === null || selectedCategory === 'ongoing') && !liveLoading && (
            <SectionContainer>
              <SectionTitle>Live Matches</SectionTitle>
              <GridContainer>
                {(liveData.sports && liveData.sports.length > 0 ? liveData.sports : dummyMatchesData.sports).flatMap(cardGroup => 
                  cardGroup.matches.map((match, index) => (
                    <Box key={`live-${match.match_no}-${index}`}>
                      <Link to={`/fixture/${match.match_no}`} style={{ textDecoration: 'none' }}>
                        <MatchCardContainer 
                          sx={{
                          position: 'relative',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            padding: '2px',
                            background: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 50%, #3B82F6 100%)',
                            borderRadius: '16px',
                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            maskComposite: 'exclude',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            opacity: 0.9,
                            animation: 'pulse 2s ease-in-out infinite',
                            transition: 'all 0.3s ease'
                          },
                          '&:hover::before': {
                            opacity: 1,
                            background: 'linear-gradient(135deg, #F87171 0%, #FBBF24 50%, #60A5FA 100%)',
                            transform: 'scale(1.02)',
                            animation: 'none'
                          },
                          '&:hover': {
                            transform: 'translateY(-6px)',
                            boxShadow: '0 25px 50px rgba(239, 68, 68, 0.4)'
                          },
                          '@keyframes pulse': {
                            '0%, 100%': {
                              opacity: 0.9,
                              transform: 'scale(1)'
                            },
                            '50%': {
                              opacity: 1,
                              transform: 'scale(1.01)'
                            }
                          }
                        }}
                      >
                        <MatchHeader>
                          <MatchInfo>
                            <MatchTitle>Match #{match.match_no} • Live</MatchTitle>
                          </MatchInfo>
                          <LiveIndicator label="LIVE" size="small" />
                        </MatchHeader>

                        <TeamsSection>
                          <TeamRow sx={{ justifyContent: 'center' }}>
                            <TeamIcon>
                              <Box component="img" src={getTeamLogo(match.player_a?.team)} alt={match.player_a?.team || match.player_a?.name || 'Team A'} sx={{ width: '70%', height: '70%', objectFit: 'contain', borderRadius: '50%' }} />
                            </TeamIcon>
                            <TeamName sx={{ flex: 'unset', textAlign: 'center' }}>{match.player_a?.team || match.player_a?.name || 'Team A'}</TeamName>
                          </TeamRow>
                          
                          <VSContainer>
                            <VSText variant="h6">VS</VSText>
                          </VSContainer>
                          
                          <TeamRow sx={{ justifyContent: 'center' }}>
                            <TeamIcon>
                              <Box component="img" src={getTeamLogo(match.player_b?.team)} alt={match.player_b?.team || match.player_b?.name || 'Team B'} sx={{ width: '70%', height: '70%', objectFit: 'contain', borderRadius: '50%' }} />
                            </TeamIcon>
                            <TeamName sx={{ flex: 'unset', textAlign: 'center' }}>{match.player_b?.team || match.player_b?.name || 'Team B'}</TeamName>
                          </TeamRow>

                          <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <MatchTime>{formatISTDateTime(`${cardGroup.match_date} ${match.start_time}`)}</MatchTime>
                          </Box>

                          <Box sx={{ mt: 1 }}>
                            <Link to={`/match/${match.match_no}`} style={{ textDecoration: 'none' }}>
                              <Box
                                onClick={(e) => { e.stopPropagation(); }}
                                sx={{
                                  width: '100%',
                                  py: 1.25,
                                  borderRadius: 2,
                                  cursor: 'pointer',
                                  userSelect: 'none',
                                  textAlign: 'center',
                                  color: '#22C55E',
                                  background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(59,130,246,0.06) 100%)',
                                  border: '1px solid rgba(16,185,129,0.35)',
                                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 24px rgba(16,185,129,0.15)',
                                  fontWeight: 800,
                                  letterSpacing: '0.04em',
                                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                                  '&:hover': { transform: 'translateY(-1px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 28px rgba(16,185,129,0.25)', borderColor: 'rgba(16,185,129,0.55)' }
                                }}
                              >
                                ODDS/STREAMS
                              </Box>
                            </Link>
                          </Box>
                        </TeamsSection>
                      </MatchCardContainer>
                    </Link>
                    </Box>
                  ))
                )}
              </GridContainer>
            </SectionContainer>
          )}

          {/* Upcoming Matches Section */}
          {(selectedCategory === null || selectedCategory === 'upcoming') && (
            <SectionContainer>
              <SectionTitle>Upcoming Matches</SectionTitle>
              <GridContainer>
                {upcomingMatches.length === 0 && (
                  <Box sx={{ 
                    gridColumn: '1 / -1', 
                    textAlign: 'center', 
                    py: 4,
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    <Typography variant="h6">No upcoming matches found</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Check back later for new matches
                    </Typography>
                  </Box>
                )}
                {upcomingMatches.map((match) => (
                  <Box key={match.id}>
                    <Link to={`/fixture/${match.id}`} style={{ textDecoration: 'none' }}>
                      <MatchCardContainer
                      sx={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          padding: '2px',
                          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #10B981 100%)',
                          borderRadius: '16px',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'exclude',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          opacity: 0.8,
                          transition: 'all 0.3s ease'
                        },
                        '&:hover::before': {
                          opacity: 1,
                          background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #34D399 100%)',
                          transform: 'scale(1.02)'
                        },
                        '&:hover': {
                          background: 'rgba(15, 23, 42, 0.8)',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
                        }
                      }}
                    >
                      <MatchHeader>
                        <MatchInfo>
                          <MatchTitle>{match.matchNumber} • {match.tournament}</MatchTitle>
                        </MatchInfo>
                        <TournamentBadge label={match.tournamentNumber} size="small" />
                      </MatchHeader>

                      <TeamsSection>
                        <TeamRow sx={{ justifyContent: 'center' }}>
                          <TeamIcon>
                            <Box component="img" src={getTeamLogo(match.team1?.name)} alt={match.team1?.name || 'Team A'} sx={{ width: '70%', height: '70%', objectFit: 'contain', borderRadius: '50%' }} />
                          </TeamIcon>
                          <TeamName sx={{ flex: 'unset', textAlign: 'center' }}>{match.team1?.name || 'Team A'}</TeamName>
                        </TeamRow>
                        
                        <VSContainer>
                          <VSText variant="h6">VS</VSText>
                        </VSContainer>
                        
                        <TeamRow sx={{ justifyContent: 'center' }}>
                          <TeamIcon>
                            <Box component="img" src={getTeamLogo(match.team2?.name)} alt={match.team2?.name || 'Team B'} sx={{ width: '70%', height: '70%', objectFit: 'contain', borderRadius: '50%' }} />
                          </TeamIcon>
                          <TeamName sx={{ flex: 'unset', textAlign: 'center' }}>{match.team2?.name || 'Team B'}</TeamName>
                        </TeamRow>

                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                          <MatchTime>{formatISTDateTime(match.start)}</MatchTime>
                        </Box>

                        <Box sx={{ mt: 1 }}>
                          <Link to={`/match/${match.id}`} style={{ textDecoration: 'none' }}>
                            <Box
                              onClick={(e) => { e.stopPropagation(); }}
                              sx={{
                                width: '100%',
                                py: 1.25,
                                borderRadius: 2,
                                cursor: 'pointer',
                                userSelect: 'none',
                                textAlign: 'center',
                                color: '#22C55E',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                fontWeight: 600,
                                letterSpacing: '0.04em',
                                transition: 'all 0.2s ease',
                                '&:hover': { 
                                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                                  borderColor: 'rgba(16, 185, 129, 0.5)'
                                }
                              }}
                            >
                              Odds/Streams
                            </Box>
                          </Link>
                        </Box>
                      </TeamsSection>
                    </MatchCardContainer>
                    </Link>
                  </Box>
                ))}
              </GridContainer>
            </SectionContainer>
          )}

          {/* Past Matches Section */}
          {(selectedCategory === null || selectedCategory === 'past') && (
            <SectionContainer>
              <SectionTitle>Past Matches</SectionTitle>
              <GridContainer>
                {pastMatches.map((match) => (
                  <Box key={`past-${match.id}`}>
                    <Link to={`/fixture/${match.id}`} style={{ textDecoration: 'none' }}>
                      <MatchCardContainer
                      sx={{
                        background: 'rgba(15, 23, 42, 0.4)',
                        position: 'relative',
                        opacity: 0.7,
                        filter: 'grayscale(0.3)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          padding: '1px',
                          background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.3) 0%, rgba(71, 85, 105, 0.4) 100%)',
                          borderRadius: '16px',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'exclude',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          opacity: 0.5,
                          transition: 'all 0.3s ease'
                        },
                        '&:hover::before': {
                          opacity: 0.8,
                          background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.5) 0%, rgba(71, 85, 105, 0.6) 100%)'
                        },
                        '&:hover': {
                          background: 'rgba(15, 23, 42, 0.6)',
                          opacity: 0.8,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                        }
                      }}
                    >
                      <MatchHeader>
                        <MatchInfo>
                          <MatchTitle sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>{match.matchNumber} • {match.tournament}</MatchTitle>
                        </MatchInfo>
                        <TournamentBadge label={match.tournamentNumber} size="small" />
                      </MatchHeader>

                      <TeamsSection>
                        <TeamRow sx={{ justifyContent: 'center' }}>
                          <TeamIcon>
                            <Box component="img" src={getTeamLogo(match.team1?.name)} alt={match.team1?.name || 'Team A'} sx={{ width: '70%', height: '70%', objectFit: 'contain', borderRadius: '50%', opacity: 0.6 }} />
                          </TeamIcon>
                          <TeamName sx={{ flex: 'unset', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>{match.team1?.name || 'Team A'}</TeamName>
                        </TeamRow>

                        <VSContainer>
                          <VSText variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>VS</VSText>
                        </VSContainer>

                        <TeamRow sx={{ justifyContent: 'center' }}>
                          <TeamIcon>
                            <Box component="img" src={getTeamLogo(match.team2?.name)} alt={match.team2?.name || 'Team B'} sx={{ width: '70%', height: '70%', objectFit: 'contain', borderRadius: '50%', opacity: 0.6 }} />
                          </TeamIcon>
                          <TeamName sx={{ flex: 'unset', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>{match.team2?.name || 'Team B'}</TeamName>
                        </TeamRow>

                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                          <MatchTime sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>{formatISTDateTime(match.start)}</MatchTime>
                        </Box>

                        <Box sx={{ mt: 1 }}>
                          <Link to={`/match/${match.id}`} style={{ textDecoration: 'none' }}>
                            <Box
                              onClick={(e) => { e.stopPropagation(); }}
                              sx={{
                                width: '100%',
                                py: 1.25,
                                borderRadius: 2,
                                cursor: 'pointer',
                                userSelect: 'none',
                                textAlign: 'center',
                                color: 'rgba(255, 255, 255, 0.5)',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                fontWeight: 500,
                                letterSpacing: '0.04em',
                                transition: 'all 0.2s ease',
                                '&:hover': { 
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                  borderColor: 'rgba(255, 255, 255, 0.2)'
                                }
                              }}
                            >
                              Odds/Streams
                            </Box>
                          </Link>
                        </Box>
                      </TeamsSection>
                    </MatchCardContainer>
                    </Link>
                  </Box>
                ))}
              </GridContainer>
            </SectionContainer>
          )}
        </Container>
      </PageBackground>
    </Layout>
  );
};

export default Fixtures;
