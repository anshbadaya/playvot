// pages/Matches.tsx
import React from "react";
import { Layout } from "@/components/Layout";
import MatchCard from "@/components/Match/MatchCard";
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

// Custom hook and types
import { useLiveMatches, useUpcomingMatches } from '@/hooks/useMatchData';
import { BoxingCardGroup } from '@/types/match';

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

interface BoxingSectionProps {
  title: string;
  cardGroups: BoxingCardGroup[];
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
 * BoxingSection component for displaying boxing matches grouped by card
 */
const BoxingSection: React.FC<BoxingSectionProps> = ({ title, cardGroups, isMobile, isLive = false }) => {
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
        <Box key={`${cardGroup.card}-${cardGroup.fixture_no}`} sx={{ mb: 4 }}>
          
          <Box sx={swiperContainerStyles}>
            {(isMobile || cardGroup.matches.length > 3) ? (
              <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={24}
                slidesPerView={isMobile ? 1 : 3}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true
                }}
                navigation={!isMobile}
                loop={cardGroup.matches.length > (isMobile ? 1 : 3)}
                centeredSlides={isMobile}
              >
                {cardGroup.matches.map((match, index) => (
                  <SwiperSlide key={`${match.match_no}-${index}`}>
                    <Box sx={{ px: 1 }}>
                      <MatchCard 
                        match={match} 
                        card={cardGroup.card} 
                        fixture_no={cardGroup.fixture_no} 
                        match_date={cardGroup.match_date} 
                        sportType="boxing" 
                        isLive={isLive}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Box sx={gridContainerStyles}>
                {cardGroup.matches.map((match, index) => (
                  <Box key={`${match.match_no}-${index}`}>
                    <MatchCard 
                      match={match} 
                      card={cardGroup.card} 
                      fixture_no={cardGroup.fixture_no} 
                      match_date={cardGroup.match_date} 
                      sportType="boxing" 
                      isLive={isLive}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

/**
 * Main Matches page component
 */
const Matches: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Use custom hooks for live and upcoming matches
  const { 
    data: liveData, 
    loading: liveLoading, 
    total: liveTotal 
  } = useLiveMatches();

  const { 
    data: upcomingData, 
    loading: upcomingLoading, 
    total: upcomingTotal 
  } = useUpcomingMatches();

  // Calculate total matches for each section
  const totalLiveMatches = liveData.boxing ? liveData.boxing.reduce((sum, cardGroup) => sum + cardGroup.matches.length, 0) : 0;
  const totalUpcomingMatches = upcomingData.boxing ? upcomingData.boxing.reduce((sum, cardGroup) => sum + cardGroup.matches.length, 0) : 0;

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
            {liveLoading && <LoadingState />}
            
            {!liveLoading && (
              <>
                {totalLiveMatches === 0 ? (
                  <EmptyState message="No live matches currently" />
                ) : (
                  <BoxingSection
                    title="Live Matches"
                    cardGroups={liveData.boxing}
                    isMobile={isMobile}
                    isLive={true}
                  />
                )}
              </>
            )}
          </Box>

          {/* Upcoming Matches Section */}
          <Box>
            {upcomingLoading && <LoadingState />}
            
            {!upcomingLoading && (
              <>
                {totalUpcomingMatches === 0 ? (
                  <EmptyState message="No upcoming matches found" />
                ) : (
                  <BoxingSection
                    title="Upcoming Matches"
                    cardGroups={upcomingData.boxing}
                    isMobile={isMobile}
                    isLive={false}
                  />
                )}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Matches;
