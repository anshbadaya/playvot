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
  Fade,
  LinearProgress,
  Avatar,
  useMediaQuery
} from "@mui/material";
import { useTheme, styled, alpha } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Layers } from '@mui/icons-material';
import Layout from '@/components/Layout';

// --- DATA SIMULATION ---

interface Team {
  name: string;
  logo: string;
}

interface MatchStats {
  topScorer: string;
  totalShots: number;
  fouls: number;
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
  stats: MatchStats;
  winProbability: {
    home: number;
    away: number;
  };
  bettingOdds: {
    home: number;
    away: number;
  };
}

const dummyMatchData: MatchData = {
  teams: {
    home: { name: 'Shelar FC', logo: '/shelar-logo.png' },
    away: { name: 'Poojary FC', logo: '/poojary-logo.png' },
  },
  score: '1 - 0',
  league: 'Local Super League',
  status: 'Live',
  venue: 'Mumbai Turf',
  dateTime: 'Jul 25, 2025 | 09:30 PM IST',
  stats: {
    topScorer: 'Rohan Shelar',
    totalShots: 15,
    fouls: 4,
  },
  winProbability: {
    home: 65,
    away: 35,
  },
  bettingOdds: {
    home: 2.5,
    away: 1.8,
  },
};

const fetchMatchData = (): Promise<MatchData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyMatchData);
    }, 1500);
  });
};


// --- STYLED COMPONENTS ---

const PageBackground = styled(Box)({
  background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
  minHeight: '100vh',
  color: 'white',
  padding: '24px',
});

const VideoContainer = styled(Card)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%', // Make it fill the height of its parent flex item
  backgroundColor: '#000',
  borderRadius: 2,
  overflow: 'hidden',
  // Removed aspectRatio here to allow height: 100% to take precedence.
  // The inner video tag will still respect its own content ratio if set.
  display: 'flex', // Use flex to center video or handle its aspect ratio internally
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover .video-controls': {
    opacity: 1,
  },
}));

const VideoControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(1, 2),
  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  opacity: 1, // Make controls always visible
  // transition: 'opacity 0.3s ease-in-out', // Keep transition if you plan to re-add hover logic
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
  <Card sx={{ bgcolor: alpha("#000000", 0.2), color: 3, borderRadius: 3 }}>
    <Typography variant="h5" gutterBottom fontWeight="bold">Match Stats</Typography>
    <Stack spacing={1.5} mt={2}>
        <Typography variant="body1">Top Scorer: <strong>{data.stats.topScorer}</strong></Typography>
        <Typography variant="body1">Total Shots: <strong>{data.stats.totalShots}</strong></Typography>
        <Typography variant="body1">Fouls: <strong>{data.stats.fouls}</strong></Typography>
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
  const [tabIndex, setTabIndex] = useState(0);
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const themeColor = '#3B82F6';

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    fetchMatchData().then(data => {
      setMatchData(data);
      setLoading(false);
    });
  }, []);
  
  const tabContent = [
    { label: 'Scorecard', component: (data: MatchData) => <ScoreCard data={data} /> },
    { label: 'Stats', component: (data: MatchData) => <Stats data={data} /> },
    { label: 'Win Probability', component: (data: MatchData) => <Probability data={data} /> },
    { label: 'Predict & Bet', component: (data: MatchData) => <PredictAndBet data={data} /> },
  ];

  return (
    <Layout showBackHeader>
    <PageBackground>
      {loading || !matchData ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
          <CircularProgress sx={{ color: themeColor }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: isLargeScreen ? 'row-reverse' : 'column', // Desktop: Video on Right (reversed order)
            gap: isLargeScreen ? 4 : 2,
            alignItems: 'stretch', // Allow children to stretch vertically
            minHeight: 'calc(100vh - 48px)', // Ensure main content area takes up most of viewport height
          }}
        >
          {/* Right Column (appears first in source for 'row-reverse'): Video Player */}
          <Box 
            sx={{ 
              flex: isLargeScreen ? '0 0 58.33%' : 'none', // Fixed width for video column
              width: isLargeScreen ? 'auto' : '100%',
              display: 'flex', // Enable flex for this box
              flexDirection: 'column', // Arrange content vertically
              mb: isLargeScreen ? 0 : 2, // Add margin bottom for small screens
            }}
          > 
            <VideoPlayer />
          </Box>
          
          {/* Left Column (appears second in source for 'row-reverse'): Match Details */}
          <Box 
            sx={{ 
              flex: isLargeScreen ? '1 1 41.67%' : 'none', // Allow details column to grow/shrink
              width: isLargeScreen ? 'auto' : '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          > 
            <Fade in={!loading} timeout={500}>
              <Box>
                {/* Header */}
                <Box mb={3}>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {matchData.teams.home.name} vs {matchData.teams.away.name}
                  </Typography>
                  <Typography variant="subtitle1" color="gray">
                    Football | {matchData.dateTime} | {matchData.venue}
                  </Typography>
                </Box>

                {/* Fixed Button Navigation */}
                <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
                  {tabContent.map((tab, index) => (
                    <Button
                      key={tab.label}
                      onClick={() => setTabIndex(index)}
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        borderRadius: '8px', // Squared buttons
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        bgcolor: tabIndex === index ? themeColor : 'rgba(45, 45, 45, 0.7)',
                        boxShadow: tabIndex === index ? `0 4px 15px ${alpha(themeColor, 0.4)}` : 'none',
                        '&:hover': {
                          bgcolor: tabIndex === index ? '#2563EB' : alpha(themeColor, 0.15)
                        },
                      }}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </Box>
                
                {/* Panel Content */}
                <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
                  {tabContent[tabIndex].component(matchData)}
                </Paper>
              </Box>
            </Fade>
          </Box>
        </Box>
      )}
    </PageBackground>
    </Layout>
  );
};

export default MatchDetailPage;