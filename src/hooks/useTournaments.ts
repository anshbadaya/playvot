import { useState, useEffect } from 'react';
import { Tournament, TournamentFilters, TournamentsResponse } from '@/types/tournament';
import { fetchTournaments, fetchTournamentsBySport, searchTournaments } from '@/services/tournamentService';

interface UseTournamentsReturn {
  tournaments: Tournament[];
  filteredTournaments: Tournament[];
  loading: boolean;
  error: string | null;
  selectedSport: string;
  searchQuery: string;
  setSelectedSport: (sport: string) => void;
  setSearchQuery: (query: string) => void;
  refetch: () => void;
}

export const useTournaments = (): UseTournamentsReturn => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response: TournamentsResponse;
      
      if (searchQuery.trim()) {
        response = await searchTournaments(searchQuery);
      } else if (selectedSport === 'all') {
        response = await fetchTournaments();
      } else {
        response = await fetchTournamentsBySport(selectedSport);
      }
      
      if (response.success) {
        setTournaments(response.data);
        setFilteredTournaments(response.data);
      } else {
        setError(response.message || 'Failed to fetch tournaments');
      }
    } catch (err) {
      setError('An error occurred while fetching tournaments');
      console.error('Error fetching tournaments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedSport, searchQuery]);

  const refetch = () => {
    fetchData();
  };

  return {
    tournaments,
    filteredTournaments,
    loading,
    error,
    selectedSport,
    searchQuery,
    setSelectedSport,
    setSearchQuery,
    refetch
  };
};
