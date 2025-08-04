import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  InputBase,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate, Link } from "react-router-dom";
import { themeColors } from '@/config/theme';

interface HeaderProps {
  searchPlaceholder?: string;
  logoPath?: string;
  logoAlt?: string;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  showLoginButton?: boolean;
  loginPath?: string;
}

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(29, 78, 216, 0.2);
  backdrop-filter: blur(10px);
  height: ${({ theme }) => theme.breakpoints.up('sm') ? '72px' : '64px'};
`;

const StyledToolbar = styled(Toolbar)`
  min-height: ${({ theme }) => theme.breakpoints.up('sm') ? '72px !important' : '64px !important'};
  gap: ${({ theme }) => theme.breakpoints.up('sm') ? theme.spacing(2.5) : theme.spacing(1.5)};
  padding: ${({ theme }) => theme.breakpoints.up('sm') ? '0 32px' : '0 16px'};
  align-items: center;
`;

const LogoImage = styled('img')`
  height: ${({ theme }) => theme.breakpoints.up('sm') ? '38px' : '28px'};
  cursor: pointer;
  transition: transform 0.2s ease;
  filter: brightness(1.1);
  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
`;

const SearchContainer = styled(Box)`
  display: flex;
  align-items: center;
  background-color: rgba(15, 23, 42, 0.3);
  border-radius: 12px;
  padding: ${({ theme }) => theme.breakpoints.up('sm') ? '7px 16px' : '6px 12px'};
  flex: 1;
  max-width: ${({ theme }) => theme.breakpoints.up('sm') ? '540px' : '320px'};
  margin: ${({ theme }) => theme.breakpoints.up('sm') ? '0 auto' : '0 8px'};
  border: 1px solid ${themeColors.border};
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(15, 23, 42, 0.4);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  &:focus-within {
    background-color: rgba(15, 23, 42, 0.5);
    border-color: ${themeColors.primaryBorder};
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const StyledInputBase = styled(InputBase)`
  color: ${themeColors.text.primary};
  flex: 1;
  font-size: ${({ theme }) => theme.breakpoints.up('sm') ? '14px' : '13px'};
  font-weight: 400;
  & input::placeholder {
    color: ${themeColors.text.disabled};
    opacity: 1;
    font-weight: 400;
  }
  & input:focus {
    color: ${themeColors.text.primary};
  }
`;

const SearchButton = styled(IconButton)`
  color: ${themeColors.text.secondary};
  background-color: ${themeColors.primaryLight};
  padding: 4px;
  margin-right: -4px;
  transition: all 0.3s ease;
  &:hover {
    color: ${themeColors.text.primary};
    background-color: ${themeColors.primaryBorder};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const LoginButton = styled(Button)`
  background: linear-gradient(135deg, ${themeColors.primary} 0%, #3B82F6 100%);
  min-width: 0;
  border-radius: 12px;
  padding: ${({ theme }) => theme.breakpoints.up('sm') ? '10px' : '8px'};
  box-shadow: 0 4px 12px ${themeColors.primaryLight};
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  &:hover {
    background: linear-gradient(135deg, #4B4EF9 0%, #3B82F6 100%);
    box-shadow: 0 6px 16px ${themeColors.primaryLight};
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.2);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px ${themeColors.primaryLight};
  }
`;

const Header: React.FC<HeaderProps> = ({
  searchPlaceholder = "Search for content...",
  logoPath = "/Logo.png",
  logoAlt = "Zoddz Logo",
  onSearch,
  showSearch = true,
  showLoginButton = true,
  loginPath = "/login"
}) => {
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <LogoImage
          src={logoPath}
          alt={logoAlt}
          onClick={() => navigate("/")}
        />
        
        {showSearch && (
          <SearchContainer>
            <StyledInputBase
              placeholder={searchPlaceholder}
              onChange={handleSearch}
            />
            <SearchButton size="small">
              <SearchIcon sx={{ fontSize: "18px" }} />
            </SearchButton>
          </SearchContainer>
        )}
        
        {showLoginButton && (
          <Link to={loginPath}>
            <LoginButton variant="contained">
              <PersonOutlineIcon sx={{ fontSize: { xs: "20px", sm: "24px" } }} />
            </LoginButton>
          </Link>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;