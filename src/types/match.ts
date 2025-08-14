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

export interface SportsMatchCardProps {
  card: string;
  fixture_no: number;
  match_date: string;
  match: SportsMatch;
  sportType?: 'sports';
  isLive?: boolean;
  onStreamsClick?: (match: SportsMatch) => void;
}

export interface MatchesByType {
  cricket: Match[];
  kabaddi: Match[];
  football: Match[];
  volleyball: Match[];
  sports: SportsCardGroup[];
}

export interface MatchFilters {
  sportType?: string;
  matchType?: string;
  isLive?: boolean;
  card?: string;
}

export interface SportsPlayer {
  code: number;
  name: string;
  team: string;
}

export interface SportsMatch {
  match_no: number;
  player_a: SportsPlayer;
  player_b: SportsPlayer;
  pre_match_odds: {
    a: number;
    b: number;
  };
  live_match_odds?: {
    a: number;
    b: number;
  };
  weight_category: string;
  start_time: string;
  end_time: string;
  isLive?: boolean;
}

export interface SportsCardGroup {
  card: string;
  fixture_no: number;
  match_date: string;
  matches: SportsMatch[];
}

export interface MatchesResponse {
  data: MatchesByType;
  total: number;
  success: boolean;
  message?: string;
}