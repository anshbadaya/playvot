import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

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
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="go back" // Added for accessibility
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default BackHeader;