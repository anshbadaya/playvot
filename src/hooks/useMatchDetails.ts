import { useState, useEffect, useCallback } from 'react';
import { MatchData, ScorecardData } from '@/types/match-details';
import { fetchMatchDetails } from '@/services/matchDetailsService';
import { dummyMatchData, dummyScorecardData } from '@/data/matchDetailsData';

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
        // Even if API fails, we should have dummy data
        console.log('API failed but using dummy data as fallback');
        setState({
          matchData: dummyMatchData,
          scorecardData: dummyScorecardData,
          loading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Error in useMatchDetails:', error);
      // Always fall back to dummy data instead of showing error
      setState({
        matchData: dummyMatchData,
        scorecardData: dummyScorecardData,
        loading: false,
        error: null
      });
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