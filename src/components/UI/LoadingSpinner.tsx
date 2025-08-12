import { colors } from '@/utils/colors';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const LoadingSpinner = styled.div<LoadingSpinnerProps>`
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top: 2px solid ${({ color, theme }) => color || theme.colors?.primary || 'colors.primaryDark'};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  /* Size variants */
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          width: 16px;
          height: 16px;
        `;
      case 'lg':
        return `
          width: 32px;
          height: 32px;
        `;
      default:
        return `
          width: 24px;
          height: 24px;
        `;
    }
  }}
`;
