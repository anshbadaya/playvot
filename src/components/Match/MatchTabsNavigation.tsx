import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MatchTabsNavigationProps } from '@/types/match-details';

const Container = styled(Box)`
  background: rgba(15, 23, 42, 0.3);
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const ScrollContainer = styled(Box)`
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.3);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.5);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(59, 130, 246, 0.7);
  }
`;

const ButtonContainer = styled(Box)`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  min-width: min-content;
`;

const TabButton = styled(Button)<{ $active?: boolean }>`
  background: ${({ $active }) => $active ? 'rgba(59, 130, 246, 0.2)' : 'transparent'};
  color: ${({ $active }) => $active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)'};
  border: 1px solid ${({ $active }) => $active ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.1)'};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(1, 2)};
  font-weight: ${({ $active }) => $active ? '600' : '500'};
  text-transform: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: ${({ $active }) => $active ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)'};
    border-color: ${({ $active }) => $active ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.2)'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MatchTabsNavigation: React.FC<MatchTabsNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { value: 'info', label: 'Info' },
    { value: 'live', label: 'Live' },
    { value: 'odds', label: 'Odds' },
    { value: 'scorecard', label: 'Scorecard' },
    { value: 'squads', label: 'Squads' },
    { value: 'highlights', label: 'Highlights' },
  ];

  return (
    <Container>
      <ScrollContainer>
        <ButtonContainer>
          {tabs.map((tab) => (
            <TabButton
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              $active={activeTab === tab.value}
            >
              {tab.label}
            </TabButton>
          ))}
        </ButtonContainer>
      </ScrollContainer>
    </Container>
  );
};

export default MatchTabsNavigation;