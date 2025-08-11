import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { PageBackground } from '@/styles/match.styles';
import { useMatchDetails } from '@/hooks/useMatchDetails';
import { MatchDetailsLoading, MatchDetailsTabs, MatchDetailsContent } from '@/components/Match/MatchDetails';
import BackgroundRefreshIndicator from '@/components/Shared/BackgroundRefreshIndicator';

/**
 * Main MatchDetails page component
 */
const MatchDetailsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [activeBettingTab, setActiveBettingTab] = useState('Main');

  // Use custom hook for data management
  const { 
    matchData, 
    scorecardData, 
    loading,
    refreshing
  } = useMatchDetails('zim-vs-nz-2024'); // In a real app, this would come from URL params

  return (
    <Layout showBackHeader>
      <PageBackground>
        <BackgroundRefreshIndicator isRefreshing={refreshing} showProgressBar={true}>
          {/* Loading State */}
          {loading && <MatchDetailsLoading />}

          {/* Content */}
          {!loading && matchData && (
            <>
              {/* Top Section - Always Visible */}
              <MatchDetailsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {/* Tab Content */}
              <MatchDetailsContent
                activeTab={activeTab}
                activeBettingTab={activeBettingTab}
                setActiveBettingTab={setActiveBettingTab}
                matchData={matchData}
                scorecardData={scorecardData}
              />
            </>
          )}
        </BackgroundRefreshIndicator>
      </PageBackground>
    </Layout>
  );
};

export default MatchDetailsPage; 