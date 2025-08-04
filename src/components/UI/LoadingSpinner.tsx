import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div<LoadingSpinnerProps>`
  display: inline-block;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top: 2px solid ${({ color, theme }) => color || theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return 'width: 16px; height: 16px;';
      case 'lg':
        return 'width: 32px; height: 32px;';
      default:
        return 'width: 24px; height: 24px;';
    }
  }}
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color,
  className,
  ...props
}) => {
  return (
    <SpinnerContainer
      size={size}
      color={color}
      className={className}
      {...props}
    />
  );
};

export default LoadingSpinner; 