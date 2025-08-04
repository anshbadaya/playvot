import { MatchData, ScorecardData } from '@/types/match-details';

export const dummyMatchData: MatchData = {
  id: 'zim-vs-nz-2024',
  teams: {
    home: {
      name: 'ZIM',
      logo: '/teams/zimbabwe.png',
      score: 149,
      stats: {
        possession: 55,
        shots: 12,
        shotsOnTarget: 5,
        corners: 6,
        fouls: 8,
        wickets: 10
      }
    },
    away: {
      name: 'NZ',
      logo: '/teams/newzealand.png',
      score: 174,
      stats: {
        possession: 45,
        shots: 10,
        shotsOnTarget: 3,
        corners: 4,
        fouls: 10,
        wickets: 3
      }
    }
  },
  score: 'NZ 174/3 (52)',
  league: 'Premier League',
  status: 'Live',
  venue: 'Old Trafford',
  dateTime: new Date().toLocaleString(),
  timeElapsed: '75:23',
  players: {
    home: [
      {
        name: 'Tadiwanashe Marumani',
        number: 1,
        position: 'Opener',
        role: 'WK-Batter',
        isWicketKeeper: true,
        avatar: '/teams/player1.png',
        stats: {
          runs: 12,
          balls: 18,
          fours: 1,
          sixes: 0,
          strikeRate: 66.67
        }
      },
      {
        name: 'Clive Madande',
        number: 2,
        position: 'Opener',
        role: 'Batter',
        avatar: '/teams/player2.png',
        stats: {
          runs: 8,
          balls: 12,
          fours: 0,
          sixes: 0,
          strikeRate: 66.67
        }
      },
      {
        name: 'Sean Williams',
        number: 3,
        position: 'Top Order',
        role: 'Batting Allrounder',
        isCaptain: true,
        avatar: '/teams/player3.png',
        stats: {
          runs: 23,
          balls: 35,
          fours: 3,
          sixes: 0,
          strikeRate: 65.71
        }
      },
      {
        name: 'Craig Ervine',
        number: 4,
        position: 'Middle Order',
        role: 'Batter',
        avatar: '/teams/player4.png',
        stats: {
          runs: 42,
          balls: 30,
          fours: 3,
          sixes: 2,
          strikeRate: 140.0
        }
      },
      {
        name: 'Sikandar Raza',
        number: 5,
        position: 'Middle Order',
        role: 'Batting Allrounder',
        avatar: '/teams/player5.png',
        stats: {
          runs: 31,
          balls: 28,
          fours: 2,
          sixes: 1,
          strikeRate: 110.71
        }
      },
      {
        name: 'Ryan Burl',
        number: 6,
        position: 'Middle Order',
        role: 'Batting Allrounder',
        avatar: '/teams/player6.png',
        stats: {
          runs: 15,
          balls: 22,
          fours: 1,
          sixes: 0,
          strikeRate: 68.18
        }
      },
      {
        name: 'Wellington Masakadza',
        number: 7,
        position: 'Lower Order',
        role: 'Bowling Allrounder',
        avatar: '/teams/player7.png',
        stats: {
          runs: 8,
          balls: 15,
          fours: 0,
          sixes: 0,
          strikeRate: 53.33
        }
      },
      {
        name: 'Blessing Muzarabani',
        number: 8,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player8.png',
        stats: {
          overs: "16",
          maidens: 4,
          wickets: 2,
          runs: 50,
          economy: 3.13
        }
      },
      {
        name: 'Richard Ngarava',
        number: 9,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player9.png',
        stats: {
          overs: "10",
          maidens: 1,
          wickets: 0,
          runs: 35,
          economy: 3.50
        }
      },
      {
        name: 'Tendai Chatara',
        number: 10,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player10.png',
        stats: {
          overs: "8",
          maidens: 0,
          wickets: 0,
          runs: 28,
          economy: 3.50
        }
      },
      {
        name: 'Luke Jongwe',
        number: 11,
        position: 'Bowler',
        role: 'Bowling Allrounder',
        avatar: '/teams/player11.png',
        stats: {
          overs: "6",
          maidens: 0,
          wickets: 0,
          runs: 30,
          economy: 5.00
        }
      }
    ],
    away: [
      {
        name: 'Devon Conway',
        number: 1,
        position: 'Opener',
        role: 'WK-Batter',
        isWicketKeeper: true,
        avatar: '/teams/player12.png',
        stats: {
          runs: 67,
          balls: 89,
          fours: 8,
          sixes: 0,
          strikeRate: 75.28
        }
      },
      {
        name: 'Tom Latham',
        number: 2,
        position: 'Opener',
        role: 'WK-Batter',
        avatar: '/teams/player13.png',
        stats: {
          runs: 52,
          balls: 78,
          fours: 5,
          sixes: 1,
          strikeRate: 66.67
        }
      },
      {
        name: 'Kane Williamson',
        number: 3,
        position: 'Top Order',
        role: 'Batter',
        isCaptain: true,
        avatar: '/teams/player14.png',
        stats: {
          runs: 28,
          balls: 45,
          fours: 3,
          sixes: 0,
          strikeRate: 62.22
        }
      },
      {
        name: 'Rachin Ravindra',
        number: 4,
        position: 'Top Order',
        role: 'Batting Allrounder',
        avatar: '/teams/player15.png',
        stats: {
          runs: 18,
          balls: 25,
          fours: 2,
          sixes: 0,
          strikeRate: 72.00
        }
      },
      {
        name: 'Daryl Mitchell',
        number: 5,
        position: 'Middle Order',
        role: 'Batting Allrounder',
        avatar: '/teams/player16.png',
        stats: {
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0.00
        }
      },
      {
        name: 'Mark Chapman',
        number: 6,
        position: 'Middle Order',
        role: 'Batter',
        avatar: '/teams/player17.png',
        stats: {
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0.00
        }
      },
      {
        name: 'Glenn Phillips',
        number: 7,
        position: 'Middle Order',
        role: 'WK-Batter',
        avatar: '/teams/player18.png',
        stats: {
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0.00
        }
      },
      {
        name: 'Mitchell Santner',
        number: 8,
        position: 'Lower Order',
        role: 'Bowling Allrounder',
        avatar: '/teams/player19.png',
        stats: {
          overs: "12",
          maidens: 2,
          wickets: 2,
          runs: 31,
          economy: 2.58
        }
      },
      {
        name: 'Matt Henry',
        number: 9,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player20.png',
        stats: {
          overs: "9.2",
          maidens: 1,
          wickets: 3,
          runs: 42,
          economy: 4.50
        }
      },
      {
        name: 'Trent Boult',
        number: 10,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player21.png',
        stats: {
          overs: "10",
          maidens: 2,
          wickets: 3,
          runs: 35,
          economy: 3.50
        }
      },
      {
        name: 'William O\'Rourke',
        number: 11,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player22.png',
        stats: {
          overs: "6",
          maidens: 0,
          wickets: 0,
          runs: 13,
          economy: 2.17
        }
      }
    ]
  },
  commentary: [
    {
      time: '11.3',
      text: 'FOUR! Perry finds the gap through covers. Brilliant shot!',
      type: 'boundary',
      team: 'home'
    },
    {
      time: '11.2',
      text: 'Single taken to deep mid-wicket. Good running between the wickets.',
      type: 'normal',
      team: 'home'
    },
    {
      time: '11.1',
      text: 'Dot ball. Tight bowling from Shafali, Perry defends.',
      type: 'normal',
      team: 'away'
    },
    {
      time: '10.6',
      text: 'SIX! What a shot! Gardner goes big over long-on!',
      type: 'boundary',
      team: 'home'
    },
    {
      time: '10.5',
      text: 'Two runs taken. Good placement by Gardner.',
      type: 'normal',
      team: 'home'
    }
  ],
  winProbability: {
    home: 28,
    away: 38
  },
  bettingOdds: {
    home: 2.1,
    draw: 3.5,
    away: 3.8
  }
};

export const dummyScorecardData: ScorecardData = {
  innings: [
    {
      teamName: "Zimbabwe",
      score: "149/10 (45.2)",
      battingRows: [
        { batter: "T. Marumani", dismissalInfo: "c Conway b Boult", runs: 12, balls: 18, fours: 1, sixes: 0, strikeRate: "66.67" },
        { batter: "C. Madande", dismissalInfo: "b Boult", runs: 8, balls: 12, fours: 0, sixes: 0, strikeRate: "66.67" },
        { batter: "S. Williams", dismissalInfo: "c Mitchell b Henry", runs: 23, balls: 35, fours: 3, sixes: 0, strikeRate: "65.71" },
        { batter: "C. Ervine", dismissalInfo: "c Latham b Santner", runs: 42, balls: 30, fours: 3, sixes: 2, strikeRate: "140.00" },
        { batter: "S. Raza", dismissalInfo: "c Conway b Henry", runs: 31, balls: 28, fours: 2, sixes: 1, strikeRate: "110.71" },
        { batter: "R. Burl", dismissalInfo: "run out", runs: 15, balls: 22, fours: 1, sixes: 0, strikeRate: "68.18" },
        { batter: "W. Masakadza", dismissalInfo: "c Mitchell b Santner", runs: 8, balls: 15, fours: 0, sixes: 0, strikeRate: "53.33" },
        { batter: "B. Muzarabani", dismissalInfo: "not out", runs: 5, balls: 8, fours: 0, sixes: 0, strikeRate: "62.50" },
        { batter: "R. Ngarava", dismissalInfo: "c Conway b Boult", runs: 3, balls: 7, fours: 0, sixes: 0, strikeRate: "42.86" },
        { batter: "T. Chatara", dismissalInfo: "c Mitchell b Henry", runs: 2, balls: 5, fours: 0, sixes: 0, strikeRate: "40.00" }
      ],
      extras: "0",
      total: "149",
      yetToBat: [],
      fallOfWickets: "1-15, 2-25, 3-45, 4-78, 5-95, 6-110, 7-125, 8-135, 9-142, 10-149",
      bowlingRows: [
        { bowler: "T. Boult", overs: "10.0", maidens: 2, runs: 35, wickets: 3, economy: "3.50" },
        { bowler: "M. Henry", overs: "9.2", maidens: 1, runs: 42, wickets: 3, economy: "4.50" },
        { bowler: "M. Santner", overs: "12.0", maidens: 2, runs: 31, wickets: 2, economy: "2.58" },
        { bowler: "D. Mitchell", overs: "8.0", maidens: 0, runs: 28, wickets: 0, economy: "3.50" },
        { bowler: "R. Ravindra", overs: "6.0", maidens: 0, runs: 13, wickets: 0, economy: "2.17" }
      ],
      currentBatters: [
        { name: "D. Conway", runs: 67, balls: 89, strikeRate: 75.28, isStriker: true },
        { name: "T. Latham", runs: 52, balls: 78, strikeRate: 66.67, isStriker: false }
      ],
      currentBowler: { name: "B. Muzarabani", overs: "16.0", wickets: 2, runs: 50, economy: 3.13 }
    },
    {
      teamName: "New Zealand",
      score: "174/3 (52.0)",
      battingRows: [
        { batter: "D. Conway", dismissalInfo: "not out", runs: 67, balls: 89, fours: 8, sixes: 0, strikeRate: "75.28" },
        { batter: "T. Latham", dismissalInfo: "not out", runs: 52, balls: 78, fours: 5, sixes: 1, strikeRate: "66.67" },
        { batter: "K. Williamson", dismissalInfo: "c Ervine b Muzarabani", runs: 28, balls: 45, fours: 3, sixes: 0, strikeRate: "62.22" },
        { batter: "R. Ravindra", dismissalInfo: "c Williams b Raza", runs: 18, balls: 25, fours: 2, sixes: 0, strikeRate: "72.00" }
      ],
      extras: "9",
      total: "174",
      yetToBat: ["D. Mitchell", "M. Chapman", "G. Phillips", "M. Santner", "M. Henry", "T. Boult", "R. Ravindra"],
      fallOfWickets: "1-45, 2-78, 3-95",
      bowlingRows: [
        { bowler: "B. Muzarabani", overs: "16.0", maidens: 4, runs: 50, wickets: 2, economy: "3.13" },
        { bowler: "S. Raza", overs: "12.0", maidens: 2, runs: 31, wickets: 1, economy: "2.58" },
        { bowler: "R. Ngarava", overs: "10.0", maidens: 1, runs: 35, wickets: 0, economy: "3.50" },
        { bowler: "T. Chatara", overs: "8.0", maidens: 0, runs: 28, wickets: 0, economy: "3.50" },
        { bowler: "W. Masakadza", overs: "6.0", maidens: 0, runs: 30, wickets: 0, economy: "5.00" }
      ],
      currentPartnership: "79 runs (15.2 overs)"
    }
  ],
  matchInfo: {
    venue: "Old Trafford, Manchester",
    time: "Day 2, Lunch Break",
    toss: "New Zealand won the toss and elected to field",
    series: "Test Series 2024",
    points: "New Zealand lead by 25 runs"
  }
};

// Additional dummy data for components that currently have hardcoded data

export interface OverData {
  overNumber: number;
  runs: number;
  balls: (number | 'W')[];
}

export interface Highlight {
  time: string;
  type: 'wicket' | 'boundary' | 'milestone' | 'other';
  description: string;
  day?: string;
}

export interface QuickStat {
  value: string;
  label: string;
  color: string;
}

export interface BettingOdds {
  team: string;
  back: number;
  lay: number;
}

export interface TeamTotalRuns {
  team: string;
  under: { runs: string; odds: number };
  over: { runs: string; odds: number };
}

export interface PlayerPerformance {
  player: string;
  under: { runs: string; odds: number };
  over: { runs: string; odds: number };
}

export interface FancyBet {
  type: string;
  description: string;
  odds: number;
}

export interface QuickBet {
  type: string;
  odds: number;
  color: string;
}

export const dummyOversData: OverData[] = [
  { overNumber: 1, runs: 4, balls: [1, 0, 2, 0, 1, 0] },
  { overNumber: 2, runs: 7, balls: [4, 1, 0, 1, 1, 0] },
  { overNumber: 3, runs: 2, balls: [0, 1, 0, 0, 1, 0] },
  { overNumber: 4, runs: 8, balls: [4, 0, 1, 2, 1, 0] },
  { overNumber: 5, runs: 3, balls: [1, 0, 1, 0, 1, 0] },
  { overNumber: 6, runs: 6, balls: [1, 4, 0, 1, 0, 0] },
  { overNumber: 7, runs: 5, balls: [1, 1, 1, 1, 1, 0] },
  { overNumber: 8, runs: 2, balls: [0, 1, 0, 1, 0, 0] },
  { overNumber: 9, runs: 9, balls: [6, 1, 1, 1, 0, 0] },
  { overNumber: 10, runs: 4, balls: [1, 1, 1, 1, 0, 0] },
  { overNumber: 11, runs: 7, balls: [4, 1, 1, 1, 0, 0] },
  { overNumber: 12, runs: 3, balls: [1, 1, 0, 1, 0, 0] },
  { overNumber: 13, runs: 5, balls: [1, 1, 1, 1, 1, 0] },
  { overNumber: 14, runs: 8, balls: [4, 1, 1, 1, 1, 0] },
  { overNumber: 15, runs: 2, balls: [0, 1, 0, 1, 0, 0] },
  { overNumber: 16, runs: 6, balls: [1, 4, 0, 1, 0, 0] },
  { overNumber: 17, runs: 4, balls: [1, 1, 1, 1, 0, 0] },
  { overNumber: 18, runs: 7, balls: [4, 1, 1, 1, 0, 0] },
  { overNumber: 19, runs: 3, balls: [1, 1, 0, 1, 0, 0] },
  { overNumber: 20, runs: 5, balls: [1, 1, 1, 1, 1, 0] }
];

export const dummyHighlightsData: Highlight[] = [
  { time: '2.3', type: 'wicket', description: 'T. Marumani caught by Conway off Boult', day: 'Day 1' },
  { time: '4.1', type: 'boundary', description: 'C. Ervine hits a beautiful four through covers', day: 'Day 1' },
  { time: '8.5', type: 'boundary', description: 'S. Raza smashes a six over long-on', day: 'Day 1' },
  { time: '12.2', type: 'wicket', description: 'S. Williams caught by Mitchell off Henry', day: 'Day 1' },
  { time: '15.4', type: 'milestone', description: 'Zimbabwe reaches 100 runs', day: 'Day 1' },
  { time: '18.1', type: 'boundary', description: 'C. Ervine hits another four', day: 'Day 1' },
  { time: '22.3', type: 'wicket', description: 'C. Ervine caught by Latham off Santner', day: 'Day 1' },
  { time: '25.6', type: 'boundary', description: 'S. Raza hits a four through mid-wicket', day: 'Day 1' },
  { time: '28.2', type: 'wicket', description: 'S. Raza caught by Conway off Henry', day: 'Day 1' },
  { time: '32.1', type: 'milestone', description: 'Zimbabwe all out for 149', day: 'Day 1' },
  { time: '35.4', type: 'boundary', description: 'D. Conway hits his first four', day: 'Day 2' },
  { time: '38.2', type: 'boundary', description: 'T. Latham hits a four through point', day: 'Day 2' },
  { time: '42.1', type: 'wicket', description: 'K. Williamson caught by Ervine off Muzarabani', day: 'Day 2' },
  { time: '45.3', type: 'boundary', description: 'D. Conway hits another four', day: 'Day 2' },
  { time: '48.6', type: 'boundary', description: 'T. Latham hits a six over mid-wicket', day: 'Day 2' }
];

export const dummyQuickStatsData: QuickStat[] = [
  { value: '85%', label: 'Win Probability', color: '#3B82F6' },
  { value: '2.85', label: 'Best Odds', color: '#10B981' },
  { value: '12K', label: 'Active Bets', color: '#8B5CF6' }
];

export const dummyBettingTabs = ['Main', 'Match', 'Fancy'];

export const dummyMatchWinnerOdds: BettingOdds[] = [
  { team: 'Zimbabwe', back: 3.85, lay: 3.9 },
  { team: 'New Zealand', back: 1.45, lay: 1.47 }
];

export const dummyTeamTotalRuns: TeamTotalRuns[] = [
  {
    team: 'Zimbabwe',
    under: { runs: '140.5', odds: 1.9 },
    over: { runs: '140.5', odds: 1.9 }
  },
  {
    team: 'New Zealand',
    under: { runs: '142.5', odds: 1.85 },
    over: { runs: '142.5', odds: 1.95 }
  }
];

export const dummyPlayerPerformance: PlayerPerformance[] = [
  {
    player: 'Devon Conway',
    under: { runs: '74.5', odds: 1.8 },
    over: { runs: '74.5', odds: 2.0 }
  },
  {
    player: 'Tom Latham',
    under: { runs: '59.5', odds: 1.75 },
    over: { runs: '59.5', odds: 2.05 }
  }
];

export const dummyNextOverRuns: FancyBet[] = [
  { type: 'Under 8.5', description: '8.5', odds: 120 },
  { type: 'Over 8.5', description: '8.5', odds: 85 }
];

export const dummyFallOfWicket: FancyBet[] = [
  { type: '1-3 Overs', description: '122.0', odds: 120 },
  { type: '4+ Overs', description: '122.0', odds: 85 }
];

export const dummyMethodOfDismissal: FancyBet[] = [
  { type: 'Bowled/LBW', description: '3.2', odds: 100 },
  { type: 'Caught', description: '1.9', odds: 110 },
  { type: 'Other', description: '8.0', odds: 75 }
];

export const dummyQuickBets: QuickBet[] = [
  { type: 'FOUR', odds: 6.5, color: '#10B981' },
  { type: 'SIX', odds: 12.0, color: '#8B5CF6' },
  { type: 'DOT', odds: 2.8, color: '#94A3B8' },
  { type: 'WICKET', odds: 8.5, color: '#EF4444' }
];

export const dummyMatchStats = {
  currentRunRate: 4.2,
  requiredRunRate: 5.8,
  boundaries: { fours: 12, sixes: 6 },
  lastFiveOvers: { runs: 32, wickets: 2 }
}; 