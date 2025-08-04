import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Stack,
  List,
} from "@mui/material";
import { MatchData } from '../../types/match-details';
import { commonStyles } from '@/config/theme';

interface Highlight {
  time: string;
  type: 'wicket' | 'boundary' | 'milestone' | 'other';
  description: string;
  day?: string;
}

interface HighlightsTabProps {
  data: MatchData;
  highlightsData?: Highlight[];
}

const HighlightsTab: React.FC<HighlightsTabProps> = ({ data, highlightsData = [] }) => {
  const getHighlightStyle = (type: string) => {
    switch (type) {
      case 'wicket':
        return {
          color: '#8B5CF6',
          label: 'WICKET!'
        };
      case 'boundary':
        return {
          color: '#10B981',
          label: 'BOUNDARY!'
        };
      case 'milestone':
        return {
          color: '#3B82F6',
          label: 'MILESTONE!'
        };
      default:
        return {
          color: '#94A3B8',
          label: ''
        };
    }
  };

  // Group highlights by day if day property exists
  const groupedHighlights = highlightsData.reduce((acc, highlight) => {
    const day = highlight.day || 'Day 1';
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(highlight);
    return acc;
  }, {} as Record<string, Highlight[]>);

  return (
    <Stack spacing={3}>
      {/* Key Moments */}
      <Card sx={{ ...commonStyles.card }}>
        <CardHeader title={<Typography variant="h6">Key Moments</Typography>} />
        <CardContent>
          <List sx={{ width: '100%' }}>
            {Object.keys(groupedHighlights).length > 0 ? (
              Object.entries(groupedHighlights).map(([day, highlights]) => (
                <Box key={day}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#3B82F6' }}>
                    {day}
                  </Typography>
                  
                  <Box sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 1,
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <Stack spacing={1.5}>
                      {highlights.map((highlight, index) => {
                        const style = getHighlightStyle(highlight.type);
                        
                        return (
                          <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <Typography variant="caption" sx={{ 
                              color: 'gray',
                              minWidth: '50px',
                              textAlign: 'right',
                              pt: 0.5
                            }}>
                              {highlight.time}
                            </Typography>
                            <Box>
                              <Typography variant="body2">
                                {style.label && (
                                  <Typography component="span" sx={{ fontWeight: 'bold', color: style.color }}>
                                    {style.label}{' '}
                                  </Typography>
                                )}
                                {highlight.description}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{
                p: 3,
                textAlign: 'center',
                color: '#94A3B8',
                bgcolor: 'rgba(15, 23, 42, 0.3)',
                borderRadius: 1,
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <Typography variant="body2">
                  No highlights data available
                </Typography>
              </Box>
            )}
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default HighlightsTab;