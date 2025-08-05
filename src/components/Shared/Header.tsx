import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, MenuItem, Avatar, IconButton, Badge, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    min-height: 64px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 32px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 6px 12px;
    width: 200px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    display: none;
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 13px;
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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 8px 16px;
    font-size: 13px;
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
`;

const NotificationBadge = styled(Badge)`
  margin-right: 8px;
  
  .MuiBadge-badge {
    background-color: #10B981;
    color: white;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  
  svg {
    color: #3B82F6;
  }
`;

const UserAvatar = styled(Avatar)`
  width: 36px;
  height: 36px;
  border: 2px solid #3B82F6;
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
    navigate('/');
  };

  const handleProfileNavigate = () => {
    handleClose();
    navigate('/profile');
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
          {isAuthenticated ? (
            <>
              <Tooltip title="Notifications">
                <NotificationBadge badgeContent={3} color="primary">
                  <IconButton 
                    sx={{ 
                      color: 'white',
                      backgroundColor: 'rgba(15, 23, 42, 0.4)',
                      '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.2)' }
                    }}
                  >
                    <NotificationsIcon />
                  </IconButton>
                </NotificationBadge>
              </Tooltip>
              
              <ProfileButton
                onClick={handleProfileClick}
                aria-controls={open ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                {user?.avatar ? (
                  <UserAvatar src={user.avatar} alt={user.name} />
                ) : (
                  <AccountCircleIcon sx={{ fontSize: 28, color: 'white' }} />
                )}
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
                    backgroundColor: '#1E293B',
                    color: 'white',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    minWidth: 180
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <StyledMenuItem onClick={handleProfileNavigate}>
                  <AccountCircleIcon fontSize="small" />
                  My Profile
                </StyledMenuItem>
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
    </HeaderContainer>
  );
};

export default Header;