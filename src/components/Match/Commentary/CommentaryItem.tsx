import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { themeColors } from '@/config/theme';
import { CommentaryItemProps } from '@/types/commentary';

const CommentaryContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1.5),
  transition: 'all 0.2s ease',
  '&.boundary': {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
  },
  '&.regular': {
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  },
}));

const CommentaryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.75rem',
  '&.boundary': {
    color: '#10B981',
  },
  '&.regular': {
    color: 'gray',
  },
}));

const BoundaryBadge = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#10B981',
  fontSize: '0.75rem',
}));

const CommentaryText = styled(Typography)(({ theme }) => ({
  color: themeColors.text.primary,
  fontSize: '0.875rem',
  lineHeight: 1.5,
}));

const CommentaryItem: React.FC<CommentaryItemProps> = ({ comment, index }) => {
  const isBoundary = comment.type === 'boundary';
  
  return (
    <CommentaryContainer className={isBoundary ? 'boundary' : 'regular'}>
      <CommentaryHeader>
        <TimeStamp className={isBoundary ? 'boundary' : 'regular'}>
          {comment.time}
        </TimeStamp>
        {isBoundary && (
          <BoundaryBadge>
            BOUNDARY
          </BoundaryBadge>
        )}
      </CommentaryHeader>
      <CommentaryText>
        {comment.text}
      </CommentaryText>
    </CommentaryContainer>
  );
};

export default CommentaryItem; 