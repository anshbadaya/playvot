import { Tournament, TournamentFilters, TournamentsResponse } from '@/types/tournament';
import { API_CONFIG, getApiHeaders } from '@/config/api';
import { dummyTournamentsData } from '@/data/tournamentsData';


/**
 * Fetch tournaments from the API endpoint
 * @param filters - Optional filters for tournaments
 * @returns Promise<TournamentsResponse>
 */
export const fetchTournaments = async (filters?: TournamentFilters): Promise<TournamentsResponse> => {
  try {
    console.log('Fetching tournaments from API:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TOURNAMENTS}`);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TOURNAMENTS}`, {
      method: 'GET',
      headers: getApiHeaders()
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log('Raw tournaments API response:', result);
    
    if (result.status === 'success' && result.data) {
      console.log('Tournaments API data received:', result.data);
      
      let tournaments = result.data;
      
      // Apply filters if provided
      if (filters) {
        if (filters.sportType) {
          tournaments = tournaments.filter((tournament: Tournament) => 
            tournament.sportType === filters.sportType
          );
        }
        
        if (filters.status) {
          tournaments = tournaments.filter((tournament: Tournament) => 
            tournament.status === filters.status
          );
        }
        
        if (filters.date) {
          tournaments = tournaments.filter((tournament: Tournament) => 
            tournament.date === filters.date
          );
        }
      }
      
      return {
        data: tournaments,
        total: tournaments.length,
        success: true
      };
    } else {
      console.log('Tournaments API returned empty or invalid data, using dummy data');
      return {
        data: dummyTournamentsData,
        total: dummyTournamentsData.length,
        success: true
      };
    }
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    console.log('Using dummy tournaments data due to API error');
    
    let tournaments = dummyTournamentsData;
    
    // Apply filters to dummy data
    if (filters) {
      if (filters.sportType) {
        tournaments = tournaments.filter(tournament => 
          tournament.sportType === filters.sportType
        );
      }
      
      if (filters.status) {
        tournaments = tournaments.filter(tournament => 
          tournament.status === filters.status
        );
      }
      
      if (filters.date) {
        tournaments = tournaments.filter(tournament => 
          tournament.date === filters.date
        );
      }
    }
    
    return {
      data: tournaments,
      total: tournaments.length,
      success: true
    };
  }
};

/**
 * Fetch tournaments by sport type
 * @param sportType - The sport type to filter by
 * @param filters - Additional filters
 * @returns Promise<TournamentsResponse>
 */
export const fetchTournamentsBySport = async (
  sportType: string, 
  filters?: Omit<TournamentFilters, 'sportType'>
): Promise<TournamentsResponse> => {
  try {
    const tournaments = await fetchTournaments({ ...filters, sportType });
    return tournaments;
  } catch (error) {
    console.error(`Error fetching ${sportType} tournaments:`, error);
    return {
      data: [],
      total: 0,
      success: false,
      message: `Failed to fetch ${sportType} tournaments`
    };
  }
};

/**
 * Search tournaments by name or location
 * @param query - Search query
 * @returns Promise<TournamentsResponse>
 */
export const searchTournaments = async (query: string): Promise<TournamentsResponse> => {
  try {
    const allTournaments = await fetchTournaments();
    const searchQuery = query.toLowerCase();
    
    const filteredTournaments = allTournaments.data.filter(tournament => 
      tournament.name.toLowerCase().includes(searchQuery) ||
      tournament.city.toLowerCase().includes(searchQuery) ||
      tournament.country.toLowerCase().includes(searchQuery) ||
      tournament.venue?.toLowerCase().includes(searchQuery)
    );
    
    return {
      data: filteredTournaments,
      total: filteredTournaments.length,
      success: true
    };
  } catch (error) {
    console.error('Error searching tournaments:', error);
    return {
      data: [],
      total: 0,
      success: false,
      message: 'Failed to search tournaments'
    };
  }
};
