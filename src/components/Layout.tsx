// src/components/Layout/Layout.tsx
import React from "react";
import { Box } from "@mui/material";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box component="main">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
