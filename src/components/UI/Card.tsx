import styled from 'styled-components';

interface CardProps {
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

export const Card = styled.div<CardProps>`
  background-color: ${({ theme }) => theme.colors?.background?.secondary || '#111827'};
  border-radius: ${({ theme }) => theme.borderRadius?.lg || '12px'};
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Padding variants */
  ${({ padding = 'md' }) => {
    switch (padding) {
      case 'sm':
        return 'padding: 12px;';
      case 'lg':
        return 'padding: 24px;';
      case 'xl':
        return 'padding: 32px;';
      default:
        return 'padding: 16px;';
    }
  }}
  
  /* Hover effect */
  ${({ hover, theme }) => hover && `
    transition: all ${theme.transitions?.normal || '0.3s ease'};
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      border-color: rgba(255, 255, 255, 0.2);
    }
  `}
`;
