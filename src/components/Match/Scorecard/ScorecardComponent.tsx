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
  Chip,
  alpha
} from '@mui/material';
import { themeColors, commonStyles } from '@/config/theme';
import CricketIcon from '@mui/icons-material/SportsCricket';
import LocationIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { 
  InningsProps, 
  SquadsProps, 
  ScorecardProps
} from './types';
import { dummyMatchData } from '@/data/matchDetailsData';

// Use dummy data from data folder instead of hardcoded data
const dummySquads: SquadsProps = {
  home: {
    name: dummyMatchData.teams.home.name,
    players: dummyMatchData.players.home
  },
  away: {
    name: dummyMatchData.teams.away.name,
    players: dummyMatchData.players.away
  }
};

const ScorecardComponent: React.FC<ScorecardProps> = ({ innings, matchInfo, commentary = [], squads = dummySquads }) => {
  const renderMatchInfo = () => (
    <Card sx={{ 
      ...commonStyles.card,
      mb: 3,
      background: `linear-gradient(135deg, ${themeColors.surface} 0%, ${alpha(themeColors.secondary, 0.8)} 100%)`
    }}>
      <CardHeader
        title={
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ 
              p: 1, 
              bgcolor: alpha(themeColors.primary, 0.2), 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CricketIcon sx={{ color: themeColors.primary, fontSize: 24 }} />
            </Box>
            <Typography variant="h6" sx={{ 
              color: themeColors.text.primary,
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              Match Information
            </Typography>
          </Stack>
        }
        sx={{ 
          ...commonStyles.cardHeader,
          background: `linear-gradient(135deg, ${themeColors.secondary} 0%, ${alpha(themeColors.primary, 0.1)} 100%)`
        }}
      />
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <LocationIcon sx={{ color: themeColors.text.secondary, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                {matchInfo.venue}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <ScheduleIcon sx={{ color: themeColors.text.secondary, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                {matchInfo.time}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <EmojiEventsIcon sx={{ color: themeColors.warning, fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
              {matchInfo.toss}
            </Typography>
          </Box>
          <Box sx={{ 
            p: 2, 
            bgcolor: alpha(themeColors.primary, 0.1), 
            borderRadius: 1,
            border: `1px solid ${alpha(themeColors.primary, 0.2)}`
          }}>
            <Typography variant="body1" sx={{ color: themeColors.text.primary, fontWeight: 600 }}>
              {matchInfo.points}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  const renderActivePlayers = (inning: InningsProps) => {
    if (!inning.currentBatters || !inning.currentBowler) return null;

    return (
      <Card sx={{ ...commonStyles.card, mb: 3 }}>
        <CardHeader
          title={
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ 
                p: 1, 
                bgcolor: alpha(themeColors.success, 0.2), 
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CricketIcon sx={{ color: themeColors.success, fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ 
                color: themeColors.text.primary,
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}>
                Live Action
              </Typography>
            </Stack>
          }
          sx={{ ...commonStyles.cardHeader }}
        />
        <CardContent>
          <Stack spacing={3}>
            {/* Current Batters */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, color: themeColors.text.primary, fontWeight: 600 }}>
                Current Batters
              </Typography>
              <Stack spacing={1.5}>
                {inning.currentBatters.map((batter, idx) => (
                  <Box 
                    key={idx} 
                    sx={{ 
                      p: 2, 
                      bgcolor: alpha(themeColors.secondary, 0.3),
                      borderRadius: 1,
                      border: `1px solid ${batter.isStriker ? alpha(themeColors.success, 0.3) : themeColors.border}`,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ 
                          color: themeColors.text.primary,
                          fontWeight: batter.isStriker ? 600 : 500
                        }}>
                          {batter.name}
                        </Typography>
                        {batter.isStriker && (
                          <Chip 
                            label="STRIKER" 
                            size="small" 
                            sx={{ 
                              bgcolor: alpha(themeColors.success, 0.2),
                              color: themeColors.success,
                              fontSize: '0.7rem',
                              height: 20
                            }} 
                          />
                        )}
                      </Box>
                      <Typography sx={{ 
                        color: themeColors.text.secondary,
                        fontWeight: 500
                      }}>
                        {batter.runs}({batter.balls}) • SR: {batter.strikeRate}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Current Bowler */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, color: themeColors.text.primary, fontWeight: 600 }}>
                Current Bowler
              </Typography>
              <Box sx={{ 
                p: 2, 
                bgcolor: alpha(themeColors.secondary, 0.3),
                borderRadius: 1,
                border: `1px solid ${themeColors.border}`
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ color: themeColors.text.primary, fontWeight: 500 }}>
                    {inning.currentBowler.name}
                  </Typography>
                  <Typography sx={{ color: themeColors.text.secondary, fontWeight: 500 }}>
                    {inning.currentBowler.overs} • {inning.currentBowler.wickets}/{inning.currentBowler.runs} • ECO: {inning.currentBowler.economy}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Current Partnership */}
            {inning.currentPartnership && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, color: themeColors.text.primary, fontWeight: 600 }}>
                  Current Partnership
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: alpha(themeColors.primary, 0.1),
                  borderRadius: 1,
                  border: `1px solid ${alpha(themeColors.primary, 0.2)}`
                }}>
                  <Typography sx={{ color: themeColors.text.primary, fontWeight: 500 }}>
                    {inning.currentPartnership}
                  </Typography>
                </Box>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    );
  };

  const renderInnings = (inning: InningsProps, index: number) => (
    <Card key={index} sx={{ ...commonStyles.card, mb: 3 }}>
      <CardHeader
        title={
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ 
              p: 1, 
              bgcolor: alpha(themeColors.warning, 0.2), 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography sx={{ color: themeColors.warning, fontWeight: 600, fontSize: '1.2rem' }}>
                {index + 1}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ 
                color: themeColors.text.primary,
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}>
                {inning.teamName}
              </Typography>
              <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                {inning.score}
              </Typography>
            </Box>
          </Stack>
        }
        sx={{ ...commonStyles.cardHeader }}
      />
      <CardContent>
        <Stack spacing={3}>
          {/* Active Players Section */}
          {renderActivePlayers(inning)}

          {/* Batting Section */}
          <Box>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              color: themeColors.text.primary, 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <CricketIcon sx={{ fontSize: 20, color: themeColors.primary }} />
              Batting
            </Typography>
            <TableContainer sx={{ 
              bgcolor: alpha(themeColors.secondary, 0.3),
              borderRadius: 1,
              border: `1px solid ${themeColors.border}`
            }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(themeColors.secondary, 0.5) }}>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>Batter</TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>R</TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>B</TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>4s</TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>6s</TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>SR</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inning.battingRows.map((row, idx) => (
                    <TableRow 
                      key={idx}
                      sx={{ 
                        '&:hover': { bgcolor: alpha(themeColors.primary, 0.05) },
                        '&:nth-of-type(even)': { bgcolor: alpha(themeColors.secondary, 0.1) }
                      }}
                    >
                      <TableCell sx={{ 
                        color: themeColors.text.primary, 
                        border: 'none',
                        fontWeight: 500
                      }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {row.batter}
                          </Typography>
                          <Typography variant="caption" sx={{ color: themeColors.text.secondary }}>
                            {row.dismissalInfo}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: themeColors.text.primary, border: 'none', fontWeight: 600 }}>
                        {row.runs}
                      </TableCell>
                      <TableCell sx={{ color: themeColors.text.secondary, border: 'none' }}>
                        {row.balls}
                      </TableCell>
                      <TableCell sx={{ color: themeColors.text.secondary, border: 'none' }}>
                        {row.fours}
                      </TableCell>
                      <TableCell sx={{ color: themeColors.text.secondary, border: 'none' }}>
                        {row.sixes}
                      </TableCell>
                      <TableCell sx={{ color: themeColors.text.secondary, border: 'none' }}>
                        {row.strikeRate}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ bgcolor: alpha(themeColors.primary, 0.1) }}>
                    <TableCell sx={{ 
                      color: themeColors.text.primary, 
                      border: 'none',
                      fontWeight: 600
                    }}>
                      Extras
                    </TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, border: 'none', fontWeight: 600 }}>
                      {inning.extras}
                    </TableCell>
                    <TableCell colSpan={4} sx={{ border: 'none' }} />
                  </TableRow>
                  <TableRow sx={{ bgcolor: alpha(themeColors.success, 0.1) }}>
                    <TableCell sx={{ 
                      color: themeColors.text.primary, 
                      border: 'none',
                      fontWeight: 700
                    }}>
                      Total
                    </TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, border: 'none', fontWeight: 700 }}>
                      {inning.total}
                    </TableCell>
                    <TableCell colSpan={4} sx={{ border: 'none' }} />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Yet to Bat */}
            {inning.yetToBat.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ 
                  mb: 1, 
                  color: themeColors.text.secondary, 
                  fontWeight: 600 
                }}>
                  Yet to Bat
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {inning.yetToBat.map((player, idx) => (
                    <Chip 
                      key={idx}
                      label={player} 
                      size="small" 
                      sx={{ 
                        bgcolor: alpha(themeColors.secondary, 0.3),
                        color: themeColors.text.secondary,
                        border: `1px solid ${themeColors.border}`
                      }} 
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Fall of Wickets */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ 
                mb: 1, 
                color: themeColors.text.secondary, 
                fontWeight: 600 
              }}>
                Fall of Wickets
              </Typography>
              <Typography variant="body2" sx={{ color: themeColors.text.secondary }}>
                {inning.fallOfWickets}
              </Typography>
            </Box>
          </Box>

          {/* Bowling Section */}
          <Box>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              color: themeColors.text.primary, 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <CricketIcon sx={{ fontSize: 20, color: themeColors.error }} />
              Bowling
            </Typography>
            <TableContainer sx={{ 
              bgcolor: alpha(themeColors.secondary, 0.3),
              borderRadius: 1,
              border: `1px solid ${themeColors.border}`
            }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(themeColors.secondary, 0.5) }}>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>Bowler</TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>O</TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>M</TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>R</TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>W</TableCell>
                    <TableCell sx={{ color: themeColors.text.primary, fontWeight: 600, border: 'none' }}>ECO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inning.bowlingRows.map((row, idx) => (
                    <TableRow 
                      key={idx}
                      sx={{ 
                        '&:hover': { bgcolor: alpha(themeColors.primary, 0.05) },
                        '&:nth-of-type(even)': { bgcolor: alpha(themeColors.secondary, 0.1) }
                      }}
                    >
                      <TableCell sx={{ 
                        color: themeColors.text.primary, 
                        border: 'none',
                        fontWeight: 500
                      }}>
                        {row.bowler}
                      </TableCell>
                      <TableCell sx={{ color: themeColors.text.secondary, border: 'none' }}>
                        {row.overs}
                      </TableCell>
                      <TableCell sx={{ color: themeColors.text.secondary, border: 'none' }}>
                        {row.maidens}
                      </TableCell>
                      <TableCell sx={{ color: themeColors.text.secondary, border: 'none' }}>
                        {row.runs}
                      </TableCell>
                      <TableCell sx={{ color: themeColors.text.primary, border: 'none', fontWeight: 600 }}>
                        {row.wickets}
                      </TableCell>
                      <TableCell sx={{ color: themeColors.text.secondary, border: 'none' }}>
                        {row.economy}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Stack spacing={3}>
        {renderMatchInfo()}
        {innings.map((inning, index) => renderInnings(inning, index))}
      </Stack>
    </Box>
  );
};

export default ScorecardComponent;