import { MatchesByType, MatchFilters, MatchesResponse, BoxingCardGroup } from '@/types/match';
import { dummyMatchesData } from '@/data/matchesData';
import { API_CONFIG, getApiHeaders } from '@/config/api';

/**
 * Fetch boxing matches from the real API
 * @returns Promise<BoxingCardGroup[]>
 */
const fetchBoxingMatches = async (): Promise<BoxingCardGroup[]> => {
  try {
    // Uncomment the line below to test dummy data fallback
    // throw new Error('Simulated API failure for testing dummy data');
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BOXING_FIXTURES}`, {
      method: 'GET',
      headers: getApiHeaders()
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    
    if (result.status === 'success' && result.data && result.data.length > 0) {
      return result.data;
    } else {
      // Return dummy data if API returns empty or invalid data
      console.log('API returned empty data, using dummy data for boxing matches');
      return dummyMatchesData.boxing;
    }
  } catch (error) {
    console.error('Error fetching boxing matches:', error);
    console.log('Using dummy data for boxing matches due to API error');
    return dummyMatchesData.boxing;
  }
};

/**
 * Fetch all matches grouped by sport type
 * @param filters - Optional filters for matches
 * @returns Promise<MatchesResponse>
 */
export const fetchMatches = async (filters?: MatchFilters): Promise<MatchesResponse> => {
  try {
    // Fetch boxing matches from real API
    const boxingMatches = await fetchBoxingMatches();
    
    // For other sports, continue using dummy data for now
    let filteredData: MatchesByType = {
      cricket: [...dummyMatchesData.cricket],
      kabaddi: [...dummyMatchesData.kabaddi],
      football: [...dummyMatchesData.football],
      volleyball: [...dummyMatchesData.volleyball],
      boxing: boxingMatches
    };
    
    if (filters) {
      if (filters.sportType) {
        const sportType = filters.sportType as keyof MatchesByType;
        if (filteredData[sportType]) {
          filteredData = {
            cricket: sportType === 'cricket' ? filteredData.cricket : [],
            kabaddi: sportType === 'kabaddi' ? filteredData.kabaddi : [],
            football: sportType === 'football' ? filteredData.football : [],
            volleyball: sportType === 'volleyball' ? filteredData.volleyball : [],
            boxing: sportType === 'boxing' ? filteredData.boxing : []
          };
        }
      }
      
      if (filters.isLive !== undefined) {
        Object.keys(filteredData).forEach(sportType => {
          const sportKey = sportType as keyof MatchesByType;
          if (sportKey !== 'boxing') {
            filteredData[sportKey] = filteredData[sportKey].filter(match => 
              filters.isLive ? match.isLive : !match.isLive
            );
          }
        });
      }
      
      if (filters.matchType) {
        Object.keys(filteredData).forEach(sportType => {
          const sportKey = sportType as keyof MatchesByType;
          if (sportKey !== 'boxing') {
            filteredData[sportKey] = filteredData[sportKey].filter(match => 
              match.matchType === filters.matchType
            );
          }
        });
      }
      
      // Filter boxing matches by card type
      if (filters.card && filteredData.boxing.length > 0) {
        filteredData.boxing = filteredData.boxing.filter(cardGroup => 
          cardGroup.card.toLowerCase() === filters.card?.toLowerCase()
        );
      }
    }
    
    // Calculate total matches
    const total = Object.entries(filteredData).reduce((sum, [sportType, matches]) => {
      if (sportType === 'boxing') {
        // For boxing, count the total number of matches across all card groups
        const boxingMatches = matches as BoxingCardGroup[];
        return sum + boxingMatches.reduce((boxingSum, cardGroup) => boxingSum + cardGroup.matches.length, 0);
      }
      return sum + matches.length;
    }, 0);
    
    return {
      data: filteredData,
      total,
      success: true
    };
  } catch (error) {
    console.error('Error fetching matches:', error);
    console.log('Using dummy data due to API error');
    return {
      data: dummyMatchesData,
      total: Object.entries(dummyMatchesData).reduce((sum, [sportType, matches]) => {
        if (sportType === 'boxing') {
          const boxingMatches = matches as BoxingCardGroup[];
          return sum + boxingMatches.reduce((boxingSum, cardGroup) => boxingSum + cardGroup.matches.length, 0);
        }
        return sum + matches.length;
      }, 0),
      success: true
    };
  }
};

/**
 * Fetch matches by sport type
 * @param sportType - The sport type to filter by
 * @param filters - Additional filters
 * @returns Promise<MatchesResponse>
 */
export const fetchMatchesBySport = async (
  sportType: keyof MatchesByType, 
  filters?: Omit<MatchFilters, 'sportType'>
): Promise<MatchesResponse> => {
  try {
    const allMatches = await fetchMatches({ ...filters, sportType });
    return allMatches;
  } catch (error) {
    console.error(`Error fetching ${sportType} matches:`, error);
    return {
      data: { cricket: [], kabaddi: [], football: [], volleyball: [], boxing: [] },
      total: 0,
      success: false,
      message: `Failed to fetch ${sportType} matches`
    };
  }
};

/**
 * Fetch live matches only
 * @returns Promise<MatchesResponse>
 */
export const fetchLiveMatches = async (): Promise<MatchesResponse> => {
  return fetchMatches({ isLive: true });
};

/**
 * Fetch upcoming matches
 * @returns Promise<MatchesResponse>
 */
export const fetchUpcomingMatches = async (): Promise<MatchesResponse> => {
  return fetchMatches({ isLive: false });
};

/**
 * Search matches by title or team names
 * @param query - Search query
 * @returns Promise<MatchesResponse>
 */
export const searchMatches = async (query: string): Promise<MatchesResponse> => {
  try {
    const allMatches = await fetchMatches();
    const searchQuery = query.toLowerCase();
    
    const filteredData: MatchesByType = {
      cricket: allMatches.data.cricket.filter(match => 
        match.matchTitle.toLowerCase().includes(searchQuery) ||
        match.team1.name.toLowerCase().includes(searchQuery) ||
        match.team2.name.toLowerCase().includes(searchQuery)
      ),
      kabaddi: allMatches.data.kabaddi.filter(match => 
        match.matchTitle.toLowerCase().includes(searchQuery) ||
        match.team1.name.toLowerCase().includes(searchQuery) ||
        match.team2.name.toLowerCase().includes(searchQuery)
      ),
      football: allMatches.data.football.filter(match => 
        match.matchTitle.toLowerCase().includes(searchQuery) ||
        match.team1.name.toLowerCase().includes(searchQuery) ||
        match.team2.name.toLowerCase().includes(searchQuery)
      ),
      volleyball: allMatches.data.volleyball.filter(match => 
        match.matchTitle.toLowerCase().includes(searchQuery) ||
        match.team1.name.toLowerCase().includes(searchQuery) ||
        match.team2.name.toLowerCase().includes(searchQuery)
      ),
      boxing: allMatches.data.boxing.filter(cardGroup => {
        // Search within card groups and their matches
        if (cardGroup.card.toLowerCase().includes(searchQuery)) {
          return true;
        }
        
        // Search within individual boxing matches
        return cardGroup.matches.some(match => 
          match.player_a.name.toLowerCase().includes(searchQuery) ||
          match.player_a.team.toLowerCase().includes(searchQuery) ||
          match.player_b.name.toLowerCase().includes(searchQuery) ||
          match.player_b.team.toLowerCase().includes(searchQuery) ||
          match.weight_category.toLowerCase().includes(searchQuery)
        );
      })
    };
    
    const total = Object.entries(filteredData).reduce((sum, [sportType, matches]) => {
      if (sportType === 'boxing') {
        // For boxing, count the total number of matches across all card groups
        const boxingMatches = matches as BoxingCardGroup[];
        return sum + boxingMatches.reduce((boxingSum, cardGroup) => boxingSum + cardGroup.matches.length, 0);
      }
      return sum + matches.length;
    }, 0);
    
    return {
      data: filteredData,
      total,
      success: true
    };
  } catch (error) {
    console.error('Error searching matches:', error);
    return {
      data: { cricket: [], kabaddi: [], football: [], volleyball: [], boxing: [] },
      total: 0,
      success: false,
      message: 'Failed to search matches'
    };
  }
};
