import { fetchMatches, fetchLiveMatchesResponse, fetchUpcomingMatchesResponse } from '../matchService';
import { API_CONFIG } from '@/config/api';

// Mock fetch globally
global.fetch = jest.fn();

describe('matchService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchSportsMatches', () => {
    it('should fetch sports matches from API successfully', async () => {
      const mockApiResponse = {
        status: 'success',
        data: [
          {
            card: 'MAIN CARD',
            fixture_no: 1,
            match_date: '2025-08-05',
            matches: [
              {
                match_no: 1,
                player_a: { code: 1091, name: 'Ashish Mehta', team: 'MUMBAI MUSCLE' },
                player_b: { code: 1002, name: 'Akash Handique', team: 'MP HATHODAS' },
                pre_match_odds: { a: 1.61, b: 2.33 },
                weight_category: '60 KG MEN'
              }
            ]
          }
        ]
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse
      });

      const result = await fetchMatches({ sportType: 'sports' });

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALL_FIXTURES}`,
        expect.any(Object)
      );
      expect(result.success).toBe(true);
      expect(result.data.sports).toHaveLength(1);
      expect(result.data.sports[0].card).toBe('MAIN CARD');
    });

    it('should handle API errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchMatches({ sportType: 'sports' });

      expect(result.success).toBe(true); // Still returns success with empty sports data
      expect(result.data.sports).toHaveLength(0);
    });
  });
}); 