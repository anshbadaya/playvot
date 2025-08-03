import React from 'react';
import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';

const CommentaryTab: React.FC = () => {
  return (
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
  );
};

export default CommentaryTab;