import { useState, useEffect, useCallback } from 'react';
import { MatchesByType, MatchFilters } from '@/types/match';
import { fetchMatches } from '@/services/matchService';

interface UseMatchesState {
  data: MatchesByType;
  loading: boolean;
  error: string | null;
  total: number;
}

interface UseMatchesReturn extends UseMatchesState {
  refetch: () => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for managing match data
 * @param initialFilters - Initial filters to apply
 * @returns UseMatchesReturn
 */
export const useMatches = (initialFilters?: MatchFilters): UseMatchesReturn => {
  const [state, setState] = useState<UseMatchesState>({
    data: { cricket: [], kabaddi: [], football: [], volleyball: [], boxing: [] },
    loading: false,
    error: null,
    total: 0
  });

  const fetchData = useCallback(async (filters?: MatchFilters) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      console.log('Fetching matches with filters:', filters);
      const response = await fetchMatches(filters);
      console.log('API Response:', response);
      
      if (response.success) {
        console.log('Setting data:', response.data);
        setState({
          data: response.data,
          loading: false,
          error: null,
          total: response.total
        });
      } else {
        console.log('API failed:', response.message);
        setState({
          data: { cricket: [], kabaddi: [], football: [], volleyball: [], boxing: [] },
          loading: false,
          error: response.message || 'Failed to fetch matches',
          total: 0
        });
      }
    } catch (error) {
      console.error('Error in useMatches:', error);
      setState({
        data: { cricket: [], kabaddi: [], football: [], volleyball: [], boxing: [] },
        loading: false,
        error: 'Failed to fetch matches from API',
        total: 0
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData(initialFilters);
  }, [fetchData, initialFilters]);

  return {
    ...state,
    refetch: () => fetchData(initialFilters),
    clearError
  };
};
