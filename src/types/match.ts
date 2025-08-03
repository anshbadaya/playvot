export interface Team {
  name: string;
  score?: string;
  overs?: string;
  goals?: number;
  points?: number;
}

export interface Match {
  id: string;
  matchType: string;
  matchTitle: string;
  team1: Team;
  team2: Team;
  status: string;
  sportType: 'cricket' | 'kabaddi' | 'football' | 'volleyball';
  slug: string;
  isLive?: boolean;
  venue?: string;
  dateTime?: string;
  league?: string;
}

export interface MatchesByType {
  cricket: Match[];
  kabaddi: Match[];
  football: Match[];
  volleyball: Match[];
}

export interface MatchFilters {
  sportType?: string;
  matchType?: string;
  isLive?: boolean;
}

export interface MatchesResponse {
  data: MatchesByType;
  total: number;
  success: boolean;
  message?: string;
}
