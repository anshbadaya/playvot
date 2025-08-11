import styled from 'styled-components';

// Flex container with common flexbox properties
export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  gap?: string;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  gap: ${({ gap = '0' }) => gap};
`;

// Responsive container
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  
  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

// Typography components
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.text?.primary || '#FFFFFF'};
  margin: 0;
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text?.primary || '#FFFFFF'};
  margin: 0;
`;

export const Text = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors?.text?.secondary || 'rgba(255, 255, 255, 0.8)'};
  margin: 0;
`;

// Badge component
export const Badge = styled.span<{
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'primary': return theme.colors?.primary || '#1D4ED8';
      case 'secondary': return 'rgba(255, 255, 255, 0.1)';
      case 'success': return '#16A34A';
      case 'warning': return '#F59E0B';
      case 'error': return '#DC2626';
      default: return theme.colors?.primary || '#1D4ED8';
    }
  }};
  color: ${({ variant }) => variant === 'secondary' ? 'rgba(255, 255, 255, 0.8)' : '#FFFFFF'};
`;
