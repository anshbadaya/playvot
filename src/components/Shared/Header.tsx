import { colors } from '@/utils/colors';
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, MenuItem } from "@mui/material";

interface HeaderProps {
  logoPath?: string;
  logoAlt?: string;
  onLoginClick?: () => void;
}

const HeaderContainer = styled.header`
  background: ${colors.gradients.background};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid ${colors.primaryBorder};
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  min-height: 32px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    min-height: 24px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm};
    min-height: 20px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-left: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
    margin-left: ${({ theme }) => theme.spacing.md};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast};
  filter: brightness(1.1);
  
  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 36px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 32px;
  }
`;



const ActionButton = styled.button`
  background: ${colors.primary};
  color: ${colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: ${colors.primaryHover};
    box-shadow: 0 4px 12px ${colors.shadows.primary};
  }
  
  &:active {
    transform: translateY(1px);
  }
`;



const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${colors.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text.primary};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: none;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px ${colors.shadows.primary};
  }
`;



const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.background.primary};
  z-index: 2000;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform ${({ theme }) => theme.transitions.fast};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const MobileMenuCloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${colors.text.primary};
  cursor: pointer;
  padding: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${colors.background.secondary};
    color: ${colors.primary};
  }
`;

const MobileMenuItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${colors.border.secondary};
  color: ${colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${colors.background.secondary};
    color: ${colors.primary};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const Header: React.FC<HeaderProps> = ({
  logoPath = "/Logo.png",
  logoAlt = "Zoddz Logo",
  onLoginClick,
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  const handleProfileNavigate = () => {
    handleClose();
    navigate("/profile");
  };

  return (
    <HeaderContainer>
      <Toolbar>
        <LeftSection>
          <Logo
            src={logoPath}
            alt={logoAlt}
            onClick={() => navigate("/")}
          />
        </LeftSection>

        <RightSection>
          {!user ? (
            <ActionButton onClick={() => (onLoginClick ? onLoginClick() : navigate('/tournaments'))}>
              <PersonOutlineIcon fontSize="small" />
              Login
            </ActionButton>
          ) : (
            <>
              <UserMenu>
                <UserAvatar onClick={handleProfileClick}>
                  {user.name.charAt(0).toUpperCase()}
                </UserAvatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      background: colors.background.secondary,
                      border: `1px solid ${colors.border.secondary}`,
                      borderRadius: '8px',
                      marginTop: '8px',
                    },
                  }}
                >
                  <MenuItem onClick={handleProfileNavigate}>
                    <AccountCircleIcon fontSize="small" style={{ marginRight: '8px', color: colors.text.primary }} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon fontSize="small" style={{ marginRight: '8px', color: colors.text.primary }} />
                    Logout
                  </MenuItem>
                </Menu>
              </UserMenu>
            </>
          )}
          

        </RightSection>
      </Toolbar>



      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuHeader>
          <Logo src={logoPath} alt={logoAlt} />
          <MobileMenuCloseButton onClick={() => setIsMobileMenuOpen(false)}>
            <CloseIcon />
          </MobileMenuCloseButton>
        </MobileMenuHeader>
        
        <MobileMenuItem onClick={() => { navigate("/"); setIsMobileMenuOpen(false); }}>
          Home
        </MobileMenuItem>
        <MobileMenuItem onClick={() => { navigate("/matches"); setIsMobileMenuOpen(false); }}>
          Matches
        </MobileMenuItem>
        <MobileMenuItem onClick={() => { navigate("/tournaments"); setIsMobileMenuOpen(false); }}>
          Tournaments
        </MobileMenuItem>
        <MobileMenuItem onClick={() => { navigate("/about"); setIsMobileMenuOpen(false); }}>
          About
        </MobileMenuItem>
        
        {!user ? (
          <MobileMenuItem onClick={() => { (onLoginClick ? onLoginClick() : navigate('/tournaments')); setIsMobileMenuOpen(false); }}>
            Login
          </MobileMenuItem>
        ) : (
          <>
            <MobileMenuItem onClick={() => { handleProfileNavigate(); setIsMobileMenuOpen(false); }}>
              Profile
            </MobileMenuItem>
            <MobileMenuItem onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
              Logout
            </MobileMenuItem>
          </>
        )}
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;