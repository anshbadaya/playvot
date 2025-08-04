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
  runs?: number;
  balls?: number;
  strikeRate?: number;
  overs?: string;
  wickets?: number;
  economy?: number;
  isStriker?: boolean;
}

export interface InningsProps {
  teamName: string;
  score: string;
  battingRows: BattingRow[];
  extras: string;
  total: string;
  yetToBat: string[];
  fallOfWickets: string;
  bowlingRows: BowlingRow[];
  currentPartnership?: string;
  currentBatters?: ActivePlayer[];
  currentBowler?: ActivePlayer;
}

export interface MatchInfoProps {
  venue: string;
  time: string;
  toss: string;
  series: string;
  points: string;
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

export interface SquadsProps {
  home: {
    name: string;
    players: Player[];
  };
  away: {
    name: string;
    players: Player[];
  };
}

export interface ScorecardProps {
  innings: InningsProps[];
  matchInfo: MatchInfoProps;
  commentary?: Commentary[];
  squads?: SquadsProps;
}

export interface Commentary {
  time: string;
  text: string;
  type: 'wicket' | 'boundary' | 'over' | 'normal';
  team: 'home' | 'away';
} 