// pages/Odds.tsx
import React from "react";
import { Layout } from "@/components/Layout";
import FixtureCard from "@/components/Match/FixtureCard";
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
// Swiper removed - using responsive grid only

// Custom hook and types
import { useLiveMatches, useUpcomingMatches } from '@/hooks/useMatchData';
import { SportsCardGroup } from '@/types/match';
import BackgroundRefreshIndicator from '@/components/Shared/BackgroundRefreshIndicator';

// Styles
import {
  matchesContainerStyles,
  matchesContentStyles,
  sectionTitleContainerStyles,
  sectionTitleStyles,
  swiperContainerStyles,
  gridContainerStyles,
  sectionWrapperStyles,
  loadingContainerStyles,
  emptyStateContainerStyles,
  emptyStateTextStyles,
  emptyStateSubtextStyles
} from '@/styles/matches.styles';

interface SportsSectionProps {
  title: string;
  cardGroups: SportsCardGroup[];
  isMobile: boolean;
  isLive?: boolean;
}

/**
 * Loading component
 */
const LoadingState: React.FC = () => (
  <Box sx={loadingContainerStyles}>
    <CircularProgress size={40} />
    <Typography sx={{ ml: 2 }}>Loading matches...</Typography>
  </Box>
);

/**
 * Empty state component
 */
const EmptyState: React.FC<{ message?: string }> = ({ message = "No matches found" }) => (
  <Box sx={emptyStateContainerStyles}>
    <Typography variant="h6" sx={emptyStateTextStyles}>
      {message}
    </Typography>
    <Typography sx={emptyStateSubtextStyles}>
      Check back later for new matches
    </Typography>
  </Box>
);

/**
 * SportsSection component for displaying sports matches grouped by card
 */
const SportsSection: React.FC<SportsSectionProps> = ({ title, cardGroups, isMobile, isLive = false }) => {
  if (cardGroups.length === 0) {
    return null;
  }

  return (
    <Box sx={sectionWrapperStyles}>
      <Box sx={sectionTitleContainerStyles}>
        <Typography component="span" sx={sectionTitleStyles}>
          {title}
          {isLive && (
            <Box component="span" sx={{ 
              ml: 1, 
              px: 1, 
              py: 0.5, 
              bgcolor: 'error.main', 
              color: 'white', 
              borderRadius: 1, 
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              LIVE
            </Box>
          )}
        </Typography>
      </Box>

      {cardGroups.map((cardGroup, groupIndex) => (
        <Box key={`${title}-${cardGroup.card}-${cardGroup.fixture_no}-${groupIndex}`} sx={{ mb: 4 }}>
          <Box sx={gridContainerStyles}>
            {cardGroup.matches.map((match, index) => (
              <Box key={`${title}-${cardGroup.card}-${match.match_no}-${groupIndex}-${index}`}>
                <FixtureCard 
                  match={match} 
                  card={cardGroup.card} 
                  fixture_no={cardGroup.fixture_no} 
                  match_date={cardGroup.match_date} 
                  sportType="sports" 
                  isLive={isLive}
                />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

/**
 * Main Odds page component
 */
const OddsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Use custom hooks for live and upcoming matches
  const { 
    data: liveData, 
    loading: liveLoading, 
    refreshing: liveRefreshing,
    total: liveTotal 
  } = useLiveMatches();

  const { 
    data: upcomingData, 
    loading: upcomingLoading, 
    refreshing: upcomingRefreshing,
    total: upcomingTotal 
  } = useUpcomingMatches();

  // Calculate total matches for each section
  const totalLiveMatches = liveData.sports ? liveData.sports.reduce((sum, cardGroup) => sum + cardGroup.matches.length, 0) : 0;
  const totalUpcomingMatches = upcomingData.sports ? upcomingData.sports.reduce((sum, cardGroup) => sum + cardGroup.matches.length, 0) : 0;

  console.log('Live matches data:', liveData);
  console.log('Total live matches:', totalLiveMatches);
  console.log('Upcoming matches data:', upcomingData);
  console.log('Total upcoming matches:', totalUpcomingMatches);

  return (
    <Layout>
      <Box sx={matchesContainerStyles}>
        <Container maxWidth="lg" sx={matchesContentStyles}>
          {/* Live Matches Section */}
          <Box sx={{ mb: 6 }}>
            <BackgroundRefreshIndicator isRefreshing={liveRefreshing} showProgressBar={true}>
              {liveLoading && <LoadingState />}
              
              {!liveLoading && (
                <>
                  {totalLiveMatches === 0 ? (
                    <EmptyState message="No live matches currently" />
                  ) : (
                    <SportsSection
                      title="Live Matches"
                      cardGroups={liveData.sports}
                      isMobile={isMobile}
                      isLive={true}
                    />
                  )}
                </>
              )}
            </BackgroundRefreshIndicator>
          </Box>

          {/* Upcoming Matches Section */}
          <Box>
            <BackgroundRefreshIndicator isRefreshing={upcomingRefreshing} showProgressBar={true}>
              {upcomingLoading && <LoadingState />}
              
              {!upcomingLoading && (
                <>
                  {totalUpcomingMatches === 0 ? (
                    <EmptyState message="No upcoming matches found" />
                  ) : (
                    <SportsSection
                      title="Upcoming Matches"
                      cardGroups={upcomingData.sports}
                      isMobile={isMobile}
                      isLive={false}
                    />
                  )}
                </>
              )}
            </BackgroundRefreshIndicator>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default OddsPage;
