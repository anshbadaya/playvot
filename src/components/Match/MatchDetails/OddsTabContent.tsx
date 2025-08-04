import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { QuickStats } from './QuickStats';
import { BettingTabs } from './BettingTabs';
import { MatchWinnerSection } from './MatchWinnerSection';
import { TeamTotalRunsSection } from './TeamTotalRunsSection';
import { PlayerPerformanceSection } from './PlayerPerformanceSection';
import { NextOverRunsSection } from './NextOverRunsSection';
import { FallOfWicketSection } from './FallOfWicketSection';
import { QuickBetsSection } from './QuickBetsSection';

interface OddsTabContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

/**
 * Odds Tab Content component
 */
export const OddsTabContent: React.FC<OddsTabContentProps> = ({ activeTab, onTabChange }) => (
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