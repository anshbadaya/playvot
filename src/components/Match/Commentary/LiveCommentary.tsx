import { colors } from '@/utils/colors';
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Divider,
  alpha
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { MatchData } from '@/types/match-details';
import { themeColors, commonStyles } from '@/config/theme';
import { dummyOversData, dummyMatchStats } from '@/data/matchDetailsData';

interface OverData {
  overNumber: number;
  runs: number;
  balls: (number | 'W')[];
}

interface LiveCommentaryProps {
  data: MatchData;
  oversData?: OverData[]; // Make overs data optional and passed as prop
}

const LiveCommentary: React.FC<LiveCommentaryProps> = ({ data, oversData = dummyOversData }) => {
  return (
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
            {data.commentary.slice(0, 5).map((comment, idx) => (
              <Box
                key={idx}
                sx={{ 
                  p: 2,
                  borderRadius: 1,
                  bgcolor: comment.type === 'boundary' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(15, 23, 42, 0.3)',
                  border: comment.type === 'boundary' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 'bold', color: comment.type === 'boundary' ? 'colors.success' : 'gray' }}
                  >
                    {comment.time}
                  </Typography>
                  {comment.type === 'boundary' && (
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'colors.success' }}>
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

      {/* Over by Over View */}
      <Card sx={{ 
        bgcolor: 'rgba(15, 23, 42, 1)',
        border: 'none',
        borderRadius: 0,
        boxShadow: 'none'
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
                <AccessTimeIcon sx={{ color: 'colors.primary', fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{
                color: 'colors.text.primary',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}>
                Over by Over
              </Typography>
            </Stack>
          }
          sx={{
            bgcolor: 'rgba(15, 23, 42, 1)',
            borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
            py: 2.5
          }}
        />
        <CardContent sx={{ p: 0 }}>
          {/* Scrollable container for overs */}
          <Box 
            sx={{ 
              height: '500px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(15, 23, 42, 0.3)',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.7)',
                },
              }
            }}
          >
            {/* Overs list - now using props data */}
            {oversData.length > 0 ? (
              oversData.map((over, i) => (
                <Box 
                  key={i}
                  sx={{ 
                    display: 'flex',
                    bgcolor: 'rgba(15, 23, 42, 0.9)',
                    borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                    p: 2
                  }}
                >
                  {/* Over number */}
                  <Box 
                    sx={{ 
                      width: '80px', 
                      mr: 3,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'colors.text.muted',
                        fontWeight: 'bold'
                      }}
                    >
                      Over {over.overNumber}
                    </Typography>
                  </Box>
                  
                  {/* Balls */}
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2,
                    flexGrow: 1,
                    alignItems: 'center'
                  }}>
                    {over.balls.map((runs, ballIdx) => {
                      let bgColor = 'colors.primary'; // Default: 1 run (blue)
                      
                      if (runs === 0) bgColor = 'colors.text.muted'; // Dot ball (gray)
                      else if (runs === 4) bgColor = 'colors.success'; // 4 runs (green)
                      else if (runs === 6) bgColor = 'colors.secondary'; // 6 runs (purple)
                      else if (runs === 'W') bgColor = 'colors.error'; // Wicket (red)
                      
                      return (
                        <Box
                          key={ballIdx}
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            bgcolor: bgColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          {runs}
                        </Box>
                      );
                    })}
                  </Box>
                  
                  {/* Over total */}
                  <Box sx={{ 
                    width: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'colors.text.primary',
                        fontWeight: 'bold'
                      }}
                    >
                      {over.runs}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ 
                p: 3, 
                textAlign: 'center',
                color: 'colors.text.muted'
              }}>
                <Typography variant="body2">
                  No over-by-over data available
                </Typography>
              </Box>
            )}
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
              <Typography variant="h5" fontWeight="bold">{dummyMatchStats.currentRunRate}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="caption" color="gray">Required Run Rate</Typography>
              <Typography variant="h5" fontWeight="bold">{dummyMatchStats.requiredRunRate}</Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="caption" color="gray">Boundaries</Typography>
              <Typography variant="h5" fontWeight="bold">{dummyMatchStats.boundaries.fours} / {dummyMatchStats.boundaries.sixes}</Typography>
              <Typography variant="caption" color="gray">Fours / Sixes</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="caption" color="gray">Last 5 overs</Typography>
              <Typography variant="h5" fontWeight="bold">{dummyMatchStats.lastFiveOvers.runs}/{dummyMatchStats.lastFiveOvers.wickets}</Typography>
              <Typography variant="caption" color="gray">Runs / Wickets</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default LiveCommentary;