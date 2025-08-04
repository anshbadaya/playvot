import React from 'react';
import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';

interface CommentaryEntry {
  time: string;
  type: 'boundary' | 'single' | 'dot' | 'wicket' | 'other';
  text: string;
}

interface CommentaryTabProps {
  commentaryData?: CommentaryEntry[];
}

const CommentaryTab: React.FC<CommentaryTabProps> = ({ commentaryData = [] }) => {
  const getCommentaryStyle = (type: string) => {
    switch (type) {
      case 'boundary':
        return {
          bgcolor: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          badgeColor: '#10B981'
        };
      case 'wicket':
        return {
          bgcolor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          badgeColor: '#EF4444'
        };
      default:
        return {
          bgcolor: 'rgba(15, 23, 42, 0.3)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          badgeColor: '#3B82F6'
        };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'boundary':
        return 'FOUR!';
      case 'wicket':
        return 'WICKET!';
      case 'single':
        return 'SINGLE';
      case 'dot':
        return 'DOT';
      default:
        return '';
    }
  };

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
        {commentaryData.length > 0 ? (
          commentaryData.map((entry, index) => {
            const style = getCommentaryStyle(entry.type);
            const typeLabel = getTypeLabel(entry.type);
            
            return (
              <Box
                key={index}
                sx={{
                  p: 2,
                  bgcolor: style.bgcolor,
                  borderRadius: 1,
                  border: style.border,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{
                    bgcolor: `${style.badgeColor}20`,
                    color: style.badgeColor,
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem'
                  }}>
                    {entry.time}
                  </Typography>
                  {typeLabel && (
                    <Typography variant="caption" sx={{
                      bgcolor: `${style.badgeColor}20`,
                      color: style.badgeColor,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem'
                    }}>
                      {typeLabel}
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {entry.text}
                </Typography>
              </Box>
            );
          })
        ) : (
          <Box sx={{
            p: 3,
            textAlign: 'center',
            color: '#94A3B8',
            bgcolor: 'rgba(15, 23, 42, 0.3)',
            borderRadius: 1,
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <Typography variant="body2">
              No commentary data available
            </Typography>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default CommentaryTab;