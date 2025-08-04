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
    data: { cricket: [], kabaddi: [], football: [], volleyball: [] },
    loading: false,
    error: null,
    total: 0
  });

  const fetchData = useCallback(async (filters?: MatchFilters) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetchMatches(filters);
      
      if (response.success) {
        setState({
          data: response.data,
          loading: false,
          error: null,
          total: response.total
        });
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.message || 'Failed to fetch matches'
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }));
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
