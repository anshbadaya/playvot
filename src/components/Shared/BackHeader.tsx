import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Logo from "../../assets/images/Logo.png";

const BackHeader: React.FC = () => {
  const navigate = useNavigate();

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
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 1, sm: 2 }
      }}>
        <Box 
          onClick={() => navigate(-1)}
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer',
            p: 1,
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          <KeyboardBackspaceIcon 
            sx={{ 
              fontSize: 24,
              color: 'white'
            }}
          />
        </Box>

        <Box 
          component="img"
          src={Logo}
          alt="Zoddz Logo"
          sx={{
            height: { xs: 24, sm: 28, md: 32 },
            width: 'auto',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'brightness(0.95)',
            transition: 'all 0.2s ease',
            '&:hover': {
              filter: 'brightness(1)',
              transform: 'translateX(-50%) scale(1.02)'
            }
          }}
        />

        {/* Empty box for spacing */}
        <Box sx={{ width: 40 }} />
      </Toolbar>
    </AppBar>
  );
};

export default BackHeader;