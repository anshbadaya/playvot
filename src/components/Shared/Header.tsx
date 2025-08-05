import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, MenuItem, Avatar, IconButton, Drawer } from "@mui/material";

interface HeaderProps {
  searchPlaceholder?: string;
  logoPath?: string;
  logoAlt?: string;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(29, 78, 216, 0.2);
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
  min-height: 72px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    min-height: 64px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm};
    min-height: 56px;
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

const SearchContainer = styled.div`
  display: none;
  align-items: center;
  background-color: rgba(15, 23, 42, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 8px 16px;
  width: 400px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.normal};
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: rgba(15, 23, 42, 0.4);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  
  &:focus-within {
    background-color: rgba(15, 23, 42, 0.5);
    border-color: ${({ theme }) => theme.colors.primaryBorder};
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 300px;
    padding: 6px 12px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 200px;
    padding: 6px 10px;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const MobileSearchButton = styled(IconButton)`
  display: none;
  color: white;
  background-color: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background-color: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
  }
  
  @media (max-width: 480px) {
    display: flex;
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  outline: none;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
    opacity: 1;
    font-weight: 400;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 13px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 12px;
  }
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primaryLight};
  border: none;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 4px;
  margin-right: -4px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.primaryBorder};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const LoginButton = styled(Link)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #3B82F6 100%);
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 10px 20px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primaryLight};
  transition: all ${({ theme }) => theme.transitions.normal};
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: linear-gradient(135deg, #4B4EF9 0%, #3B82F6 100%);
    box-shadow: 0 6px 16px ${({ theme }) => theme.colors.primaryLight};
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.2);
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primaryLight};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 6px 12px;
    font-size: 12px;
    gap: 6px;
  }
`;

const ProfileButton = styled(IconButton)`
  padding: 8px;
  border: 2px solid rgba(59, 130, 246, 0.5);
  background-color: rgba(15, 23, 42, 0.4);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.8);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 6px;
  }
`;



const MobileMenuButton = styled(IconButton)`
  display: none;
  color: white;
  background-color: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background-color: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
    color: white;
  }
  
  svg {
    color: #3B82F6;
    font-size: 18px;
  }
`;

const UserAvatar = styled(Avatar)`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  border: 2px solid rgba(59, 130, 246, 0.3);
  color: white;
  font-weight: 600;
  font-size: 14px;
  
  &:hover {
    border-color: rgba(59, 130, 246, 0.6);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }
`;

const MobileDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    border-right: 1px solid rgba(59, 130, 246, 0.2);
    width: 280px;
    padding: 20px;
    backdropFilter: blur(12px);
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
`;

const MobileMenuTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const MobileMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s ease;
  margin-bottom: 8px;
  border: 1px solid transparent;
  
  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.2);
    color: white;
    transform: translateX(4px);
  }
  
  svg {
    color: #3B82F6;
    font-size: 20px;
    transition: all 0.2s ease;
  }
  
  &:hover svg {
    color: #60A5FA;
  }
`;

const MobileSearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(15, 23, 42, 0.4);
  border-radius: 12px;
  padding: 14px 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  margin-bottom: 20px;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
  
  &:focus-within {
    background-color: rgba(15, 23, 42, 0.6);
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const MobileSearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  flex: 1;
  font-size: 14px;
  outline: none;
  font-weight: 500;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 400;
  }
`;

const Header: React.FC<HeaderProps> = ({
  searchPlaceholder = "Search for matches...",
  logoPath = "/Logo.png",
  logoAlt = "Playvot Logo",
  onSearch,
  showSearch = true,
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleProfileNavigate = () => {
    handleClose();
    setMobileMenuOpen(false);
    navigate('/profile');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
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
          
          {showSearch && (
            <SearchContainer>
              <SearchInput
                placeholder={searchPlaceholder}
                onChange={handleSearch}
              />
              <SearchButton>
                <SearchIcon sx={{ fontSize: "18px" }} />
              </SearchButton>
            </SearchContainer>
          )}
        </LeftSection>
        
        <RightSection>
          <MobileSearchButton onClick={toggleMobileSearch}>
            <SearchIcon />
          </MobileSearchButton>
          
          {isAuthenticated ? (
            <>
              <ProfileButton
                onClick={handleProfileClick}
                aria-controls={open ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <UserAvatar>
                  {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                </UserAvatar>
              </ProfileButton>
              
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'profile-button',
                }}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    color: 'white',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(12px)',
                    minWidth: 180,
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <StyledMenuItem onClick={handleLogout}>
                  <LogoutIcon fontSize="small" />
                  Logout
                </StyledMenuItem>
              </Menu>
            </>
          ) : (
            <LoginButton to="/login">
              <PersonOutlineIcon sx={{ fontSize: { xs: "18px", sm: "20px" } }} />
              Login
            </LoginButton>
          )}
        </RightSection>
      </Toolbar>
      
      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1001,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '100px'
        }}>
          <div style={{
            width: '90%',
            maxWidth: '400px',
            backgroundColor: '#1E293B',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{ color: 'white', margin: 0 }}>Search</h3>
              <IconButton onClick={toggleMobileSearch} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(15, 23, 42, 0.3)',
              borderRadius: '8px',
              padding: '12px 16px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <input
                type="text"
                placeholder={searchPlaceholder}
                onChange={handleSearch}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  flex: 1,
                  fontSize: '16px',
                  outline: 'none'
                }}
                autoFocus
              />
              <SearchButton>
                <SearchIcon sx={{ fontSize: "20px" }} />
              </SearchButton>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu Drawer */}
      <MobileDrawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
      >
        <MobileMenuHeader>
          <MobileMenuTitle>Menu</MobileMenuTitle>
          <IconButton onClick={toggleMobileMenu} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </MobileMenuHeader>
        
        <MobileSearchContainer>
          <MobileSearchInput
            placeholder={searchPlaceholder}
            onChange={handleSearch}
          />
          <SearchButton>
            <SearchIcon sx={{ fontSize: "18px" }} />
          </SearchButton>
        </MobileSearchContainer>
        
        {isAuthenticated ? (
          <>
            <MobileMenuItem onClick={handleLogout}>
              <LogoutIcon />
              Logout
            </MobileMenuItem>
          </>
        ) : (
          <MobileMenuItem onClick={() => {
            toggleMobileMenu();
            navigate('/login');
          }}>
            <PersonOutlineIcon />
            Login
          </MobileMenuItem>
        )}
      </MobileDrawer>
    </HeaderContainer>
  );
};

export default Header;