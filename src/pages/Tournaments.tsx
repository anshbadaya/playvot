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

  // Status filter: all | upcoming | ongoing (live)
  const [selectedStatus, setSelectedStatus] = React.useState<'all' | 'upcoming' | 'ongoing'>('all');

  const handleSportChange = (event: React.MouseEvent<HTMLElement>, newSport: string) => {
    if (newSport !== null) {
      setSelectedSport(newSport);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event: React.MouseEvent<HTMLElement>, newStatus: 'all' | 'upcoming' | 'ongoing' | null) => {
    if (newStatus !== null) {
      setSelectedStatus(newStatus);
    }
  };

  const displayedTournaments = React.useMemo(() => {
    const statusPriority: Record<string, number> = { ongoing: 0, upcoming: 1, completed: 2 };
    const base = selectedStatus === 'all'
      ? filteredTournaments
      : filteredTournaments.filter(t => t.status === selectedStatus);
    return [...base].sort((a, b) => {
      const diff = (statusPriority[a.status] ?? 99) - (statusPriority[b.status] ?? 99);
      if (diff !== 0) return diff;
      // Secondary sort by date ascending if same status
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return da - db;
    });
  }, [filteredTournaments, selectedStatus]);

  const selectedSportLabel = selectedSport === 'all' ? 'All' : (sportOptions.find(s => s.value === selectedSport)?.label || 'All');
  const selectedStatusLabel = selectedStatus === 'all' ? '' : (selectedStatus === 'ongoing' ? 'Ongoing' : 'Upcoming');

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
            {/* Sports Filter */}
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

            {/* Status Filter */}
            <ToggleButtonGroup
              value={selectedStatus}
              exclusive
              onChange={handleStatusChange}
              aria-label="status selection"
              sx={sportSelectorStyles}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="ongoing">Ongoing</ToggleButton>
              <ToggleButton value="upcoming">Upcoming</ToggleButton>
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
                {`${selectedSportLabel} ${selectedStatusLabel}`.trim()} Tournaments
              </Typography>
              <Chip 
                label={`${displayedTournaments.length} tournaments`} 
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

            {!loading && !error && displayedTournaments.length === 0 && (
              <EmptyState 
                message={
                  searchQuery 
                    ? `No tournaments found for "${searchQuery}"`
                    : `No tournaments available for ${selectedSportLabel}${selectedStatus !== 'all' ? ` (${selectedStatusLabel})` : ''}`
                }
              />
            )}

            {!loading && !error && displayedTournaments.length > 0 && (
              <Box sx={tournamentsGridStyles}>
                {displayedTournaments.map((tournament) => (
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
