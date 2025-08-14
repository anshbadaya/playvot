// pages/Odds.tsx
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import OddsCard from "@/components/Match/OddsCard";
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress,
  Paper,
  IconButton
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
// Swiper removed - using responsive grid only

// Custom hook and types
import { useUpcomingMatches } from '@/hooks/useMatchData';
import { SportsCardGroup, SportsMatch } from '@/types/match';
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

// Demo data for single live odds
const demoLiveMatch: SportsMatch = {
  match_no: 1,
  player_a: {
    code: 1,
    name: "Team Alpha",
    team: "Alpha"
  },
  player_b: {
    code: 2,
    name: "Team Beta", 
    team: "Beta"
  },
  pre_match_odds: {
    a: 1.85,
    b: 2.15
  },
  live_match_odds: {
    a: 1.90,
    b: 2.10
  },
  weight_category: "T20",
  start_time: "18:30",
  end_time: "22:30",
  isLive: true
};

const demoLiveCardGroup: SportsCardGroup = {
  card: "Card A",
  fixture_no: 1,
  match_date: "2024-01-15",
  matches: [demoLiveMatch]
};

interface SportsSectionProps {
  title: string;
  cardGroups: SportsCardGroup[];
  isMobile: boolean;
  isLive?: boolean;
  onStreamsClick?: (match: SportsMatch) => void;
  showOnlyFirst?: boolean;
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
 * Video Stream Component
 */
interface VideoStreamProps {
  match: SportsMatch | null;
  onClose: () => void;
}

const VideoStream: React.FC<VideoStreamProps> = ({ match, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  if (!match) return null;

  return (
    <Paper
      sx={{
        position: 'fixed',
        top: isMobile ? '60px' : '80px',
        right: isMobile ? 'auto' : 0,
        left: isMobile ? '10%' : 'auto',
        width: isMobile ? '80%' : '50%',
        height: isMobile ? 'calc(100vh - 120px)' : 'calc(100vh - 160px)',
        zIndex: 1000,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: isMobile ? '12px' : 0,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
          background: 'rgba(15, 23, 42, 0.9)'
        }}
      >
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
          Live Stream - {match.player_a.name} vs {match.player_b.name}
        </Typography>
      </Box>

      {/* Video Content */}
      <Box
        sx={{
          width: '100%',
          flex: 1,
          padding: 2,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <iframe
          src="https://www.youtube-nocookie.com/embed/dhfhU1YQYZs?si=fkUSIWHawMbKFlCh"
          width="100%"
          height="100%"
          style={{ 
            border: 0, 
            borderRadius: '8px',
            overflow: 'hidden',
            pointerEvents: 'auto'
          }}
          title="Live Match Stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          scrolling="no"
        />
      </Box>

      {/* Close Button at Bottom */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          borderTop: '1px solid rgba(59, 130, 246, 0.2)',
          background: 'rgba(15, 23, 42, 0.9)'
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ 
            color: 'white',
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            padding: 2,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 1)',
              transform: 'scale(1.05)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          <CloseIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>
    </Paper>
  );
};

/**
 * SportsSection component for displaying sports matches grouped by card
 */
const SportsSection: React.FC<SportsSectionProps> = ({ 
  title, 
  cardGroups, 
  isMobile, 
  isLive = false, 
  onStreamsClick,
  showOnlyFirst = false 
}) => {
  if (cardGroups.length === 0) {
    return null;
  }

  // If showOnlyFirst is true, only show the first match from the first card group
  const displayCardGroups = showOnlyFirst && cardGroups.length > 0 
    ? [{
        ...cardGroups[0],
        matches: cardGroups[0].matches.slice(0, 1) // Only take the first match
      }]
    : cardGroups;

  // Check if this is a single card display (for live match)
  const isSingleCard = displayCardGroups.length === 1 && displayCardGroups[0].matches.length === 1;

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

      {displayCardGroups.map((cardGroup, groupIndex) => (
        <Box key={`${title}-${cardGroup.card}-${cardGroup.fixture_no}-${groupIndex}`} sx={{ mb: 4 }}>
          <Box sx={{
            ...gridContainerStyles,
            // Special styling for single card
            ...(isSingleCard && {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: { xs: '100%', sm: '500px', md: '600px' },
              margin: '0 auto',
              gridTemplateColumns: '1fr'
            })
          }}>
            {cardGroup.matches.map((match, index) => (
              <Box key={`${title}-${cardGroup.card}-${match.match_no}-${groupIndex}-${index}`} sx={{
                // Enhanced styling for single card
                ...(isSingleCard && {
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '500px', md: '600px' },
                  transform: 'scale(1.02)',
                  '&:hover': {
                    transform: 'scale(1.05) translateY(-8px)',
                    transition: 'all 0.3s ease'
                  }
                })
              }}>
                <OddsCard 
                  match={match} 
                  card={cardGroup.card} 
                  fixture_no={cardGroup.fixture_no} 
                  match_date={cardGroup.match_date} 
                  sportType="sports" 
                  isLive={isLive}
                  onStreamsClick={onStreamsClick}
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

  // State for video stream
  const [selectedMatch, setSelectedMatch] = useState<SportsMatch | null>(demoLiveMatch);

  // Use custom hook for upcoming matches only
  const { 
    data: upcomingData, 
    loading: upcomingLoading, 
    refreshing: upcomingRefreshing,
    total: upcomingTotal 
  } = useUpcomingMatches();

  // Handle streams click
  const handleStreamsClick = (match: SportsMatch) => {
    setSelectedMatch(match);
  };

  // Handle close video stream
  const handleCloseVideoStream = () => {
    setSelectedMatch(null);
  };

  // Calculate total upcoming matches
  const totalUpcomingMatches = upcomingData.sports ? upcomingData.sports.reduce((sum, cardGroup) => sum + cardGroup.matches.length, 0) : 0;

  console.log('Demo live match:', demoLiveMatch);
  console.log('Upcoming matches data:', upcomingData);
  console.log('Total upcoming matches:', totalUpcomingMatches);

  return (
    <Layout>
      <Box sx={{
        ...matchesContainerStyles,
        width: selectedMatch && !isMobile ? '50%' : '100%',
        transition: 'width 0.3s ease',
        backgroundColor: '#0A0A23 !important',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%) !important',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)',
          zIndex: -1
        }
      }}>
        <Container maxWidth="lg" sx={{
          ...matchesContentStyles,
          position: 'relative',
          zIndex: 1
        }}>
          {/* Live Match Section - Using demo data */}
          <Box sx={{ 
            mb: 6,
            pt: 2,
            pb: 4,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(15, 23, 42, 0.1) 100%)',
            borderRadius: 3,
            border: '1px solid rgba(59, 130, 246, 0.1)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
              borderRadius: 3,
              zIndex: -1
            }
          }}>
            <SportsSection
              title="Live Match"
              cardGroups={[demoLiveCardGroup]}
              isMobile={isMobile}
              isLive={true}
              onStreamsClick={handleStreamsClick}
            />
          </Box>

        </Container>
      </Box>

      {/* Video Stream Component */}
      <VideoStream 
        match={selectedMatch} 
        onClose={handleCloseVideoStream} 
      />
    </Layout>
  );
};

export default OddsPage;
