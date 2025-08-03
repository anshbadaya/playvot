import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  InputBase,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate,Link } from "react-router-dom";

interface HeaderProps {
  searchPlaceholder?: string;
  logoPath?: string;
  logoAlt?: string;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  showLoginButton?: boolean;
  loginPath?: string;
}

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
  const theme = useTheme();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: `linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)`,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        borderBottom: "1px solid rgba(29, 78, 216, 0.2)",
        backdropFilter: "blur(10px)",
        height: { xs: "64px", sm: "72px" }
      }}
    >
      <Toolbar 
        sx={{ 
          minHeight: { xs: "64px !important", sm: "72px !important" }, 
          gap: { xs: 1.5, sm: 2.5 }, 
          padding: { xs: "0 16px", sm: "0 32px" },
          alignItems: "center"
        }}
      >
        <Box
          component="img"
          src={logoPath}
          alt={logoAlt}
          sx={{
            height: { xs: "28px", sm: "38px" },
            cursor: "pointer",
            transition: "transform 0.2s ease",
            filter: "brightness(1.1)",
            "&:hover": { 
              transform: "scale(1.05)",
              filter: "brightness(1.2)"
            },
          }}
          onClick={() => navigate("/")}
        />
        
        {showSearch && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(15, 23, 42, 0.3)",
              borderRadius: "12px",
              padding: { xs: "6px 12px", sm: "7px 16px" },
              flex: 1,
              maxWidth: { xs: "320px", sm: "540px" },
              margin: { xs: "0 8px", sm: "0 auto" },
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s ease",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(15, 23, 42, 0.4)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)"
              },
              "&:focus-within": {
                backgroundColor: "rgba(15, 23, 42, 0.5)",
                borderColor: "rgba(29, 78, 216, 0.5)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)"
              }
            }}
          >
            <InputBase
              placeholder={searchPlaceholder}
              onChange={handleSearch}
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                flex: 1,
                fontSize: { xs: "13px", sm: "14px" },
                fontWeight: 400,
                "& input::placeholder": {
                  color: "rgba(100, 116, 139, 0.8)",
                  opacity: 1,
                  fontWeight: 400
                },
                "& input:focus": {
                  color: "rgba(255, 255, 255, 1)"
                }
              }}
            />
            <IconButton 
              size="small" 
              sx={{ 
                color: "rgba(255, 255, 255, 0.7)",
                backgroundColor: "rgba(29, 78, 216, 0.1)",
                padding: "4px",
                marginRight: "-4px",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "rgba(255, 255, 255, 0.9)",
                  backgroundColor: "rgba(29, 78, 216, 0.2)",
                  transform: "translateY(-1px)"
                },
                "&:active": {
                  transform: "translateY(0)"
                }
              }}
            >
              <SearchIcon sx={{ fontSize: "18px" }} />
            </IconButton>
          </Box>
        )}
        
        {showLoginButton && (
          <Link to={loginPath}>
            <Button 
              variant="contained"
              sx={{ 
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #3B82F6 100%)`,
                minWidth: 0,
                borderRadius: "12px",
                padding: { xs: "8px", sm: "10px" },
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
                transition: "all 0.3s ease",
                border: "1px solid rgba(255, 255, 255, 0.1)",

                "&:hover": {
                  background: `linear-gradient(135deg, #4B4EF9 0%, #3B82F6 100%)`,
                  boxShadow: "0 6px 16px rgba(59, 130, 246, 0.35)",
                  transform: "translateY(-1px)",
                  borderColor: "rgba(255, 255, 255, 0.2)"
                },
                "&:active": {
                  transform: "translateY(0)",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)"
                }
              }}
            >
              <PersonOutlineIcon sx={{ fontSize: { xs: "20px", sm: "24px" } }} />
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;