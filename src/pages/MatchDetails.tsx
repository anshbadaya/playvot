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
  Tab,
  CardHeader,
  CardContent
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
  stats: {
    runs?: number;
    balls?: number;
    goals?: number;
    assists?: number;
    shots?: number;
    passes?: number;
    rating: number;
    fours?: number;
    sixes?: number;
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
      name: 'India Women',
      logo: '/teams/india.png',
      score: 142,
      stats: {
        possession: 55,
        shots: 12,
        shotsOnTarget: 5,
        corners: 6,
        fouls: 8,
        wickets: 4
      }
    },
    away: {
      name: 'Australia Women',
      logo: '/teams/australia.png',
      score: 89,
      stats: {
        possession: 45,
        shots: 10,
        shotsOnTarget: 3,
        corners: 4,
        fouls: 10,
        wickets: 2
      }
    }
  },
  score: '2 - 1',
  league: 'Premier League',
  status: 'Live',
  venue: 'Old Trafford',
  dateTime: new Date().toLocaleString(),
  timeElapsed: '75:23',
  players: {
    home: [
      {
        name: 'E Perry',
        number: 1,
        position: 'Batter',
  stats: {
          runs: 34,
          balls: 22,
          fours: 4,
          sixes: 1,
          rating: 154.5
        }
      },
      {
        name: 'A Gardner',
        number: 2,
        position: 'Batter',
        stats: {
          runs: 28,
          balls: 18,
          fours: 2,
          sixes: 2,
          rating: 155.6
        }
      }
    ],
    away: [
      {
        name: 'S Mandhana',
        number: 3,
        position: 'Batter',
        stats: {
          runs: 52,
          balls: 38,
          fours: 6,
          sixes: 2,
          rating: 136.8
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
    home: 65,
    away: 35
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

const LiveBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    background: themeColors.error,
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    '@keyframes pulse': {
      '0%, 100%': {
        opacity: 1,
        transform: 'scale(1)'
      },
      '50%': {
        opacity: 0.7,
        transform: 'scale(1.1)'
      },
    },
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

const ScoreCard: React.FC<{ data: MatchData }> = ({ data }) => (
  <Card sx={{ bgcolor: alpha("#000000", 0.2), color: 'white', p: 3, borderRadius: 3 }}>
    <Typography variant="h5" gutterBottom fontWeight="bold">Live Score</Typography>
    <Stack direction="row" justifyContent="space-around" alignItems="center" my={3}>
      <Stack alignItems="center" spacing={1}>
        <Avatar sx={{ width: 60, height: 60, bgcolor: '#2D2D2D' }}>{data.teams.home.name.charAt(0)}</Avatar>
        <Typography variant="h6">{data.teams.home.name}</Typography>
      </Stack>
      <Typography variant="h2" fontWeight="bold">{data.score}</Typography>
      <Stack alignItems="center" spacing={1}>
        <Avatar sx={{ width: 60, height: 60, bgcolor: '#2D2D2D' }}>{data.teams.away.name.charAt(0)}</Avatar>
        <Typography variant="h6">{data.teams.away.name}</Typography>
      </Stack>
    </Stack>
    <Typography variant="subtitle2" sx={{ color: '#aaa', textAlign: 'center' }}>
      {data.league} | Status: <span style={{ color: '#3B82F6' }}>{data.status}</span>
    </Typography>
  </Card>
);

const Stats: React.FC<{ data: MatchData }> = ({ data }) => (
  <Card sx={{ bgcolor: alpha("#000000", 0.2), color: 'white', borderRadius: 3, p: 3 }}>
    <Typography variant="h5" gutterBottom fontWeight="bold">Match Stats</Typography>
    <Stack spacing={2} mt={2}>
      <Box>
        <Typography variant="body2" color="gray" gutterBottom>Possession</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <LinearProgress 
            variant="determinate" 
            value={data.teams.home.stats.possession} 
            sx={{ 
              flex: 1,
              height: 8,
              borderRadius: 1,
              bgcolor: 'rgba(255,255,255,0.1)',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#3B82F6'
              }
            }} 
          />
          <Typography variant="body2">{data.teams.home.stats.possession}%</Typography>
        </Stack>
      </Box>
      
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">{data.teams.home.stats.shots}</Typography>
          <Typography variant="body2" color="gray">Shots</Typography>
          <Typography variant="body2">{data.teams.away.stats.shots}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">{data.teams.home.stats.shotsOnTarget}</Typography>
          <Typography variant="body2" color="gray">Shots on Target</Typography>
          <Typography variant="body2">{data.teams.away.stats.shotsOnTarget}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">{data.teams.home.stats.corners}</Typography>
          <Typography variant="body2" color="gray">Corners</Typography>
          <Typography variant="body2">{data.teams.away.stats.corners}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">{data.teams.home.stats.fouls}</Typography>
          <Typography variant="body2" color="gray">Fouls</Typography>
          <Typography variant="body2">{data.teams.away.stats.fouls}</Typography>
        </Box>
      </Stack>
    </Stack>
  </Card>
);

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

const MatchDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('live');
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
      { value: 'live', label: 'Live' },
      { value: 'odds', label: 'Odds' },
      { value: 'card', label: 'Card' },
      { value: 'comm', label: 'Comm' },
      { value: 'stats', label: 'Stats' },
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
              {/* Team Names & Score */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" fontWeight="bold">{matchData.teams.home.name}</Typography>
                  </Box>
                  <LiveBadge badgeContent="●" color="error">
                    <Typography 
                      variant="caption" 
          sx={{
                        px: 1.5, 
                        py: 0.5, 
                        bgcolor: 'error.main', 
                        borderRadius: 1,
                        fontWeight: 'bold'
                      }}
                    >
                      LIVE
                    </Typography>
                  </LiveBadge>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" fontWeight="bold">{matchData.teams.away.name}</Typography>
                  </Box>
                </Box>

                {/* Match Info */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" color="gray">{matchData.league}</Typography>
                  <Stack 
                    direction="row" 
                    spacing={2} 
                    justifyContent="center" 
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnIcon sx={{ fontSize: 16, color: 'gray' }} />
                      <Typography variant="caption" color="gray">{matchData.venue}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: 'gray' }} />
                      <Typography variant="caption" color="gray">{matchData.timeElapsed}</Typography>
                    </Box>
                  </Stack>
                </Box>

                {/* Score Display */}
                <Box sx={{ 
                  bgcolor: 'rgba(15, 23, 42, 0.3)',
                  borderRadius: 2,
                  p: 2,
                  border: '1px solid rgba(59, 130, 246, 0.3)'
                }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="gray">{matchData.teams.home.name}</Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {matchData.teams.home.score}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="gray">Time Elapsed</Typography>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        {matchData.timeElapsed}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="gray">{matchData.teams.away.name}</Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {matchData.teams.away.score}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

                                          {/* Tab Navigation */}
        <Box
          sx={{
                  width: '100%',
            display: 'flex',
                  justifyContent: { xs: 'flex-start', md: 'center' },
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch', // For smooth scrolling on iOS
                  msOverflowStyle: 'none', // Hide scrollbar on IE/Edge
                  scrollbarWidth: 'none', // Hide scrollbar on Firefox
                  '&::-webkit-scrollbar': { // Hide scrollbar on Chrome/Safari
                    display: 'none'
                  },
                  px: 1 // Add padding to account for the hidden scrollbar
                }}
              >
                <Box sx={{ 
                  display: 'flex',
                  gap: 1.5,
                  bgcolor: themeColors.surface,
                  p: 1.5,
                  borderRadius: 2,
                  border: `1px solid ${themeColors.border}`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 4px 6px ${alpha(themeColors.background, 0.1)}`,
                  minWidth: { xs: 'fit-content', md: 'auto' }, // Fit content on mobile, auto on desktop
                  maxWidth: { md: '80%' } // Limit width on desktop
                }}>
                  {tabs.map((tab) => (
                    <Button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
            sx={{ 
                        minWidth: { xs: '100px', sm: '120px', md: '140px' }, // Fixed minimum width for each tab
                        flex: { xs: '0 0 auto', md: '1 1 0' }, // No flex on mobile, equal flex on desktop
                        color: activeTab === tab.value ? themeColors.text.primary : themeColors.text.secondary,
                        ...commonStyles.button,
                        py: 1.5,
                        whiteSpace: 'nowrap', // Prevent text wrapping
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
            <Box sx={{ p: 2 }}>
              {activeTab === 'live' && (
                <Stack spacing={2}>
                  {/* Current Partnership */}
                  <Card sx={{ ...commonStyles.card }}>
                    <CardHeader
                      title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ActivityIcon sx={{ color: '#10B981' }} />
                          <Typography variant="h6">Current Partnership</Typography>
                        </Box>
                      }
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>{matchData.players.home[0].name} & {matchData.players.home[1].name}</Typography>
                        <Typography variant="caption" sx={{ 
                          px: 1.5, 
                          py: 0.5, 
                          bgcolor: 'rgba(59, 130, 246, 0.1)', 
                          borderRadius: 1,
                          border: '1px solid rgba(59, 130, 246, 0.3)'
                        }}>
                          45 (28 balls)
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={65} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 1,
                          bgcolor: 'rgba(59, 130, 246, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: '#3B82F6'
                          }
                        }} 
                      />
                    </CardContent>
                  </Card>

                  {/* Current Batters */}
                  <Card sx={{ ...commonStyles.card }}>
                    <CardHeader title={<Typography variant="h6">Current Batters</Typography>} />
                    <CardContent>
                      <Stack spacing={1.5}>
                        {matchData.players.home.slice(0, 2).map((player, idx) => (
                          <Box
                            key={idx}
            sx={{ 
              display: 'flex',
                              justifyContent: 'space-between',
                              p: 2,
                              bgcolor: 'rgba(15, 23, 42, 0.5)',
                              borderRadius: 1,
                              border: '1px solid rgba(59, 130, 246, 0.2)'
                            }}
                          >
              <Box>
                              <Typography variant="subtitle1">{player.name}</Typography>
                              <Typography variant="caption" color="gray">
                                {player.stats.runs}* ({player.stats.balls})
                  </Typography>
          </Box>
                            <Box textAlign="right">
                              <Typography variant="body2">SR: {player.stats.rating}</Typography>
                              <Typography variant="caption" color="gray">
                                {player.stats.fours}×4 {player.stats.sixes}×6
                  </Typography>
                </Box>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Last 5 Balls */}
                  <Card sx={{ ...commonStyles.card }}>
                    <CardHeader title={<Typography variant="h6">Last 5 Balls</Typography>} />
                    <CardContent>
                      <Stack direction="row" spacing={1} justifyContent="center">
                        {['4', '1', '.', '6', '2'].map((ball, idx) => (
                          <Avatar
                            key={idx}
            sx={{ 
                              bgcolor: ball === '4' 
                                ? '#10B981' 
                                : ball === '6'
                                  ? '#8B5CF6'
                                  : ball === '.'
                                    ? '#6B7280'
                                    : '#3B82F6',
                              width: 36,
                              height: 36,
                              fontSize: '0.875rem',
                              fontWeight: 'bold'
                            }}
                          >
                            {ball}
                          </Avatar>
                        ))}
                      </Stack>
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
                      ...commonStyles.card,
                      p: 2,
                      textAlign: 'center',
                      bgcolor: alpha(themeColors.success, 0.1),
                      border: `1px solid ${alpha(themeColors.success, 0.2)}`
                    }}>
                      <Typography variant="h4" sx={{ color: themeColors.success, mb: 1 }}>
                        85%
                      </Typography>
                      <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>
                        Win Probability
                      </Typography>
                    </Box>
                    <Box sx={{
                      ...commonStyles.card,
                      p: 2,
                      textAlign: 'center',
                      bgcolor: alpha(themeColors.warning, 0.1),
                      border: `1px solid ${alpha(themeColors.warning, 0.2)}`
                    }}>
                      <Typography variant="h4" sx={{ color: themeColors.warning, mb: 1 }}>
                        2.85
                      </Typography>
                      <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>
                        Best Odds
                      </Typography>
                    </Box>
                    <Box sx={{
                      ...commonStyles.card,
                      p: 2,
                      textAlign: 'center',
                      bgcolor: alpha(themeColors.purple, 0.1),
                      border: `1px solid ${alpha(themeColors.purple, 0.2)}`
                    }}>
                      <Typography variant="h4" sx={{ color: themeColors.purple, mb: 1 }}>
                        12K
                      </Typography>
                      <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>
                        Active Bets
                      </Typography>
                    </Box>
                  </Box>

                  {/* Betting Type Tabs */}
                  <Box sx={{ 
              display: 'flex',
                    gap: 1.5,
                    p: 1.5,
                    bgcolor: alpha(themeColors.surface, 0.7),
                    borderRadius: 2,
                    border: `1px solid ${themeColors.border}`,
                    backdropFilter: 'blur(12px)',
                    boxShadow: `0 4px 20px ${alpha(themeColors.background, 0.2)}`
                  }}>
                    {['Main', 'Match', 'Fancy'].map((type) => (
                    <Button
                        key={type}
                        onClick={() => setActiveBettingTab(type)}
                      sx={{
                          flex: 1,
                          py: 1.5,
                          ...commonStyles.button,
                          bgcolor: type === activeBettingTab 
                            ? `${themeColors.primary} !important`
                            : alpha(themeColors.surface, 0.5),
                          color: type === activeBettingTab 
                            ? themeColors.text.primary 
                            : themeColors.text.secondary,
                          border: `1px solid ${type === activeBettingTab 
                            ? 'transparent' 
                            : themeColors.border}`,
                          backdropFilter: 'blur(8px)',
                          fontWeight: type === activeBettingTab ? 600 : 500,
                          letterSpacing: '0.5px',
                          '&:hover': {
                            bgcolor: type === activeBettingTab 
                              ? themeColors.primary 
                              : alpha(themeColors.primary, 0.1),
                            transform: 'translateY(-1px)',
                            boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
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
                    ...commonStyles.card,
                    bgcolor: alpha(themeColors.surface, 0.7),
                    backdropFilter: 'blur(12px)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 24px ${alpha(themeColors.primary, 0.15)}`
                    }
                  }}>
                    <CardHeader 
                      title={
                        <Stack direction="row" spacing={2} alignItems="center">
                          <TrophyIcon sx={{ color: themeColors.warning }} />
                          <Typography variant="h6" sx={{ 
                            color: themeColors.text.primary,
                        fontWeight: 600,
                            letterSpacing: '0.5px'
                          }}>
                            Match Winner
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
                        {/* India Women */}
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          ...commonStyles.gridItem,
                          bgcolor: themeColors.surface
                        }}>
                          <Typography variant="body1" sx={{ color: 'white' }}>
                            India Women
                          </Typography>
                          <Stack direction="row" spacing={1}>
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
                              Back 2.85
                    </Button>
                                                            <Button
                                  sx={{
                                    ...commonStyles.button,
                                    bgcolor: themeColors.error,
                                    color: themeColors.text.primary,
                                    minWidth: 100,
                                    '&:hover': {
                                      bgcolor: alpha(themeColors.error, 0.9),
                                      transform: 'translateY(-1px)',
                                      boxShadow: `0 4px 12px ${alpha(themeColors.error, 0.2)}`
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
                          ...commonStyles.gridItem,
                          bgcolor: themeColors.surface
                        }}>
                          <Typography variant="body1" sx={{ color: 'white' }}>
                            Australia Women
                          </Typography>
                          <Stack direction="row" spacing={1}>
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
                              Back 1.45
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                              }}
                            >
                              Lay 1.47
                            </Button>
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Toss Winner Section */}
                  <Card sx={{ ...commonStyles.card }}>
                    <CardHeader 
                      title={
                        <Typography variant="h6" sx={{ color: 'white' }}>
                          Toss Winner
                        </Typography>
                      }
                      sx={{ 
                        bgcolor: '#3B82F6',
                        py: 1.5
                      }}
                    />
                    <CardContent>
                      <Stack spacing={2}>
                        {/* India Women */}
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          ...commonStyles.gridItem,
                          bgcolor: themeColors.surface
                        }}>
                          <Typography variant="body1" sx={{ color: 'white' }}>
                            India Women
                          </Typography>
                          <Stack direction="row" spacing={1}>
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
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                              }}
                            >
                              Lay 1.98
                            </Button>
                          </Stack>
                        </Box>

                        {/* Australia Women */}
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          ...commonStyles.gridItem,
                          bgcolor: themeColors.surface
                        }}>
                          <Typography variant="body1" sx={{ color: 'white' }}>
                            Australia Women
                          </Typography>
                          <Stack direction="row" spacing={1}>
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
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                              }}
                            >
                              Lay 1.88
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
                      <Card sx={{ bgcolor: 'rgba(15, 23, 42, 0.3)', border: '1px solid rgba(59, 130, 246, 0.3)', mt: 2 }}>
                        <CardHeader 
                          title={
                            <Typography variant="h6" sx={{ color: 'white' }}>
                              Player Performance
                            </Typography>
                          }
                          sx={{ 
                            bgcolor: '#3B82F6',
                            py: 1.5
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
                            <Typography variant="h6" sx={{ color: 'white' }}>
                              Next Over Runs
                            </Typography>
                          }
                          sx={{ 
                            bgcolor: '#3B82F6',
                            py: 1.5
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
                      <Card sx={{ bgcolor: 'rgba(15, 23, 42, 0.3)', border: '1px solid rgba(59, 130, 246, 0.3)', mt: 2 }}>
                        <CardHeader 
                          title={
                            <Typography variant="h6" sx={{ color: 'white' }}>
                              Fall of Wicket
                            </Typography>
                          }
                          sx={{ 
                            bgcolor: '#3B82F6',
                            py: 1.5
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
                      <Card sx={{ bgcolor: 'rgba(234, 179, 8, 0.2)', border: '1px solid rgba(234, 179, 8, 0.3)', mt: 2 }}>
                        <CardHeader 
                          title={
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Typography variant="h6" sx={{ color: 'white' }}>⚡</Typography>
                              <Typography variant="h6" sx={{ color: 'white' }}>
                                Quick Bets - Next Ball
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            bgcolor: 'rgba(234, 179, 8, 0.3)',
                            py: 1.5
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

              {activeTab === 'card' && (
                <Stack spacing={3}>
                  {/* Match Info Card */}
                  <Card sx={{ ...commonStyles.card }}>
                    <Box sx={{
                      p: 2,
                      bgcolor: alpha(themeColors.surface, 0.7),
                      borderBottom: `1px solid ${themeColors.border}`
                    }}>
                      <Stack spacing={2}>
                        {/* Match Status */}
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="h6" sx={{ color: themeColors.text.primary }}>
                            Women's T20I • Match 3
                          </Typography>
                          <Box sx={{
                            px: 2,
                            py: 0.5,
                            bgcolor: alpha(themeColors.error, 0.1),
                            border: `1px solid ${alpha(themeColors.error, 0.3)}`,
                            borderRadius: 1
                          }}>
                            <Typography variant="caption" sx={{ color: themeColors.error, fontWeight: 600 }}>
                              LIVE
                            </Typography>
                          </Box>
                        </Stack>

                        {/* Venue & Time */}
                        <Stack direction="row" spacing={3}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <LocationOnIcon sx={{ color: themeColors.text.secondary, fontSize: 18 }} />
                            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                              Brabourne Stadium, Mumbai
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <AccessTimeIcon sx={{ color: themeColors.text.secondary, fontSize: 18 }} />
                            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                              Today, 7:30 PM IST
                            </Typography>
                          </Stack>
                        </Stack>

                        {/* Match Summary */}
                        <Box sx={{
                          mt: 1,
                          p: 2,
                          bgcolor: alpha(themeColors.primary, 0.05),
                          border: `1px solid ${alpha(themeColors.primary, 0.2)}`,
                          borderRadius: 1
                        }}>
                          <Typography variant="body2" sx={{ color: themeColors.text.primary }}>
                            Australia Women need 54 runs in 47 balls at 6.89 RPO
                          </Typography>
                        </Box>

                        {/* Toss & Other Details */}
                        <Stack spacing={0.5}>
                          <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                            Toss: Australia Women, elected to bowl first
                          </Typography>
                          <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                            Series: 5-match T20I series level 1-1
                          </Typography>
                          <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                            Points: India Women 2, Australia Women 2
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Card>
                  {/* India Women Innings */}
                  <Card sx={{ ...commonStyles.card }}>
                    <Box sx={{
                      p: 2,
                      bgcolor: alpha(themeColors.surface, 0.7),
                      borderBottom: `1px solid ${themeColors.border}`
                    }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ color: themeColors.text.primary }}>
                          India Women
                        </Typography>
                        <Typography variant="h6" sx={{ color: themeColors.text.primary }}>
                          142/4 (18.3 ov)
                        </Typography>
                      </Stack>
                    </Box>

                    <Box sx={{ p: 2 }}>
                      {/* Batting Headers */}
                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 60px 60px 60px 60px 80px 1fr',
                        gap: 2,
                        mb: 1,
                        px: 1
                      }}>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>Batting</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>R</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>B</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>4s</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>6s</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>S/R</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>Dismissal</Typography>
                      </Box>

                      {/* Batters */}
                      <Stack spacing={1.5}>
                        {/* S Mandhana */}
                                                  <Box sx={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 60px 60px 60px 60px 80px 1fr',
                          gap: 2,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: alpha(themeColors.error, 0.02),
                          '&:hover': { bgcolor: alpha(themeColors.error, 0.05) }
                        }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{ color: themeColors.text.primary }}>S Mandhana</Typography>
                            <Box sx={{
                              px: 1,
                              bgcolor: alpha(themeColors.error, 0.1),
                              border: `1px solid ${alpha(themeColors.error, 0.3)}`,
                              borderRadius: 0.5
                            }}>
                              <Typography variant="caption" sx={{ color: themeColors.error }}>OUT</Typography>
                            </Box>
                          </Stack>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>52</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>38</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>6</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>2</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>136.8</Typography>
                          <Typography sx={{ color: themeColors.text.secondary }}>c Perry b Schutt</Typography>
                        </Box>

                        {/* H Kaur */}
                        <Box sx={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 60px 60px 60px 60px 80px',
                          gap: 2,
                          p: 1,
                          borderRadius: 1,
                          '&:hover': { bgcolor: alpha(themeColors.surface, 0.5) }
                        }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{ color: themeColors.text.primary }}>H Kaur</Typography>
                            <Box sx={{
                              px: 1,
                              bgcolor: alpha(themeColors.error, 0.1),
                              border: `1px solid ${alpha(themeColors.error, 0.3)}`,
                              borderRadius: 0.5
                            }}>
                              <Typography variant="caption" sx={{ color: themeColors.error }}>OUT</Typography>
                            </Box>
                          </Stack>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>28</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>24</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>3</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>1</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>116.7</Typography>
                        </Box>
                      </Stack>

                      {/* Extras & Total */}
                      <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${themeColors.border}` }}>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                          Extras: 8 (b 2, lb 3, w 3)
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                          Total: 142/4 (18.3 ov)
                        </Typography>
                      </Box>

                      {/* Yet to bat */}
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary, mb: 1 }}>
                          Yet to bat
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.primary }}>
                          J Rodrigues • R Ghosh • D Sharma • S Rana • R Yadav • M Joshi
                        </Typography>
                      </Box>
                    </Box>
                  </Card>

                  {/* Australia Women Innings */}
                  <Card sx={{ ...commonStyles.card }}>
                    <Box sx={{
                      p: 2,
                      bgcolor: alpha(themeColors.surface, 0.7),
                      borderBottom: `1px solid ${themeColors.border}`
                    }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ color: themeColors.text.primary }}>
                          Australia Women
                        </Typography>
                        <Typography variant="h6" sx={{ color: themeColors.text.primary }}>
                          89/2 (12.1 ov)
                        </Typography>
                      </Stack>
                    </Box>

                    <Box sx={{ p: 2 }}>
                      {/* Batting Headers */}
                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 60px 60px 60px 60px 80px 1fr',
                        gap: 2,
                        mb: 1,
                        px: 1
                      }}>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>Batting</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>R</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>B</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>4s</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>6s</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>S/R</Typography>
                        <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>Dismissal</Typography>
                      </Box>

                      {/* Batters */}
                      <Stack spacing={1.5}>
                        {/* E Perry */}
                        <Box sx={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 60px 60px 60px 60px 80px',
                          gap: 2,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: alpha(themeColors.success, 0.05),
                          '&:hover': { bgcolor: alpha(themeColors.success, 0.1) }
                        }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{ color: themeColors.text.primary }}>E Perry</Typography>
                            <Typography variant="caption" sx={{ color: themeColors.success }}>not out</Typography>
                          </Stack>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>34</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>22</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>4</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>1</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>154.5</Typography>
                        </Box>

                        {/* A Gardner */}
                        <Box sx={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 60px 60px 60px 60px 80px',
                          gap: 2,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: alpha(themeColors.success, 0.05),
                          '&:hover': { bgcolor: alpha(themeColors.success, 0.1) }
                        }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{ color: themeColors.text.primary }}>A Gardner</Typography>
                            <Typography variant="caption" sx={{ color: themeColors.success }}>not out</Typography>
                          </Stack>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>28</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>18</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>2</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>2</Typography>
                          <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>155.6</Typography>
                        </Box>
                      </Stack>

                      {/* Extras & Total */}
                      <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${themeColors.border}` }}>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                          Extras: 4 (lb 1, w 3)
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                          Total: 89/2 (12.1 ov)
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                          CRR: 7.32 • RRR: 8.94
                        </Typography>
                      </Box>

                      {/* Yet to bat */}
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ color: themeColors.text.secondary, mb: 1 }}>
                          Yet to bat
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.text.primary }}>
                          M Lanning • B Mooney • T McGrath • A Sutherland • J Jonassen • A King
                        </Typography>
                      </Box>

                      {/* Bowling */}
                      <Box sx={{ mt: 3 }}>
                        <Box sx={{
                          p: 2,
                          mb: 2,
                          bgcolor: alpha(themeColors.primary, 0.05),
                          border: `1px solid ${alpha(themeColors.primary, 0.2)}`,
                          borderRadius: 1
                        }}>
                          <Stack direction="row" spacing={3}>
                            <Box>
                              <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>
                                Current Bowler
                              </Typography>
                              <Typography variant="body1" sx={{ color: themeColors.text.primary }}>
                                R Yadav • 4.1-0-28-1
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>
                                This Over
                              </Typography>
                              <Typography variant="body1" sx={{ color: themeColors.text.primary }}>
                                1 • 4 • 6 • 2 • 1 • 4
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>

                        <Typography variant="body2" sx={{ 
                          color: themeColors.text.secondary, 
                          mb: 2, 
                          px: 1,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Bowling
                        </Typography>

                        <Box sx={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 60px 60px 60px 60px 80px 80px 80px',
                          gap: 2,
                          mb: 1,
                          px: 1
                        }}>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>Bowler</Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>O</Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>M</Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>R</Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>W</Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>Econ</Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>Dots</Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary, textAlign: 'right' }}>4s/6s</Typography>
                        </Box>

                        <Stack spacing={1.5}>
                          {/* D Sharma */}
                          <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 60px 60px 60px 60px 80px 80px 80px',
                            gap: 2,
                            p: 1,
                            borderRadius: 1,
                            '&:hover': { bgcolor: alpha(themeColors.surface, 0.5) }
                          }}>
                            <Typography sx={{ color: themeColors.text.primary }}>D Sharma</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>4.0</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>0</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>32</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>0</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>8.00</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>8</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>2/1</Typography>
                          </Box>

                          {/* R Yadav */}
                          <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 60px 60px 60px 60px 80px 80px 80px',
                            gap: 2,
                            p: 1,
                            borderRadius: 1,
                            bgcolor: alpha(themeColors.primary, 0.05),
                            '&:hover': { bgcolor: alpha(themeColors.primary, 0.1) }
                          }}>
                            <Typography sx={{ color: themeColors.text.primary }}>R Yadav</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>4.1</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>0</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>28</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>1</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>6.72</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>12</Typography>
                            <Typography sx={{ color: themeColors.text.primary, textAlign: 'right' }}>1/2</Typography>
                          </Box>
                        </Stack>

                        {/* Bowling Analysis */}
                        <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${themeColors.border}` }}>
                          <Stack direction="row" spacing={3}>
                            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                              Powerplay: 1-6: 42/1
                            </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                              Middle: 7-15: 78/1
                            </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                              Death: 16-20: 22/0 (2.3 ov)
                            </Typography>
                          </Stack>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Stack>
              )}

              {activeTab === 'stats' && (
                <Stack spacing={3}>
                  {/* Player Stats Cards */}
                  {[
                    {
                      name: 'E Perry',
                      stats: { runs: 34, balls: 22, fours: 4, sixes: 1 }
                    },
                    {
                      name: 'A Gardner',
                      stats: { runs: 28, balls: 18, fours: 2, sixes: 2 }
                    },
                    {
                      name: 'S Mandhana',
                      stats: { runs: 52, balls: 38, fours: 6, sixes: 2 }
                    }
                  ].map((player, index) => (
                    <Box
                      key={player.name}
                      sx={{
                        bgcolor: 'rgba(15, 23, 42, 0.3)',
                        borderRadius: 2,
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        overflow: 'hidden'
                      }}
                    >
                      <Box sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                          {player.name}
                        </Typography>
                        <Box sx={{
                          px: 2,
                          py: 0.5,
                          bgcolor: 'rgba(59, 130, 246, 0.2)',
                          borderRadius: 5,
                          border: '1px solid rgba(59, 130, 246, 0.3)'
                        }}>
                          <Typography variant="caption" sx={{ color: '#3B82F6' }}>
                            {((player.stats.runs / player.stats.balls) * 100).toFixed(1)} SR
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        borderTop: '1px solid rgba(59, 130, 246, 0.2)',
                      }}>
                        {[
                          { value: player.stats.runs, label: 'Runs' },
                          { value: player.stats.balls, label: 'Balls' },
                          { value: player.stats.fours, label: '4s' },
                          { value: player.stats.sixes, label: '6s' }
                        ].map((stat, statIndex) => (
                          <Box
                            key={statIndex}
                            sx={{
                              p: 2,
                              textAlign: 'center',
                              borderRight: statIndex < 3 ? '1px solid rgba(59, 130, 246, 0.2)' : 'none'
                            }}
                          >
                            <Typography variant="h6" sx={{ color: 'white', mb: 0.5 }}>
                              {stat.value}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'gray' }}>
                              {stat.label}
                            </Typography>
                          </Box>
                  ))}
                </Box>
                    </Box>
                  ))}

                  {/* Head to Head Section */}
                  <Box sx={{
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    borderRadius: 2,
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    overflow: 'hidden'
                  }}>
                    <Typography variant="h6" sx={{ p: 2, color: 'white' }}>
                      Head to Head
                    </Typography>

                    <Box sx={{ p: 2, borderTop: '1px solid rgba(59, 130, 246, 0.2)' }}>
                      <Typography variant="h4" sx={{ 
                        color: 'white', 
                        textAlign: 'center',
                        mb: 1
                      }}>
                        IND 12 - 8 AUS
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: 'gray',
                        display: 'block',
                        textAlign: 'center',
                        mb: 3
                      }}>
                        Last 20 T20I matches
                      </Typography>

                      <Stack spacing={2}>
                        <Box>
                          <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1
                          }}>
                            <Typography variant="body2" sx={{ color: 'gray' }}>Win %</Typography>
                            <Typography variant="body2" sx={{ color: 'white' }}>65%</Typography>
              </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={65}
                            sx={{
                              height: 8,
                              borderRadius: 1,
                              bgcolor: 'rgba(59, 130, 246, 0.2)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: '#3B82F6'
                              }
                            }}
                          />
          </Box>

                        <Box>
                          <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1
                          }}>
                            <Typography variant="body2" sx={{ color: 'gray' }}>Avg Score</Typography>
                            <Typography variant="body2" sx={{ color: 'white' }}>156</Typography>
        </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={78}
                            sx={{
                              height: 8,
                              borderRadius: 1,
                              bgcolor: 'rgba(59, 130, 246, 0.2)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: '#3B82F6'
                              }
                            }}
                          />
                        </Box>

                        <Box>
                          <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1
                          }}>
                            <Typography variant="body2" sx={{ color: 'gray' }}>Run Rate</Typography>
                            <Typography variant="body2" sx={{ color: 'white' }}>8.2</Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={82}
                            sx={{
                              height: 8,
                              borderRadius: 1,
                              bgcolor: 'rgba(59, 130, 246, 0.2)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: '#3B82F6'
                              }
                            }}
                          />
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                </Stack>
              )}

              {activeTab === 'highlights' && (
                <Stack spacing={3}>
                  {/* Key Moments */}
                  <Box sx={{
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    borderRadius: 2,
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    overflow: 'hidden'
                  }}>
                    <Box sx={{
                      p: 2,
                      borderBottom: '1px solid rgba(59, 130, 246, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <StarIcon sx={{ color: '#3B82F6' }} />
                      <Typography variant="h6" sx={{ color: 'white' }}>
                        Key Moments
                      </Typography>
                    </Box>

                    <Stack>
                      {/* Mandhana's Fifty */}
                      <Box sx={{
                        p: 2,
                        borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                        bgcolor: 'rgba(34, 197, 94, 0.1)',
                        '&:hover': { bgcolor: 'rgba(34, 197, 94, 0.15)' }
                      }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'rgba(34, 197, 94, 0.2)',
                            border: '1px solid rgba(34, 197, 94, 0.3)'
                          }}>
                            <Typography variant="h6" sx={{ color: '#10B981' }}>50</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body1" sx={{ color: 'white', mb: 0.5 }}>
                              Smriti Mandhana's Fifty
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'gray' }}>
                              52(38) • 6 fours • 2 sixes • SR 136.8
                            </Typography>
                          </Box>
                          <Box sx={{ ml: 'auto' }}>
                            <Typography variant="caption" sx={{
                              color: '#10B981',
                              bgcolor: 'rgba(34, 197, 94, 0.2)',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1
                            }}>
                              15.2 ov
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>

                      {/* Partnership */}
                      <Box sx={{
                        p: 2,
                        borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                        bgcolor: 'rgba(59, 130, 246, 0.1)',
                        '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.15)' }
                      }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'rgba(59, 130, 246, 0.2)',
                            border: '1px solid rgba(59, 130, 246, 0.3)'
                          }}>
                            <Typography variant="h6" sx={{ color: '#3B82F6' }}>50</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body1" sx={{ color: 'white', mb: 0.5 }}>
                              Perry-Gardner Partnership
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'gray' }}>
                              62(42) • RR 8.85 • Boundaries: 6x4 3x6
                            </Typography>
                          </Box>
                          <Box sx={{ ml: 'auto' }}>
                            <Typography variant="caption" sx={{
                              color: '#3B82F6',
                              bgcolor: 'rgba(59, 130, 246, 0.2)',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1
                            }}>
                              Current
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>

                      {/* Big Over */}
                      <Box sx={{
                        p: 2,
                        borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                        bgcolor: 'rgba(168, 85, 247, 0.1)',
                        '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.15)' }
                      }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'rgba(168, 85, 247, 0.2)',
                            border: '1px solid rgba(168, 85, 247, 0.3)'
                          }}>
                            <Typography variant="h6" sx={{ color: '#A855F7' }}>19</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body1" sx={{ color: 'white', mb: 0.5 }}>
                              Big Over - Gardner's Assault
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'gray' }}>
                              19 runs • 4,6,1,2,6,0 • Changed momentum
                            </Typography>
                          </Box>
                          <Box sx={{ ml: 'auto' }}>
                            <Typography variant="caption" sx={{
                              color: '#A855F7',
                              bgcolor: 'rgba(168, 85, 247, 0.2)',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1
                            }}>
                              10th over
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Match Summary */}
                  <Box sx={{
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    borderRadius: 2,
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    p: 2
                  }}>
                    <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                      Match Summary
                    </Typography>
                    <Stack spacing={2}>
                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 2
                      }}>
                        <Box sx={{
                          p: 2,
                          bgcolor: 'rgba(59, 130, 246, 0.1)',
                          borderRadius: 1,
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                          textAlign: 'center'
                        }}>
                          <Typography variant="h4" sx={{ color: '#3B82F6', mb: 1 }}>12</Typography>
                          <Typography variant="caption" sx={{ color: 'gray' }}>Boundaries</Typography>
                        </Box>
                        <Box sx={{
                          p: 2,
                          bgcolor: 'rgba(168, 85, 247, 0.1)',
                          borderRadius: 1,
                          border: '1px solid rgba(168, 85, 247, 0.2)',
                          textAlign: 'center'
                        }}>
                          <Typography variant="h4" sx={{ color: '#A855F7', mb: 1 }}>6</Typography>
                          <Typography variant="caption" sx={{ color: 'gray' }}>Sixes</Typography>
                        </Box>
                        <Box sx={{
                          p: 2,
                          bgcolor: 'rgba(34, 197, 94, 0.1)',
                          borderRadius: 1,
                          border: '1px solid rgba(34, 197, 94, 0.2)',
                          textAlign: 'center'
                        }}>
                          <Typography variant="h4" sx={{ color: '#10B981', mb: 1 }}>8.2</Typography>
                          <Typography variant="caption" sx={{ color: 'gray' }}>Run Rate</Typography>
                        </Box>
                      </Box>

                      <Box sx={{
                        p: 2,
                        bgcolor: 'rgba(15, 23, 42, 0.5)',
                        borderRadius: 1,
                        border: '1px solid rgba(59, 130, 246, 0.2)'
                      }}>
                        <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
                          Match Situation
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                          Australia Women need 54 runs from 47 balls with 8 wickets in hand. Current partnership of 62 runs between Perry (34*) and Gardner (28*) has kept them in control.
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
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