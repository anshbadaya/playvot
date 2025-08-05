import { renderHook, act } from '@testing-library/react';
import { useLiveMatches, useUpcomingMatches } from '../useMatchData';
import { fetchLiveMatchesResponse, fetchUpcomingMatchesResponse } from '../../services/matchService';

// Mock the service functions
jest.mock('../../services/matchService', () => ({
  fetchLiveMatchesResponse: jest.fn(),
  fetchUpcomingMatchesResponse: jest.fn(),
}));

describe('useMatchData hooks with background refresh', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('useLiveMatches', () => {
    it('should show loading state on initial load but not on background refresh', async () => {
      const mockResponse = {
        success: true,
        data: { cricket: [], kabaddi: [], football: [], volleyball: [], boxing: [] },
        total: 0
      };

      (fetchLiveMatchesResponse as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useLiveMatches());

      // Initial load should show loading state
      expect(result.current.loading).toBe(true);
      expect(result.current.refreshing).toBe(false);

      // Wait for initial fetch to complete
      await act(async () => {
        await Promise.resolve();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.refreshing).toBe(false);

      // Trigger background refresh
      await act(async () => {
        jest.advanceTimersByTime(30000); // 30 seconds
      });

      // Check refreshing state immediately after timer advance
      expect(result.current.loading).toBe(false);
      expect(result.current.refreshing).toBe(true);

      // Wait for background refresh to complete
      await act(async () => {
        await Promise.resolve();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.refreshing).toBe(false);
    });

    it('should handle API errors gracefully during background refresh', async () => {
      const mockResponse = {
        success: false,
        message: 'API Error'
      };

      (fetchLiveMatchesResponse as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useLiveMatches());

      // Wait for initial fetch to complete
      await act(async () => {
        await Promise.resolve();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('API Error');

      // Trigger background refresh
      await act(async () => {
        jest.advanceTimersByTime(30000); // 30 seconds
      });

      // Background refresh should not update error state
      expect(result.current.loading).toBe(false);
      expect(result.current.refreshing).toBe(false);
      expect(result.current.error).toBe('API Error');
    });
  });

  describe('useUpcomingMatches', () => {
    it('should show loading state on initial load but not on background refresh', async () => {
      const mockResponse = {
        success: true,
        data: { cricket: [], kabaddi: [], football: [], volleyball: [], boxing: [] },
        total: 0
      };

      (fetchUpcomingMatchesResponse as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useUpcomingMatches());

      // Initial load should show loading state
      expect(result.current.loading).toBe(true);
      expect(result.current.refreshing).toBe(false);

      // Wait for initial fetch to complete
      await act(async () => {
        await Promise.resolve();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.refreshing).toBe(false);

      // Trigger background refresh
      await act(async () => {
        jest.advanceTimersByTime(120000); // 2 minutes
      });

      // Check refreshing state immediately after timer advance
      expect(result.current.loading).toBe(false);
      expect(result.current.refreshing).toBe(true);

      // Wait for background refresh to complete
      await act(async () => {
        await Promise.resolve();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.refreshing).toBe(false);
    });
  });
}); 