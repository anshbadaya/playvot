// pages/MatchDetails.tsx
import React, { useState } from 'react';
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
  Alert
} from "@mui/material";
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import TargetIcon from '@mui/icons-material/MyLocation';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Layout and components
import Layout from '@/components/Layout';
import { PageBackground, TopBar } from '@/components/Match/styles/StyledComponents';
import { MatchTabsNavigation } from '@/components/Match';
import MatchInfo from '@/components/Match/MatchInfo';
import LiveCommentary from '@/components/Match/LiveCommentary';
import CommentaryTab from '@/components/Match/CommentaryTab';
import HighlightsTab from '@/components/Match/HighlightsTab';
import Squads from '@/components/Match/Squads';
import ScorecardComponent from '@/components/Match/ScorecardComponent';

// Custom hook and types
import { useMatchDetails } from '@/hooks/useMatchDetails';
import { themeColors, commonStyles } from '@/components/Match/styles/theme-constants';

// Styles
import {
  tabContentStyles,
  loadingContainerStyles,
  loadingSpinnerStyles,
  quickStatsContainerStyles,
  quickStatItemStyles,
  quickStatValueStyles,
  quickStatLabelStyles,
  bettingTabsContainerStyles,
  bettingTabButtonStyles,
  matchWinnerCardStyles,
  matchWinnerHeaderStyles,
  teamRowStyles,
  teamAvatarStyles,
  teamNameStyles,
  oddsButtonStyles,
  fancyCardStyles,
  fancyHeaderStyles,
  fancyRowStyles,
  fancyButtonStyles,
  quickBetButtonStyles,
  quickBetLabelStyles,
  quickBetOddsStyles,
  errorContainerStyles,
  errorTextStyles,
  retryButtonStyles
} from '@/styles/matchDetails.styles';

// Quick stats data
const quickStatsData = [
  { value: '85%', label: 'Win Probability', color: '#3B82F6' },
  { value: '2.85', label: 'Best Odds', color: '#10B981' },
  { value: '12K', label: 'Active Bets', color: '#8B5CF6' }
];

// Betting tabs data
const bettingTabs = ['Main', 'Match', 'Fancy'];

/**
 * Loading component
 */
const LoadingState: React.FC = () => (
  <Box sx={loadingContainerStyles}>
    <CircularProgress sx={loadingSpinnerStyles} />
  </Box>
);

/**
 * Error component
 */
const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <Box sx={errorContainerStyles}>
    <Typography variant="h6" sx={errorTextStyles}>
      Something went wrong
    </Typography>
    <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
      {error}
    </Typography>
    <Button 
      variant="contained" 
      onClick={onRetry}
      sx={retryButtonStyles}
    >
      Try Again
    </Button>
  </Box>
);

/**
 * Quick Stats component
 */
const QuickStats: React.FC = () => (
  <Box sx={quickStatsContainerStyles}>
    {quickStatsData.map((stat, index) => (
      <Box key={index} sx={quickStatItemStyles(stat.color)}>
        <Typography variant="h3" sx={quickStatValueStyles(stat.color)}>
          {stat.value}
        </Typography>
        <Typography variant="body2" sx={quickStatLabelStyles}>
          {stat.label}
        </Typography>
      </Box>
    ))}
  </Box>
);

/**
 * Betting Tabs component
 */
const BettingTabs: React.FC<{ 
  activeTab: string; 
  onTabChange: (tab: string) => void 
}> = ({ activeTab, onTabChange }) => (
  <Box sx={bettingTabsContainerStyles}>
    {bettingTabs.map((type) => (
      <Button
        key={type}
        onClick={() => onTabChange(type)}
        sx={bettingTabButtonStyles(type === activeTab)}
      >
        {type}
      </Button>
    ))}
  </Box>
);

/**
 * Match Winner Section component
 */
const MatchWinnerSection: React.FC = () => (
  <Card sx={matchWinnerCardStyles}>
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
      sx={matchWinnerHeaderStyles}
    />
    <CardContent sx={{ p: 3 }}>
      <Stack spacing={2.5}>
        {/* ZIM */}
        <Box sx={teamRowStyles}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              src="/teams/zimbabwe.png" 
              alt="Zimbabwe" 
              sx={teamAvatarStyles}
            />
            <Typography variant="body1" sx={teamNameStyles}>
              Zimbabwe
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="contained"
              size="small"
              sx={oddsButtonStyles(true)}
            >
              <Typography variant="body2" fontWeight={600}>3.85</Typography>
            </Button>
            <Button sx={oddsButtonStyles(false)}>
              <Typography variant="body2" fontWeight={600}>3.9</Typography>
            </Button>
          </Stack>
        </Box>

        {/* NZ */}
        <Box sx={teamRowStyles}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              src="/teams/newzealand.png" 
              alt="New Zealand" 
              sx={teamAvatarStyles}
            />
            <Typography variant="body1" sx={teamNameStyles}>
              New Zealand
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="contained"
              size="small"
              sx={oddsButtonStyles(true)}
            >
              <Typography variant="body2" fontWeight={600}>1.45</Typography>
            </Button>
            <Button sx={oddsButtonStyles(false)}>
              <Typography variant="body2" fontWeight={600}>1.47</Typography>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

/**
 * Team Total Runs Section component
 */
const TeamTotalRunsSection: React.FC = () => (
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
        bgcolor: 'rgba(15, 23, 42, 0.5)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.3)',
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
                    bgcolor: 'rgba(59, 130, 246, 0.9)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
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
                    bgcolor: 'rgba(59, 130, 246, 0.9)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
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
                    bgcolor: 'rgba(59, 130, 246, 0.9)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
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
                    bgcolor: 'rgba(59, 130, 246, 0.9)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
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
);

/**
 * Player Performance Section component
 */
const PlayerPerformanceSection: React.FC = () => (
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
        bgcolor: 'rgba(15, 23, 42, 0.5)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.3)',
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
                    bgcolor: 'rgba(59, 130, 246, 0.9)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
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
                    bgcolor: 'rgba(59, 130, 246, 0.9)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
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
                    bgcolor: 'rgba(59, 130, 246, 0.9)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
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
                    bgcolor: 'rgba(59, 130, 246, 0.9)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
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
);

/**
 * Next Over Runs Section component
 */
const NextOverRunsSection: React.FC = () => (
  <Card sx={fancyCardStyles}>
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
      sx={fancyHeaderStyles}
    />
    <CardContent sx={{ p: 3 }}>
      <Stack spacing={2.5}>
        <Box sx={fancyRowStyles}>
          <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
            Under 8.5
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>8.5</Typography>
            <Button
              variant="contained"
              size="small"
              sx={fancyButtonStyles('rgba(239, 68, 68, ')}
            >
              120
            </Button>
          </Stack>
        </Box>
        <Box sx={fancyRowStyles}>
          <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
            Over 8.5
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>8.5</Typography>
            <Button
              variant="contained"
              size="small"
              sx={fancyButtonStyles('rgba(59, 130, 246, ')}
            >
              85
            </Button>
          </Stack>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

/**
 * Fall of Wicket Section component
 */
const FallOfWicketSection: React.FC = () => (
  <Card sx={{ ...fancyCardStyles, mt: 3 }}>
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
      sx={fancyHeaderStyles}
    />
    <CardContent sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* Fall of Next Wicket */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
            Fall of Next Wicket
          </Typography>
          <Stack spacing={2.5}>
            <Box sx={fancyRowStyles}>
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                1-3 Overs
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>122.0</Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={fancyButtonStyles('rgba(239, 68, 68, ')}
                >
                  120
                </Button>
              </Stack>
            </Box>
            <Box sx={fancyRowStyles}>
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                4+ Overs
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>122.0</Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={fancyButtonStyles('rgba(59, 130, 246, ')}
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
            <Box sx={fancyRowStyles}>
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                Bowled/LBW
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>3.2</Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={fancyButtonStyles('rgba(239, 68, 68, ')}
                >
                  100
                </Button>
              </Stack>
            </Box>
            <Box sx={fancyRowStyles}>
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                Caught
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>1.9</Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={fancyButtonStyles('rgba(59, 130, 246, ')}
                >
                  110
                </Button>
              </Stack>
            </Box>
            <Box sx={fancyRowStyles}>
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                Other
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>8.0</Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={fancyButtonStyles('rgba(16, 185, 129, ')}
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
);

/**
 * Quick Bets Section component
 */
const QuickBetsSection: React.FC = () => (
  <Card sx={{ ...fancyCardStyles, mt: 3 }}>
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
      sx={fancyHeaderStyles}
    />
    <CardContent sx={{ p: 3 }}>
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={2}>
          <Button sx={quickBetButtonStyles('rgba(16, 185, 129, ')}>
            <Typography variant="body1" fontWeight={600} sx={quickBetLabelStyles('#10B981')}>
              FOUR
            </Typography>
            <Typography variant="body2" sx={quickBetOddsStyles}>
              6.5
            </Typography>
          </Button>
          <Button sx={quickBetButtonStyles('rgba(139, 92, 246, ')}>
            <Typography variant="body1" fontWeight={600} sx={quickBetLabelStyles('#8B5CF6')}>
              SIX
            </Typography>
            <Typography variant="body2" sx={quickBetOddsStyles}>
              12.0
            </Typography>
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button sx={quickBetButtonStyles('rgba(100, 116, 139, ')}>
            <Typography variant="body1" fontWeight={600} sx={quickBetLabelStyles('#94A3B8')}>
              DOT
            </Typography>
            <Typography variant="body2" sx={quickBetOddsStyles}>
              2.8
            </Typography>
          </Button>
          <Button sx={quickBetButtonStyles('rgba(239, 68, 68, ')}>
            <Typography variant="body1" fontWeight={600} sx={quickBetLabelStyles('#EF4444')}>
              WICKET
            </Typography>
            <Typography variant="body2" sx={quickBetOddsStyles}>
              8.5
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

/**
 * Odds Tab Content component
 */
const OddsTabContent: React.FC<{ 
  activeBettingTab: string; 
  onBettingTabChange: (tab: string) => void 
}> = ({ activeBettingTab, onBettingTabChange }) => (
  <Stack spacing={3}>
    <QuickStats />
    <BettingTabs activeTab={activeBettingTab} onTabChange={onBettingTabChange} />
    
    {activeBettingTab === 'Main' && <MatchWinnerSection />}
    
    {activeBettingTab === 'Match' && (
      <>
        <TeamTotalRunsSection />
        <PlayerPerformanceSection />
      </>
    )}
    
    {activeBettingTab === 'Fancy' && (
      <>
        <NextOverRunsSection />
        <FallOfWicketSection />
        <QuickBetsSection />
      </>
    )}
  </Stack>
);

/**
 * Main MatchDetails page component
 */
const MatchDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [activeBettingTab, setActiveBettingTab] = useState('Main');

  // Use custom hook for data management
  const { 
    matchData, 
    scorecardData, 
    loading, 
    error, 
    refetch, 
    clearError 
  } = useMatchDetails('zim-vs-nz-2024'); // In a real app, this would come from URL params

  // Handle retry
  const handleRetry = () => {
    clearError();
    refetch();
  };

  return (
    <Layout showBackHeader>
      <PageBackground>
        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            onClose={clearError}
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Error State */}
        {!loading && error && (
          <ErrorState error={error} onRetry={handleRetry} />
        )}

        {/* Content */}
        {!loading && !error && matchData && (
          <>
            {/* Top Section - Always Visible */}
            <TopBar>
              <MatchTabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </TopBar>

            {/* Tab Content */}
            <Box sx={tabContentStyles}>
              {activeTab === 'info' && <MatchInfo data={matchData} />}
              {activeTab === 'live' && <LiveCommentary data={matchData} />}
              {activeTab === 'comm' && <CommentaryTab />}
              {activeTab === 'scorecard' && scorecardData && (
                <ScorecardComponent 
                  innings={scorecardData.innings}
                  matchInfo={scorecardData.matchInfo}
                />
              )}
              {activeTab === 'squads' && <Squads data={matchData} />}
              {activeTab === 'highlights' && <HighlightsTab data={matchData} />}
              {activeTab === 'odds' && (
                <OddsTabContent 
                  activeBettingTab={activeBettingTab} 
                  onBettingTabChange={setActiveBettingTab}
                />
              )}
            </Box>
          </>
        )}
      </PageBackground>
    </Layout>
  );
};

export default MatchDetails;