import React from "react";
import { Box } from "@mui/material";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";

type LayoutProps = {
  children: React.ReactNode;
  onLoginClick?: () => void; // ← Add this for login callback
};

const Layout: React.FC<LayoutProps> = ({ children, onLoginClick }) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      minHeight="100vh"
      sx={{
        backgroundColor: '#0A0A23',
        background: 'linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)',
        position: 'relative'
      }}
    >
      <Header onLoginClick={onLoginClick} />
      <Box 
        component="main" 
        flex={1}
        sx={{
          backgroundColor: 'transparent',
          position: 'relative',
          zIndex: 1
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
