import { colors } from '@/utils/colors';
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
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
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if we're on the home page
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/landing';

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    // Navigation will be handled by Link component
  };

  const handleProfileNavigate = () => {
    handleClose();
    // Navigation will be handled by Link component
  };

  return (
    <HeaderContainer>
      <Toolbar>
        <LeftSection>
          {!isHomePage && (
            <Link to="#" onClick={(e) => { e.preventDefault(); window.history.back(); }} style={{ textDecoration: 'none' }}>
              <BackButton>
                <BackIcon />
              </BackButton>
            </Link>
          )}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo
              src={logoPath}
              alt={logoAlt}
            />
          </Link>
        </LeftSection>

        <RightSection>
          {!user ? (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <ActionButton onClick={onLoginClick}>
                <PersonOutlineIcon fontSize="small" />
                Login
              </ActionButton>
            </Link>
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
                  <MenuItem disabled>
                    <AccountCircleIcon fontSize="small" style={{ marginRight: '8px', color: colors.text.disabled }} />
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
        
        {!isHomePage && (
          <Link to="#" onClick={(e) => { e.preventDefault(); window.history.back(); setIsMobileMenuOpen(false); }} style={{ textDecoration: 'none' }}>
            <MobileMenuItem>
              ← Back
            </MobileMenuItem>
          </Link>
        )}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <MobileMenuItem onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </MobileMenuItem>
        </Link>
        <Link to="/matches" style={{ textDecoration: 'none' }}>
          <MobileMenuItem onClick={() => setIsMobileMenuOpen(false)}>
            Matches
          </MobileMenuItem>
        </Link>
        <Link to="/tournaments" style={{ textDecoration: 'none' }}>
          <MobileMenuItem onClick={() => setIsMobileMenuOpen(false)}>
            Tournaments
          </MobileMenuItem>
        </Link>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <MobileMenuItem onClick={() => setIsMobileMenuOpen(false)}>
            About
          </MobileMenuItem>
        </Link>
        
        {!user ? (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <MobileMenuItem onClick={() => { onLoginClick && onLoginClick(); setIsMobileMenuOpen(false); }}>
              Login
            </MobileMenuItem>
          </Link>
        ) : (
          <>
            <MobileMenuItem style={{ opacity: 0.6, pointerEvents: 'none' }}>
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