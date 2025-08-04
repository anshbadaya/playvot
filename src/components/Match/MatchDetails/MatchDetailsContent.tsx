import React from 'react';
import { Box } from '@mui/material';
import MatchInfo from '@/components/Match/MatchInfo';
import { LiveCommentary, CommentaryTab } from '@/components/Match/Commentary';
import { HighlightsTab } from '@/components/Match/Highlights';
import Squads from '@/components/Match/Squads';
import { ScorecardComponent } from '@/components/Match/Scorecard';
import { OddsTabContent } from './OddsTabContent';
import { tabContentStyles } from '@/styles/matchDetails.styles';
import { MatchData, ScorecardData } from '@/types/match-details';

interface MatchDetailsContentProps {
  activeTab: string;
  activeBettingTab: string;
  setActiveBettingTab: (tab: string) => void;
  matchData: MatchData;
  scorecardData?: ScorecardData;
}

/**
 * Content component for MatchDetails page - handles tab content rendering
 */
const MatchDetailsContent: React.FC<MatchDetailsContentProps> = ({
  activeTab,
  activeBettingTab,
  setActiveBettingTab,
  matchData,
  scorecardData
}) => (
  <Box sx={tabContentStyles}>
    {activeTab === 'info' && <MatchInfo data={matchData} />}
    {activeTab === 'live' && <LiveCommentary data={matchData} />}
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
);

export default MatchDetailsContent; 