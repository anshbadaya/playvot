export interface Tournament {
  id: string;
  name: string;
  date: string;
  city: string;
  country: string;
  numberOfMatches: number;
  sportType: 'cricket' | 'kabaddi' | 'football' | 'basketball' | 'volleyball' | 'table-tennis';
  status: 'upcoming' | 'ongoing' | 'completed';
  slug: string;
  venue?: string;
  prizePool?: string;
  participants?: number;
}

export interface TournamentFilters {
  sportType?: string;
  status?: string;
  date?: string;
}

export interface TournamentsResponse {
  data: Tournament[];
  total: number;
  success: boolean;
  message?: string;
}

export interface SportOption {
  value: string;
  label: string;
  icon?: string;
}
