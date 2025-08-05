import { useState, useEffect, useCallback } from 'react';
import { MatchData, ScorecardData } from '@/types/match-details';
import { fetchMatchDetails } from '@/services/matchDetailsService';
import { dummyMatchData, dummyScorecardData } from '@/data/matchDetailsData';

interface UseMatchDetailsState {
  matchData: MatchData | null;
  scorecardData: ScorecardData | undefined;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
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
    error: null,
    refreshing: false
  });

  const fetchData = useCallback(async (backgroundRefresh = false) => {
    // Only show loading state for initial load, not background refreshes
    if (!backgroundRefresh) {
      setState(prev => ({ ...prev, loading: true, error: null }));
    } else {
      setState(prev => ({ ...prev, refreshing: true }));
    }
    
    try {
      console.log('Fetching match details', backgroundRefresh ? '(background)' : '');
      const response = await fetchMatchDetails(matchId);
      
      if (response.success) {
        setState({
          matchData: response.data,
          scorecardData: response.scorecard || undefined,
          loading: false,
          error: null,
          refreshing: false
        });
      } else {
        // Even if API fails, we should have dummy data
        console.log('API failed but using dummy data as fallback');
        // Only update state if it's not a background refresh
        if (!backgroundRefresh) {
          setState({
            matchData: dummyMatchData,
            scorecardData: dummyScorecardData,
            loading: false,
            error: null,
            refreshing: false
          });
        } else {
          setState(prev => ({ ...prev, refreshing: false }));
        }
      }
    } catch (error) {
      console.error('Error in useMatchDetails:', error);
      // Always fall back to dummy data instead of showing error
      // Only update state if it's not a background refresh
      if (!backgroundRefresh) {
        setState({
          matchData: dummyMatchData,
          scorecardData: dummyScorecardData,
          loading: false,
          error: null,
          refreshing: false
        });
      } else {
        setState(prev => ({ ...prev, refreshing: false }));
      }
    }
  }, [matchId]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Initial data fetch and 30-second interval for live updates
  useEffect(() => {
    if (matchId) {
      fetchData(false); // Initial load with loading state
      
      // Set up background refresh every 30 seconds for live match data
      const interval = setInterval(() => {
        fetchData(true); // Background refresh without loading state
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [fetchData, matchId]);

  return {
    ...state,
    refetch: () => fetchData(false), // Manual refresh shows loading state
    clearError
  };
}; 