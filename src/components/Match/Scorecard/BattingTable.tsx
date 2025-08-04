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
import { BattingRow } from './types';

interface BattingTableProps {
  battingRows: BattingRow[];
  teamName: string;
}

const BattingTable: React.FC<BattingTableProps> = ({ battingRows, teamName }) => {
  return (
    <Card sx={{ ...commonStyles.card, mb: 2 }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ 
            color: themeColors.text.primary,
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            {teamName} Batting
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
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }}>Batter</TableCell>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }}>Dismissal</TableCell>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">R</TableCell>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">B</TableCell>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">4s</TableCell>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">6s</TableCell>
                <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">SR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {battingRows.map((row, index) => (
                <TableRow 
                  key={index}
                  sx={{ 
                    '&:nth-of-type(odd)': { bgcolor: alpha(themeColors.secondary, 0.1) },
                    '&:hover': { bgcolor: alpha(themeColors.primary, 0.1) }
                  }}
                >
                  <TableCell sx={{ color: themeColors.text.primary, fontWeight: 500 }}>
                    {row.batter}
                  </TableCell>
                  <TableCell sx={{ color: themeColors.text.secondary }}>
                    {row.dismissalInfo}
                  </TableCell>
                  <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600 }} align="right">
                    {row.runs}
                  </TableCell>
                  <TableCell sx={{ color: themeColors.text.secondary }} align="right">
                    {row.balls}
                  </TableCell>
                  <TableCell sx={{ color: themeColors.text.secondary }} align="right">
                    {row.fours}
                  </TableCell>
                  <TableCell sx={{ color: themeColors.text.secondary }} align="right">
                    {row.sixes}
                  </TableCell>
                  <TableCell sx={{ color: themeColors.text.secondary }} align="right">
                    {row.strikeRate}
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

export default BattingTable; 