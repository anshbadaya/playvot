import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius?.md || '8px'};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions?.normal || '0.3s ease'};
  text-decoration: none;
  
  /* Size variants */
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: 8px 16px;
          font-size: 0.875rem;
        `;
      case 'lg':
        return `
          padding: 16px 32px;
          font-size: 1.125rem;
        `;
      default:
        return `
          padding: 12px 24px;
          font-size: 1rem;
        `;
    }
  }}
  
  /* Width */
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  
  /* Variants */
  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors?.primary || '#1D4ED8'};
          color: #FFFFFF;
          &:hover:not(:disabled) {
            background-color: ${theme.colors?.primaryHover || '#1E40AF'};
          }
        `;
      case 'secondary':
        return `
          background-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.9);
          &:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.2);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors?.primary || '#1D4ED8'};
          border: 2px solid ${theme.colors?.primary || '#1D4ED8'};
          &:hover:not(:disabled) {
            background-color: ${theme.colors?.primary || '#1D4ED8'};
            color: #FFFFFF;
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: rgba(255, 255, 255, 0.8);
          &:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.1);
            color: #FFFFFF;
          }
        `;
      default:
        return '';
    }
  }}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Focus state */
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors?.primary || '#1D4ED8'};
    outline-offset: 2px;
  }
`;
