import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, LoadingSpinner, Flex, Container, Title, Text, Badge } from './index';

const ExampleContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const ExampleSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ExampleTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 1.25rem;
`;

const Example: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ExampleContainer>
      <Container>
        <Title>Styled Components Example</Title>
        <Text>This page demonstrates the usage of our styled components.</Text>
        
        <ExampleSection>
          <ExampleTitle>Buttons</ExampleTitle>
          <Flex gap="16px" align="center">
            <Button variant="primary" onClick={handleButtonClick}>
              Primary Button
            </Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button size="sm">Small Button</Button>
            <Button size="lg">Large Button</Button>
            <Button disabled>Disabled Button</Button>
          </Flex>
        </ExampleSection>

        <ExampleSection>
          <ExampleTitle>Cards</ExampleTitle>
          <Flex gap="16px" align="stretch">
            <Card padding="md" hover>
              <Title>Hover Card</Title>
              <Text>This card has hover effects enabled.</Text>
            </Card>
            <Card padding="lg">
              <Title>Large Padding</Title>
              <Text>This card has large padding.</Text>
            </Card>
            <Card padding="sm">
              <Title>Small Padding</Title>
              <Text>This card has small padding.</Text>
            </Card>
          </Flex>
        </ExampleSection>

        <ExampleSection>
          <ExampleTitle>Loading Spinners</ExampleTitle>
          <Flex gap="16px" align="center">
            <Flex direction="column" align="center" gap="8px">
              <LoadingSpinner size="sm" />
              <Text>Small</Text>
            </Flex>
            <Flex direction="column" align="center" gap="8px">
              <LoadingSpinner size="md" />
              <Text>Medium</Text>
            </Flex>
            <Flex direction="column" align="center" gap="8px">
              <LoadingSpinner size="lg" />
              <Text>Large</Text>
            </Flex>
            <Flex direction="column" align="center" gap="8px">
              <LoadingSpinner size="md" color="#10B981" />
              <Text>Custom Color</Text>
            </Flex>
          </Flex>
        </ExampleSection>

        <ExampleSection>
          <ExampleTitle>Badges</ExampleTitle>
          <Flex gap="16px" align="center">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </Flex>
        </ExampleSection>

        <ExampleSection>
          <ExampleTitle>Grid Layout</ExampleTitle>
          <Flex gap="16px" direction="column">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <Card>
                <Text>Grid Item 1</Text>
              </Card>
              <Card>
                <Text>Grid Item 2</Text>
              </Card>
              <Card>
                <Text>Grid Item 3</Text>
              </Card>
            </div>
          </Flex>
        </ExampleSection>

        {loading && (
          <ExampleSection>
            <ExampleTitle>Loading State</ExampleTitle>
            <Flex gap="16px" align="center">
              <LoadingSpinner />
              <Text>Loading...</Text>
            </Flex>
          </ExampleSection>
        )}
      </Container>
    </ExampleContainer>
  );
};

export default Example; 