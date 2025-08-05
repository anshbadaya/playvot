import { MatchesByType, MatchFilters, MatchesResponse, BoxingCardGroup } from '@/types/match';
import { API_CONFIG, getApiHeaders } from '@/config/api';

/**
 * Fetch live matches from the API endpoint
 * @returns Promise<MatchesByType>
 */
const fetchLiveMatches = async (): Promise<MatchesByType> => {
  try {
    console.log('Fetching live matches from API:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LIVE_FIXTURES}`);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LIVE_FIXTURES}`, {
      method: 'GET',
      headers: getApiHeaders()
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log('Raw live API response:', result);
    
    if (result.status === 'success' && result.data) {
      console.log('Live API data received:', result.data);
      console.log('Number of live card groups:', result.data.length);
      
      const matchesByType: MatchesByType = {
        cricket: [],
        kabaddi: [],
        football: [],
        volleyball: [],
        boxing: result.data
      };

      console.log('Processed live matches by type:', matchesByType);
      return matchesByType;
    } else {
      console.log('Live API returned empty or invalid data');
      return {
        cricket: [],
        kabaddi: [],
        football: [],
        volleyball: [],
        boxing: []
      };
    }
  } catch (error) {
    console.error('Error fetching live matches:', error);
    throw error;
  }
};

/**
 * Fetch upcoming matches from the API endpoint
 * @returns Promise<MatchesByType>
 */
const fetchUpcomingMatches = async (): Promise<MatchesByType> => {
  try {
    console.log('Fetching upcoming matches from API:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALL_FIXTURES}`);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALL_FIXTURES}`, {
      method: 'GET',
      headers: getApiHeaders()
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log('Raw upcoming API response:', result);
    
    if (result.status === 'success' && result.data) {
      console.log('Upcoming API data received:', result.data);
      console.log('Number of upcoming card groups:', result.data.length);
      
      const matchesByType: MatchesByType = {
        cricket: [],
        kabaddi: [],
        football: [],
        volleyball: [],
        boxing: result.data
      };

      console.log('Processed upcoming matches by type:', matchesByType);
      return matchesByType;
    } else {
      console.log('Upcoming API returned empty or invalid data');
      return {
        cricket: [],
        kabaddi: [],
        football: [],
        volleyball: [],
        boxing: []
      };
    }
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    throw error;
  }
};

/**
 * Fetch all matches grouped by sport type (legacy function)
 * @param filters - Optional filters for matches
 * @returns Promise<MatchesResponse>
 */
export const fetchMatches = async (filters?: MatchFilters): Promise<MatchesResponse> => {
  try {
    // Fetch upcoming matches by default
    const allMatches = await fetchUpcomingMatches();
    
    let filteredData: MatchesByType = { ...allMatches };
    
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
    return {
      data: { cricket: [], kabaddi: [], football: [], volleyball: [], boxing: [] },
      total: 0,
      success: false,
      message: 'Failed to fetch matches from API'
    };
  }
};

/**
 * Fetch live matches only
 * @returns Promise<MatchesResponse>
 */
export const fetchLiveMatchesResponse = async (): Promise<MatchesResponse> => {
  try {
    const liveMatches = await fetchLiveMatches();
    
    const total = Object.entries(liveMatches).reduce((sum, [sportType, matches]) => {
      if (sportType === 'boxing') {
        const boxingMatches = matches as BoxingCardGroup[];
        return sum + boxingMatches.reduce((boxingSum, cardGroup) => boxingSum + cardGroup.matches.length, 0);
      }
      return sum + matches.length;
    }, 0);
    
    return {
      data: liveMatches,
      total,
      success: true
    };
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return {
      data: { cricket: [], kabaddi: [], football: [], volleyball: [], boxing: [] },
      total: 0,
      success: false,
      message: 'Failed to fetch live matches from API'
    };
  }
};

/**
 * Fetch upcoming matches only
 * @returns Promise<MatchesResponse>
 */
export const fetchUpcomingMatchesResponse = async (): Promise<MatchesResponse> => {
  try {
    const upcomingMatches = await fetchUpcomingMatches();
    
    const total = Object.entries(upcomingMatches).reduce((sum, [sportType, matches]) => {
      if (sportType === 'boxing') {
        const boxingMatches = matches as BoxingCardGroup[];
        return sum + boxingMatches.reduce((boxingSum, cardGroup) => boxingSum + cardGroup.matches.length, 0);
      }
      return sum + matches.length;
    }, 0);
    
    return {
      data: upcomingMatches,
      total,
      success: true
    };
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return {
      data: { cricket: [], kabaddi: [], football: [], volleyball: [], boxing: [] },
      total: 0,
      success: false,
      message: 'Failed to fetch upcoming matches from API'
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
