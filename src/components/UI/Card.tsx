import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  onClick?: () => void;
  className?: string;
}

const CardContainer = styled.div<CardProps>`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(12px);
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  ${({ padding = 'md' }) => {
    switch (padding) {
      case 'sm':
        return css`padding: ${({ theme }) => theme.spacing.sm};`;
      case 'lg':
        return css`padding: ${({ theme }) => theme.spacing.lg};`;
      case 'xl':
        return css`padding: ${({ theme }) => theme.spacing.xl};`;
      default:
        return css`padding: ${({ theme }) => theme.spacing.md};`;
    }
  }}
  
  ${({ hover, onClick }) => hover || onClick ? css`
    cursor: ${onClick ? 'pointer' : 'default'};
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.lg};
      border-color: ${({ theme }) => theme.colors.primaryBorder};
      transform: translateY(-2px);
    }
  ` : ''}
`;

const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  hover = false,
  onClick,
  className,
  ...props
}) => {
  return (
    <CardContainer
      padding={padding}
      hover={hover}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </CardContainer>
  );
};

export default Card; 