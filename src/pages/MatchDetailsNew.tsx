"use client";

import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from "@mui/material";

import Layout from '@/components/Layout';
import { MatchData } from '@/types/match-details';
import { PageBackground, TopBar } from '@/components/Match/styles/StyledComponents';
import { MatchTabsNavigation } from '@/components/Match';
import MatchInfo from '@/components/Match/MatchInfo';
import LiveCommentary from '@/components/Match/LiveCommentary';
import CommentaryTab from '@/components/Match/CommentaryTab';
import HighlightsTab from '@/components/Match/HighlightsTab';
import Squads from '@/components/Match/Squads';

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
        name: 'Devon Conway',
        number: 1,
        position: 'Opener',
        role: 'WK-Batter',
        isWicketKeeper: true,
        avatar: '/teams/player15.png',
        stats: {
          runs: 87,
          balls: 162,
          fours: 12,
          sixes: 0,
          strikeRate: 53.70
        }
      },
      {
        name: 'Daryl Mitchell',
        number: 2,
        position: 'Top Order',
        role: 'Batting Allrounder',
        avatar: '/teams/player19.png',
        stats: {
          runs: 9,
          balls: 14,
          fours: 1,
          sixes: 0,
          strikeRate: 64.29
        }
      },
      {
        name: 'Nick Welch',
        number: 3,
        position: 'Middle Order',
        role: 'Batter',
        avatar: '/teams/player3.png',
        stats: {
          runs: 15,
          balls: 12,
          fours: 1,
          sixes: 0,
          rating: 125.0
        }
      },
      {
        name: 'Craig Ervine',
        number: 4,
        position: 'Middle Order',
        role: 'Batter',
        isCaptain: true,
        avatar: '/teams/player5.png',
        stats: {
          runs: 42,
          balls: 30,
          fours: 3,
          sixes: 2,
          rating: 140.0
        }
      }
    ],
    away: [
      {
        name: 'Blessing Muzarabani',
        number: 10,
        position: 'Bowler',
        role: 'Bowler',
        avatar: '/teams/player10.png',
        stats: {
          overs: "16",
          maidens: 4,
          wickets: 2,
          runs: 50,
          economy: 3.13
        }
      },
      {
        name: 'Sikandar Raza',
        number: 6,
        position: 'All-rounder',
        role: 'Batting Allrounder',
        avatar: '/teams/player6.png',
        stats: {
          overs: "12",
          maidens: 2,
          wickets: 1,
          runs: 31,
          economy: 2.58
        }
      },
      {
        name: 'Mitchell Santner',
        number: 8,
        position: 'Lower Order',
        role: 'Bowling Allrounder',
        isCaptain: true,
        avatar: '/teams/player22.png',
        stats: {
          runs: 18,
          balls: 12,
          fours: 1,
          sixes: 1,
          rating: 150.0
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

const fetchMatchData = (): Promise<MatchData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyMatchData);
    }, 1500);
  });
};

const MatchDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
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
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  Scorecard component will be displayed here.
                </Box>
              )}
              {activeTab === 'squads' && <Squads data={matchData} />}
              {activeTab === 'highlights' && <HighlightsTab data={matchData} />}
              {activeTab === 'odds' && (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  Betting odds information will be displayed here.
                </Box>
              )}
            </Box>
          </>
        )}
      </PageBackground>
    </Layout>
  );
};

export default MatchDetailPage;