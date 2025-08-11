import { Tournament, TournamentFilters, TournamentsResponse } from '@/types/tournament';
import { API_CONFIG, getApiHeaders } from '@/config/api';

// Dummy data for tournaments
const dummyTournamentsData: Tournament[] = [
  {
    id: '1',
    name: 'Pro Panja League Season 3',
    date: '2024-03-15',
    city: 'Mumbai',
    country: 'India',
    numberOfMatches: 24,
    sportType: 'kabaddi',
    status: 'upcoming',
    slug: 'pro-panja-league-season-3',
    venue: 'Mumbai Arena',
    prizePool: '₹50,00,000',
    participants: 8
  },
  {
    id: '2',
    name: 'IPL 2024',
    date: '2024-04-01',
    city: 'Mumbai',
    country: 'India',
    numberOfMatches: 74,
    sportType: 'cricket',
    status: 'upcoming',
    slug: 'ipl-2024',
    venue: 'Multiple Venues',
    prizePool: '₹20,00,00,000',
    participants: 10
  },
  {
    id: '3',
    name: 'ISL 2024-25',
    date: '2024-09-01',
    city: 'Kolkata',
    country: 'India',
    numberOfMatches: 137,
    sportType: 'football',
    status: 'upcoming',
    slug: 'isl-2024-25',
    venue: 'Multiple Venues',
    prizePool: '₹15,00,00,000',
    participants: 12
  },
  {
    id: '4',
    name: 'Pro Kabaddi League 2024',
    date: '2024-10-01',
    city: 'Pune',
    country: 'India',
    numberOfMatches: 132,
    sportType: 'kabaddi',
    status: 'upcoming',
    slug: 'pro-kabaddi-league-2024',
    venue: 'Multiple Venues',
    prizePool: '₹8,00,00,000',
    participants: 12
  },
  {
    id: '5',
    name: 'NBA India Games 2024',
    date: '2024-10-15',
    city: 'Mumbai',
    country: 'India',
    numberOfMatches: 2,
    sportType: 'basketball',
    status: 'upcoming',
    slug: 'nba-india-games-2024',
    venue: 'NSCI Dome',
    participants: 2
  },
  {
    id: '6',
    name: 'Volleyball Nations League',
    date: '2024-05-01',
    city: 'Chennai',
    country: 'India',
    numberOfMatches: 16,
    sportType: 'volleyball',
    status: 'upcoming',
    slug: 'volleyball-nations-league-2024',
    venue: 'Jawaharlal Nehru Indoor Stadium',
    participants: 8
  },
  {
    id: '7',
    name: 'ITTF World Tour',
    date: '2024-06-01',
    city: 'New Delhi',
    country: 'India',
    numberOfMatches: 32,
    sportType: 'table-tennis',
    status: 'upcoming',
    slug: 'ittf-world-tour-2024',
    venue: 'Thyagraj Stadium',
    prizePool: '₹2,00,00,000',
    participants: 64
  }
];

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
