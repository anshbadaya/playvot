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
import { useNavigate,Link } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: `linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)`,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        borderBottom: "1px solid rgba(29, 78, 216, 0.2)",
        backdropFilter: "blur(8px)"
      }}
    >
      <Toolbar 
        sx={{ 
          minHeight: { xs: "56px !important", sm: "64px !important" }, 
          gap: { xs: 1, sm: 2 }, 
          padding: { xs: "0 12px", sm: "0 24px" },
          alignItems: "center"
        }}
      >
        <Box
          component="img"
          src="/Sportvot.png"
          alt="Sportvot Logo"
          sx={{
            height: { xs: "20px", sm: "28px" },
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": { transform: "scale(1.05)" },
          }}
          onClick={() => navigate("/")}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            borderRadius: "12px",
            padding: { xs: "6px 10px", sm: "8px 16px" },
            flex: 1,
            maxWidth: { xs: "300px", sm: "500px" },
            margin: { xs: "0 8px", sm: "0 auto" },
            border: "1px solid rgba(100, 116, 139, 0.3)",
            transition: "all 0.3s ease",
            backdropFilter: "blur(8px)",
            "&:hover": {
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              borderColor: "rgba(29, 78, 216, 0.5)"
            }
          }}
        >
          <InputBase
            placeholder="Search for content..."
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              flex: 1,
              fontSize: { xs: "14px", sm: "16px" },
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
              color: "rgba(100, 116, 139, 0.8)",
              transition: "all 0.3s ease",
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: "rgba(29, 78, 216, 0.1)"
              }
            }}
          >
            <SearchIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Link to="/login">
        <Button 
          variant="contained" 
          sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #3B82F6 100%)`,
            textTransform: "none",
            borderRadius: "12px",
            fontSize: { xs: "13px", sm: "15px" },
            fontWeight: 700,
            padding: { xs: "6px 16px", sm: "8px 28px" },
            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: `linear-gradient(135deg, #3B82F6 0%, ${theme.palette.primary.main} 100%)`,
              boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
              transform: "translateY(-2px)"
            },
            "&:active": {
              transform: "translateY(0)"
            }
          }}
        >
          Sign In
        </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;