import { useState, useEffect, useCallback } from 'react';
import { MatchData, ScorecardData } from '@/types/match-details';
import { fetchMatchDetails } from '@/services/matchDetailsService';

interface UseMatchDetailsState {
  matchData: MatchData | null;
  scorecardData: ScorecardData | undefined;
  loading: boolean;
  error: string | null;
}

interface UseMatchDetailsReturn extends UseMatchDetailsState {
  refetch: () => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for managing match details data
 * @param matchId - The unique identifier for the match
 * @returns UseMatchDetailsReturn
 */
export const useMatchDetails = (matchId: string): UseMatchDetailsReturn => {
  const [state, setState] = useState<UseMatchDetailsState>({
    matchData: null,
    scorecardData: undefined,
    loading: false,
    error: null
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetchMatchDetails(matchId);
      
      if (response.success) {
        setState({
          matchData: response.data,
          scorecardData: response.scorecard || undefined,
          loading: false,
          error: null
        });
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.message || 'Failed to fetch match details'
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }));
    }
  }, [matchId]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Initial data fetch
  useEffect(() => {
    if (matchId) {
      fetchData();
    }
  }, [fetchData, matchId]);

  return {
    ...state,
    refetch: fetchData,
    clearError
  };
}; 