import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Stack,
  alpha
} from '@mui/material';
import { themeColors, commonStyles } from '@/config/theme';
import CricketIcon from '@mui/icons-material/SportsCricket';
import { BowlingRow } from '@/components/Match/Scorecard/types';

interface BowlingTableProps {
  bowlingRows: BowlingRow[];
  teamName: string;
}

const BowlingTable: React.FC<BowlingTableProps> = ({ bowlingRows, teamName }) => {
  return (
    <Card sx={{ ...commonStyles.card, mb: 2 }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ 
            color: themeColors.text.primary,
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            {teamName} Bowling
          </Typography>
        }
        sx={{ 
          bgcolor: alpha(themeColors.secondary, 0.5),
          borderBottom: `1px solid ${themeColors.border}`,
          py: 2
        }}
      />
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(themeColors.secondary, 0.3) }}>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }}>Bowler</TableCell>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">O</TableCell>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">M</TableCell>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">R</TableCell>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">W</TableCell>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">ECO</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bowlingRows.map((row, index) => (
                <TableRow 
                  key={index}
                  sx={{ 
                    '&:nth-of-type(odd)': { bgcolor: alpha(themeColors.secondary, 0.1) },
                    '&:hover': { bgcolor: alpha(themeColors.primary, 0.1) }
                  }}
                >
                  <TableCell sx={{ color: themeColors.text.primary, fontWeight: 500 }}>
                    {row.bowler}
                  </TableCell>
                  <TableCell sx={{ color: themeColors.text.secondary }} align="right">
                    {row.overs}
                  </TableCell>
                  <TableCell sx={{ color: themeColors.text.secondary }} align="right">
                    {row.maidens}
                  </TableCell>
                  <TableCell sx={{ color: themeColors.text.secondary }} align="right">
                    {row.runs}
                  </TableCell>
                  <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">
                    {row.wickets}
                  </TableCell>
                  <TableCell sx={{ color: themeColors.text.secondary }} align="right">
                    {row.economy}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default BowlingTable; 