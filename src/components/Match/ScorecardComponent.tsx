import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface BattingRow {
  batter: string;
  dismissalInfo: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: string;
}

interface BowlingRow {
  bowler: string;
  overs: string;
  maidens: number;
  runs: number;
  wickets: number;
  economy: string;
}

interface ActivePlayer {
  name: string;
  runs?: number;
  balls?: number;
  strikeRate?: number;
  overs?: string;
  wickets?: number;
  economy?: number;
  isStriker?: boolean;
}

interface InningsProps {
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

interface MatchInfoProps {
  venue: string;
  time: string;
  toss: string;
  series: string;
  points: string;
}

interface Player {
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

interface SquadsProps {
  home: {
    name: string;
    players: Player[];
  };
  away: {
    name: string;
    players: Player[];
  };
}

interface ScorecardProps {
  innings: InningsProps[];
  matchInfo: MatchInfoProps;
  commentary?: Commentary[];
  squads?: SquadsProps;
}

interface Commentary {
  time: string;
  text: string;
  type: 'wicket' | 'boundary' | 'over' | 'normal';
  team: 'home' | 'away';
}

// Sample dummy data for squads
const dummySquads: SquadsProps = {
  home: {
    name: "ZIM",
    players: [
      { name: "Ben Curran", number: 1, position: "Opener", role: "Batter", avatar: "/teams/player1.png" },
      { name: "Brian Bennett", number: 2, position: "Top Order", role: "Batting Allrounder", avatar: "/teams/player2.png" },
      { name: "Nick Welch", number: 3, position: "Middle Order", role: "Batter", avatar: "/teams/player3.png" },
      { name: "Sean Williams", number: 4, position: "Middle Order", role: "Batting Allrounder", avatar: "/teams/player4.png" },
      { name: "Craig Ervine", number: 5, position: "Middle Order", role: "Batter", isCaptain: true, avatar: "/teams/player5.png" },
      { name: "Sikandar Raza", number: 6, position: "Lower Order", role: "Batting Allrounder", avatar: "/teams/player6.png" },
      { name: "Tadiwanashe Taibu", number: 7, position: "Lower Order", role: "WK-Batter", isWicketKeeper: true, avatar: "/teams/player7.png" },
      { name: "Newman Nyamhuri", number: 8, position: "Tail", role: "Bowler", avatar: "/teams/player8.png" },
      { name: "Vincent Masekesa", number: 9, position: "Tail", role: "Batting Allrounder", avatar: "/teams/player9.png" },
      { name: "Blessing Muzarabani", number: 10, position: "Tail", role: "Bowler", avatar: "/teams/player10.png" },
      { name: "Tanaka Chivanga", number: 11, position: "Tail", role: "Bowler", avatar: "/teams/player11.png" },
      { name: "Clive Madande", number: 12, position: "Reserve", role: "WK-Batter", avatar: "/teams/player12.png" },
      { name: "Wellington Masakadza", number: 13, position: "Reserve", role: "Bowler", avatar: "/teams/player13.png" },
      { name: "Trevor Gwandu", number: 14, position: "Reserve", role: "Bowler", avatar: "/teams/player14.png" }
    ]
  },
  away: {
    name: "NZ",
    players: [
      { name: "Devon Conway", number: 1, position: "Opener", role: "WK-Batter", isWicketKeeper: true, avatar: "/teams/player15.png" },
      { name: "Will Young", number: 2, position: "Top Order", role: "Batter", avatar: "/teams/player16.png" },
      { name: "Henry Nicholls", number: 3, position: "Middle Order", role: "Batter", avatar: "/teams/player17.png" },
      { name: "Rachin Ravindra", number: 4, position: "Middle Order", role: "Batting Allrounder", avatar: "/teams/player18.png" },
      { name: "Daryl Mitchell", number: 5, position: "Middle Order", role: "Batting Allrounder", avatar: "/teams/player19.png" },
      { name: "Tom Blundell", number: 6, position: "Lower Order", role: "WK-Batter", isWicketKeeper: true, avatar: "/teams/player20.png" },
      { name: "Michael Bracewell", number: 7, position: "Lower Order", role: "Batting Allrounder", avatar: "/teams/player21.png" },
      { name: "Mitchell Santner", number: 8, position: "Tail", role: "Bowling Allrounder", isCaptain: true, avatar: "/teams/player22.png" },
      { name: "Nathan Smith", number: 9, position: "Tail", role: "Bowling Allrounder", avatar: "/teams/player23.png" },
      { name: "Matt Henry", number: 10, position: "Tail", role: "Bowler", avatar: "/teams/player24.png" },
      { name: "William O'Rourke", number: 11, position: "Tail", role: "Bowler", avatar: "/teams/player25.png" },
      { name: "Ajaz Patel", number: 12, position: "Reserve", role: "Bowler", avatar: "/teams/player26.png" },
      { name: "Jacob Duffy", number: 13, position: "Reserve", role: "Bowler", avatar: "/teams/player27.png" },
      { name: "Matthew Fisher", number: 14, position: "Reserve", role: "Bowler", avatar: "/teams/player28.png" }
    ]
  }
};

const ScorecardComponent: React.FC<ScorecardProps> = ({ innings, matchInfo, commentary = [], squads = dummySquads }) => {
  const renderActivePlayers = (inning: InningsProps) => {
    if (!inning.currentBatters || !inning.currentBowler) return null;

    return (
      <Box sx={{ mb: 3 }}>
        {/* Current Batters */}
        <Box sx={{ mb: 3, p: 2, bgcolor: '#1a1f2e', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: '#fff' }}>
            Current Batters
          </Typography>
          {inning.currentBatters.map((batter, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography sx={{ 
                color: '#fff',
                fontWeight: batter.isStriker ? 500 : 400,
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>{batter.name} {batter.isStriker && '•'}</span>
                <span>{batter.runs}({batter.balls}) SR: {batter.strikeRate}</span>
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Current Bowler */}
        <Box sx={{ mb: 3, p: 2, bgcolor: '#1a1f2e', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#fff' }}>
            Current Bowler
          </Typography>
          <Typography sx={{ 
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>{inning.currentBowler.name}</span>
            <span>{inning.currentBowler.overs} • {inning.currentBowler.wickets}/{inning.currentBowler.runs} • ECO: {inning.currentBowler.economy}</span>
          </Typography>
        </Box>

        {/* Current Partnership */}
        {inning.currentPartnership && (
          <Box sx={{ p: 2, bgcolor: '#1a1f2e', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#fff' }}>
              Current Partnership
            </Typography>
            <Typography sx={{ color: '#fff' }}>
              {inning.currentPartnership}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  const renderSquads = () => {
    if (!squads) return null;
    
    return (
      <Box sx={{ mb: 3 }}>
        <Paper elevation={0} sx={{ mb: 3, borderRadius: 1, border: '1px solid #e0e0e0' }}>
          <Box sx={{ 
            bgcolor: '#f8f9fa',
            p: 2,
            borderBottom: '1px solid #e0e0e0'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Squads
            </Typography>
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gap: 3, p: 2 }}>
            {/* Home Team */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                {squads.home.name}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {squads.home.players.map((player) => (
                  <Paper 
                    key={player.number} 
                    sx={{ 
                      p: 1.5, 
                      bgcolor: 'rgba(248, 249, 250, 0.7)',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <Typography variant="body1">{player.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {player.position}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>

            {/* Away Team */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                {squads.away.name}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {squads.away.players.map((player) => (
                  <Paper 
                    key={player.number} 
                    sx={{ 
                      p: 1.5, 
                      bgcolor: 'rgba(248, 249, 250, 0.7)',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <Typography variant="body1">{player.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {player.position}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  };

  const renderInnings = (inning: InningsProps, index: number) => (
    <Box key={index}>
      {/* Active Players Section */}
      {renderActivePlayers(inning)}

      {/* Regular Scorecard */}
      <Paper elevation={0} sx={{ mb: 3, borderRadius: 1, border: '1px solid #e0e0e0' }}>
        <Box sx={{ 
          bgcolor: '#f8f9fa',
          p: 2,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {inning.teamName} - {inning.score}
          </Typography>
        </Box>

        {/* Batting Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 500 }}>Batter</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>R</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>B</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>4s</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>6s</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>SR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inning.battingRows.map((row, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>
                    <Box>
                      <Typography>{row.batter}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.dismissalInfo}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.runs}</TableCell>
                  <TableCell align="right">{row.balls}</TableCell>
                  <TableCell align="right">{row.fours}</TableCell>
                  <TableCell align="right">{row.sixes}</TableCell>
                  <TableCell align="right">{row.strikeRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Extras and Total */}
        <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
          <Typography sx={{ mb: 1 }}>Extras: {inning.extras}</Typography>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Total: {inning.total}</Typography>
          <Typography sx={{ mb: 1 }}>Yet to Bat: {inning.yetToBat.join(', ')}</Typography>
          <Typography>Fall of Wickets: {inning.fallOfWickets}</Typography>
        </Box>

        {/* Bowling Table */}
        <TableContainer sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 500 }}>Bowler</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>O</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>M</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>R</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>W</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>ECO</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inning.bowlingRows.map((row, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{row.bowler}</TableCell>
                  <TableCell align="right">{row.overs}</TableCell>
                  <TableCell align="right">{row.maidens}</TableCell>
                  <TableCell align="right">{row.runs}</TableCell>
                  <TableCell align="right">{row.wickets}</TableCell>
                  <TableCell align="right">{row.economy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100%',
      p: 2
    }}>
      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        {renderSquads()}
        {innings.map((inning, index) => renderInnings(inning, index))}
      </Box>

      {/* Spacer */}
      <Box sx={{ mt: 4 }}>
        <Divider />
      </Box>

      {/* Match Info */}
      <Box sx={{ mt: 4 }}>
        <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ minWidth: '200px' }}>
              <Typography variant="subtitle2">Venue: {matchInfo.venue}</Typography>
            </Box>
            <Box sx={{ minWidth: '200px' }}>
              <Typography variant="subtitle2">Time: {matchInfo.time}</Typography>
            </Box>
            <Box sx={{ minWidth: '200px' }}>
              <Typography variant="subtitle2">Toss: {matchInfo.toss}</Typography>
            </Box>
            <Box sx={{ minWidth: '200px' }}>
              <Typography variant="subtitle2">Series: {matchInfo.series}</Typography>
            </Box>
            <Box sx={{ minWidth: '200px' }}>
              <Typography variant="subtitle2">Points: {matchInfo.points}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Commentary Section */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ p: 2, bgcolor: '#1a1f2e', borderRadius: 1 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>Live Commentary</Typography>
          <Box sx={{ maxHeight: '300px', overflow: 'auto' }}>
            {commentary.map((item, index) => (
              <Box key={index} sx={{ 
                py: 1.5,
                borderBottom: index < commentary.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', minWidth: '40px' }}>
                    {item.time}
                  </Typography>
                  <Typography sx={{ color: '#fff' }}>
                    {item.text}
                  </Typography>
                </Box>
              </Box>
            ))}
            {commentary.length === 0 && (
              <Typography sx={{ textAlign: 'center', py: 2, color: 'rgba(255,255,255,0.6)' }}>
                No commentary available
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScorecardComponent;