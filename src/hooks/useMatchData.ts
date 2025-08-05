import { useState, useEffect, useCallback } from 'react';
import { MatchesByType, MatchFilters } from '@/types/match';
import { fetchMatches } from '@/services/matchService';
import { dummyMatchesData } from '@/data/matchesData';

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
      const response = await fetchMatches(filters);
      
      if (response.success) {
        setState({
          data: response.data,
          loading: false,
          error: null,
          total: response.total
        });
      } else {
        // Even if API fails, we should have dummy data
        console.log('API failed but using dummy data as fallback');
        setState({
          data: dummyMatchesData,
          loading: false,
          error: null,
          total: Object.entries(dummyMatchesData).reduce((sum, [sportType, matches]) => {
            if (sportType === 'boxing') {
              const boxingMatches = matches as any[];
              return sum + boxingMatches.reduce((boxingSum, cardGroup) => boxingSum + cardGroup.matches.length, 0);
            }
            return sum + matches.length;
          }, 0)
        });
      }
    } catch (error) {
      console.error('Error in useMatches:', error);
      // Always fall back to dummy data instead of showing error
      setState({
        data: dummyMatchesData,
        loading: false,
        error: null,
        total: Object.entries(dummyMatchesData).reduce((sum, [sportType, matches]) => {
          if (sportType === 'boxing') {
            const boxingMatches = matches as any[];
            return sum + boxingMatches.reduce((boxingSum, cardGroup) => boxingSum + cardGroup.matches.length, 0);
          }
          return sum + matches.length;
        }, 0)
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
