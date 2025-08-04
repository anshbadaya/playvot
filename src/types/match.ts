export interface Team {
  name: string;
  score?: string;
  overs?: string;
  goals?: number;
  points?: number;
}

export interface TeamInfo {
  name: string;
  score?: string;
  overs?: string;  // For cricket matches (e.g., "20" or "19.2")
  goals?: number;   // For football matches
  points?: number;  // For kabaddi matches
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

export interface MatchCardProps {
  matchType: string;      // e.g., "IPL", "PKL", "ISL"
  matchTitle: string;     // e.g., "Mumbai Indians vs Chennai Super Kings"
  team1: TeamInfo;
  team2: TeamInfo;
  status: string;        // e.g., "CSK won by 8 wickets", "Match in progress", "Today, 7:30 PM"
  isLive?: boolean;
  sportType: 'cricket' | 'football' | 'kabaddi' | 'volleyball';
  slug: string; // Add slug prop for navigation
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
