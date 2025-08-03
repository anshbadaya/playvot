export interface Team {
  name: string;
  logo: string;
  score: number;
  stats: {
    possession: number;
    shots: number;
    shotsOnTarget: number;
    corners: number;
    fouls: number;
    wickets?: number;
  };
}

export interface Player {
  name: string;
  number: number;
  position: string;
  role: string;
  isWicketKeeper?: boolean;
  isCaptain?: boolean;
  avatar?: string;
  stats?: {
    // Batting stats
    runs?: number;
    balls?: number;
    fours?: number;
    sixes?: number;
    strikeRate?: number;
    // Bowling stats
    overs?: string;
    maidens?: number;
    wickets?: number;
    economy?: number;
    // Other stats
    goals?: number;
    assists?: number;
    shots?: number;
    passes?: number;
    rating?: number;
  };
}

export interface Commentary {
  time: string;
  text: string;
  type: 'goal' | 'card' | 'substitution' | 'normal';
  team: 'home' | 'away';
}

export interface MatchData {
  teams: {
    home: Team;
    away: Team;
  };
  score: string;
  league: string;
  status: string;
  venue: string;
  dateTime: string;
  timeElapsed: string;
  players: {
    home: Player[];
    away: Player[];
  };
  commentary: Commentary[];
  winProbability: {
    home: number;
    away: number;
  };
  bettingOdds: {
    home: number;
    draw: number;
    away: number;
  };
}