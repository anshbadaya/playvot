import { fetchMatches } from '../matchService';
import { API_CONFIG } from '@/config/api';

// Mock fetch globally
global.fetch = jest.fn();

describe('Match Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchBoxingMatches', () => {
    it('should fetch boxing matches from API successfully', async () => {
      const mockResponse = {
        status: 'success',
        data: [
          {
            card: 'MAIN CARD',
            fixture_no: 1,
            match_date: '2025-08-05',
            matches: [
              {
                match_no: 1,
                player_a: { code: 1102, name: 'Kyle Cummings', team: 'MUMBAI MUSCLE' },
                player_b: { code: 1010, name: 'Rino Thomas', team: 'MP HATHODAS' },
                pre_match_odds: { a: 1.1, b: 6.9 },
                weight_category: '90 KG MEN'
              }
            ]
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchMatches();
      
      expect(fetch).toHaveBeenCalledWith(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BOXING_FIXTURES}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.API_KEY}`
          }
        }
      );

      expect(result.success).toBe(true);
      expect(result.data.boxing).toHaveLength(1);
      expect(result.data.boxing[0].card).toBe('MAIN CARD');
    });

    it('should handle API errors gracefully', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchMatches();
      
      expect(result.success).toBe(true); // Still returns success with empty boxing data
      expect(result.data.boxing).toHaveLength(0);
    });
  });
}); 