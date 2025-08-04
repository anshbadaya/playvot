import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  alpha
} from '@mui/material';
import { themeColors } from '@/config/theme';
import { CommentaryItemProps } from '@/types/commentary';

const CommentaryItem: React.FC<CommentaryItemProps> = ({ comment, index }) => {
  return (
    <Box
      sx={{ 
        p: 2,
        borderRadius: 1,
        bgcolor: comment.type === 'boundary' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(15, 23, 42, 0.3)',
        border: comment.type === 'boundary' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)',
        mb: 1.5
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
      <Typography variant="body2" sx={{ color: themeColors.text.primary }}>
        {comment.text}
      </Typography>
    </Box>
  );
};

export default CommentaryItem; 