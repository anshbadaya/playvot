import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { Layout } from '@/components/Layout';
import { PageBackground } from '@/styles/match.styles';
import { useMatchDetails } from '@/hooks/useMatchDetails';
import MatchDetailsLoading from './MatchDetailsLoading';
import MatchDetailsError from './MatchDetailsError';
import MatchDetailsTabs from './MatchDetailsTabs';
import MatchDetailsContent from './MatchDetailsContent';

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
        {loading && <MatchDetailsLoading />}

        {/* Error State */}
        {!loading && error && (
          <MatchDetailsError error={error} onRetry={handleRetry} />
        )}

        {/* Content */}
        {!loading && !error && matchData && (
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
      </PageBackground>
    </Layout>
  );
};

export default MatchDetailsPage; 