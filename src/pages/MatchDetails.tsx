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
import { Layout } from '@/components/Layout';
import { PageBackground, TopBar } from '@/components/Match/styles/StyledComponents';
import { MatchTabsNavigation } from '@/components/Match';
import MatchInfo from '@/components/Match/MatchInfo';
import { LiveCommentary, CommentaryTab } from '@/components/Match/Commentary';
import { HighlightsTab } from '@/components/Match/Highlights';
import Squads from '@/components/Match/Squads';
import { ScorecardComponent } from '@/components/Match/Scorecard';

// Custom hook and types
import { useMatchDetails } from '@/hooks/useMatchDetails';
import { themeColors, commonStyles } from '@/config/theme';

// Dummy data imports
import {
  dummyQuickStatsData,
  dummyBettingTabs,
  dummyMatchWinnerOdds,
  dummyTeamTotalRuns,
  dummyPlayerPerformance,
  dummyNextOverRuns,
  dummyFallOfWicket,
  dummyMethodOfDismissal,
  dummyQuickBets
} from '@/data/matchDetailsData';

// Styles
import {
  tabContentStyles,
  matchDetailsLoadingContainerStyles,
  matchDetailsLoadingSpinnerStyles,
  quickStatsContainerStyles,
  quickStatItemStyles,
  quickStatValueStyles,
  quickStatLabelStyles,
  bettingTabsContainerStyles,
  bettingTabButtonStyles,
  matchWinnerCardStyles,
  matchWinnerHeaderStyles,
  matchWinnerTeamRowStyles,
  matchWinnerTeamAvatarStyles,
  matchWinnerTeamNameStyles,
  oddsButtonStyles,
  fancyCardStyles,
  fancyHeaderStyles,
  fancyRowStyles,
  fancyButtonStyles,
  quickBetButtonStyles,
  quickBetLabelStyles,
  quickBetOddsStyles,
  matchDetailsErrorContainerStyles,
  matchDetailsErrorTextStyles,
  matchDetailsRetryButtonStyles
} from '@/styles/matchDetails.styles';

/**
 * Loading component
 */
const LoadingState: React.FC = () => (
  <Box sx={matchDetailsLoadingContainerStyles}>
    <CircularProgress sx={matchDetailsLoadingSpinnerStyles} />
  </Box>
);

/**
 * Error component
 */
const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <Box sx={matchDetailsErrorContainerStyles}>
    <Typography variant="h6" sx={matchDetailsErrorTextStyles}>
      Something went wrong
    </Typography>
    <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
      {error}
    </Typography>
    <Button 
      variant="contained" 
      onClick={onRetry}
      sx={matchDetailsRetryButtonStyles}
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
    {dummyQuickStatsData.map((stat, index) => (
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
    {dummyBettingTabs.map((type) => (
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
        {dummyMatchWinnerOdds.map((odds, index) => (
          <Box key={index} sx={matchWinnerTeamRowStyles}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                src={`/teams/${odds.team.toLowerCase().replace(' ', '')}.png`}
                alt={odds.team} 
                sx={matchWinnerTeamAvatarStyles}
              />
              <Typography variant="body1" sx={matchWinnerTeamNameStyles}>
                {odds.team}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="contained"
                size="small"
                sx={oddsButtonStyles(true)}
              >
                <Typography variant="body2" fontWeight={600}>{odds.back}</Typography>
              </Button>
              <Button sx={oddsButtonStyles(false)}>
                <Typography variant="body2" fontWeight={600}>{odds.lay}</Typography>
              </Button>
            </Stack>
          </Box>
        ))}
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
        {dummyTeamTotalRuns.map((teamRuns, index) => (
          <Box key={index}>
            <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
              {teamRuns.team} Total Runs
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
                  Under {teamRuns.under.runs}
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
                  Back {teamRuns.under.odds}
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
                  Over {teamRuns.over.runs}
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
                  Back {teamRuns.over.odds}
                </Button>
              </Box>
            </Stack>
          </Box>
        ))}
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
        {dummyPlayerPerformance.map((player, index) => (
          <Box key={index}>
            <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
              {player.player} Runs
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
                  Under {player.under.runs}
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
                  Back {player.under.odds}
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
                  Over {player.over.runs}
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
                  Back {player.over.odds}
                </Button>
              </Box>
            </Stack>
          </Box>
        ))}
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
        {dummyNextOverRuns.map((bet, index) => (
          <Box key={index} sx={fancyRowStyles}>
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
              {bet.type}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>{bet.description}</Typography>
              <Button
                variant="contained"
                size="small"
                sx={fancyButtonStyles('rgba(239, 68, 68, ')}
              >
                {bet.odds}
              </Button>
            </Stack>
          </Box>
        ))}
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
            {dummyFallOfWicket.map((bet, index) => (
              <Box key={index} sx={fancyRowStyles}>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                  {bet.type}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>{bet.description}</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={fancyButtonStyles('rgba(239, 68, 68, ')}
                  >
                    {bet.odds}
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Method of Next Dismissal */}
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
            Method of Next Dismissal
          </Typography>
          <Stack spacing={2.5}>
            {dummyMethodOfDismissal.map((bet, index) => (
              <Box key={index} sx={fancyRowStyles}>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                  {bet.type}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>{bet.description}</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={fancyButtonStyles('rgba(239, 68, 68, ')}
                  >
                    {bet.odds}
                  </Button>
                </Stack>
              </Box>
            ))}
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
          {dummyQuickBets.slice(0, 2).map((bet, index) => (
            <Button key={index} sx={quickBetButtonStyles(bet.color.replace('#', 'rgba(').replace(')', ', 0.2)'))}>
              <Typography variant="body1" fontWeight={600} sx={quickBetLabelStyles(bet.color)}>
                {bet.type}
              </Typography>
              <Typography variant="body2" sx={quickBetOddsStyles}>
                {bet.odds}
              </Typography>
            </Button>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          {dummyQuickBets.slice(2, 4).map((bet, index) => (
            <Button key={index} sx={quickBetButtonStyles(bet.color.replace('#', 'rgba(').replace(')', ', 0.2)'))}>
              <Typography variant="body1" fontWeight={600} sx={quickBetLabelStyles(bet.color)}>
                {bet.type}
              </Typography>
              <Typography variant="body2" sx={quickBetOddsStyles}>
                {bet.odds}
              </Typography>
            </Button>
          ))}
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

/**
 * Odds Tab Content component
 */
const OddsTabContent: React.FC<{ 
  activeTab: string; 
  onTabChange: (tab: string) => void 
}> = ({ activeTab, onTabChange }) => (
  <Stack spacing={3}>
    <QuickStats />
    <BettingTabs activeTab={activeTab} onTabChange={onTabChange} />
    
    {activeTab === 'Main' && <MatchWinnerSection />}
    
    {activeTab === 'Match' && (
      <>
        <TeamTotalRunsSection />
        <PlayerPerformanceSection />
      </>
    )}
    
    {activeTab === 'Fancy' && (
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
                  activeTab={activeBettingTab} 
                  onTabChange={setActiveBettingTab}
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