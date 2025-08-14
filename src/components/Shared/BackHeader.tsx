import { colors } from '@/utils/colors';
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Logo from "@/assets/images/Logo.png";

const HeaderContainer = styled.header`
  background: ${colors.gradients.background};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid ${colors.primaryBorder};
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${colors.background.secondary};
    opacity: 0.8;
  }
`;

const BackIcon = styled(KeyboardBackspaceIcon)`
  font-size: 24px;
  color: ${colors.text.primary};
`;

const LogoImage = styled.img`
  height: 32px;
  width: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  filter: brightness(0.95);
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    filter: brightness(1);
    transform: translateX(-50%) scale(1.02);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 28px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 24px;
  }
`;

const Spacer = styled.div`
  width: 40px;
`;

const BackHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Toolbar>
        <Link to="#" onClick={(e) => { e.preventDefault(); window.history.back(); }} style={{ textDecoration: 'none' }}>
          <BackButton>
            <BackIcon />
          </BackButton>
        </Link>

        <LogoImage
          src={Logo}
          alt="Zoddz Logo"
        />

        <Spacer />
      </Toolbar>
    </HeaderContainer>
  );
};

export default BackHeader;