import { useState, useEffect, useCallback } from 'react';
import { MatchData, ScorecardData } from '@/types/match-details';
import { fetchMatchDetails, fetchLiveCommentary, fetchBettingOdds, fetchWinProbability } from '@/services/matchDetailsService';

interface UseMatchDetailsState {
  matchData: MatchData | null;
  scorecardData: ScorecardData | null;
  loading: boolean;
  error: string | null;
}

interface UseMatchDetailsReturn extends UseMatchDetailsState {
  refetch: () => Promise<void>;
  refetchCommentary: () => Promise<void>;
  refetchOdds: () => Promise<void>;
  refetchProbability: () => Promise<void>;
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
    scorecardData: null,
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
          scorecardData: response.scorecard,
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

  const refetchCommentary = useCallback(async () => {
    if (!state.matchData) return;
    
    try {
      const newCommentary = await fetchLiveCommentary(matchId);
      
      if (newCommentary.length > 0) {
        setState(prev => ({
          ...prev,
          matchData: prev.matchData ? {
            ...prev.matchData,
            commentary: [...prev.matchData.commentary, ...newCommentary]
          } : null
        }));
      }
    } catch (error) {
      // console.error('Error fetching commentary updates:', error);
    }
  }, [matchId, state.matchData]);

  const refetchOdds = useCallback(async () => {
    if (!state.matchData) return;
    
    try {
      const newOdds = await fetchBettingOdds(matchId);
      
      setState(prev => ({
        ...prev,
        matchData: prev.matchData ? {
          ...prev.matchData,
          bettingOdds: newOdds
        } : null
      }));
    } catch (error) {
      // console.error('Error fetching odds updates:', error);
    }
  }, [matchId, state.matchData]);

  const refetchProbability = useCallback(async () => {
    if (!state.matchData) return;
    
    try {
      const newProbability = await fetchWinProbability(matchId);
      
      setState(prev => ({
        ...prev,
        matchData: prev.matchData ? {
          ...prev.matchData,
          winProbability: newProbability
        } : null
      }));
    } catch (error) {
      // console.error('Error fetching probability updates:', error);
    }
  }, [matchId, state.matchData]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Initial data fetch
  useEffect(() => {
    if (matchId) {
      fetchData();
    }
  }, [fetchData, matchId]);

  // Set up polling for live updates
  useEffect(() => {
    if (!state.matchData) return;

    const commentaryInterval = setInterval(refetchCommentary, 10000); // Every 10 seconds
    const oddsInterval = setInterval(refetchOdds, 30000); // Every 30 seconds
    const probabilityInterval = setInterval(refetchProbability, 60000); // Every minute

    return () => {
      clearInterval(commentaryInterval);
      clearInterval(oddsInterval);
      clearInterval(probabilityInterval);
    };
  }, [state.matchData, refetchCommentary, refetchOdds, refetchProbability]);

  return {
    ...state,
    refetch: fetchData,
    refetchCommentary,
    refetchOdds,
    refetchProbability,
    clearError
  };
}; 