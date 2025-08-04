import React from 'react';
import { MatchTabsNavigation } from '@/components/Match';
import { TopBar } from '@/styles/match.styles';

interface MatchDetailsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

/**
 * Tabs navigation component for MatchDetails page
 */
const MatchDetailsTabs: React.FC<MatchDetailsTabsProps> = ({ activeTab, setActiveTab }) => (
  <TopBar>
    <MatchTabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
  </TopBar>
);

export default MatchDetailsTabs; 