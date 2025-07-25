import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  IconButton,
  Slider,
  Stack,
} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { styled } from '@mui/material/styles';

// Styled Components
const VideoContainer = styled(Card)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  marginBottom: theme.spacing(3),
  backgroundColor: '#000',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
}));

const VideoControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const PageBackground = styled(Box)({
  background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
  minHeight: '100vh',
  color: 'white',
  padding: '24px',
});

// Components
const VideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  return (
    <VideoContainer>
      <Box
        component="video"
        sx={{
          width: '100%',
          height: 'auto',
          aspectRatio: '16/9',
          backgroundColor: '#000',
        }}
      />
      <VideoControls>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton onClick={() => setIsPlaying(!isPlaying)} sx={{ color: 'white' }}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ width: 120 }}>
            <VolumeUpIcon sx={{ color: 'white' }} />
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              sx={{ color: 'white' }}
              min={0}
              max={100}
            />
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ color: 'white' }}>
            <FullscreenIcon />
          </IconButton>
        </Stack>
      </VideoControls>
    </VideoContainer>
  );
};

// Tab content components
const ScoreCard: React.FC = () => (
  <Card sx={{ bgcolor: '#1e1e2f', color: 'white', p: 3, borderRadius: 3 }}>
    <Typography variant="h5" gutterBottom>Live Score</Typography>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6">Shelar FC</Typography>
      <Typography variant="h4" fontWeight="bold">1 - 0</Typography>
      <Typography variant="h6">Poojary FC</Typography>
    </Stack>
    <Typography variant="subtitle2" sx={{ mt: 2, color: '#aaa' }}>
      League: Local Super League | Status: Live
    </Typography>
  </Card>
);

const Stats: React.FC = () => (
  <Card sx={{ bgcolor: '#1e1e2f', color: 'white', p: 3, borderRadius: 3 }}>
    <Typography variant="h5" gutterBottom>Match Stats</Typography>
    <Typography variant="body1">Top Scorer: Player A</Typography>
    <Typography variant="body1">Total Shots: 12</Typography>
    <Typography variant="body1">Fouls: 3</Typography>
  </Card>
);

const Probability: React.FC = () => (
  <Card sx={{ bgcolor: '#1e1e2f', color: 'white', p: 3, borderRadius: 3 }}>
    <Typography variant="h5" gutterBottom>Win Probability</Typography>
    <Stack spacing={2} mt={2}>
      <Typography variant="body1">Shelar FC: <strong>65%</strong></Typography>
      <Typography variant="body1">Poojary FC: <strong>35%</strong></Typography>
    </Stack>
  </Card>
);

const PredictAndBet: React.FC = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Predict the Winner
    </Typography>
    <Card sx={{ bgcolor: '#1E1E2F', color: 'white', mb: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Who will win this match?
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#2D2D2D',
              '&:hover': { bgcolor: '#1db954' },
              borderRadius: 2,
              py: 2,
              boxShadow: '0 0 10px #1db95455',
            }}
          >
            Shelar FC
            <Typography variant="caption" sx={{ ml: 1 }}>
              2.5x
            </Typography>
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#2D2D2D',
              '&:hover': { bgcolor: '#1db954' },
              borderRadius: 2,
              py: 2,
              boxShadow: '0 0 10px #1db95455',
            }}
          >
            Poojary FC
            <Typography variant="caption" sx={{ ml: 1 }}>
              1.8x
            </Typography>
          </Button>
        </Stack>
      </CardContent>
    </Card>
  </Box>
);

// Main Page
const MatchDetailPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const tabLabels = ['Scorecard', 'Stats', 'Win Probability', 'Predict & Bet'];

  return (
    <PageBackground>
      <VideoPlayer />

      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Match: Shelar FC vs Poojary FC
        </Typography>
        <Typography variant="subtitle1" color="gray">
          Football | Jul 21, 2025 | 06:33 PM IST | Mumbai Turf
        </Typography>
      </Box>

      {/* Button Navigation */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
          flexWrap: 'wrap',
        }}
      >
        {tabLabels.map((label, index) => (
          <Button
            key={label}
            onClick={() => setTabIndex(index)}
            variant="contained"
            sx={{
              backgroundColor: tabIndex === index ? '#1db954' : '#2D2D2D',
              color: 'white',
              fontWeight: 600,
              borderRadius: 3,
              py: 1.5,
              px: 3,
              textTransform: 'none',
              boxShadow: tabIndex === index ? '0 0 10px #1db954aa' : 'none',
              '&:hover': {
                backgroundColor: '#1db954',
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      {/* Panel Content */}
      <Paper sx={{ backgroundColor: "#121212", borderRadius: 3, p: 3 }}>
        {tabIndex === 0 && <ScoreCard />}
        {tabIndex === 1 && <Stats />}
        {tabIndex === 2 && <Probability />}
        {tabIndex === 3 && <PredictAndBet />}
      </Paper>
    </PageBackground>
  );
};

export default MatchDetailPage;
