// pages/Matches.tsx
import React from "react";
import { Layout } from "@/components/Layout";
import MatchCard from "@/components/Match/MatchCard";
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress, 
  Button,
  Alert
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

// Custom hook and types
import { useMatches } from '@/hooks/useMatchData';
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
  errorContainerStyles,
  errorTextStyles,
  retryButtonStyles,
  emptyStateContainerStyles,
  emptyStateTextStyles,
  emptyStateSubtextStyles
} from '@/styles/matches.styles';



interface BoxingSectionProps {
  title: string;
  cardGroups: BoxingCardGroup[];
  isMobile: boolean;
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
 * Error component
 */
const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <Box sx={errorContainerStyles}>
    <Typography variant="h6" sx={errorTextStyles}>
      Something went wrong
    </Typography>
    <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
      {error}
    </Typography>
    <Button 
      variant="contained" 
      onClick={onRetry}
      sx={retryButtonStyles}
    >
      Try Again
    </Button>
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
const BoxingSection: React.FC<BoxingSectionProps> = ({ title, cardGroups, isMobile }) => {
  if (cardGroups.length === 0) {
    return null;
  }

  return (
    <Box sx={sectionWrapperStyles}>
      <Box sx={sectionTitleContainerStyles}>
        <Typography component="span" sx={sectionTitleStyles}>
          {title}
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
                      <MatchCard match={match} card={cardGroup.card} fixture_no={cardGroup.fixture_no} match_date={cardGroup.match_date} sportType="boxing" />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Box sx={gridContainerStyles}>
                {cardGroup.matches.map((match, index) => (
                  <Box key={`${match.match_no}-${index}`}>
                    <MatchCard match={match} card={cardGroup.card} fixture_no={cardGroup.fixture_no} match_date={cardGroup.match_date} sportType="boxing" />
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

  // Use custom hook for data management
  const { 
    data, 
    loading, 
    error, 
    refetch, 
    clearError 
  } = useMatches();

  // Handle retry
  const handleRetry = () => {
    clearError();
    refetch();
  };

  // Calculate total boxing matches
  const totalMatches = data.boxing ? data.boxing.reduce((sum, cardGroup) => sum + cardGroup.matches.length, 0) : 0;

  return (
    <Layout>
      <Box sx={matchesContainerStyles}>
        <Container maxWidth="lg" sx={matchesContentStyles}>
          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              onClose={clearError}
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          )}

          {/* Loading State */}
          {loading && <LoadingState />}

          {/* Error State */}
          {!loading && error && (
            <ErrorState error={error} onRetry={handleRetry} />
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              {/* Empty State */}
              {totalMatches === 0 && (
                <EmptyState />
              )}

              {/* Boxing Matches Section */}
              {totalMatches > 0 && (
                <Box>
                  <BoxingSection
                    title="Boxing"
                    cardGroups={data.boxing}
                    isMobile={isMobile}
                  />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
    </Layout>
  );
};

export default Matches;
