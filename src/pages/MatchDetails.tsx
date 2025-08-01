"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  IconButton,
  Slider,
  Stack,
  CircularProgress,
  LinearProgress,
  Avatar,
  useMediaQuery,
  Badge,
  Tabs,
  CardHeader,
  CardContent,
  Divider,
  List
} from "@mui/material";
import { useTheme, styled, alpha } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import StarIcon from '@mui/icons-material/Star';
import TargetIcon from '@mui/icons-material/GpsFixed';
import ActivityIcon from '@mui/icons-material/Timeline';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import Layout from '@/components/Layout';
import Squads from '@/components/Match/Squads';

// --- DATA SIMULATION ---

interface Team {
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

interface Player {
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

interface Commentary {
  time: string;
  text: string;
  type: 'goal' | 'card' | 'substitution' | 'normal';
  team: 'home' | 'away';
}

interface MatchData {
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

const dummyMatchData: MatchData = {
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
        name: 'Devon Conway',
        number: 1,
        position: 'Opener',
        role: 'WK-Batter',
        isWicketKeeper: true,
        avatar: '/teams/player15.png',
  stats: {
          runs: 87,
          balls: 162,
          fours: 12,
          sixes: 0,
          strikeRate: 53.70
        }
      },
      {
        name: 'Daryl Mitchell',
        number: 2,
        position: 'Top Order',
        role: 'Batting Allrounder',
        avatar: '/teams/player19.png',
        stats: {
          runs: 9,
          balls: 14,
          fours: 1,
          sixes: 0,
          strikeRate: 64.29
        }
      },
      {
        name: 'Nick Welch',
        number: 3,
        position: 'Middle Order',
        role: 'Batter',
        avatar: '/teams/player3.png',
        stats: {
          runs: 15,
          balls: 12,
          fours: 1,
          sixes: 0,
          rating: 125.0
        }
      },
      {
        name: 'Craig Ervine',
        number: 4,
        position: 'Middle Order',
        role: 'Batter',
        isCaptain: true,
        avatar: '/teams/player5.png',
        stats: {
          runs: 42,
          balls: 30,
          fours: 3,
          sixes: 2,
          rating: 140.0
        }
      }
    ],
    away: [
      {
        name: 'Blessing Muzarabani',
        number: 10,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player10.png',
        stats: {
          overs: "16",
          maidens: 4,
          wickets: 2,
          runs: 50,
          economy: 3.13
        }
      },
      {
        name: 'Sikandar Raza',
        number: 6,
        position: 'All-rounder',
        role: 'Batting Allrounder',
        avatar: '/teams/player6.png',
        stats: {
          overs: "12",
          maidens: 2,
          wickets: 1,
          runs: 31,
          economy: 2.58
        }
      },
      {
        name: 'Mitchell Santner',
        number: 8,
        position: 'Lower Order',
        role: 'Bowling Allrounder',
        isCaptain: true,
        avatar: '/teams/player22.png',
        stats: {
          runs: 18,
          balls: 12,
          fours: 1,
          sixes: 1,
          rating: 150.0
        }
      }
    ]
  },
  commentary: [
    {
      time: '11.3',
      text: 'FOUR! Perry finds the gap through covers. Brilliant shot!',
      type: 'normal',
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
      type: 'normal',
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

const fetchMatchData = (): Promise<MatchData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyMatchData);
    }, 1500);
  });
};


// --- STYLED COMPONENTS ---

// Theme Constants
const themeColors = {
  primary: '#3B82F6',
  primaryLight: 'rgba(59, 130, 246, 0.1)',
  primaryBorder: 'rgba(59, 130, 246, 0.2)',
  secondary: '#1E293B',
  secondaryLight: 'rgba(30, 41, 59, 0.6)',
  success: '#10B981',
  successLight: 'rgba(16, 185, 129, 0.1)',
  warning: '#F59E0B',
  warningLight: 'rgba(245, 158, 11, 0.1)',
  error: '#EF4444',
  errorLight: 'rgba(239, 68, 68, 0.1)',
  purple: '#A855F7',
  purpleLight: 'rgba(168, 85, 247, 0.1)',
  background: '#0F172A',
  surface: 'rgba(30, 41, 59, 0.4)',
  border: 'rgba(59, 130, 246, 0.15)',
  text: {
    primary: '#FFFFFF',
    secondary: '#94A3B8',
    disabled: '#64748B'
  }
};

const commonStyles = {
  card: {
    backgroundColor: themeColors.surface,
    borderRadius: '12px',
    border: `1px solid ${themeColors.border}`,
    backdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: themeColors.primaryBorder,
      boxShadow: `0 4px 20px ${themeColors.primaryLight}`
    }
  },
  cardHeader: {
    backgroundColor: themeColors.secondary,
    borderBottom: `1px solid ${themeColors.border}`,
    padding: '16px',
    borderRadius: '12px 12px 0 0'
  },
  button: {
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 12px ${themeColors.primaryLight}`
    }
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.5px'
  },
  gridItem: {
    padding: '12px',
    borderRadius: '8px',
    border: `1px solid ${themeColors.border}`,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: themeColors.primaryLight,
      borderColor: themeColors.primaryBorder
    }
  }
};

const PageBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${themeColors.background} 0%, ${themeColors.secondary} 100%)`,
  minHeight: '100vh',
  color: themeColors.text.primary,
  display: 'flex',
  flexDirection: 'column'
}));

const TopBar = styled(Box)(({ theme }) => ({
  ...commonStyles.card,
  position: 'sticky',
  top: 0,
  zIndex: 50,
  background: alpha(themeColors.background, 0.95),
  borderBottom: `1px solid ${themeColors.border}`,
  padding: theme.spacing(2),
  borderRadius: 0,
  '&:hover': {
    borderColor: themeColors.border,
    boxShadow: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  }
}));



const TabPanel = styled(Box)({
  padding: '16px',
  ...commonStyles.card,
  '&:hover': {
    borderColor: themeColors.border,
    boxShadow: 'none'
  }
});

const VideoContainer = styled(Card)(({ theme }) => ({
  ...commonStyles.card,
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover .video-controls': {
    opacity: 1,
  }
}));

const VideoControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(1.5, 2),
  background: `linear-gradient(transparent, ${alpha(themeColors.background, 0.9)})`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  opacity: 1,
  backdropFilter: 'blur(4px)',
  transition: 'opacity 0.3s ease-in-out',
  className: 'video-controls',
}));


// --- UI COMPONENTS ---

const VideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(45);
  const themeColor = '#3B82F6';

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };
  
  const handleProgressChange = (_event: Event, newValue: number | number[]) => {
    setProgress(newValue as number);
  };

  return (
    <VideoContainer>
      <Box
        component="video"
        sx={{
            width: '100%',
            // If you want to maintain aspect ratio strictly while filling height, use object-fit
            // This will make the video itself fill while potentially showing black bars if aspect ratio doesn't match container
            height: '100%', 
            objectFit: 'contain', // or 'cover' depending on desired fill behavior
            backgroundColor: '#000'
        }}
      />
      <VideoControls>
        <Slider
          value={progress}
          onChange={handleProgressChange}
          sx={{ color: themeColor, '& .MuiSlider-thumb': { boxShadow: `0 0 8px ${themeColor}` } }}
        />
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton onClick={() => setIsPlaying(!isPlaying)} sx={{ color: 'white' }}>
            {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
          </IconButton>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: 120 }}>
            <VolumeUpIcon sx={{ color: 'white' }} />
            <Slider value={volume} onChange={handleVolumeChange} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="caption">1:23 / 3:45</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ color: 'white' }}>
            <FullscreenIcon fontSize="large" />
          </IconButton>
        </Stack>
      </VideoControls>
    </VideoContainer>
  );
};



const Probability: React.FC<{ data: MatchData }> = ({ data }) => (
  <Card sx={{ bgcolor: alpha("#000000", 0.2), color: 'white', p: 3, borderRadius: 3 }}>
    <Typography variant="h5" gutterBottom fontWeight="bold">Win Probability</Typography>
    <Stack spacing={2} mt={2}>
      <Box>
        <Stack direction="row" justifyContent="space-between" mb={0.5}>
            <Typography variant="body1">{data.teams.home.name}</Typography>
            <Typography variant="body1"><strong>{data.winProbability.home}%</strong></Typography>
        </Stack>
        <LinearProgress variant="determinate" value={data.winProbability.home} sx={{ height: 8, borderRadius: 5, '& .MuiLinearProgress-bar': { backgroundColor: '#3B82F6' } }}/>
      </Box>
      <Box>
        <Stack direction="row" justifyContent="space-between" mb={0.5}>
            <Typography variant="body1">{data.teams.away.name}</Typography>
            <Typography variant="body1"><strong>{data.winProbability.away}%</strong></Typography>
        </Stack>
        <LinearProgress variant="determinate" value={data.winProbability.away} sx={{ height: 8, borderRadius: 5, '& .MuiLinearProgress-bar': { backgroundColor: '#9CA3AF' } }}/>
      </Box>
    </Stack>
  </Card>
);

const PredictAndBet: React.FC<{ data: MatchData }> = ({ data }) => (
  <Card sx={{ bgcolor: alpha("#000000", 0.2), color: 'white', p: 3, borderRadius: 3 }}>
    <Typography variant="h5" gutterBottom fontWeight="bold">Predict & Bet</Typography>
    <Typography variant="subtitle1" gutterBottom sx={{color: '#bbb', mb: 3}}>Who will win this match?</Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      {[
        { team: data.teams.home, odds: data.bettingOdds.home },
        { team: data.teams.away, odds: data.bettingOdds.away }
      ].map(({ team, odds }) => (
        <Button
          key={team.name}
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#2D2D2D',
            '&:hover': { bgcolor: '#3B82F6' },
            borderRadius: 2,
            py: 2,
            px: 3,
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)',
            justifyContent: 'space-between'
          }}
        >
          <Typography fontWeight="bold">{team.name}</Typography>
          <Typography variant="h6" sx={{ bgcolor: '#121212', px: 1.5, py: 0.5, borderRadius: 1 }}>
            {odds}x
          </Typography>
        </Button>
      ))}
    </Stack>
  </Card>
);


// --- MAIN PAGE ---

// Match Summary Component
const MatchSummary: React.FC<{ data: MatchData }> = ({ data }) => {
  // Find the top 2 batsmen based on runs
  const topBatsmen = [...data.players.home, ...data.players.away]
    .filter(player => player.stats?.runs)
    .sort((a, b) => (b.stats?.runs || 0) - (a.stats?.runs || 0))
    .slice(0, 2);

  // Find the top 2 bowlers based on wickets and economy
  const topBowlers = [...data.players.home, ...data.players.away]
    .filter(player => player.stats?.wickets)
    .sort((a, b) => {
      if ((b.stats?.wickets || 0) !== (a.stats?.wickets || 0)) {
        return (b.stats?.wickets || 0) - (a.stats?.wickets || 0);
      }
      return (a.stats?.economy || 999) - (b.stats?.economy || 999);
    })
    .slice(0, 2);

  return (
    <Box sx={{ 
      mt: 2,
      p: 2,
      bgcolor: 'rgba(15, 23, 42, 0.3)',
      borderRadius: 2,
      border: '1px solid rgba(59, 130, 246, 0.3)'
    }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="gray" sx={{ mb: 1 }}>
          Day 2, Lunch Break • New Zealand lead by 25 runs
        </Typography>
        
        {/* Score summary */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">
            {data.teams.home.name} 149
          </Typography>
          <Typography variant="body2">
            {data.teams.away.name} 174/3 (52)
          </Typography>
        </Box>
      </Box>

      {/* Top Batsmen */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Batting
        </Typography>
                 <Box sx={{ 
           display: 'grid',
           gap: { xs: 1, sm: 1.5 }, // Reduced vertical gap
           fontSize: '0.875rem',
           overflow: 'hidden'
         }}>
           {/* Scrollable Container */}
           <Box sx={{
             overflowX: 'auto',
             WebkitOverflowScrolling: 'touch',
             width: '100%',
             '&::-webkit-scrollbar': { height: 4 }, // Reduced scrollbar height
             '&::-webkit-scrollbar-track': { bgcolor: 'rgba(0,0,0,0.1)' },
             '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }
           }}>
             {/* Stats Header */}
             <Box sx={{ 
               display: 'grid',
               gridTemplateColumns: 'repeat(5, 40px)', // Slightly reduced column width
               gap: { xs: 2, sm: 2.5 }, // Reduced horizontal gap
               justifyContent: 'end',
               borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
               pb: 0.5, // Reduced padding
               minWidth: 'min-content'
             }}>
               <Box sx={{ color: 'gray', textAlign: 'right' }}>R</Box>
               <Box sx={{ color: 'gray', textAlign: 'right' }}>B</Box>
               <Box sx={{ color: 'gray', textAlign: 'right' }}>4s</Box>
               <Box sx={{ color: 'gray', textAlign: 'right' }}>6s</Box>
               <Box sx={{ color: 'gray', textAlign: 'right' }}>SR</Box>
             </Box>
             
             {/* Batsmen List */}
             {topBatsmen.map((player, index) => (
               <Box key={index} sx={{
                 display: 'grid',
                 gap: 0.5, // Reduced gap between name and stats
                 borderBottom: index !== topBatsmen.length - 1 ? '1px solid rgba(59, 130, 246, 0.1)' : 'none',
                 pb: 1 // Reduced bottom padding
               }}>
                 {/* Player Name */}
                 <Box sx={{ 
                   fontWeight: player.isWicketKeeper || player.isCaptain ? 'bold' : 'normal',
                   color: themeColors.text.primary,
                   whiteSpace: 'nowrap',
                   overflow: 'hidden',
                   textOverflow: 'ellipsis',
                   mb: 0.25 // Small margin bottom
                 }}>
                   {player.name} {player.isWicketKeeper ? '†' : ''} {player.isCaptain ? '(c)' : ''}
                 </Box>
                 
                 {/* Stats Row */}
                 <Box sx={{ 
                   display: 'grid',
                   gridTemplateColumns: 'repeat(5, 40px)', // Slightly reduced column width
                   gap: { xs: 2, sm: 2.5 }, // Reduced horizontal gap
                   justifyContent: 'end',
                   minWidth: 'min-content'
                 }}>
                   <Box sx={{ textAlign: 'right' }}>{player.stats?.runs}</Box>
                   <Box sx={{ textAlign: 'right' }}>{player.stats?.balls}</Box>
                   <Box sx={{ textAlign: 'right' }}>{player.stats?.fours}</Box>
                   <Box sx={{ textAlign: 'right' }}>{player.stats?.sixes}</Box>
                   <Box sx={{ textAlign: 'right' }}>{player.stats?.strikeRate?.toFixed(2)}</Box>
                 </Box>
               </Box>
             ))}
           </Box>
        </Box>
      </Box>

      {/* Top Bowlers */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Bowling
        </Typography>
                 <Box sx={{ 
           display: 'grid',
           gap: { xs: 1, sm: 1.5 }, // Reduced vertical gap
           fontSize: '0.875rem',
           overflow: 'hidden'
         }}>
           {/* Scrollable Container */}
           <Box sx={{
             overflowX: 'auto',
             WebkitOverflowScrolling: 'touch',
             width: '100%',
             '&::-webkit-scrollbar': { height: 4 }, // Reduced scrollbar height
             '&::-webkit-scrollbar-track': { bgcolor: 'rgba(0,0,0,0.1)' },
             '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }
           }}>
             {/* Stats Header */}
             <Box sx={{ 
               display: 'grid',
               gridTemplateColumns: 'repeat(5, 40px)', // Slightly reduced column width
               gap: { xs: 2, sm: 2.5 }, // Reduced horizontal gap
               justifyContent: 'end',
               borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
               pb: 0.5, // Reduced padding
               minWidth: 'min-content'
             }}>
               <Box sx={{ color: 'gray', textAlign: 'right' }}>O</Box>
               <Box sx={{ color: 'gray', textAlign: 'right' }}>M</Box>
               <Box sx={{ color: 'gray', textAlign: 'right' }}>R</Box>
               <Box sx={{ color: 'gray', textAlign: 'right' }}>W</Box>
               <Box sx={{ color: 'gray', textAlign: 'right' }}>ECON</Box>
             </Box>
             
             {/* Bowlers List */}
             {topBowlers.map((player, index) => (
               <Box key={index} sx={{
                 display: 'grid',
                 gap: 0.5, // Reduced gap between name and stats
                 borderBottom: index !== topBowlers.length - 1 ? '1px solid rgba(59, 130, 246, 0.1)' : 'none',
                 pb: 1 // Reduced bottom padding
               }}>
                 {/* Bowler Name */}
                 <Box sx={{ 
                   fontWeight: player.isCaptain ? 'bold' : 'normal',
                   color: themeColors.text.primary,
                   whiteSpace: 'nowrap',
                   overflow: 'hidden',
                   textOverflow: 'ellipsis',
                   mb: 0.25 // Small margin bottom
                 }}>
                   {player.name} {player.isCaptain ? '(c)' : ''}
                 </Box>
                 
                 {/* Stats Row */}
                 <Box sx={{ 
                   display: 'grid',
                   gridTemplateColumns: 'repeat(5, 40px)', // Slightly reduced column width
                   gap: { xs: 2, sm: 2.5 }, // Reduced horizontal gap
                   justifyContent: 'end',
                   minWidth: 'min-content'
                 }}>
                   <Box sx={{ textAlign: 'right' }}>{player.stats?.overs}</Box>
                   <Box sx={{ textAlign: 'right' }}>{player.stats?.maidens}</Box>
                   <Box sx={{ textAlign: 'right' }}>{player.stats?.runs}</Box>
                   <Box sx={{ textAlign: 'right' }}>{player.stats?.wickets}</Box>
                   <Box sx={{ textAlign: 'right' }}>{player.stats?.economy?.toFixed(2)}</Box>
                 </Box>
               </Box>
             ))}
           </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Win Probability Component
const WinProbabilityBar: React.FC<{ data: MatchData }> = ({ data }) => {
  // Calculate total percentage (home + away + draw)
  const totalPercentage = data.winProbability.home + data.winProbability.away + (data.bettingOdds.draw > 0 ? 100 - data.winProbability.home - data.winProbability.away : 0);
  
  // Calculate draw percentage if it exists
  const drawPercentage = data.bettingOdds.draw > 0 ? 100 - data.winProbability.home - data.winProbability.away : 0;
  
  // Calculate relative percentages for the progress bars
  const homeWidth = (data.winProbability.home / totalPercentage) * 100;
  const drawWidth = (drawPercentage / totalPercentage) * 100;
  const awayWidth = (data.winProbability.away / totalPercentage) * 100;

  // Dominant team (highest probability)
  const dominantTeam = data.winProbability.home > data.winProbability.away ? 
    { name: data.teams.home.name, percentage: data.winProbability.home } : 
    { name: data.teams.away.name, percentage: data.winProbability.away };

  return (
    <Box sx={{ mt: 1 }}>
      {/* Live win probability section */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'rgba(15, 23, 42, 0.3)',
        borderRadius: 2,
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}>
        
        {/* Team names and percentages */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" sx={{ color: '#3B82F6' }}>
            {data.teams.home.name}
            <Typography component="span" sx={{ ml: 1, color: '#3B82F6', fontWeight: 'bold' }}>
              {data.winProbability.home}%
            </Typography>
          </Typography>
          
          {drawPercentage > 0 && (
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Draw
              <Typography component="span" sx={{ ml: 1, color: 'gray', fontWeight: 'bold' }}>
                {drawPercentage}%
              </Typography>
            </Typography>
          )}
          
          <Typography variant="body2" sx={{ color: '#3B82F6', textAlign: 'right' }}>
            {data.teams.away.name}
            <Typography component="span" sx={{ ml: 1, color: '#3B82F6', fontWeight: 'bold' }}>
              {data.winProbability.away}%
            </Typography>
          </Typography>
        </Box>
        
        {/* Progress bar */}
        <Box sx={{ 
          display: 'flex', 
          height: 6, 
          borderRadius: 3, 
          overflow: 'hidden',
          bgcolor: 'rgba(15, 23, 42, 0.5)'
        }}>
          <Box sx={{ 
            width: `${homeWidth}%`, 
            bgcolor: '#3B82F6', 
            height: '100%' 
          }} />
          
          {drawPercentage > 0 && (
            <Box sx={{ 
              width: `${drawWidth}%`, 
              bgcolor: '#6B7280', 
              height: '100%' 
            }} />
          )}
          
          <Box sx={{ 
            width: `${awayWidth}%`, 
            bgcolor: '#3B82F6', 
            height: '100%' 
          }} />
        </Box>
      </Box>
    </Box>
  );
};

const MatchDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [activeBettingTab, setActiveBettingTab] = useState('Main');
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetchMatchData().then(data => {
      setMatchData(data);
      setLoading(false);
    });
  }, []);
  
      const tabs = [
      { value: 'info', label: 'Info' },
      { value: 'live', label: 'Live' },
      { value: 'odds', label: 'Odds' },
      { value: 'scorecard', label: 'Scorecard' },
      { value: 'squads', label: 'Squads' },
      { value: 'highlights', label: 'Highlights' },
    ];

  if (loading || !matchData) {
  return (
    <Layout showBackHeader>
    <PageBackground>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '100vh'
          }}>
            <CircularProgress sx={{ color: '#3B82F6' }} />
        </Box>
        </PageBackground>
      </Layout>
    );
  }

  return (
    <Layout showBackHeader>
      <PageBackground>
        {matchData && (
          <>
            {/* Top Section - Always Visible */}
            <TopBar>


                                          {/* Tab Navigation */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'center' },
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            px: { xs: 0.5, sm: 1, md: 2 }, // Responsive padding
            py: { xs: 1, sm: 1.5, md: 2 }, // Add vertical padding
            position: 'sticky', // Make tabs sticky on scroll
            top: 0,
            zIndex: 10,
            bgcolor: alpha(themeColors.background, 0.8),
            backdropFilter: 'blur(12px)'
          }}
        >
          <Box sx={{ 
            display: 'flex',
            gap: { xs: 0.5, sm: 1, md: 1.5 }, // Responsive gap
            bgcolor: themeColors.surface,
            p: { xs: 1, sm: 1.5, md: 1.5 }, // Responsive padding
            borderRadius: { xs: 1.5, sm: 2 }, // Smaller radius on mobile
            border: `1px solid ${themeColors.border}`,
            backdropFilter: 'blur(12px)',
            boxShadow: `0 4px 6px ${alpha(themeColors.background, 0.1)}`,
            width: '100%', // Take full width
            maxWidth: { xs: '100%', sm: '90%', md: '80%' }, // Responsive max width
            mx: 'auto' // Center the tabs container
          }}>
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                sx={{ 
                  minWidth: { xs: '80px', sm: '100px', md: '120px' }, // Smaller on mobile
                  flex: { xs: '1 1 0', md: '1 1 0' }, // Equal flex on all screens
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }, // Responsive font size
                  color: activeTab === tab.value ? themeColors.text.primary : themeColors.text.secondary,
                  ...commonStyles.button,
                  py: { xs: 1, sm: 1.5 }, // Responsive padding
                  px: { xs: 0.5, sm: 1, md: 2 }, // Responsive padding
                  whiteSpace: 'nowrap',
                  bgcolor: activeTab === tab.value ? themeColors.primary : 'transparent',
                  border: `1px solid ${activeTab === tab.value ? 'transparent' : themeColors.border}`,
                  '&:hover': {
                    bgcolor: activeTab === tab.value 
                      ? alpha(themeColors.primary, 0.9)
                      : alpha(themeColors.primary, 0.1),
                    transform: 'translateY(-1px)',
                    boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                  }
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        </Box>
            </TopBar>

            {/* Tab Content */}
            <Box sx={{ 
              p: { xs: 1, sm: 1.5, md: 2 }, // Responsive padding
              '& .MuiCard-root': { // Apply to all cards
                mb: { xs: 1.5, sm: 2, md: 2.5 }, // Responsive margin between cards
                '& .MuiCardHeader-root': {
                  px: { xs: 1.5, sm: 2, md: 2.5 }, // Responsive padding
                  py: { xs: 1, sm: 1.5, md: 2 },
                  '& .MuiTypography-h6': {
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } // Responsive font size
                  }
                },
                '& .MuiCardContent-root': {
                  px: { xs: 1.5, sm: 2, md: 2.5 }, // Responsive padding
                  py: { xs: 1, sm: 1.5, md: 2 },
                  '& .MuiTypography-body1': {
                    fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' } // Responsive font size
                  },
                  '& .MuiTypography-body2': {
                    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' } // Responsive font size
                  }
                }
              }
            }}>
              {activeTab === 'info' && (
                <Stack spacing={3}>
                  {/* Match Info Card */}
                  <Card sx={{ ...commonStyles.card }}>
                    <CardHeader title={<Typography variant="h6">Match Info</Typography>} />
                    <CardContent>
                      <Stack spacing={2}>
                        {/* Teams and Scores */}
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 2,
                          bgcolor: 'rgba(15, 23, 42, 0.3)',
                          borderRadius: 1,
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}>
                          <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Avatar 
                              src={matchData.teams.home.logo} 
                              alt={matchData.teams.home.name}
                              sx={{ width: 48, height: 48, mx: 'auto', mb: 1 }}
                            />
                            <Typography variant="subtitle1">{matchData.teams.home.name}</Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {matchData.teams.home.score}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ 
                            mx: 2,
                            px: 2,
                          py: 0.5, 
                            bgcolor: 'error.main',
                          borderRadius: 1,
                            alignSelf: 'center'
                        }}>
                            <Typography variant="caption" fontWeight="bold" color="white">
                              LIVE
                        </Typography>
                      </Box>
                          
                          <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <Avatar 
                              src={matchData.teams.away.logo} 
                              alt={matchData.teams.away.name}
                              sx={{ width: 48, height: 48, mx: 'auto', mb: 1 }}
                            />
                            <Typography variant="subtitle1">{matchData.teams.away.name}</Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {matchData.teams.away.score}
                            </Typography>
                          </Box>
                        </Box>
                        

                        
                        {/* Match Summary */}
                        <Box sx={{ 
                          p: 2,
                          bgcolor: 'rgba(15, 23, 42, 0.3)',
                          borderRadius: 1,
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}>
                          <Typography variant="subtitle1" sx={{ mb: 2 }}>Match Summary</Typography>
                          <Typography variant="body2">
                            Day 2, Lunch Break • New Zealand lead by 25 runs
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Zimbabwe were bowled out for 149 in their first innings. New Zealand are currently 174/3 with Conway (67*) and Latham (52*) at the crease.
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                  
                  {/* Top Performers */}
                  <Card sx={{ ...commonStyles.card }}>
                    <CardHeader title={<Typography variant="h6">Top Performers</Typography>} />
                    <CardContent>
                      <MatchSummary data={matchData} />
                    </CardContent>
                  </Card>
                  
                                     {/* Win Probability */}
                   <Card sx={{ ...commonStyles.card }}>
                     <CardHeader title={<Typography variant="h6">Win Probability</Typography>} />
                     <CardContent>
                       <WinProbabilityBar data={matchData} />
                     </CardContent>
                   </Card>
                   
                   {/* Match Details */}
                   <Card sx={{ ...commonStyles.card }}>
                     <CardHeader title={<Typography variant="h6">Match Details</Typography>} />
                     <CardContent>
                       <Stack spacing={1.5}>
                         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                           <Typography variant="body2" color="gray">Tournament</Typography>
                           <Typography variant="body2">{matchData.league}</Typography>
                         </Box>
                         <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.2)' }} />
                         
                         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                           <Typography variant="body2" color="gray">Venue</Typography>
                           <Typography variant="body2">{matchData.venue}</Typography>
                         </Box>
                         <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.2)' }} />
                         
                         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                           <Typography variant="body2" color="gray">Date & Time</Typography>
                           <Typography variant="body2">{matchData.dateTime}</Typography>
                         </Box>
                         <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.2)' }} />
                         
                         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                           <Typography variant="body2" color="gray">Status</Typography>
                           <Typography variant="body2" color="error.main" fontWeight="bold">{matchData.status}</Typography>
                         </Box>
                       </Stack>
                     </CardContent>
                   </Card>
                  </Stack>
                )}
              
              {activeTab === 'live' && (
                <Stack spacing={2}>
                  {/* Live Commentary Section */}
                  <Card sx={{ ...commonStyles.card }}>
                    <CardHeader 
                      title={
                        <Stack direction="row" spacing={2} alignItems="center">
                          <MessageIcon sx={{ color: themeColors.warning }} />
                          <Typography variant="h6" sx={{ 
                            color: themeColors.text.primary,
                            fontWeight: 600,
                            letterSpacing: '0.5px'
                          }}>
                            Live Commentary
                          </Typography>
                        </Stack>
                      }
                      sx={{ 
                        bgcolor: alpha(themeColors.secondary, 0.5),
                        borderBottom: `1px solid ${themeColors.border}`,
                        py: 2
                      }}
                    />
                    <CardContent>
                      <Stack spacing={1.5}>
                        {matchData.commentary.slice(0, 5).map((comment, idx) => (
                          <Box
                            key={idx}
                            sx={{ 
                              p: 2,
                              borderRadius: 1,
                              bgcolor: comment.type === 'goal' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(15, 23, 42, 0.3)',
                              border: comment.type === 'goal' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)'
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography
                                variant="caption"
                                sx={{ fontWeight: 'bold', color: comment.type === 'goal' ? '#10B981' : 'gray' }}
                              >
                                {comment.time}
                              </Typography>
                              {comment.type === 'goal' && (
                                <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#10B981' }}>
                                  BOUNDARY
                                </Typography>
                              )}
                            </Box>
                            <Typography variant="body2">{comment.text}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Last 20 Overs - Compact View */}
                  <Card sx={{ ...commonStyles.card }}>
                    <CardHeader 
                      title={<Typography variant="h6" sx={{ fontWeight: 600 }}>Last 20 Overs</Typography>} 
                      sx={{ pb: 1 }}
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: {
                          xs: 'repeat(2, 1fr)', // 2 columns on mobile
                          sm: 'repeat(3, 1fr)', // 3 columns on tablet
                          md: 'repeat(4, 1fr)', // 4 columns on small desktop
                          lg: 'repeat(5, 1fr)'  // 5 columns on large desktop
                        },
                        gap: { xs: 1, sm: 1.5, md: 2 }, // Responsive gap
                        mb: { xs: 2, sm: 2.5, md: 3 }, // Responsive margin
                        p: { xs: 0.5, sm: 1, md: 1.5 }, // Responsive padding
                        bgcolor: 'rgba(15, 23, 42, 0.2)',
                        borderRadius: { xs: 0.5, sm: 1 }, // Smaller radius on mobile
                        border: '1px solid rgba(59, 130, 246, 0.1)',
                        overflowX: 'auto', // Allow horizontal scroll if needed
                        WebkitOverflowScrolling: 'touch' // Smooth scroll on iOS
                      }}>
                        {Array.from({ length: 20 }, (_, i) => {
                          const overRuns = [8, 12, 6, 15, 9, 7, 11, 4, 13, 8, 10, 5, 14, 6, 9, 12, 7, 8, 11, 6][i];
                          const ballRuns = [
                            [1,2,0,4,1,0], [6,1,0,4,1,0], [1,1,0,2,1,1], [4,6,1,0,4,0], [2,1,4,1,1,0],
                            [1,0,2,1,2,1], [4,1,0,6,0,0], [1,0,1,1,0,1], [6,1,4,1,1,0], [2,1,1,2,1,1],
                            [4,0,2,1,2,1], [1,1,0,1,1,1], [6,2,4,1,1,0], [1,1,1,1,1,1], [2,1,4,1,1,0],
                            [4,1,0,6,1,0], [1,2,1,1,1,1], [2,1,1,2,1,1], [4,1,6,0,0,0], [1,1,1,1,1,1]
                          ][i];
                          
                          return (
                            <Box key={i} sx={{ 
                              textAlign: 'center',
                              p: 1,
                              borderRadius: 1,
                              bgcolor: 'rgba(15, 23, 42, 0.3)',
                              border: '1px solid rgba(59, 130, 246, 0.15)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: 'rgba(59, 130, 246, 0.1)',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                transform: 'translateY(-1px)'
                              }
                            }}>
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                mb: 1,
                                px: 0.5
                              }}>
                                <Typography variant="caption" color="gray" sx={{ fontWeight: 500 }}>
                                  O{i+1}
                                </Typography>
                                <Typography variant="caption" fontWeight="bold" color="primary" sx={{ fontSize: '0.75rem' }}>
                                  {overRuns}
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                display: 'flex', 
                                gap: 0.3, 
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                maxWidth: '100%'
                              }}>
                                {ballRuns.map((runs, idx) => (
                                  <Box
                                    key={idx}
                                    sx={{
                                      width: 18,
                                      height: 18,
                                      borderRadius: '50%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      bgcolor: runs === 4 ? '#10B981' : 
                                              runs === 6 ? '#8B5CF6' : 
                                              runs === 0 ? '#6B7280' : '#3B82F6',
                                      color: 'white',
                                      fontWeight: 'bold',
                                      fontSize: '0.65rem',
                                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                      border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                  >
                                    {runs === 0 ? '.' : runs}
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                      
                      <Divider sx={{ my: 2, borderColor: 'rgba(59, 130, 246, 0.2)' }} />
                      
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        p: 1.5,
                        bgcolor: 'rgba(15, 23, 42, 0.2)',
                        borderRadius: 1,
                        border: '1px solid rgba(59, 130, 246, 0.1)'
                      }}>
                        <Typography variant="body2" color="gray" sx={{ fontWeight: 500 }}>
                          Total: <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>180 runs</span> from last 20 overs
                        </Typography>
                        <Typography variant="body2" color="gray" sx={{ fontWeight: 500 }}>
                          RR: <span style={{ color: '#10B981', fontWeight: 'bold' }}>9.0</span> | SR: <span style={{ color: '#8B5CF6', fontWeight: 'bold' }}>112.5</span>
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        mt: 2, 
                        display: 'flex', 
                        gap: 3, 
                        justifyContent: 'center',
                        p: 1.5,
                        bgcolor: 'rgba(15, 23, 42, 0.1)',
                        borderRadius: 1,
                        border: '1px solid rgba(59, 130, 246, 0.1)'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <Box sx={{ 
                            width: 10, 
                            height: 10, 
                            borderRadius: '50%', 
                            bgcolor: '#3B82F6',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                          }} />
                          <Typography variant="caption" color="gray" sx={{ fontWeight: 500 }}>1-3</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <Box sx={{ 
                            width: 10, 
                            height: 10, 
                            borderRadius: '50%', 
                            bgcolor: '#10B981',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                          }} />
                          <Typography variant="caption" color="gray" sx={{ fontWeight: 500 }}>4</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <Box sx={{ 
                            width: 10, 
                            height: 10, 
                            borderRadius: '50%', 
                            bgcolor: '#8B5CF6',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                          }} />
                          <Typography variant="caption" color="gray" sx={{ fontWeight: 500 }}>6</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <Box sx={{ 
                            width: 10, 
                            height: 10, 
                            borderRadius: '50%', 
                            bgcolor: '#6B7280',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                          }} />
                          <Typography variant="caption" color="gray" sx={{ fontWeight: 500 }}>0</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Match Stats */}
                  <Card sx={{ ...commonStyles.card }}>
                    <CardHeader title={<Typography variant="h6">Match Stats</Typography>} />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Typography variant="caption" color="gray">Current Run Rate</Typography>
                          <Typography variant="h5" fontWeight="bold">4.2</Typography>
                                </Box>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Typography variant="caption" color="gray">Required Run Rate</Typography>
                          <Typography variant="h5" fontWeight="bold">5.8</Typography>
                            </Box>
                          </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Typography variant="caption" color="gray">Boundaries</Typography>
                          <Typography variant="h5" fontWeight="bold">12 / 6</Typography>
                          <Typography variant="caption" color="gray">Fours / Sixes</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Typography variant="caption" color="gray">Last 5 overs</Typography>
                          <Typography variant="h5" fontWeight="bold">32/2</Typography>
                          <Typography variant="caption" color="gray">Runs / Wickets</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>


                </Stack>
              )}

              {activeTab === 'odds' && (
                <Stack spacing={3}>
                  {/* Quick Stats */}
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 2,
                    mb: 1
                  }}>
                    <Box sx={{
                      p: 2.5,
                      textAlign: 'center',
                      bgcolor: 'transparent',
                      border: '1px solid rgba(51, 65, 85, 0.4)',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        border: '1px solid rgba(51, 65, 85, 0.6)',
                        bgcolor: 'rgba(51, 65, 85, 0.1)'
                      }
                    }}>
                      <Typography variant="h3" sx={{ color: '#E2E8F0', mb: 1, fontWeight: 700 }}>
                        85%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>
                        Win Probability
                      </Typography>
                    </Box>
                    <Box sx={{
                      p: 2.5,
                      textAlign: 'center',
                      bgcolor: 'transparent',
                      border: '1px solid rgba(51, 65, 85, 0.4)',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        border: '1px solid rgba(51, 65, 85, 0.6)',
                        bgcolor: 'rgba(51, 65, 85, 0.1)'
                      }
                    }}>
                      <Typography variant="h3" sx={{ color: '#E2E8F0', mb: 1, fontWeight: 700 }}>
                        2.85
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>
                        Best Odds
                      </Typography>
                    </Box>
                    <Box sx={{
                      p: 2.5,
                      textAlign: 'center',
                      bgcolor: 'transparent',
                      border: '1px solid rgba(51, 65, 85, 0.4)',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        border: '1px solid rgba(51, 65, 85, 0.6)',
                        bgcolor: 'rgba(51, 65, 85, 0.1)'
                      }
                    }}>
                      <Typography variant="h3" sx={{ color: '#E2E8F0', mb: 1, fontWeight: 700 }}>
                        12K
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>
                        Active Bets
                      </Typography>
                    </Box>
                  </Box>

                  {/* Betting Type Tabs */}
                  <Box sx={{ 
                    display: 'flex',
                    gap: 1,
                    p: 1,
                    bgcolor: 'rgba(30, 41, 59, 0.6)',
                    borderRadius: 2,
                    border: '1px solid rgba(51, 65, 85, 0.4)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                  }}>
                    {['Main', 'Match', 'Fancy'].map((type) => (
                      <Button
                        key={type}
                        onClick={() => setActiveBettingTab(type)}
                        sx={{
                          flex: 1,
                          py: 2,
                          px: 3,
                          bgcolor: type === activeBettingTab 
                            ? '#475569'
                            : 'transparent',
                          color: type === activeBettingTab 
                            ? '#F8FAFC' 
                            : '#94A3B8',
                          border: `1px solid ${type === activeBettingTab 
                            ? 'transparent' 
                            : 'rgba(51, 65, 85, 0.4)'}`,
                          borderRadius: 1.5,
                          fontWeight: type === activeBettingTab ? 600 : 500,
                          letterSpacing: '0.5px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: type === activeBettingTab 
                              ? '#334155' 
                              : 'rgba(51, 65, 85, 0.2)',
                            transform: 'translateY(-1px)',
                            boxShadow: type === activeBettingTab 
                              ? '0 4px 12px rgba(51, 65, 85, 0.4)'
                              : '0 2px 8px rgba(51, 65, 85, 0.3)'
                          }
                        }}
                      >
                        {type}
                      </Button>
                    ))}
                  </Box>

                  {activeBettingTab === 'Main' && (
                    <>
                      {/* Match Winner Section */}
                      <Card sx={{ 
                        bgcolor: 'rgba(30, 41, 59, 0.7)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(51, 65, 85, 0.4)',
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(30, 41, 59, 0.4)'
                        }
                      }}>
                        <CardHeader 
                          title={
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Box sx={{ 
                                p: 1, 
                                bgcolor: 'rgba(51, 65, 85, 0.4)', 
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <TrophyIcon sx={{ color: '#E2E8F0', fontSize: 24 }} />
                              </Box>
                              <Typography variant="h6" sx={{ 
                                color: '#F8FAFC',
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Match Winner
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            bgcolor: 'rgba(30, 41, 59, 0.8)',
                            borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
                            py: 2.5
                          }}
                        />
                        <CardContent sx={{ p: 3 }}>
                          <Stack spacing={2.5}>
                            {/* India Women */}
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 2.5,
                              bgcolor: 'rgba(15, 23, 42, 0.5)',
                              borderRadius: 1.5,
                              border: '1px solid rgba(59, 130, 246, 0.15)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: 'rgba(15, 23, 42, 0.7)',
                                border: '1px solid rgba(59, 130, 246, 0.3)'
                              }
                            }}>
                              <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                                India Women
                              </Typography>
                              <Stack direction="row" spacing={1.5}>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    bgcolor: '#3B82F6',
                                    color: 'white',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: '#2563EB',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                    }
                                  }}
                                >
                                  Back 2.85
                                </Button>
                                <Button
                                  sx={{
                                    bgcolor: '#6B7280',
                                    color: 'white',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    minWidth: 80,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: '#4B5563',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)'
                                    }
                                  }}
                                >
                                  <Stack alignItems="center" spacing={0.5}>
                                    <Typography variant="body2" fontWeight={600}>Lay</Typography>
                                    <Typography variant="caption">2.9</Typography>
                                  </Stack>
                                </Button>
                              </Stack>
                            </Box>

                            {/* Australia Women */}
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 2.5,
                              bgcolor: 'rgba(15, 23, 42, 0.5)',
                              borderRadius: 1.5,
                              border: '1px solid rgba(59, 130, 246, 0.15)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: 'rgba(15, 23, 42, 0.7)',
                                border: '1px solid rgba(59, 130, 246, 0.3)'
                              }
                            }}>
                              <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                                Australia Women
                              </Typography>
                              <Stack direction="row" spacing={1.5}>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    bgcolor: '#3B82F6',
                                    color: 'white',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: '#2563EB',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                    }
                                  }}
                                >
                                  Back 1.45
                                </Button>
                                <Button
                                  sx={{
                                    bgcolor: '#6B7280',
                                    color: 'white',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    minWidth: 80,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: '#4B5563',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)'
                                    }
                                  }}
                                >
                                  <Stack alignItems="center" spacing={0.5}>
                                    <Typography variant="body2" fontWeight={600}>Lay</Typography>
                                    <Typography variant="caption">1.47</Typography>
                                  </Stack>
                                </Button>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>

                  {/* Toss Winner Section */}
                      <Card sx={{ 
                        bgcolor: 'rgba(15, 23, 42, 0.4)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.15)'
                        }
                      }}>
                        <CardHeader 
                          title={
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Box sx={{ 
                                p: 1, 
                                bgcolor: 'rgba(59, 130, 246, 0.2)', 
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <Box sx={{ 
                                  width: 16, 
                                  height: 16, 
                                  borderRadius: '50%', 
                                  bgcolor: '#3B82F6',
                                  border: '2px solid white'
                                }} />
                              </Box>
                              <Typography variant="h6" sx={{ 
                                color: 'white',
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Toss Winner
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            bgcolor: 'rgba(15, 23, 42, 0.6)',
                            borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                            py: 2.5
                          }}
                        />
                        <CardContent sx={{ p: 3 }}>
                          <Stack spacing={2.5}>
                            {/* India Women */}
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 2.5,
                              bgcolor: 'rgba(15, 23, 42, 0.5)',
                              borderRadius: 1.5,
                              border: '1px solid rgba(59, 130, 246, 0.15)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: 'rgba(15, 23, 42, 0.7)',
                                border: '1px solid rgba(59, 130, 246, 0.3)'
                              }
                            }}>
                              <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                                India Women
                              </Typography>
                              <Stack direction="row" spacing={1.5}>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    bgcolor: '#3B82F6',
                                    color: 'white',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: '#2563EB',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                    }
                                  }}
                                >
                                  Back 1.95
                                </Button>
                                <Button
                                  sx={{
                                    bgcolor: '#6B7280',
                                    color: 'white',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    minWidth: 80,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: '#4B5563',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)'
                                    }
                                  }}
                                >
                                  <Stack alignItems="center" spacing={0.5}>
                                    <Typography variant="body2" fontWeight={600}>Lay</Typography>
                                    <Typography variant="caption">1.98</Typography>
                                  </Stack>
                                </Button>
                              </Stack>
                            </Box>

                            {/* Australia Women */}
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 2.5,
                              bgcolor: 'rgba(15, 23, 42, 0.5)',
                              borderRadius: 1.5,
                              border: '1px solid rgba(59, 130, 246, 0.15)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: 'rgba(15, 23, 42, 0.7)',
                                border: '1px solid rgba(59, 130, 246, 0.3)'
                              }
                            }}>
                              <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                                Australia Women
                              </Typography>
                              <Stack direction="row" spacing={1.5}>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    bgcolor: '#3B82F6',
                                    color: 'white',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: '#2563EB',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                    }
                                  }}
                                >
                                  Back 1.85
                                </Button>
                                <Button
                                  sx={{
                                    bgcolor: '#6B7280',
                                    color: 'white',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    minWidth: 80,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: '#4B5563',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)'
                                    }
                                  }}
                                >
                                  <Stack alignItems="center" spacing={0.5}>
                                    <Typography variant="body2" fontWeight={600}>Lay</Typography>
                                    <Typography variant="caption">1.88</Typography>
                                  </Stack>
                                </Button>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {activeBettingTab === 'Match' && (
                    <>
                      {/* Team Total Runs Section */}
                      <Card sx={{ ...commonStyles.card }}>
                        <CardHeader 
                          title={
                            <Stack direction="row" spacing={2} alignItems="center">
                              <TargetIcon sx={{ color: themeColors.warning }} />
                              <Typography variant="h6" sx={{ 
                                color: themeColors.text.primary,
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Team Total Runs
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            bgcolor: alpha(themeColors.secondary, 0.5),
                            borderBottom: `1px solid ${themeColors.border}`,
                            py: 2
                          }}
                        />
                        <CardContent>
                          <Stack spacing={3}>
                            {/* India Women Total Runs */}
              <Box>
                              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                                India Women Total Runs
                  </Typography>
                              <Stack spacing={2}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Under 140.5
                  </Typography>
                                  <Button
                                                        variant="contained"
                    size="small"
                    sx={{
                      ...commonStyles.button,
                      bgcolor: themeColors.primary,
                      color: themeColors.text.primary,
                      '&:hover': {
                        bgcolor: alpha(themeColors.primary, 0.9),
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                      }
                                    }}
                                  >
                                    Back 1.9
                                  </Button>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Over 140.5
                                  </Typography>
                                  <Button
                                                        variant="contained"
                    size="small"
                    sx={{
                      ...commonStyles.button,
                      bgcolor: themeColors.primary,
                      color: themeColors.text.primary,
                      '&:hover': {
                        bgcolor: alpha(themeColors.primary, 0.9),
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                      }
                                    }}
                                  >
                                    Back 1.9
                                  </Button>
                                </Box>
                              </Stack>
                </Box>

                            {/* Australia Women Total Runs */}
                            <Box>
                              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                                Australia Women Total Runs
                              </Typography>
                              <Stack spacing={2}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Under 142.5
                                  </Typography>
                    <Button
                                                        variant="contained"
                    size="small"
                      sx={{
                      ...commonStyles.button,
                      bgcolor: themeColors.primary,
                      color: themeColors.text.primary,
                      '&:hover': {
                        bgcolor: alpha(themeColors.primary, 0.9),
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                      }
                                    }}
                                  >
                                    Back 1.85
                                  </Button>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Over 142.5
                                  </Typography>
                                  <Button
                                                        variant="contained"
                    size="small"
                    sx={{
                      ...commonStyles.button,
                      bgcolor: themeColors.primary,
                      color: themeColors.text.primary,
                      '&:hover': {
                        bgcolor: alpha(themeColors.primary, 0.9),
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                      }
                                    }}
                                  >
                                    Back 1.95
                                  </Button>
                                </Box>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>

                      {/* Player Performance Section */}
                      <Card sx={{ ...commonStyles.card }}>
                        <CardHeader 
                          title={
                            <Stack direction="row" spacing={2} alignItems="center">
                              <ActivityIcon sx={{ color: themeColors.warning }} />
                              <Typography variant="h6" sx={{ 
                                color: themeColors.text.primary,
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Player Performance
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            bgcolor: alpha(themeColors.secondary, 0.5),
                            borderBottom: `1px solid ${themeColors.border}`,
                            py: 2
                          }}
                        />
                        <CardContent>
                          <Stack spacing={3}>
                            {/* Smriti Mandhana Runs */}
                            <Box>
                              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                                Smriti Mandhana Runs
                              </Typography>
                              <Stack spacing={2}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Under 24.5
                                  </Typography>
                                  <Button
                                                        variant="contained"
                    size="small"
                    sx={{
                      ...commonStyles.button,
                      bgcolor: themeColors.primary,
                      color: themeColors.text.primary,
                      '&:hover': {
                        bgcolor: alpha(themeColors.primary, 0.9),
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                      }
                                    }}
                                  >
                                    Back 1.8
                                  </Button>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Over 24.5
                                  </Typography>
                                  <Button
                                                        variant="contained"
                    size="small"
                    sx={{
                      ...commonStyles.button,
                      bgcolor: themeColors.primary,
                      color: themeColors.text.primary,
                      '&:hover': {
                        bgcolor: alpha(themeColors.primary, 0.9),
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                      }
                                    }}
                                  >
                                    Back 2.0
                                  </Button>
                                </Box>
                              </Stack>
                            </Box>

                            {/* Ellyse Perry Runs */}
                            <Box>
                              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                                Ellyse Perry Runs
                              </Typography>
                              <Stack spacing={2}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Under 29.5
                                  </Typography>
                                  <Button
                                                        variant="contained"
                    size="small"
                    sx={{
                      ...commonStyles.button,
                      bgcolor: themeColors.primary,
                      color: themeColors.text.primary,
                      '&:hover': {
                        bgcolor: alpha(themeColors.primary, 0.9),
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                      }
                                    }}
                                  >
                                    Back 1.75
                                  </Button>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Over 29.5
                                  </Typography>
                                  <Button
                                                        variant="contained"
                    size="small"
                    sx={{
                      ...commonStyles.button,
                      bgcolor: themeColors.primary,
                      color: themeColors.text.primary,
                      '&:hover': {
                        bgcolor: alpha(themeColors.primary, 0.9),
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                      }
                                    }}
                                  >
                                    Back 2.05
                                  </Button>
                                </Box>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {activeBettingTab === 'Fancy' && (
                    <>
                      {/* Next Over Runs */}
                      <Card sx={{ ...commonStyles.card }}>
                        <CardHeader 
                          title={
                            <Stack direction="row" spacing={2} alignItems="center">
                              <AccessTimeIcon sx={{ color: themeColors.warning }} />
                              <Typography variant="h6" sx={{ 
                                color: themeColors.text.primary,
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Next Over Runs
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            bgcolor: alpha(themeColors.secondary, 0.5),
                            borderBottom: `1px solid ${themeColors.border}`,
                            py: 2
                          }}
                        />
                        <CardContent>
                          <Stack spacing={2}>
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 2,
                              bgcolor: 'rgba(239, 68, 68, 0.2)',
                              borderRadius: 1,
                              border: '1px solid rgba(239, 68, 68, 0.3)'
                            }}>
                              <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                Under 8.5
                              </Typography>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="caption" sx={{ color: 'gray' }}>8.5</Typography>
                                <Typography variant="caption" sx={{ color: 'gray' }}>120</Typography>
                              </Stack>
                            </Box>
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 2,
                              bgcolor: 'rgba(59, 130, 246, 0.2)',
                              borderRadius: 1,
                              border: '1px solid rgba(59, 130, 246, 0.3)'
                            }}>
                              <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                Over 8.5
                              </Typography>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="caption" sx={{ color: 'gray' }}>8.5</Typography>
                                <Typography variant="caption" sx={{ color: 'gray' }}>85</Typography>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>

                      {/* Fall of Wicket */}
                      <Card sx={{ ...commonStyles.card }}>
                        <CardHeader 
                          title={
                            <Stack direction="row" spacing={2} alignItems="center">
                              <TrophyIcon sx={{ color: themeColors.warning }} />
                              <Typography variant="h6" sx={{ 
                                color: themeColors.text.primary,
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Fall of Wicket
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            bgcolor: alpha(themeColors.secondary, 0.5),
                            borderBottom: `1px solid ${themeColors.border}`,
                            py: 2
                          }}
                        />
                        <CardContent>
                          <Stack spacing={3}>
                            {/* Fall of Next Wicket */}
                            <Box>
                              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                                Fall of Next Wicket
                              </Typography>
                              <Stack spacing={2}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(239, 68, 68, 0.2)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(239, 68, 68, 0.3)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    1-3 Overs
                                  </Typography>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="caption" sx={{ color: 'gray' }}>122.0</Typography>
                                    <Typography variant="caption" sx={{ color: 'gray' }}>120</Typography>
                                  </Stack>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(59, 130, 246, 0.2)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.3)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    4+ Overs
                                  </Typography>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="caption" sx={{ color: 'gray' }}>122.0</Typography>
                                    <Typography variant="caption" sx={{ color: 'gray' }}>85</Typography>
                                  </Stack>
                                </Box>
                              </Stack>
                            </Box>

                            {/* Method of Next Dismissal */}
                            <Box>
                              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                                Method of Next Dismissal
                              </Typography>
                              <Stack spacing={2}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(239, 68, 68, 0.2)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(239, 68, 68, 0.3)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Bowled/LBW
                                  </Typography>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="caption" sx={{ color: 'gray' }}>3.2</Typography>
                                    <Typography variant="caption" sx={{ color: 'gray' }}>100</Typography>
                                  </Stack>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(59, 130, 246, 0.2)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.3)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Caught
                                  </Typography>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="caption" sx={{ color: 'gray' }}>1.9</Typography>
                                    <Typography variant="caption" sx={{ color: 'gray' }}>110</Typography>
                                  </Stack>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(34, 197, 94, 0.2)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(34, 197, 94, 0.3)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Other
                                  </Typography>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="caption" sx={{ color: 'gray' }}>8.0</Typography>
                                    <Typography variant="caption" sx={{ color: 'gray' }}>75</Typography>
                                  </Stack>
                                </Box>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>

                      {/* Quick Bets - Next Ball */}
                      <Card sx={{ ...commonStyles.card }}>
                        <CardHeader 
                          title={
                            <Stack direction="row" spacing={2} alignItems="center">
                              <StarIcon sx={{ color: themeColors.warning }} />
                              <Typography variant="h6" sx={{ 
                                color: themeColors.text.primary,
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Quick Bets - Next Ball
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            bgcolor: alpha(themeColors.secondary, 0.5),
                            borderBottom: `1px solid ${themeColors.border}`,
                            py: 2
                          }}
                        />
                        <CardContent>
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={2}>
                              <Button
                                sx={{
                                  flex: 1,
                                  ...commonStyles.button,
                                  bgcolor: alpha(themeColors.success, 0.15),
                                  border: `1px solid ${alpha(themeColors.success, 0.3)}`,
                                  p: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 0.5,
                                  '&:hover': {
                                    bgcolor: alpha(themeColors.success, 0.25),
                                    transform: 'translateY(-2px)',
                                    boxShadow: `0 8px 24px ${alpha(themeColors.success, 0.25)}`
                                  }
                                }}
                              >
                                <Typography 
                                  variant="body1" 
                                  fontWeight={600}
                                  sx={{ color: themeColors.success }}
                                >
                                  FOUR
                                </Typography>
                                <Typography 
                                  variant="caption"
                                  sx={{ color: alpha(themeColors.success, 0.8) }}
                                >
                                  6.5
                                </Typography>
                              </Button>
                                                            <Button
                                sx={{
                                  flex: 1,
                                  ...commonStyles.button,
                                  bgcolor: alpha(themeColors.purple, 0.15),
                                  border: `1px solid ${alpha(themeColors.purple, 0.3)}`,
                                  p: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 0.5,
                                  '&:hover': {
                                    bgcolor: alpha(themeColors.purple, 0.25),
                                    transform: 'translateY(-2px)',
                                    boxShadow: `0 8px 24px ${alpha(themeColors.purple, 0.25)}`
                                  }
                                }}
                              >
                                <Typography 
                                  variant="body1" 
                                  fontWeight={600}
                                  sx={{ color: themeColors.purple }}
                                >
                                  SIX
                                </Typography>
                                <Typography 
                                  variant="caption"
                                  sx={{ color: alpha(themeColors.purple, 0.8) }}
                                >
                                  12.0
                                </Typography>
                              </Button>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                                            <Button
                                sx={{
                                  flex: 1,
                                  ...commonStyles.button,
                                  bgcolor: alpha(themeColors.text.secondary, 0.15),
                                  border: `1px solid ${alpha(themeColors.text.secondary, 0.3)}`,
                                  p: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 0.5,
                                  '&:hover': {
                                    bgcolor: alpha(themeColors.text.secondary, 0.25),
                                    transform: 'translateY(-2px)',
                                    boxShadow: `0 8px 24px ${alpha(themeColors.text.secondary, 0.25)}`
                                  }
                                }}
                              >
                                <Typography 
                                  variant="body1" 
                                  fontWeight={600}
                                  sx={{ color: themeColors.text.secondary }}
                                >
                                  DOT
                                </Typography>
                                <Typography 
                                  variant="caption"
                                  sx={{ color: alpha(themeColors.text.secondary, 0.8) }}
                                >
                                  2.8
                                </Typography>
                              </Button>
                                                            <Button
                                sx={{
                                  flex: 1,
                                  ...commonStyles.button,
                                  bgcolor: alpha(themeColors.primary, 0.15),
                                  border: `1px solid ${alpha(themeColors.primary, 0.3)}`,
                                  p: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 0.5,
                                  '&:hover': {
                                    bgcolor: alpha(themeColors.primary, 0.25),
                                    transform: 'translateY(-2px)',
                                    boxShadow: `0 8px 24px ${alpha(themeColors.primary, 0.25)}`
                                  }
                                }}
                              >
                                <Typography 
                                  variant="body1" 
                                  fontWeight={600}
                                  sx={{ color: themeColors.primary }}
                                >
                                  WICKET
                                </Typography>
                                <Typography 
                                  variant="caption"
                                  sx={{ color: alpha(themeColors.primary, 0.8) }}
                                >
                                  8.5
                                </Typography>
                              </Button>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </Stack>
              )}

              {activeTab === 'comm' && (
                <Stack spacing={2}>
                  {/* Commentary Header */}
                  <Box sx={{
                    p: 2,
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    borderRadius: 1,
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <MessageIcon sx={{ color: 'gray' }} />
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      Live Commentary
                    </Typography>
                  </Box>

                  {/* Commentary Feed */}
                  <Stack spacing={1}>
                    {/* FOUR */}
                    <Box sx={{
                      p: 2,
                      bgcolor: 'rgba(34, 197, 94, 0.1)',
                      borderRadius: 1,
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" sx={{
                          bgcolor: 'rgba(34, 197, 94, 0.2)',
                          color: '#10B981',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}>
                          11.3
                        </Typography>
                        <Typography variant="caption" sx={{
                          bgcolor: 'rgba(34, 197, 94, 0.2)',
                          color: '#10B981',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}>
                          FOUR!
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        Perry finds the gap through covers. Brilliant shot!
                      </Typography>
                    </Box>

                    {/* Single */}
                    <Box sx={{
                      p: 2,
                      bgcolor: 'rgba(15, 23, 42, 0.3)',
                      borderRadius: 1,
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" sx={{
                          bgcolor: 'rgba(59, 130, 246, 0.2)',
                          color: '#3B82F6',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}>
                          11.2
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        Single taken to deep mid-wicket. Good running between the wickets.
                      </Typography>
                    </Box>

                    {/* Dot Ball */}
                    <Box sx={{
                      p: 2,
                      bgcolor: 'rgba(15, 23, 42, 0.3)',
                      borderRadius: 1,
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" sx={{
                          bgcolor: 'rgba(59, 130, 246, 0.2)',
                          color: '#3B82F6',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}>
                          11.1
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        Dot ball. Tight bowling from Shafali, Perry defends.
                      </Typography>
                    </Box>

                    {/* SIX */}
                    <Box sx={{
                      p: 2,
                      bgcolor: 'rgba(168, 85, 247, 0.1)',
                      borderRadius: 1,
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" sx={{
                          bgcolor: 'rgba(168, 85, 247, 0.2)',
                          color: '#A855F7',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}>
                          10.6
                        </Typography>
                        <Typography variant="caption" sx={{
                          bgcolor: 'rgba(168, 85, 247, 0.2)',
                          color: '#A855F7',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}>
                          SIX!
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        What a shot! Gardner goes big over long-on!
                      </Typography>
                    </Box>

                    {/* Two Runs */}
                    <Box sx={{
                      p: 2,
                      bgcolor: 'rgba(15, 23, 42, 0.3)',
                      borderRadius: 1,
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" sx={{
                          bgcolor: 'rgba(59, 130, 246, 0.2)',
                          color: '#3B82F6',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}>
                          10.5
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        Two runs taken. Good placement by Gardner.
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              )}

              {activeTab === 'scorecard' && (
                <Stack spacing={3}>
                  {/* First Innings */}
                  <Card sx={{ ...commonStyles.card }}>
                    <Box sx={{
                      p: 2,
                      bgcolor: alpha(themeColors.surface, 0.7),
                      borderBottom: `1px solid ${themeColors.border}`
                    }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="h6" sx={{ color: themeColors.text.primary }}>
                          {matchData.teams.home.name} - 1st Innings
                          </Typography>
                        <Typography variant="h6" sx={{ color: themeColors.text.primary }}>
                          149 all out (52.5 ov)
                        </Typography>
                      </Stack>
                    </Box>

                    <Box sx={{ 
                      p: { xs: 1, sm: 2 },
                      overflow: 'hidden' // Contains scrollable content
                    }}>
                      {/* Scrollable Container */}
                      <Box sx={{
                        overflowX: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        width: '100%',
                        '&::-webkit-scrollbar': { height: 4 },
                        '&::-webkit-scrollbar-track': { bgcolor: 'rgba(0,0,0,0.1)' },
                        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }
                      }}>
                        {/* Inner Content with minimum width */}
                        <Box sx={{ minWidth: { xs: '600px', sm: '100%' } }}>
                          {/* Batting Headers */}
                          <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                              xs: '180px repeat(5, 40px) 1fr',
                              sm: '2fr 40px 40px 40px 40px 60px 1fr'
                            },
                            gap: { xs: 1, sm: 2 },
                            mb: 1,
                            px: 1
                          }}>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>Batter</Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              textAlign: 'right',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>R</Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              textAlign: 'right',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>B</Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              textAlign: 'right',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>4s</Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              textAlign: 'right',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>6s</Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              textAlign: 'right',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>SR</Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>Dismissal</Typography>
                          </Box>

                          {/* Batters */}
                          <Stack spacing={0.5}>
                            {matchData.players.home.slice(0, 4).map((player, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  display: 'grid',
                                  gridTemplateColumns: {
                                    xs: '180px repeat(5, 40px) 1fr',
                                    sm: '2fr 40px 40px 40px 40px 60px 1fr'
                                  },
                                  gap: { xs: 1, sm: 2 },
                                  p: { xs: 0.75, sm: 1 },
                                  borderRadius: 1,
                                  bgcolor: idx % 2 === 0 ? 'transparent' : alpha(themeColors.surface, 0.3),
                                  '&:hover': { bgcolor: alpha(themeColors.primary, 0.05) }
                                }}
                              >
                                <Box sx={{ 
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>
                                  <Typography variant="body2" sx={{ 
                                    color: themeColors.text.primary,
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                  }}>
                                    {player.name} {player.isWicketKeeper ? '†' : ''} {player.isCaptain ? '(c)' : ''}
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: themeColors.text.primary,
                                  textAlign: 'right',
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                }}>
                                  {player.stats?.runs || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: themeColors.text.primary,
                                  textAlign: 'right',
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                }}>
                                  {player.stats?.balls || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: themeColors.text.primary,
                                  textAlign: 'right',
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                }}>
                                  {player.stats?.fours || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: themeColors.text.primary,
                                  textAlign: 'right',
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                }}>
                                  {player.stats?.sixes || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: themeColors.text.primary,
                                  textAlign: 'right',
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                }}>
                                  {player.stats?.strikeRate?.toFixed(2) || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: themeColors.text.secondary,
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {idx === 0 ? 'c Conway b Muzarabani' : idx === 1 ? 'b Raza' : idx === 2 ? 'lbw b Muzarabani' : 'not out'}
                                </Typography>
                            </Box>
                            ))}
                          </Stack>
                        </Box>
                      </Box>

                      {/* Extras & Total */}
                      <Box sx={{ 
                        mt: { xs: 1.5, sm: 2 }, 
                        pt: { xs: 1.5, sm: 2 },
                        borderTop: `1px solid ${themeColors.border}`,
                        fontSize: { xs: '0.8rem', sm: '0.875rem' }
                      }}>
                        <Typography variant="body2" sx={{ 
                          color: themeColors.text.secondary,
                          fontSize: 'inherit',
                          mb: 0.5
                        }}>
                          Extras: 12 (b 4, lb 5, w 2, nb 1)
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: themeColors.text.secondary,
                          fontSize: 'inherit',
                          mb: 1
                        }}>
                          Total: 149 all out (52.5 ov)
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: themeColors.text.secondary,
                          fontSize: 'inherit',
                          lineHeight: 1.4
                        }}>
                          Fall of wickets: 
                          <Box component="span" sx={{ 
                            display: { xs: 'block', sm: 'inline' },
                            mt: { xs: 0.5, sm: 0 },
                            ml: { sm: 0.5 }
                          }}>
                            1-23 (Curran, 8.2 ov), 2-45 (Bennett, 15.3 ov), 3-67 (Welch, 22.1 ov), 4-98 (Williams, 32.4 ov)
                          </Box>
                        </Typography>
                      </Box>
                      </Box>

                    {/* Bowling Section */}
                    <Box sx={{ 
                      p: { xs: 1, sm: 2 },
                      borderTop: `1px solid ${themeColors.border}`,
                      overflow: 'hidden'
                    }}>
                      <Typography variant="subtitle1" sx={{ 
                        mb: { xs: 1.5, sm: 2 },
                        color: themeColors.text.primary,
                        fontSize: { xs: '1rem', sm: '1.1rem' }
                      }}>
                        Bowling
                      </Typography>

                      {/* Scrollable Container */}
                      <Box sx={{
                        overflowX: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        width: '100%',
                        '&::-webkit-scrollbar': { height: 4 },
                        '&::-webkit-scrollbar-track': { bgcolor: 'rgba(0,0,0,0.1)' },
                        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }
                      }}>
                        {/* Inner Content with minimum width */}
                        <Box sx={{ minWidth: { xs: '500px', sm: '100%' } }}>
                          {/* Bowling Headers */}
                          <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                              xs: '180px repeat(5, 40px)',
                              sm: '2fr repeat(5, 40px)'
                            },
                            gap: { xs: 1, sm: 2 },
                            mb: 1,
                            px: 1
                          }}>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>Bowler</Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              textAlign: 'right',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>O</Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              textAlign: 'right',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>M</Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              textAlign: 'right',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>R</Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              textAlign: 'right',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>W</Typography>
                            <Typography variant="caption" sx={{ 
                              color: themeColors.text.secondary,
                              textAlign: 'right',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' }
                            }}>ECON</Typography>
                          </Box>

                          {/* Bowlers */}
                          <Stack spacing={0.5}>
                            {matchData.players.away.slice(0, 2).map((player, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  display: 'grid',
                                  gridTemplateColumns: {
                                    xs: '180px repeat(5, 40px)',
                                    sm: '2fr repeat(5, 40px)'
                                  },
                                  gap: { xs: 1, sm: 2 },
                                  p: { xs: 0.75, sm: 1 },
                                  borderRadius: 1,
                                  bgcolor: idx % 2 === 0 ? 'transparent' : alpha(themeColors.surface, 0.3),
                                  '&:hover': { bgcolor: alpha(themeColors.primary, 0.05) }
                                }}
                              >
                                <Box sx={{ 
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>
                                  <Typography variant="body2" sx={{ 
                                    color: themeColors.text.primary,
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                  }}>
                                    {player.name} {player.isCaptain ? '(c)' : ''}
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: themeColors.text.primary,
                                  textAlign: 'right',
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                }}>
                                  {player.stats?.overs || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: themeColors.text.primary,
                                  textAlign: 'right',
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                }}>
                                  {player.stats?.maidens || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: themeColors.text.primary,
                                  textAlign: 'right',
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                }}>
                                  {player.stats?.runs || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: themeColors.text.primary,
                                  textAlign: 'right',
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                }}>
                                  {player.stats?.wickets || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: themeColors.text.primary,
                                  textAlign: 'right',
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                }}>
                                  {player.stats?.economy?.toFixed(2) || 0}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      </Box>
                    </Box>
                  </Card>

                  {/* Second Innings */}
                  <Card sx={{ ...commonStyles.card }}>
                    <Box sx={{
                      p: 2,
                      bgcolor: alpha(themeColors.surface, 0.7),
                      borderBottom: `1px solid ${themeColors.border}`
                    }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ color: themeColors.text.primary }}>
                          {matchData.teams.away.name} - 1st Innings
                        </Typography>
                        <Typography variant="h6" sx={{ color: themeColors.text.primary }}>
                          174/3 (52.0 ov)
                        </Typography>
                      </Stack>
                    </Box>

                    <Box sx={{ p: 2 }}>
                      {/* Batting Headers */}
                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 40px 40px 40px 40px 60px 1fr',
                        gap: 1,
                        mb: 1,
                        px: 1
                      }}>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>Batter</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>R</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>B</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>4s</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>6s</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>SR</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>Dismissal</Typography>
                      </Box>

                      {/* Batters */}
                      <Stack spacing={0.5}>
                        {matchData.players.away.slice(0, 2).map((player, idx) => (
                          <Box
                            key={idx}
                            sx={{
                          display: 'grid',
                              gridTemplateColumns: '2fr 40px 40px 40px 40px 60px 1fr',
                              gap: 1,
                          p: 1,
                          borderRadius: 1,
                              bgcolor: idx % 2 === 0 ? 'transparent' : alpha(themeColors.surface, 0.3),
                              '&:hover': { bgcolor: alpha(themeColors.primary, 0.05) }
                            }}
                          >
                            <Box>
                              <Typography variant="body2" sx={{ color: themeColors.text.primary }}>
                                {player.name} {player.isWicketKeeper ? '†' : ''} {player.isCaptain ? '(c)' : ''}
                              </Typography>
                        </Box>
                            <Typography variant="body2" sx={{ color: themeColors.text.primary, textAlign: 'right' }}>
                              {player.stats?.runs || 0}
                            </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.primary, textAlign: 'right' }}>
                              {player.stats?.balls || 0}
                            </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.primary, textAlign: 'right' }}>
                              {player.stats?.fours || 0}
                            </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.primary, textAlign: 'right' }}>
                              {player.stats?.sixes || 0}
                            </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.primary, textAlign: 'right' }}>
                              {player.stats?.strikeRate?.toFixed(2) || 0}
                            </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                              {idx === 0 ? 'not out' : idx === 1 ? 'not out' : ''}
                            </Typography>
                        </Box>
                        ))}
                      </Stack>

                      {/* Extras & Total */}
                      <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${themeColors.border}` }}>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                          Extras: 9 (b 3, lb 2, w 3, nb 1)
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                          Total: 174/3 (52.0 ov)
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary, mt: 1 }}>
                          Fall of wickets: 1-32 (Young, 10.4 ov), 2-85 (Nicholls, 24.3 ov), 3-122 (Ravindra, 38.1 ov)
                        </Typography>
                      </Box>
                      </Box>

                    {/* Bowling Section */}
                    <Box sx={{ p: 2, borderTop: `1px solid ${themeColors.border}` }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, color: themeColors.text.primary }}>
                          Bowling
                        </Typography>

                      {/* Bowling Headers */}
                        <Box sx={{
                          display: 'grid',
                        gridTemplateColumns: '2fr 40px 40px 40px 40px 60px',
                        gap: 1,
                          mb: 1,
                          px: 1
                        }}>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>Bowler</Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>O</Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>M</Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>R</Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>W</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>ECON</Typography>
                        </Box>

                      {/* Bowlers */}
                      <Stack spacing={0.5}>
                        {matchData.players.home.slice(0, 2).map((player, idx) => (
                          <Box
                            key={idx}
                            sx={{
                            display: 'grid',
                              gridTemplateColumns: '2fr 40px 40px 40px 40px 60px',
                              gap: 1,
                            p: 1,
                            borderRadius: 1,
                              bgcolor: idx % 2 === 0 ? 'transparent' : alpha(themeColors.surface, 0.3),
                              '&:hover': { bgcolor: alpha(themeColors.primary, 0.05) }
                            }}
                          >
                        <Typography variant="body2" sx={{ color: themeColors.text.primary }}>
                              {player.name} {player.isCaptain ? '(c)' : ''}
                        </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.primary, textAlign: 'right' }}>
                              12
                          </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.primary, textAlign: 'right' }}>
                              2
                            </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.primary, textAlign: 'right' }}>
                              38
                            </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.primary, textAlign: 'right' }}>
                              1
                            </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.primary, textAlign: 'right' }}>
                              3.17
                            </Typography>
                          </Box>
                  ))}
                      </Stack>
                </Box>
                  </Card>
                  
                  {/* Match Status */}
                  <Card sx={{ ...commonStyles.card }}>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, color: themeColors.text.primary, fontWeight: 'bold' }}>
                        Match Status
                    </Typography>

                      <Typography variant="body1" sx={{ color: themeColors.text.primary, mb: 1 }}>
                        New Zealand lead by 25 runs
                      </Typography>

                          <Box sx={{
                        p: 2, 
                            bgcolor: alpha(themeColors.primary, 0.05),
                              borderRadius: 1,
                        border: `1px solid ${alpha(themeColors.primary, 0.2)}`
                      }}>
                            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                          Day 2, Lunch Break • Test Match
                            </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Stack>
              )}

              {activeTab === 'squads' && (
                <Squads data={matchData} />
              )}
              
              {activeTab === 'highlights' && (
                <Stack spacing={3}>
                  {/* Key Moments */}
                  <Card sx={{ ...commonStyles.card }}>
                    <CardHeader title={<Typography variant="h6">Key Moments</Typography>} />
                    <CardContent>
                      <List sx={{ width: '100%' }}>
                        {/* Day 1 */}
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#3B82F6' }}>
                          Day 1
                        </Typography>
                        
                      <Box sx={{
                        p: 2,
                          mb: 2,
                          borderRadius: 1,
                          bgcolor: 'rgba(15, 23, 42, 0.3)',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}>
                          <Stack spacing={1.5}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                              <Typography variant="caption" sx={{ 
                                color: 'gray',
                                minWidth: '50px',
                                textAlign: 'right',
                                pt: 0.5
                              }}>
                                10.4
                              </Typography>
                              <Box>
                                <Typography variant="body2">
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                                  Young b Muzarabani 12(28). Muzarabani with a beautiful inswinging yorker that sneaks through Young's defense and crashes into the stumps. New Zealand 23/1.
                          </Typography>
                        </Box>
                      </Box>

                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                              <Typography variant="caption" sx={{ 
                                color: 'gray',
                                minWidth: '50px',
                                textAlign: 'right',
                                pt: 0.5
                              }}>
                                15.3
                            </Typography>
                              <Box>
                                <Typography variant="body2">
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                                  Bennett b Raza 22(41). Raza with a clever arm ball that Bennett completely misreads. New Zealand 45/2.
                            </Typography>
                          </Box>
                </Box>
                            
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                              <Typography variant="caption" sx={{ 
                                color: 'gray',
                                minWidth: '50px',
                                textAlign: 'right',
                                pt: 0.5
                              }}>
                                22.1
                    </Typography>
                              <Box>
                                <Typography variant="body2">
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                                  Welch lbw b Muzarabani 22(56). Muzarabani strikes again with a delivery that keeps low. New Zealand 67/3.
                      </Typography>
                              </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Typography variant="caption" sx={{ 
                        color: 'gray',
                                minWidth: '50px',
                                textAlign: 'right',
                                pt: 0.5
                              }}>
                                32.4
                      </Typography>
                        <Box>
                                <Typography variant="body2">
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: '#10B981' }}>FIFTY! </Typography>
                                  Tom Latham brings up his half-century with a well-placed drive through the covers. 52 runs from 78 balls with 6 fours.
                                </Typography>
              </Box>
          </Box>

                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                              <Typography variant="caption" sx={{ 
                                color: 'gray',
                                minWidth: '50px',
                                textAlign: 'right',
                                pt: 0.5
                              }}>
                                32.4
                              </Typography>
                              <Box>
                                <Typography variant="body2">
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                                  Williams c Conway b Muzarabani 31(67). Muzarabani picks up his third wicket with a short ball that Williams pulls straight to Conway at deep square leg. New Zealand 98/4.
                                </Typography>
        </Box>
                        </Box>

                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                              <Typography variant="caption" sx={{ 
                                color: 'gray',
                                minWidth: '50px',
                                textAlign: 'right',
                                pt: 0.5
                              }}>
                                52.5
                              </Typography>
                              <Box>
                                <Typography variant="body2">
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>ALL OUT! </Typography>
                                  New Zealand bowled out for 149 in 52.5 overs. Muzarabani finishes with 4/32, Raza 3/41.
                                </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Box>
                        
                        {/* Day 2 */}
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 3, color: '#3B82F6' }}>
                          Day 2
                      </Typography>

                      <Box sx={{
                        p: 2,
                          borderRadius: 1,
                          bgcolor: 'rgba(15, 23, 42, 0.3)',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}>
                          <Stack spacing={1.5}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                              <Typography variant="caption" sx={{ 
                                color: 'gray',
                                minWidth: '50px',
                                textAlign: 'right',
                                pt: 0.5
                              }}>
                                10.4
                              </Typography>
                          <Box>
                                <Typography variant="body2">
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                                  Young c Conway b Muzarabani 12(28). Muzarabani gets the first breakthrough for Zimbabwe. New Zealand 32/1.
                            </Typography>
                          </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <Typography variant="caption" sx={{
                                color: 'gray',
                                minWidth: '50px',
                                textAlign: 'right',
                                pt: 0.5
                              }}>
                                24.3
                              </Typography>
                              <Box>
                                <Typography variant="body2">
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                                  Nicholls b Raza 34(62). Raza bowls Nicholls with a delivery that turns sharply. New Zealand 85/2.
                            </Typography>
                          </Box>
                      </Box>

                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                              <Typography variant="caption" sx={{ 
                                color: 'gray',
                                minWidth: '50px',
                                textAlign: 'right',
                                pt: 0.5
                              }}>
                                24.3
                              </Typography>
                          <Box>
                                <Typography variant="body2">
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: '#3B82F6' }}>BOUNDARY! </Typography>
                                  Conway plays an elegant cover drive off Ngarava for four. Textbook cricket shot.
                            </Typography>
                          </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <Typography variant="caption" sx={{
                                color: 'gray',
                                minWidth: '50px',
                                textAlign: 'right',
                                pt: 0.5
                              }}>
                                38.1
                              </Typography>
                              <Box>
                                <Typography variant="body2">
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                                  Ravindra lbw b Muzarabani 28(54). Muzarabani traps Ravindra in front with a delivery that keeps low. New Zealand 122/3.
                            </Typography>
                          </Box>
                      </Box>

                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                              <Typography variant="caption" sx={{ 
                                color: 'gray',
                                minWidth: '50px',
                                textAlign: 'right',
                                pt: 0.5
                              }}>
                                52.0
                              </Typography>
                          <Box>
                                <Typography variant="body2">
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: 'gray' }}>LUNCH </Typography>
                                  New Zealand 174/3 at lunch on Day 2, leading by 25 runs. Conway 67* (112), Latham 52* (78) at the crease.
                            </Typography>
                          </Box>
                          </Box>
                        </Stack>
                      </Box>
                      </List>
                    </CardContent>
                  </Card>
                    </Stack>
              )}

              {activeTab === 'odds' && (
                <Stack spacing={3}>
                  <Card sx={{ ...commonStyles.card }}>
                    <CardHeader 
                      title="Betting Odds" 
                      sx={{
                        ...commonStyles.cardHeader,
                          textAlign: 'center'
                      }} 
                    />
                    <CardContent>
                      <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                        Betting odds information will be displayed here.
                        </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              )}
                </Box>
          </>
      )}
    </PageBackground>
    </Layout>
  );
};

export default MatchDetailPage;