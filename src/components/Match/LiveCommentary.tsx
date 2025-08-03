import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Stack,
  IconButton,
  Divider,
  alpha
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { MatchData } from '../../types/match-details';
import { themeColors, commonStyles } from './styles/theme-constants';

interface LiveCommentaryProps {
  data: MatchData;
}

const LiveCommentary: React.FC<LiveCommentaryProps> = ({ data }) => {
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
                    sx={{ fontWeight: 'bold', color: comment.type === 'boundary' ? '#10B981' : 'gray' }}
                  >
                    {comment.time}
                  </Typography>
                  {comment.type === 'boundary' && (
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
                <AccessTimeIcon sx={{ color: '#3B82F6', fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{
                color: '#FFFFFF',
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
            {/* Overs list */}
            {Array.from({ length: 50 }, (_, i) => {
              const overIndex = 50 - i;
              const overRuns = Math.floor(Math.random() * 15);
              const ballRuns = Array.from({ length: 6 }, () => {
                const ballType = Math.floor(Math.random() * 5);
                return ballType === 0 ? 0 : // dot ball
                      ballType === 1 ? 1 : // single
                      ballType === 2 ? 4 : // four
                      ballType === 3 ? 6 : // six
                      'W'; // wicket
              });
              
              return (
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
                        color: '#94A3B8',
                        fontWeight: 'bold'
                      }}
                    >
                      Over {overIndex}
                    </Typography>
                  </Box>
                  
                  {/* Balls */}
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2,
                    flexGrow: 1,
                    alignItems: 'center'
                  }}>
                    {ballRuns.map((runs, ballIdx) => {
                      let bgColor = '#3B82F6'; // Default: 1 run (blue)
                      
                      if (runs === 0) bgColor = '#94A3B8'; // Dot ball (gray)
                      else if (runs === 4) bgColor = '#10B981'; // 4 runs (green)
                      else if (runs === 6) bgColor = '#8B5CF6'; // 6 runs (purple)
                      else if (runs === 'W') bgColor = '#EF4444'; // Wicket (red)
                      
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
                            fontSize: '0.85rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {runs === 0 ? '•' : runs}
                        </Box>
                      );
                    })}
                  </Box>
                  
                  {/* Over total */}
                  <Box 
                    sx={{ 
                      width: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#3B82F6', 
                        fontWeight: 'bold'
                      }}
                    >
                      {overRuns}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 2,
            bgcolor: 'rgba(15, 23, 42, 0.9)',
            borderTop: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
              Total: <Box component="span" sx={{ color: '#3B82F6', fontWeight: 'bold' }}>180 runs</Box> from 50 overs
            </Typography>
            <Box>
              <Typography variant="body2" sx={{ color: '#E2E8F0', display: 'inline' }}>
                RR: <Box component="span" sx={{ color: '#10B981', fontWeight: 'bold' }}>9.0</Box> | SR: <Box component="span" sx={{ color: '#8B5CF6', fontWeight: 'bold' }}>112.5</Box>
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            justifyContent: 'center',
            p: 2,
            bgcolor: 'rgba(15, 23, 42, 0.8)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                bgcolor: '#94A3B8'
              }} />
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>Dot</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                bgcolor: '#3B82F6'
              }} />
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>1-3</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                bgcolor: '#10B981'
              }} />
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>4</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                bgcolor: '#8B5CF6'
              }} />
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>6</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                bgcolor: '#EF4444'
              }} />
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>W</Typography>
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
  );
};

export default LiveCommentary;