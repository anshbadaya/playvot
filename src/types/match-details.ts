export interface MatchDetailsTeam {
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
    runs?: number;
    balls?: number;
    fours?: number;
    sixes?: number;
    strikeRate?: number;
    overs?: string;
    maidens?: number;
    wickets?: number;
    economy?: number;
  };
}

export interface Commentary {
  time: string;
  text: string;
  type: 'normal' | 'highlight' | 'wicket' | 'boundary';
  team: 'home' | 'away';
}

export interface WinProbability {
  home: number;
  away: number;
}

export interface BettingOdds {
  home: number;
  draw: number;
  away: number;
}

export interface MatchData {
  id: string;
  teams: {
    home: MatchDetailsTeam;
    away: MatchDetailsTeam;
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
  winProbability: WinProbability;
  bettingOdds: BettingOdds;
}

// Scorecard specific types
export interface BattingRow {
  batter: string;
  dismissalInfo: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: string;
}

export interface BowlingRow {
  bowler: string;
  overs: string;
  maidens: number;
  runs: number;
  wickets: number;
  economy: string;
}

export interface ActivePlayer {
  name: string;
  runs: number;
  balls: number;
  strikeRate: number;
  isStriker: boolean;
}

export interface CurrentBowler {
  name: string;
  overs: string;
  wickets: number;
  economy: number;
}

export interface Innings {
  teamName: string;
  score: string;
  battingRows: BattingRow[];
  extras: string;
  total: string;
  yetToBat: string[];
  fallOfWickets: string;
  bowlingRows: BowlingRow[];
  currentBatters?: ActivePlayer[];
  currentBowler?: CurrentBowler;
  currentPartnership?: string;
}

export interface MatchInfo {
  venue: string;
  time: string;
  toss: string;
  series: string;
  points: string;
}

export interface ScorecardData {
  innings: Innings[];
  matchInfo: MatchInfo;
}

// Betting types
export interface BettingTab {
  id: string;
  name: string;
  label: string;
}

export interface BettingOption {
  id: string;
  label: string;
  odds: number;
  isSelected?: boolean;
}

export interface BettingSection {
  id: string;
  title: string;
  icon: string;
  options: BettingOption[];
}

export interface MatchDetailsResponse {
  data: MatchData;
  scorecard: ScorecardData;
  success: boolean;
  message?: string;
}