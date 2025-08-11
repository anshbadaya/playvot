import React from "react";
import { Box } from "@mui/material";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import BackHeader from "@/components/Shared/BackHeader";

type LayoutProps = {
  children: React.ReactNode;
  showBackHeader?: boolean; // ← Add this to toggle between headers
  onLoginClick?: () => void; // ← Add this for login callback
};

const Layout: React.FC<LayoutProps> = ({ children, showBackHeader, onLoginClick }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {showBackHeader ? <BackHeader /> : <Header onLoginClick={onLoginClick} />}
      <Box component="main" flex={1}>
        {children}
      </Box>
      {showBackHeader ? null : <Footer />}
    </Box>
  );
};

export default Layout;
