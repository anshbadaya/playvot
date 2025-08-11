import React from 'react';
import { Layout } from '@/components/Layout';
import { TournamentCard } from '@/components/Tournament';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress,
  ToggleButtonGroup, 
  ToggleButton,
  TextField,
  InputAdornment,
  Alert,
  Chip
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useTournaments } from '@/hooks';
import { SportOption } from '@/types/tournament';

// Styles
import {
  tournamentsContainerStyles,
  tournamentsContentStyles,
  pageHeaderStyles,
  pageTitleStyles,
  pageSubtitleStyles,
  controlsSectionStyles,
  sportSelectorStyles,
  searchFieldStyles,
  resultsSectionStyles,
  resultsHeaderStyles,
  resultsTitleStyles,
  resultsCountStyles,
  tournamentsGridStyles,
  loadingContainerStyles,
  errorContainerStyles,
  emptyStateContainerStyles,
  emptyStateTextStyles,
  emptyStateSubtextStyles
} from '@/styles/tournaments.styles';

const sportOptions: SportOption[] = [
  { value: 'all', label: 'All Sports', icon: '' },
  { value: 'cricket', label: 'Cricket', icon: '' },
  { value: 'kabaddi', label: 'Kabaddi', icon: '' },
  { value: 'football', label: 'Football', icon: '' },
  { value: 'basketball', label: 'Basketball', icon: '' },
  { value: 'volleyball', label: 'Volleyball', icon: '' },
  { value: 'table-tennis', label: 'Table Tennis', icon: '' }
];

/**
 * Loading component
 */
const LoadingState: React.FC = () => (
  <Box sx={loadingContainerStyles}>
    <CircularProgress size={40} />
    <Typography sx={{ ml: 2 }}>Loading tournaments...</Typography>
  </Box>
);

/**
 * Empty state component
 */
const EmptyState: React.FC<{ message?: string }> = ({ message = "No tournaments found" }) => (
  <Box sx={emptyStateContainerStyles}>
    <Typography variant="h6" sx={emptyStateTextStyles}>
      {message}
    </Typography>
    <Typography sx={emptyStateSubtextStyles}>
      Check back later for new tournaments
    </Typography>
  </Box>
);

/**
 * Main Tournaments page component
 */
const Tournaments: React.FC = () => {
  const {
    filteredTournaments,
    loading,
    error,
    selectedSport,
    searchQuery,
    setSelectedSport,
    setSearchQuery
  } = useTournaments();

  const handleSportChange = (event: React.MouseEvent<HTMLElement>, newSport: string) => {
    if (newSport !== null) {
      setSelectedSport(newSport);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Layout>
      <Box sx={tournamentsContainerStyles}>
        <Container maxWidth="lg" sx={tournamentsContentStyles}>
          {/* Page Header */}
          <Box sx={pageHeaderStyles}>
            <Typography sx={pageTitleStyles}>
              Tournaments
            </Typography>
            <Typography sx={pageSubtitleStyles}>
              Discover and explore exciting tournaments across various sports. Select your favorite sport to view upcoming events, fixtures, and event data.
            </Typography>
          </Box>

          {/* Controls Section */}
          <Box sx={controlsSectionStyles}>
            <ToggleButtonGroup
              value={selectedSport}
              exclusive
              onChange={handleSportChange}
              aria-label="sport selection"
              sx={sportSelectorStyles}
            >
              {sportOptions.map((sport) => (
                <ToggleButton key={sport.value} value={sport.value}>
                  {sport.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            <TextField
              fullWidth
              placeholder="Search tournaments by name, location, or venue..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={searchFieldStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Results Section */}
          <Box sx={resultsSectionStyles}>
            <Box sx={resultsHeaderStyles}>
              <Typography sx={resultsTitleStyles}>
                {selectedSport === 'all' ? 'All Tournaments' : `${sportOptions.find(s => s.value === selectedSport)?.label} Tournaments`}
              </Typography>
              <Chip 
                label={`${filteredTournaments.length} tournaments`} 
                sx={resultsCountStyles}
              />
            </Box>

            {loading && <LoadingState />}

            {error && (
              <Box sx={errorContainerStyles}>
                <Alert severity="error" sx={{ maxWidth: 600 }}>
                  {error}
                </Alert>
              </Box>
            )}

            {!loading && !error && filteredTournaments.length === 0 && (
              <EmptyState 
                message={
                  searchQuery 
                    ? `No tournaments found for "${searchQuery}"`
                    : `No tournaments available for ${selectedSport === 'all' ? 'selected criteria' : sportOptions.find(s => s.value === selectedSport)?.label}`
                }
              />
            )}

            {!loading && !error && filteredTournaments.length > 0 && (
              <Box sx={tournamentsGridStyles}>
                {filteredTournaments.map((tournament) => (
                  <Box key={tournament.id}>
                    <TournamentCard tournament={tournament} />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Tournaments;
