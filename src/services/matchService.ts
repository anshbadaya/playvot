import { MatchesByType, MatchFilters, MatchesResponse } from '@/types/match';
import { dummyMatchesData } from '@/data/matchesData';

// API base URL - replace with your actual API endpoint
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.playvot.com';

/**
 * Fetch all matches grouped by sport type
 * @param filters - Optional filters for matches
 * @returns Promise<MatchesResponse>
 */
export const fetchMatches = async (filters?: MatchFilters): Promise<MatchesResponse> => {
  try {
    // In a real application, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/matches${filters ? `?${new URLSearchParams(filters as any)}` : ''}`);
    // const data = await response.json();
    
    // For now, we'll use dummy data with filtering
    let filteredData = { ...dummyMatchesData };
    
    if (filters) {
      if (filters.sportType) {
        const sportType = filters.sportType as keyof MatchesByType;
        if (filteredData[sportType]) {
          filteredData = {
            cricket: sportType === 'cricket' ? filteredData.cricket : [],
            kabaddi: sportType === 'kabaddi' ? filteredData.kabaddi : [],
            football: sportType === 'football' ? filteredData.football : [],
            volleyball: sportType === 'volleyball' ? filteredData.volleyball : []
          };
        }
      }
      
      if (filters.isLive !== undefined) {
        Object.keys(filteredData).forEach(sportType => {
          const sportKey = sportType as keyof MatchesByType;
          filteredData[sportKey] = filteredData[sportKey].filter(match => 
            filters.isLive ? match.isLive : !match.isLive
          );
        });
      }
      
      if (filters.matchType) {
        Object.keys(filteredData).forEach(sportType => {
          const sportKey = sportType as keyof MatchesByType;
          filteredData[sportKey] = filteredData[sportKey].filter(match => 
            match.matchType === filters.matchType
          );
        });
      }
    }
    
    // Calculate total matches
    const total = Object.values(filteredData).reduce((sum, matches) => sum + matches.length, 0);
    
    return {
      data: filteredData,
      total,
      success: true
    };
  } catch (error) {
    // console.error('Error fetching matches:', error);
    return {
      data: { cricket: [], kabaddi: [], football: [], volleyball: [] },
      total: 0,
      success: false,
      message: 'Failed to fetch matches'
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
    // console.error(`Error fetching ${sportType} matches:`, error);
    return {
      data: { cricket: [], kabaddi: [], football: [], volleyball: [] },
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
      )
    };
    
    const total = Object.values(filteredData).reduce((sum, matches) => sum + matches.length, 0);
    
    return {
      data: filteredData,
      total,
      success: true
    };
  } catch (error) {
    // console.error('Error searching matches:', error);
    return {
      data: { cricket: [], kabaddi: [], football: [], volleyball: [] },
      total: 0,
      success: false,
      message: 'Failed to search matches'
    };
  }
};
