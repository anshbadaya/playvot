import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const ButtonBase = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  text-decoration: none;
  outline: none;
  font-family: inherit;
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
  
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
          font-size: 0.875rem;
        `;
      case 'lg':
        return css`
          padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
          font-size: 1.125rem;
        `;
      default:
        return css`
          padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
          font-size: 1rem;
        `;
    }
  }}
  
  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: linear-gradient(135deg, ${theme.colors.primary} 0%, #3B82F6 100%);
          color: ${theme.colors.text.primary};
          box-shadow: 0 4px 12px ${theme.colors.primaryLight};
          border: 1px solid rgba(255, 255, 255, 0.1);
          
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #4B4EF9 0%, #3B82F6 100%);
            box-shadow: 0 6px 16px ${theme.colors.primaryLight};
            transform: translateY(-1px);
            border-color: rgba(255, 255, 255, 0.2);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 4px 12px ${theme.colors.primaryLight};
          }
        `;
      case 'secondary':
        return css`
          background: ${theme.colors.background.card};
          color: ${theme.colors.text.secondary};
          border: 1px solid ${theme.colors.border};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryLight};
            border-color: ${theme.colors.primaryBorder};
            color: ${theme.colors.text.primary};
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary};
            color: ${theme.colors.text.primary};
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.text.secondary};
          border: 1px solid transparent;
          
          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.1);
            color: ${theme.colors.text.primary};
          }
        `;
      default:
        return css``;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  return (
    <ButtonBase
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};

export default Button; 