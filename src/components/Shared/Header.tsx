import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

interface HeaderProps {
  searchPlaceholder?: string;
  logoPath?: string;
  logoAlt?: string;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  showLoginButton?: boolean;
  loginPath?: string;
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
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  min-height: 72px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    min-height: 64px;
  }
`;

const Logo = styled.img`
  height: 38px;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast};
  filter: brightness(1.1);
  
  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 28px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(15, 23, 42, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 7px 16px;
  flex: 1;
  max-width: 540px;
  margin: 0 auto;
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
    max-width: 320px;
    margin: 0 8px;
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
  padding: 10px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primaryLight};
  transition: all ${({ theme }) => theme.transitions.normal};
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  
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
    padding: 8px;
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
    <HeaderContainer>
      <Toolbar>
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
        
        {showLoginButton && (
          <LoginButton to={loginPath}>
            <PersonOutlineIcon sx={{ fontSize: { xs: "20px", sm: "24px" } }} />
          </LoginButton>
        )}
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;