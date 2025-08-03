"use client";

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  CircularProgress, 
  Stack, 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Button, 
  Avatar,
  alpha
} from "@mui/material";
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import TargetIcon from '@mui/icons-material/MyLocation';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import Layout from '@/components/Layout';
import { MatchData } from '@/types/match-details';
import { PageBackground, TopBar } from '@/components/Match/styles/StyledComponents';
import { MatchTabsNavigation } from '@/components/Match';
import MatchInfo from '@/components/Match/MatchInfo';
import LiveCommentary from '@/components/Match/LiveCommentary';
import CommentaryTab from '@/components/Match/CommentaryTab';
import HighlightsTab from '@/components/Match/HighlightsTab';
import Squads from '@/components/Match/Squads';
import ScorecardComponent from '@/components/Match/ScorecardComponent';
import { themeColors, commonStyles } from '@/components/Match/styles/theme-constants';

// --- DUMMY DATA ---
const dummyMatchData: MatchData = {
  teams: {
    home: {
      name: 'ZIM',
      logo: '/teams/zimbabwe.png',
      score: 149,
      stats: {
        possession: 55,
        shots: 12,
        shotsOnTarget: 5,
        corners: 6,
        fouls: 8,
        wickets: 10
      }
    },
    away: {
      name: 'NZ',
      logo: '/teams/newzealand.png',
      score: 174,
      stats: {
        possession: 45,
        shots: 10,
        shotsOnTarget: 3,
        corners: 4,
        fouls: 10,
        wickets: 3
      }
    }
  },
  score: 'NZ 174/3 (52)',
  league: 'Premier League',
  status: 'Live',
  venue: 'Old Trafford',
  dateTime: new Date().toLocaleString(),
  timeElapsed: '75:23',
  players: {
    home: [
      {
        name: 'Tadiwanashe Marumani',
        number: 1,
        position: 'Opener',
        role: 'WK-Batter',
        isWicketKeeper: true,
        avatar: '/teams/player1.png',
        stats: {
          runs: 12,
          balls: 18,
          fours: 1,
          sixes: 0,
          strikeRate: 66.67
        }
      },
      {
        name: 'Clive Madande',
        number: 2,
        position: 'Opener',
        role: 'Batter',
        avatar: '/teams/player2.png',
        stats: {
          runs: 8,
          balls: 12,
          fours: 0,
          sixes: 0,
          strikeRate: 66.67
        }
      },
      {
        name: 'Sean Williams',
        number: 3,
        position: 'Top Order',
        role: 'Batting Allrounder',
        isCaptain: true,
        avatar: '/teams/player3.png',
        stats: {
          runs: 23,
          balls: 35,
          fours: 3,
          sixes: 0,
          strikeRate: 65.71
        }
      },
      {
        name: 'Craig Ervine',
        number: 4,
        position: 'Middle Order',
        role: 'Batter',
        avatar: '/teams/player4.png',
        stats: {
          runs: 42,
          balls: 30,
          fours: 3,
          sixes: 2,
          strikeRate: 140.0
        }
      },
      {
        name: 'Sikandar Raza',
        number: 5,
        position: 'Middle Order',
        role: 'Batting Allrounder',
        avatar: '/teams/player5.png',
        stats: {
          runs: 31,
          balls: 28,
          fours: 2,
          sixes: 1,
          strikeRate: 110.71
        }
      },
      {
        name: 'Ryan Burl',
        number: 6,
        position: 'Middle Order',
        role: 'Batting Allrounder',
        avatar: '/teams/player6.png',
        stats: {
          runs: 15,
          balls: 22,
          fours: 1,
          sixes: 0,
          strikeRate: 68.18
        }
      },
      {
        name: 'Wellington Masakadza',
        number: 7,
        position: 'Lower Order',
        role: 'Bowling Allrounder',
        avatar: '/teams/player7.png',
        stats: {
          runs: 8,
          balls: 15,
          fours: 0,
          sixes: 0,
          strikeRate: 53.33
        }
      },
      {
        name: 'Blessing Muzarabani',
        number: 8,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player8.png',
        stats: {
          overs: "16",
          maidens: 4,
          wickets: 2,
          runs: 50,
          economy: 3.13
        }
      },
      {
        name: 'Richard Ngarava',
        number: 9,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player9.png',
        stats: {
          overs: "10",
          maidens: 1,
          wickets: 0,
          runs: 35,
          economy: 3.50
        }
      },
      {
        name: 'Tendai Chatara',
        number: 10,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player10.png',
        stats: {
          overs: "8",
          maidens: 0,
          wickets: 0,
          runs: 28,
          economy: 3.50
        }
      },
      {
        name: 'Luke Jongwe',
        number: 11,
        position: 'Bowler',
        role: 'Bowling Allrounder',
        avatar: '/teams/player11.png',
        stats: {
          overs: "6",
          maidens: 0,
          wickets: 0,
          runs: 30,
          economy: 5.00
        }
      }
    ],
    away: [
      {
        name: 'Devon Conway',
        number: 1,
        position: 'Opener',
        role: 'WK-Batter',
        isWicketKeeper: true,
        avatar: '/teams/player12.png',
        stats: {
          runs: 67,
          balls: 89,
          fours: 8,
          sixes: 0,
          strikeRate: 75.28
        }
      },
      {
        name: 'Tom Latham',
        number: 2,
        position: 'Opener',
        role: 'WK-Batter',
        avatar: '/teams/player13.png',
        stats: {
          runs: 52,
          balls: 78,
          fours: 5,
          sixes: 1,
          strikeRate: 66.67
        }
      },
      {
        name: 'Kane Williamson',
        number: 3,
        position: 'Top Order',
        role: 'Batter',
        isCaptain: true,
        avatar: '/teams/player14.png',
        stats: {
          runs: 28,
          balls: 45,
          fours: 3,
          sixes: 0,
          strikeRate: 62.22
        }
      },
      {
        name: 'Rachin Ravindra',
        number: 4,
        position: 'Top Order',
        role: 'Batting Allrounder',
        avatar: '/teams/player15.png',
        stats: {
          runs: 18,
          balls: 25,
          fours: 2,
          sixes: 0,
          strikeRate: 72.00
        }
      },
      {
        name: 'Daryl Mitchell',
        number: 5,
        position: 'Middle Order',
        role: 'Batting Allrounder',
        avatar: '/teams/player16.png',
        stats: {
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0.00
        }
      },
      {
        name: 'Mark Chapman',
        number: 6,
        position: 'Middle Order',
        role: 'Batter',
        avatar: '/teams/player17.png',
        stats: {
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0.00
        }
      },
      {
        name: 'Glenn Phillips',
        number: 7,
        position: 'Middle Order',
        role: 'WK-Batter',
        avatar: '/teams/player18.png',
        stats: {
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0.00
        }
      },
      {
        name: 'Mitchell Santner',
        number: 8,
        position: 'Lower Order',
        role: 'Bowling Allrounder',
        avatar: '/teams/player19.png',
        stats: {
          overs: "12",
          maidens: 2,
          wickets: 2,
          runs: 31,
          economy: 2.58
        }
      },
      {
        name: 'Matt Henry',
        number: 9,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player20.png',
        stats: {
          overs: "9.2",
          maidens: 1,
          wickets: 3,
          runs: 42,
          economy: 4.50
        }
      },
      {
        name: 'Trent Boult',
        number: 10,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player21.png',
        stats: {
          overs: "10",
          maidens: 2,
          wickets: 3,
          runs: 35,
          economy: 3.50
        }
      },
      {
        name: 'William O\'Rourke',
        number: 11,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player22.png',
        stats: {
          overs: "6",
          maidens: 0,
          wickets: 0,
          runs: 13,
          economy: 2.17
        }
      }
    ]
  },
  commentary: [
    {
      time: '11.3',
      text: 'FOUR! Perry finds the gap through covers. Brilliant shot!',
      type: 'normal',
      team: 'home'
    },
    {
      time: '11.2',
      text: 'Single taken to deep mid-wicket. Good running between the wickets.',
      type: 'normal',
      team: 'home'
    },
    {
      time: '11.1',
      text: 'Dot ball. Tight bowling from Shafali, Perry defends.',
      type: 'normal',
      team: 'away'
    },
    {
      time: '10.6',
      text: 'SIX! What a shot! Gardner goes big over long-on!',
      type: 'normal',
      team: 'home'
    },
    {
      time: '10.5',
      text: 'Two runs taken. Good placement by Gardner.',
      type: 'normal',
      team: 'home'
    }
  ],
  winProbability: {
    home: 28,
    away: 38
  },
  bettingOdds: {
    home: 2.1,
    draw: 3.5,
    away: 3.8
  }
};

// --- DUMMY SCORECARD DATA ---
const dummyScorecardData = {
  innings: [
    {
      teamName: "Zimbabwe",
      score: "149/10 (45.2)",
      battingRows: [
        { batter: "T. Marumani", dismissalInfo: "c Conway b Boult", runs: 12, balls: 18, fours: 1, sixes: 0, strikeRate: "66.67" },
        { batter: "C. Madande", dismissalInfo: "b Boult", runs: 8, balls: 12, fours: 0, sixes: 0, strikeRate: "66.67" },
        { batter: "S. Williams", dismissalInfo: "c Mitchell b Henry", runs: 23, balls: 35, fours: 3, sixes: 0, strikeRate: "65.71" },
        { batter: "C. Ervine", dismissalInfo: "c Latham b Santner", runs: 42, balls: 30, fours: 3, sixes: 2, strikeRate: "140.00" },
        { batter: "S. Raza", dismissalInfo: "c Conway b Henry", runs: 31, balls: 28, fours: 2, sixes: 1, strikeRate: "110.71" },
        { batter: "R. Burl", dismissalInfo: "run out", runs: 15, balls: 22, fours: 1, sixes: 0, strikeRate: "68.18" },
        { batter: "W. Masakadza", dismissalInfo: "c Mitchell b Santner", runs: 8, balls: 15, fours: 0, sixes: 0, strikeRate: "53.33" },
        { batter: "B. Muzarabani", dismissalInfo: "not out", runs: 5, balls: 8, fours: 0, sixes: 0, strikeRate: "62.50" },
        { batter: "R. Ngarava", dismissalInfo: "c Conway b Boult", runs: 3, balls: 7, fours: 0, sixes: 0, strikeRate: "42.86" },
        { batter: "T. Chatara", dismissalInfo: "c Mitchell b Henry", runs: 2, balls: 5, fours: 0, sixes: 0, strikeRate: "40.00" }
      ],
      extras: "0",
      total: "149",
      yetToBat: [],
      fallOfWickets: "1-15, 2-25, 3-45, 4-78, 5-95, 6-110, 7-125, 8-135, 9-142, 10-149",
      bowlingRows: [
        { bowler: "T. Boult", overs: "10.0", maidens: 2, runs: 35, wickets: 3, economy: "3.50" },
        { bowler: "M. Henry", overs: "9.2", maidens: 1, runs: 42, wickets: 3, economy: "4.50" },
        { bowler: "M. Santner", overs: "12.0", maidens: 2, runs: 31, wickets: 2, economy: "2.58" },
        { bowler: "D. Mitchell", overs: "8.0", maidens: 0, runs: 28, wickets: 0, economy: "3.50" },
        { bowler: "R. Ravindra", overs: "6.0", maidens: 0, runs: 13, wickets: 0, economy: "2.17" }
      ],
      currentBatters: [
        { name: "D. Conway", runs: 67, balls: 89, strikeRate: 75.28, isStriker: true },
        { name: "T. Latham", runs: 52, balls: 78, strikeRate: 66.67, isStriker: false }
      ],
      currentBowler: { name: "B. Muzarabani", overs: "16.0", wickets: 2, economy: 3.13 }
    },
    {
      teamName: "New Zealand",
      score: "174/3 (52.0)",
      battingRows: [
        { batter: "D. Conway", dismissalInfo: "not out", runs: 67, balls: 89, fours: 8, sixes: 0, strikeRate: "75.28" },
        { batter: "T. Latham", dismissalInfo: "not out", runs: 52, balls: 78, fours: 5, sixes: 1, strikeRate: "66.67" },
        { batter: "K. Williamson", dismissalInfo: "c Ervine b Muzarabani", runs: 28, balls: 45, fours: 3, sixes: 0, strikeRate: "62.22" },
        { batter: "R. Ravindra", dismissalInfo: "c Williams b Raza", runs: 18, balls: 25, fours: 2, sixes: 0, strikeRate: "72.00" }
      ],
      extras: "9",
      total: "174",
      yetToBat: ["D. Mitchell", "M. Chapman", "G. Phillips", "M. Santner", "M. Henry", "T. Boult", "R. Ravindra"],
      fallOfWickets: "1-45, 2-78, 3-95",
      bowlingRows: [
        { bowler: "B. Muzarabani", overs: "16.0", maidens: 4, runs: 50, wickets: 2, economy: "3.13" },
        { bowler: "S. Raza", overs: "12.0", maidens: 2, runs: 31, wickets: 1, economy: "2.58" },
        { bowler: "R. Ngarava", overs: "10.0", maidens: 1, runs: 35, wickets: 0, economy: "3.50" },
        { bowler: "T. Chatara", overs: "8.0", maidens: 0, runs: 28, wickets: 0, economy: "3.50" },
        { bowler: "W. Masakadza", overs: "6.0", maidens: 0, runs: 30, wickets: 0, economy: "5.00" }
      ],
      currentPartnership: "79 runs (15.2 overs)"
    }
  ],
  matchInfo: {
    venue: "Old Trafford, Manchester",
    time: "Day 2, Lunch Break",
    toss: "New Zealand won the toss and elected to field",
    series: "Test Series 2024",
    points: "New Zealand lead by 25 runs"
  }
};

const fetchMatchData = (): Promise<MatchData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyMatchData);
    }, 1500);
  });
};

const MatchDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [activeBettingTab, setActiveBettingTab] = useState('Main');
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatchData().then(data => {
      setMatchData(data);
      setLoading(false);
    });
  }, []);

  if (loading || !matchData) {
    return (
      <Layout showBackHeader>
        <PageBackground>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '100vh'
          }}>
            <CircularProgress sx={{ color: '#3B82F6' }} />
          </Box>
        </PageBackground>
      </Layout>
    );
  }

  return (
    <Layout showBackHeader>
      <PageBackground>
        {matchData && (
          <>
            {/* Top Section - Always Visible */}
            <TopBar>
              <MatchTabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </TopBar>

            {/* Tab Content */}
            <Box sx={{ 
              p: { xs: 1, sm: 1.5, md: 2 },
              '& .MuiCard-root': {
                mb: { xs: 1.5, sm: 2, md: 2.5 },
                '& .MuiCardHeader-root': {
                  px: { xs: 1.5, sm: 2, md: 2.5 },
                  py: { xs: 1, sm: 1.5, md: 2 },
                  '& .MuiTypography-h6': {
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                  }
                },
                '& .MuiCardContent-root': {
                  px: { xs: 1.5, sm: 2, md: 2.5 },
                  py: { xs: 1, sm: 1.5, md: 2 },
                  '& .MuiTypography-body1': {
                    fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
                  },
                  '& .MuiTypography-body2': {
                    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' }
                  }
                }
              }
            }}>
              {activeTab === 'info' && <MatchInfo data={matchData} />}
              {activeTab === 'live' && <LiveCommentary data={matchData} />}
              {activeTab === 'comm' && <CommentaryTab />}
              {activeTab === 'scorecard' && (
                <ScorecardComponent 
                  innings={dummyScorecardData.innings}
                  matchInfo={dummyScorecardData.matchInfo}
                />
              )}
              {activeTab === 'squads' && <Squads data={matchData} />}
              {activeTab === 'highlights' && <HighlightsTab data={matchData} />}
              {activeTab === 'odds' && (
                <Stack spacing={3}>
                  {/* Quick Stats */}
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(3, 1fr)'
                    },
                    gap: { xs: 1.5, sm: 2 },
                    mb: { xs: 2, sm: 1 }
                  }}>
                    {[
                      { value: '85%', label: 'Win Probability', color: '#3B82F6' },
                      { value: '2.85', label: 'Best Odds', color: '#10B981' },
                      { value: '12K', label: 'Active Bets', color: '#8B5CF6' }
                    ].map((stat, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: { xs: 2, sm: 2.5 },
                          textAlign: 'center',
                          bgcolor: 'rgba(15, 23, 42, 0.6)',
                          border: `1px solid rgba(${stat.color.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ')}, 0.3)`,
                          borderRadius: { xs: 1.5, sm: 2 },
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: { xs: 'row', sm: 'column' },
                          alignItems: 'center',
                          justifyContent: { xs: 'space-between', sm: 'center' },
                          gap: { xs: 2, sm: 0 },
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                          '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: `0 8px 24px rgba(${stat.color.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ')}, 0.2)`,
                            bgcolor: 'rgba(15, 23, 42, 0.8)'
                          }
                        }}
                      >
                        <Typography 
                          variant="h3" 
                          sx={{ 
                            color: stat.color,
                            mb: { xs: 0, sm: 1 },
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            order: { xs: 2, sm: 1 }
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#E2E8F0',
                            fontWeight: 500,
                            fontSize: { xs: '0.875rem', sm: '0.9rem' },
                            order: { xs: 1, sm: 2 }
                          }}
                        >
                          {stat.label}
                        </Typography>
                </Box>
                    ))}
                  </Box>

                  {/* Betting Type Tabs */}
                  <Box sx={{ 
                    display: 'flex',
                    gap: 1,
                    p: 1,
                    bgcolor: 'rgba(15, 23, 42, 0.8)',
                    borderRadius: 2,
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                  }}>
                    {['Main', 'Match', 'Fancy'].map((type) => (
                      <Button
                        key={type}
                        onClick={() => setActiveBettingTab(type)}
                        sx={{
                          flex: 1,
                          py: 2,
                          px: 3,
                          bgcolor: type === activeBettingTab 
                            ? 'rgba(59, 130, 246, 0.2)'
                            : 'transparent',
                          color: type === activeBettingTab 
                            ? '#FFFFFF' 
                            : '#94A3B8',
                          border: `1px solid ${type === activeBettingTab 
                            ? 'rgba(59, 130, 246, 0.4)' 
                            : 'rgba(51, 65, 85, 0.4)'}`,
                          borderRadius: 1.5,
                          fontWeight: type === activeBettingTab ? 600 : 500,
                          letterSpacing: '0.5px',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: type === activeBettingTab 
                              ? 'rgba(59, 130, 246, 0.25)' 
                              : 'rgba(51, 65, 85, 0.2)',
                            transform: 'translateY(-1px)',
                            boxShadow: type === activeBettingTab 
                              ? '0 4px 12px rgba(59, 130, 246, 0.25)'
                              : '0 2px 8px rgba(51, 65, 85, 0.3)'
                          }
                        }}
                      >
                        {type}
                      </Button>
                    ))}
                  </Box>

                  {activeBettingTab === 'Main' && (
                    <>
                      {/* Match Winner Section */}
                      <Card sx={{ 
                        bgcolor: 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)'
                        }
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
                                <TrophyIcon sx={{ color: '#3B82F6', fontSize: 24 }} />
                              </Box>
                              <Typography variant="h6" sx={{ 
                                color: '#FFFFFF',
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Match Winner
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            bgcolor: 'rgba(15, 23, 42, 0.9)',
                            borderBottom: '1px solid rgba(59, 130, 246, 0.3)',
                            py: 2.5
                          }}
                        />
                        <CardContent sx={{ p: 3 }}>
                          <Stack spacing={2.5}>
                            {/* ZIM */}
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 2.5,
                              bgcolor: 'rgba(15, 23, 42, 0.7)',
                              borderRadius: 1.5,
                              border: '1px solid rgba(59, 130, 246, 0.25)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: 'rgba(15, 23, 42, 0.9)',
                                border: '1px solid rgba(59, 130, 246, 0.4)'
                              }
                            }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar 
                                  src="/teams/zimbabwe.png" 
                                  alt="Zimbabwe" 
                                  sx={{ 
                                    width: 32, 
                                    height: 32, 
                                    border: '1px solid rgba(59, 130, 246, 0.3)'
                                  }}
                                />
                                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                  Zimbabwe
                                </Typography>
                              </Box>
                              <Stack direction="row" spacing={1.5}>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    bgcolor: 'rgba(59, 130, 246, 0.8)',
                                    color: 'white',
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: 'rgba(59, 130, 246, 1)',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                    }
                                  }}
                                >
                                  <Typography variant="body2" fontWeight={600}>3.85</Typography>
                                </Button>
                                <Button
                                  sx={{
                                    bgcolor: 'rgba(239, 68, 68, 0.8)',
                                    color: 'white',
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    minWidth: 80,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: 'rgba(239, 68, 68, 1)',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                                    }
                                  }}
                                >
                                  <Typography variant="body2" fontWeight={600}>3.9</Typography>
                                </Button>
                              </Stack>
                            </Box>

                            {/* NZ */}
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 2.5,
                              bgcolor: 'rgba(15, 23, 42, 0.7)',
                              borderRadius: 1.5,
                              border: '1px solid rgba(59, 130, 246, 0.25)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: 'rgba(15, 23, 42, 0.9)',
                                border: '1px solid rgba(59, 130, 246, 0.4)'
                              }
                            }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar 
                                  src="/teams/newzealand.png" 
                                  alt="New Zealand" 
                                  sx={{ 
                                    width: 32, 
                                    height: 32, 
                                    border: '1px solid rgba(59, 130, 246, 0.3)'
                                  }}
                                />
                                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                  New Zealand
                                </Typography>
                              </Box>
                              <Stack direction="row" spacing={1.5}>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    bgcolor: 'rgba(59, 130, 246, 0.8)',
                                    color: 'white',
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: 'rgba(59, 130, 246, 1)',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                    }
                                  }}
                                >
                                  <Typography variant="body2" fontWeight={600}>1.45</Typography>
                                </Button>
                                <Button
                                  sx={{
                                    bgcolor: 'rgba(239, 68, 68, 0.8)',
                                    color: 'white',
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    minWidth: 80,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: 'rgba(239, 68, 68, 1)',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                                    }
                                  }}
                                >
                                  <Typography variant="body2" fontWeight={600}>1.47</Typography>
                                </Button>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {activeBettingTab === 'Match' && (
                    <>
                      {/* Team Total Runs Section */}
                      <Card sx={{ ...commonStyles.card }}>
                        <CardHeader 
                          title={
                            <Stack direction="row" spacing={2} alignItems="center">
                              <TargetIcon sx={{ color: themeColors.warning }} />
                              <Typography variant="h6" sx={{ 
                                color: themeColors.text.primary,
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Team Total Runs
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
                          <Stack spacing={3}>
                            {/* ZIM Total Runs */}
                            <Box>
                              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                                Zimbabwe Total Runs
                              </Typography>
                              <Stack spacing={2}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Under 140.5
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      ...commonStyles.button,
                                      bgcolor: themeColors.primary,
                                      color: themeColors.text.primary,
                                      '&:hover': {
                                        bgcolor: alpha(themeColors.primary, 0.9),
                                        transform: 'translateY(-1px)',
                                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                                      }
                                    }}
                                  >
                                    Back 1.9
                                  </Button>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Over 140.5
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      ...commonStyles.button,
                                      bgcolor: themeColors.primary,
                                      color: themeColors.text.primary,
                                      '&:hover': {
                                        bgcolor: alpha(themeColors.primary, 0.9),
                                        transform: 'translateY(-1px)',
                                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                                      }
                                    }}
                                  >
                                    Back 1.9
                                  </Button>
                                </Box>
                              </Stack>
                            </Box>

                            {/* NZ Total Runs */}
                            <Box>
                              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                                New Zealand Total Runs
                              </Typography>
                              <Stack spacing={2}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Under 142.5
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      ...commonStyles.button,
                                      bgcolor: themeColors.primary,
                                      color: themeColors.text.primary,
                                      '&:hover': {
                                        bgcolor: alpha(themeColors.primary, 0.9),
                                        transform: 'translateY(-1px)',
                                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                                      }
                                    }}
                                  >
                                    Back 1.85
                                  </Button>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Over 142.5
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      ...commonStyles.button,
                                      bgcolor: themeColors.primary,
                                      color: themeColors.text.primary,
                                      '&:hover': {
                                        bgcolor: alpha(themeColors.primary, 0.9),
                                        transform: 'translateY(-1px)',
                                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                                      }
                                    }}
                                  >
                                    Back 1.95
                                  </Button>
                                </Box>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>

                      {/* Player Performance Section */}
                      <Card sx={{ ...commonStyles.card }}>
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
                                <TrophyIcon sx={{ color: '#3B82F6', fontSize: 24 }} />
                              </Box>
                              <Typography variant="h6" sx={{ 
                                color: themeColors.text.primary,
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Player Performance
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
                          <Stack spacing={3}>
                            {/* Devon Conway Runs */}
                            <Box>
                              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                                Devon Conway Runs
                              </Typography>
                              <Stack spacing={2}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Under 74.5
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      ...commonStyles.button,
                                      bgcolor: themeColors.primary,
                                      color: themeColors.text.primary,
                                      '&:hover': {
                                        bgcolor: alpha(themeColors.primary, 0.9),
                                        transform: 'translateY(-1px)',
                                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                                      }
                                    }}
                                  >
                                    Back 1.8
                                  </Button>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Over 74.5
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      ...commonStyles.button,
                                      bgcolor: themeColors.primary,
                                      color: themeColors.text.primary,
                                      '&:hover': {
                                        bgcolor: alpha(themeColors.primary, 0.9),
                                        transform: 'translateY(-1px)',
                                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                                      }
                                    }}
                                  >
                                    Back 2.0
                                  </Button>
                                </Box>
                              </Stack>
                            </Box>

                            {/* Tom Latham Runs */}
                            <Box>
                              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                                Tom Latham Runs
                              </Typography>
                              <Stack spacing={2}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Under 59.5
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      ...commonStyles.button,
                                      bgcolor: themeColors.primary,
                                      color: themeColors.text.primary,
                                      '&:hover': {
                                        bgcolor: alpha(themeColors.primary, 0.9),
                                        transform: 'translateY(-1px)',
                                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                                      }
                                    }}
                                  >
                                    Back 1.75
                                  </Button>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.5)',
                                  borderRadius: 1,
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', flex: 1 }}>
                                    Over 59.5
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      ...commonStyles.button,
                                      bgcolor: themeColors.primary,
                                      color: themeColors.text.primary,
                                      '&:hover': {
                                        bgcolor: alpha(themeColors.primary, 0.9),
                                        transform: 'translateY(-1px)',
                                        boxShadow: `0 4px 12px ${alpha(themeColors.primary, 0.2)}`
                                      }
                                    }}
                                  >
                                    Back 2.05
                                  </Button>
                                </Box>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {activeBettingTab === 'Fancy' && (
                    <>
                      {/* Next Over Runs */}
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
                                Next Over Runs
                              </Typography>
                            </Stack>
                          }
                          sx={{
                            bgcolor: 'rgba(15, 23, 42, 1)',
                            borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                            py: 2.5
                          }}
                        />
                        <CardContent sx={{ p: 3 }}>
                          <Stack spacing={2.5}>
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 2,
                              bgcolor: 'rgba(15, 23, 42, 0.9)',
                              borderRadius: 0,
                              borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: 'rgba(15, 23, 42, 1)'
                              }
                            }}>
                              <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                Under 8.5
                              </Typography>
                              <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>8.5</Typography>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    bgcolor: 'rgba(239, 68, 68, 0.8)',
                                    color: 'white',
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    minWidth: 50,
                                    fontSize: '0.875rem',
                                    '&:hover': {
                                      bgcolor: 'rgba(239, 68, 68, 1)',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                                    }
                                  }}
                                >
                                  120
                                </Button>
                              </Stack>
                            </Box>
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 2,
                              bgcolor: 'rgba(15, 23, 42, 0.9)',
                              borderRadius: 0,
                              borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: 'rgba(15, 23, 42, 1)'
                              }
                            }}>
                              <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                Over 8.5
                              </Typography>
                              <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>8.5</Typography>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    bgcolor: 'rgba(59, 130, 246, 0.8)',
                                    color: 'white',
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    minWidth: 50,
                                    fontSize: '0.875rem',
                                    '&:hover': {
                                      bgcolor: 'rgba(59, 130, 246, 1)',
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                    }
                                  }}
                                >
                                  85
                                </Button>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>

                      {/* Fall of Wicket */}
                      <Card sx={{
                        bgcolor: 'rgba(15, 23, 42, 1)',
                        border: 'none',
                        borderRadius: 0,
                        boxShadow: 'none',
                        mt: 3
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
                                <TrophyIcon sx={{ color: '#3B82F6', fontSize: 24 }} />
                              </Box>
                              <Typography variant="h6" sx={{
                                color: '#FFFFFF',
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Fall of Wicket
                              </Typography>
                            </Stack>
                          }
                          sx={{
                            bgcolor: 'rgba(15, 23, 42, 1)',
                            borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                            py: 2.5
                          }}
                        />
                        <CardContent sx={{ p: 3 }}>
                          <Stack spacing={3}>
                            {/* Fall of Next Wicket */}
                            <Box>
                              <Typography variant="subtitle1" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
                                Fall of Next Wicket
                              </Typography>
                              <Stack spacing={2.5}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.9)',
                                  borderRadius: 0,
                                  borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: 'rgba(15, 23, 42, 1)'
                                  }
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                    1-3 Overs
                                  </Typography>
                                  <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>122.0</Typography>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      sx={{
                                        bgcolor: 'rgba(239, 68, 68, 0.8)',
                                        color: 'white',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 1,
                                        fontWeight: 600,
                                        minWidth: 50,
                                        fontSize: '0.875rem',
                                        '&:hover': {
                                          bgcolor: 'rgba(239, 68, 68, 1)',
                                          transform: 'translateY(-1px)',
                                          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                                        }
                                      }}
                                    >
                                      120
                                    </Button>
                                  </Stack>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.9)',
                                  borderRadius: 0,
                                  borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: 'rgba(15, 23, 42, 1)'
                                  }
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                    4+ Overs
                                  </Typography>
                                  <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>122.0</Typography>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      sx={{
                                        bgcolor: 'rgba(59, 130, 246, 0.8)',
                                        color: 'white',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 1,
                                        fontWeight: 600,
                                        minWidth: 50,
                                        fontSize: '0.875rem',
                                        '&:hover': {
                                          bgcolor: 'rgba(59, 130, 246, 1)',
                                          transform: 'translateY(-1px)',
                                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                        }
                                      }}
                                    >
                                      85
                                    </Button>
                                  </Stack>
                                </Box>
                              </Stack>
                            </Box>

                            {/* Method of Next Dismissal */}
                            <Box>
                              <Typography variant="subtitle1" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
                                Method of Next Dismissal
                              </Typography>
                              <Stack spacing={2.5}>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.9)',
                                  borderRadius: 0,
                                  borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: 'rgba(15, 23, 42, 1)'
                                  }
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                    Bowled/LBW
                                  </Typography>
                                  <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>3.2</Typography>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      sx={{
                                        bgcolor: 'rgba(239, 68, 68, 0.8)',
                                        color: 'white',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 1,
                                        fontWeight: 600,
                                        minWidth: 50,
                                        fontSize: '0.875rem',
                                        '&:hover': {
                                          bgcolor: 'rgba(239, 68, 68, 1)',
                                          transform: 'translateY(-1px)',
                                          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                                        }
                                      }}
                                    >
                                      100
                                    </Button>
                                  </Stack>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.9)',
                                  borderRadius: 0,
                                  borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: 'rgba(15, 23, 42, 1)'
                                  }
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                    Caught
                                  </Typography>
                                  <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>1.9</Typography>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      sx={{
                                        bgcolor: 'rgba(59, 130, 246, 0.8)',
                                        color: 'white',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 1,
                                        fontWeight: 600,
                                        minWidth: 50,
                                        fontSize: '0.875rem',
                                        '&:hover': {
                                          bgcolor: 'rgba(59, 130, 246, 1)',
                                          transform: 'translateY(-1px)',
                                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                        }
                                      }}
                                    >
                                      110
                                    </Button>
                                  </Stack>
                                </Box>
                                <Box sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  p: 2,
                                  bgcolor: 'rgba(15, 23, 42, 0.9)',
                                  borderRadius: 0,
                                  borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: 'rgba(15, 23, 42, 1)'
                                  }
                                }}>
                                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                    Other
                                  </Typography>
                                  <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>8.0</Typography>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      sx={{
                                        bgcolor: 'rgba(16, 185, 129, 0.8)',
                                        color: 'white',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 1,
                                        fontWeight: 600,
                                        minWidth: 50,
                                        fontSize: '0.875rem',
                                        '&:hover': {
                                          bgcolor: 'rgba(16, 185, 129, 1)',
                                          transform: 'translateY(-1px)',
                                          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                                        }
                                      }}
                                    >
                                      75
                                    </Button>
                                  </Stack>
                                </Box>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>

                      {/* Quick Bets - Next Ball */}
                      <Card sx={{
                        bgcolor: 'rgba(15, 23, 42, 1)',
                        border: 'none',
                        borderRadius: 0,
                        boxShadow: 'none',
                        mt: 3
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
                                <StarIcon sx={{ color: '#3B82F6', fontSize: 24 }} />
                              </Box>
                              <Typography variant="h6" sx={{
                                color: '#FFFFFF',
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                              }}>
                                Quick Bets - Next Ball
                              </Typography>
                            </Stack>
                          }
                          sx={{
                            bgcolor: 'rgba(15, 23, 42, 1)',
                            borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                            py: 2.5
                          }}
                        />
                        <CardContent sx={{ p: 3 }}>
                          <Stack spacing={2.5}>
                            <Stack direction="row" spacing={2}>
                              <Button
                                sx={{
                                  flex: 1,
                                  bgcolor: 'rgba(15, 23, 42, 0.7)',
                                  border: '1px solid rgba(16, 185, 129, 0.3)',
                                  borderRadius: 1.5,
                                  p: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 0.5,
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: 'rgba(15, 23, 42, 0.9)',
                                    border: '1px solid rgba(16, 185, 129, 0.5)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)'
                                  }
                                }}
                              >
                                <Typography 
                                  variant="body1" 
                                  fontWeight={600}
                                  sx={{ color: '#10B981' }}
                                >
                                  FOUR
                                </Typography>
                                <Typography 
                                  variant="body2"
                                  sx={{ color: '#94A3B8', fontWeight: 500 }}
                                >
                                  6.5
                                </Typography>
                              </Button>
                              <Button
                                sx={{
                                  flex: 1,
                                  bgcolor: 'rgba(15, 23, 42, 0.7)',
                                  border: '1px solid rgba(139, 92, 246, 0.3)',
                                  borderRadius: 1.5,
                                  p: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 0.5,
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: 'rgba(15, 23, 42, 0.9)',
                                    border: '1px solid rgba(139, 92, 246, 0.5)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.2)'
                                  }
                                }}
                              >
                                <Typography 
                                  variant="body1" 
                                  fontWeight={600}
                                  sx={{ color: '#8B5CF6' }}
                                >
                                  SIX
                                </Typography>
                                <Typography 
                                  variant="body2"
                                  sx={{ color: '#94A3B8', fontWeight: 500 }}
                                >
                                  12.0
                                </Typography>
                              </Button>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                              <Button
                                sx={{
                                  flex: 1,
                                  bgcolor: 'rgba(15, 23, 42, 0.7)',
                                  border: '1px solid rgba(100, 116, 139, 0.3)',
                                  borderRadius: 1.5,
                                  p: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 0.5,
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: 'rgba(15, 23, 42, 0.9)',
                                    border: '1px solid rgba(100, 116, 139, 0.5)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(100, 116, 139, 0.2)'
                                  }
                                }}
                              >
                                <Typography 
                                  variant="body1" 
                                  fontWeight={600}
                                  sx={{ color: '#94A3B8' }}
                                >
                                  DOT
                                </Typography>
                                <Typography 
                                  variant="body2"
                                  sx={{ color: '#94A3B8', fontWeight: 500 }}
                                >
                                  2.8
                                </Typography>
                              </Button>
                              <Button
                                sx={{
                                  flex: 1,
                                  bgcolor: 'rgba(15, 23, 42, 0.7)',
                                  border: '1px solid rgba(239, 68, 68, 0.3)',
                                  borderRadius: 1.5,
                                  p: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 0.5,
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: 'rgba(15, 23, 42, 0.9)',
                                    border: '1px solid rgba(239, 68, 68, 0.5)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(239, 68, 68, 0.2)'
                                  }
                                }}
                              >
                                <Typography 
                                  variant="body1" 
                                  fontWeight={600}
                                  sx={{ color: '#EF4444' }}
                                >
                                  WICKET
                                </Typography>
                                <Typography 
                                  variant="body2"
                                  sx={{ color: '#94A3B8', fontWeight: 500 }}
                                >
                                  8.5
                                </Typography>
                              </Button>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </Stack>
              )}
            </Box>
          </>
        )}
      </PageBackground>
    </Layout>
  );
};

export default MatchDetailPage;