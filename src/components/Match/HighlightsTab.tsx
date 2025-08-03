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
import { commonStyles } from './styles/theme-constants';

interface HighlightsTabProps {
  data: MatchData;
}

const HighlightsTab: React.FC<HighlightsTabProps> = ({ data }) => {
  return (
    <Stack spacing={3}>
      {/* Key Moments */}
      <Card sx={{ ...commonStyles.card }}>
        <CardHeader title={<Typography variant="h6">Key Moments</Typography>} />
        <CardContent>
          <List sx={{ width: '100%' }}>
            {/* Day 1 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#3B82F6' }}>
              Day 1
            </Typography>
            
            <Box sx={{
              p: 2,
              mb: 2,
              borderRadius: 1,
              bgcolor: 'rgba(15, 23, 42, 0.3)',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ 
                    color: 'gray',
                    minWidth: '50px',
                    textAlign: 'right',
                    pt: 0.5
                  }}>
                    10.4
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                      Young b Muzarabani 12(28). Muzarabani with a beautiful inswinging yorker that sneaks through Young's defense and crashes into the stumps. New Zealand 23/1.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ 
                    color: 'gray',
                    minWidth: '50px',
                    textAlign: 'right',
                    pt: 0.5
                  }}>
                    15.3
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                      Bennett b Raza 22(41). Raza with a clever arm ball that Bennett completely misreads. New Zealand 45/2.
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ 
                    color: 'gray',
                    minWidth: '50px',
                    textAlign: 'right',
                    pt: 0.5
                  }}>
                    22.1
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                      Welch lbw b Muzarabani 22(56). Muzarabani strikes again with a delivery that keeps low. New Zealand 67/3.
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ 
                    color: 'gray',
                    minWidth: '50px',
                    textAlign: 'right',
                    pt: 0.5
                  }}>
                    32.4
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 'bold', color: '#10B981' }}>FIFTY! </Typography>
                      Tom Latham brings up his half-century with a well-placed drive through the covers. 52 runs from 78 balls with 6 fours.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ 
                    color: 'gray',
                    minWidth: '50px',
                    textAlign: 'right',
                    pt: 0.5
                  }}>
                    32.4
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                      Williams c Conway b Muzarabani 31(67). Muzarabani picks up his third wicket with a short ball that Williams pulls straight to Conway at deep square leg. New Zealand 98/4.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ 
                    color: 'gray',
                    minWidth: '50px',
                    textAlign: 'right',
                    pt: 0.5
                  }}>
                    52.5
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>ALL OUT! </Typography>
                      New Zealand bowled out for 149 in 52.5 overs. Muzarabani finishes with 4/32, Raza 3/41.
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
            
            {/* Day 2 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 3, color: '#3B82F6' }}>
              Day 2
            </Typography>

            <Box sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: 'rgba(15, 23, 42, 0.3)',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ 
                    color: 'gray',
                    minWidth: '50px',
                    textAlign: 'right',
                    pt: 0.5
                  }}>
                    10.4
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                      Young c Conway b Muzarabani 12(28). Muzarabani gets the first breakthrough for Zimbabwe. New Zealand 32/1.
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{
                    color: 'gray',
                    minWidth: '50px',
                    textAlign: 'right',
                    pt: 0.5
                  }}>
                    24.3
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                      Nicholls b Raza 34(62). Raza bowls Nicholls with a delivery that turns sharply. New Zealand 85/2.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ 
                    color: 'gray',
                    minWidth: '50px',
                    textAlign: 'right',
                    pt: 0.5
                  }}>
                    24.3
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 'bold', color: '#3B82F6' }}>BOUNDARY! </Typography>
                      Conway plays an elegant cover drive off Ngarava for four. Textbook cricket shot.
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{
                    color: 'gray',
                    minWidth: '50px',
                    textAlign: 'right',
                    pt: 0.5
                  }}>
                    38.1
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>WICKET! </Typography>
                      Ravindra lbw b Muzarabani 28(54). Muzarabani traps Ravindra in front with a delivery that keeps low. New Zealand 122/3.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ 
                    color: 'gray',
                    minWidth: '50px',
                    textAlign: 'right',
                    pt: 0.5
                  }}>
                    52.0
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 'bold', color: 'gray' }}>LUNCH </Typography>
                      New Zealand 174/3 at lunch on Day 2, leading by 25 runs. Conway 67* (112), Latham 52* (78) at the crease.
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default HighlightsTab;