import { useState, useEffect, useCallback } from 'react';
import { MatchesByType, MatchFilters } from '@/types/match';
import { fetchMatches, fetchLiveMatchesResponse, fetchUpcomingMatchesResponse } from '@/services/matchService';

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
    data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
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
          data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
          loading: false,
          error: response.message || 'Failed to fetch matches',
          total: 0
        });
      }
    } catch (error) {
      console.error('Error in useMatches:', error);
      setState({
        data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
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

interface UseLiveMatchesState extends UseMatchesState {
  refreshing: boolean;
}

interface UseLiveMatchesReturn extends UseLiveMatchesState {
  refetch: () => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for managing live match data (30-second refresh)
 * @returns UseLiveMatchesReturn
 */
export const useLiveMatches = (): UseLiveMatchesReturn => {
  const [state, setState] = useState<UseLiveMatchesState>({
    data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
    loading: false,
    error: null,
    total: 0,
    refreshing: false
  });

  const fetchLiveData = useCallback(async (backgroundRefresh = false) => {
    // Only show loading state for initial load, not background refreshes
    if (!backgroundRefresh) {
      setState(prev => ({ ...prev, loading: true, error: null }));
    } else {
      setState(prev => ({ ...prev, refreshing: true }));
    }
    
    try {
      console.log('Fetching live matches', backgroundRefresh ? '(background)' : '');
      const response = await fetchLiveMatchesResponse();
      console.log('Live API Response:', response);
      
      if (response.success) {
        console.log('Setting live data:', response.data);
        setState({
          data: response.data,
          loading: false,
          error: null,
          total: response.total,
          refreshing: false
        });
      } else {
        console.log('Live API failed:', response.message);
        // Only update error state if it's not a background refresh
        if (!backgroundRefresh) {
          setState({
            data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
            loading: false,
            error: response.message || 'Failed to fetch live matches',
            total: 0,
            refreshing: false
          });
        } else {
          setState(prev => ({ ...prev, refreshing: false }));
        }
      }
    } catch (error) {
      console.error('Error in useLiveMatches:', error);
      // Only update error state if it's not a background refresh
      if (!backgroundRefresh) {
        setState({
          data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
          loading: false,
          error: 'Failed to fetch live matches from API',
          total: 0,
          refreshing: false
        });
      } else {
        setState(prev => ({ ...prev, refreshing: false }));
      }
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Initial data fetch and 30-second interval
  useEffect(() => {
    fetchLiveData(false); // Initial load with loading state
    
    const interval = setInterval(() => {
      fetchLiveData(true); // Background refresh without loading state
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [fetchLiveData]);

  return {
    ...state,
    refetch: () => fetchLiveData(false), // Manual refresh shows loading state
    clearError
  };
};

interface UseUpcomingMatchesState extends UseMatchesState {
  refreshing: boolean;
}

interface UseUpcomingMatchesReturn extends UseUpcomingMatchesState {
  refetch: () => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for managing upcoming match data (2-minute refresh)
 * @returns UseUpcomingMatchesReturn
 */
export const useUpcomingMatches = (): UseUpcomingMatchesReturn => {
  const [state, setState] = useState<UseUpcomingMatchesState>({
    data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
    loading: false,
    error: null,
    total: 0,
    refreshing: false
  });

  const fetchUpcomingData = useCallback(async (backgroundRefresh = false) => {
    // Only show loading state for initial load, not background refreshes
    if (!backgroundRefresh) {
      setState(prev => ({ ...prev, loading: true, error: null }));
    } else {
      setState(prev => ({ ...prev, refreshing: true }));
    }
    
    try {
      console.log('Fetching upcoming matches', backgroundRefresh ? '(background)' : '');
      const response = await fetchUpcomingMatchesResponse();
      console.log('Upcoming API Response:', response);
      
      if (response.success) {
        console.log('Setting upcoming data:', response.data);
        setState({
          data: response.data,
          loading: false,
          error: null,
          total: response.total,
          refreshing: false
        });
      } else {
        console.log('Upcoming API failed:', response.message);
        // Only update error state if it's not a background refresh
        if (!backgroundRefresh) {
          setState({
            data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
            loading: false,
            error: response.message || 'Failed to fetch upcoming matches',
            total: 0,
            refreshing: false
          });
        } else {
          setState(prev => ({ ...prev, refreshing: false }));
        }
      }
    } catch (error) {
      console.error('Error in useUpcomingMatches:', error);
      // Only update error state if it's not a background refresh
      if (!backgroundRefresh) {
        setState({
          data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
          loading: false,
          error: 'Failed to fetch upcoming matches from API',
          total: 0,
          refreshing: false
        });
      } else {
        setState(prev => ({ ...prev, refreshing: false }));
      }
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Initial data fetch and 2-minute interval
  useEffect(() => {
    fetchUpcomingData(false); // Initial load with loading state
    
    const interval = setInterval(() => {
      fetchUpcomingData(true); // Background refresh without loading state
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [fetchUpcomingData]);

  return {
    ...state,
    refetch: () => fetchUpcomingData(false), // Manual refresh shows loading state
    clearError
  };
};
