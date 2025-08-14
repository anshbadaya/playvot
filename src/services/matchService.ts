import { MatchesByType, MatchFilters, MatchesResponse, SportsCardGroup } from '@/types/match';
import { API_CONFIG, getApiHeaders } from '@/config/api';

/**
 * Fetch live matches from the API endpoint
 * @returns Promise<MatchesByType>
 */
const fetchLiveMatches = async (): Promise<MatchesByType> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LIVE_FIXTURES}`, {
      method: 'GET',
      headers: getApiHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Live matches API response:', responseData);

    // Validate API response structure
    if (!responseData.data || !Array.isArray(responseData.data)) {
      console.error('Invalid API response structure - missing or invalid data array:', responseData);
      throw new Error('Invalid API response structure');
    }

    // Transform API response to match our data structure
    // The API returns data in responseData.data array
    const now = new Date();
    
    // Add isLive property to each match based on current time
    const processedData = responseData.data.map((cardGroup: any) => ({
      ...cardGroup,
      matches: cardGroup.matches.map((match: any) => {
        const startDate = new Date(`${cardGroup.match_date}T${match.start_time}`);
        const endDate = new Date(`${cardGroup.match_date}T${match.end_time}`);
        const isLive = now >= startDate && now <= endDate;
        
        return {
          ...match,
          isLive
        };
      })
    }));
    
    const transformedData = {
      cricket: [],
      kabaddi: [],
      football: [],
      volleyball: [],
      sports: processedData, // Use the processed data with isLive property
    };
    
    console.log('Transformed live matches data:', transformedData);
    console.log('Number of sports card groups:', transformedData.sports.length);
    if (transformedData.sports.length > 0) {
      console.log('First card group:', transformedData.sports[0]);
      console.log('Number of matches in first group:', transformedData.sports[0].matches?.length || 0);
    }
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching live matches from API:', error);
    // Return empty data structure on error
    return {
      cricket: [],
      kabaddi: [],
      football: [],
      volleyball: [],
      sports: [],
    };
  }
};

/**
 * Fetch upcoming matches from the API endpoint
 * @returns Promise<MatchesByType>
 */
const fetchUpcomingMatches = async (): Promise<MatchesByType> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALL_FIXTURES}`, {
      method: 'GET',
      headers: getApiHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Upcoming matches API response:', responseData);

    // Validate API response structure
    if (!responseData.data || !Array.isArray(responseData.data)) {
      console.error('Invalid API response structure - missing or invalid data array:', responseData);
      throw new Error('Invalid API response structure');
    }

    // Transform API response to match our data structure
    // The API returns data in responseData.data array
    const now = new Date();
    
    // Add isLive property to each match based on current time
    const processedData = responseData.data.map((cardGroup: any) => ({
      ...cardGroup,
      matches: cardGroup.matches.map((match: any) => {
        const startDate = new Date(`${cardGroup.match_date}T${match.start_time}`);
        const endDate = new Date(`${cardGroup.match_date}T${match.end_time}`);
        const isLive = now >= startDate && now <= endDate;
        
        return {
          ...match,
          isLive
        };
      })
    }));
    
    const transformedData = {
      cricket: [],
      kabaddi: [],
      football: [],
      volleyball: [],
      sports: processedData, // Use the processed data with isLive property
    };
    
    console.log('Transformed upcoming matches data:', transformedData);
    console.log('Number of sports card groups:', transformedData.sports.length);
    if (transformedData.sports.length > 0) {
      console.log('First card group:', transformedData.sports[0]);
      console.log('Number of matches in first group:', transformedData.sports[0].matches?.length || 0);
    }
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching upcoming matches from API:', error);
    // Return empty data structure on error
    return {
      cricket: [],
      kabaddi: [],
      football: [],
      volleyball: [],
      sports: [],
    };
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
            sports: sportType === 'sports' ? filteredData.sports : []
          };
        }
      }
      
      if (filters.isLive !== undefined) {
        Object.keys(filteredData).forEach(sportType => {
          const sportKey = sportType as keyof MatchesByType;
          if (sportKey !== 'sports') {
            filteredData[sportKey] = filteredData[sportKey].filter(match => 
              filters.isLive ? match.isLive : !match.isLive
            );
          } else {
            // Filter sports matches by isLive status
            filteredData.sports = filteredData.sports.map(cardGroup => ({
              ...cardGroup,
              matches: cardGroup.matches.filter(match => 
                filters.isLive ? match.isLive : !match.isLive
              )
            })).filter(cardGroup => cardGroup.matches.length > 0);
          }
        });
      }
      
      if (filters.matchType) {
        Object.keys(filteredData).forEach(sportType => {
          const sportKey = sportType as keyof MatchesByType;
          if (sportKey !== 'sports') {
            filteredData[sportKey] = filteredData[sportKey].filter(match => 
              match.matchType === filters.matchType
            );
          }
        });
      }
      
      // Filter sports matches by card type
      if (filters.card && filteredData.sports.length > 0) {
        filteredData.sports = filteredData.sports.filter(cardGroup => 
          cardGroup.card.toLowerCase() === filters.card?.toLowerCase()
        );
      }
    }
    
    // Calculate total matches
    const total = Object.entries(filteredData).reduce((sum, [sportType, matches]) => {
      if (sportType === 'sports') {
        const sportsMatches = matches as SportsCardGroup[];
        return sum + sportsMatches.reduce((sportsSum, cardGroup) => sportsSum + cardGroup.matches.length, 0);
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
      data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
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
      if (sportType === 'sports') {
        const sportsMatches = matches as SportsCardGroup[];
        return sum + sportsMatches.reduce((sportsSum, cardGroup) => sportsSum + cardGroup.matches.length, 0);
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
      data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
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
      if (sportType === 'sports') {
        const sportsMatches = matches as SportsCardGroup[];
        return sum + sportsMatches.reduce((sportsSum, cardGroup) => sportsSum + cardGroup.matches.length, 0);
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
      data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
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
      data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
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
      sports: allMatches.data.sports.filter(cardGroup => {
        // Search within card groups and their matches
        if (cardGroup.card.toLowerCase().includes(searchQuery)) {
          return true;
        }
        
        // Search within individual sports matches
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
      if (sportType === 'sports') {
        // For sports, count the total number of matches across all card groups
        const sportsMatches = matches as SportsCardGroup[];
        return sum + sportsMatches.reduce((sportsSum, cardGroup) => sportsSum + cardGroup.matches.length, 0);
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
      data: { cricket: [], kabaddi: [], football: [], volleyball: [], sports: [] },
      total: 0,
      success: false,
      message: 'Failed to search matches'
    };
  }
};
