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

export interface BoxingMatchCardProps {
  card: string;
  fixture_no: number;
  match_date: string;
  match: BoxingMatch;
  sportType?: 'boxing';
  isLive?: boolean;
}

export interface MatchesByType {
  cricket: Match[];
  kabaddi: Match[];
  football: Match[];
  volleyball: Match[];
  boxing: BoxingCardGroup[];
}

export interface MatchFilters {
  sportType?: string;
  matchType?: string;
  isLive?: boolean;
  card?: string;
}

export interface BoxingPlayer {
  code: number;
  name: string;
  team: string;
}

export interface BoxingMatch {
  match_no: number;
  player_a: BoxingPlayer;
  player_b: BoxingPlayer;
  pre_match_odds: {
    a: number;
    b: number;
  };
  live_match_odds?: {
    a: number;
    b: number;
  };
  weight_category: string;
  isLive?: boolean;
}

export interface BoxingCardGroup {
  card: string;
  fixture_no: number;
  match_date: string;
  matches: BoxingMatch[];
}

export interface MatchesResponse {
  data: MatchesByType;
  total: number;
  success: boolean;
  message?: string;
}