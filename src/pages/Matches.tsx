// pages/Matches.tsx
import React from "react";
import Layout from "@/components/Layout";
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
import { Match } from '@/types/match';

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

interface SportSectionProps {
  title: string;
  matches: Match[];
  isMobile: boolean;
}

/**
 * SportSection component for displaying matches of a specific sport
 */
const SportSection: React.FC<SportSectionProps> = ({ title, matches, isMobile }) => {
  const showSwiper = matches.length > 3;

  const swiperProps = {
    modules: [Pagination, Navigation],
    spaceBetween: 24,
    slidesPerView: isMobile ? 1 : 3,
    pagination: { 
      clickable: true,
      dynamicBullets: true
    },
    navigation: !isMobile,
    loop: matches.length > (isMobile ? 1 : 3),
    centeredSlides: isMobile
  };

  // Don't render section if no matches
  if (matches.length === 0) {
    return null;
  }

  return (
    <Box sx={sectionWrapperStyles}>
      <Box sx={sectionTitleContainerStyles}>
        <Typography component="span" sx={sectionTitleStyles}>
          {title}
        </Typography>
      </Box>
      
      <Box sx={swiperContainerStyles}>
        {(isMobile || showSwiper) ? (
          <Swiper {...swiperProps}>
            {matches.map((match, index) => (
              <SwiperSlide key={match.id || index}>
                <Box sx={{ px: 1 }}>
                  <MatchCard {...match} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Box sx={gridContainerStyles}>
            {matches.map((match, index) => (
              <Box key={match.id || index}>
                <MatchCard {...match} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

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

  // Calculate total matches across all sports
  const totalMatches = Object.values(data).reduce((sum, matches) => sum + matches.length, 0);

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

              {/* Matches Sections */}
              {totalMatches > 0 && (
                <Box>
                  <SportSection 
                    title="Cricket" 
                    matches={data.cricket} 
                    isMobile={isMobile} 
                  />
                  <SportSection 
                    title="Kabaddi" 
                    matches={data.kabaddi} 
                    isMobile={isMobile} 
                  />
                  <SportSection 
                    title="Football" 
                    matches={data.football} 
                    isMobile={isMobile} 
                  />
                  <SportSection 
                    title="Volleyball" 
                    matches={data.volleyball} 
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
