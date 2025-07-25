import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'component'
})(({ theme }) => ({
  background: `linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)`,
  color: "rgba(255, 255, 255, 0.9)",
  padding: theme.spacing(3, 2),
  textAlign: "center",
  marginTop: "auto",
  borderTop: "1px solid rgba(29, 78, 216, 0.2)",
  backdropFilter: "blur(8px)"
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: "0.875rem",
  marginBottom: theme.spacing(1)
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.7)",
  textDecoration: "none",
  transition: "all 0.3s ease",
  padding: theme.spacing(0.5, 1),
  borderRadius: "4px",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: "rgba(29, 78, 216, 0.1)"
  }
}));

const Footer: React.FC = () => {
  return (
    <FooterContainer as="footer">
      <FooterText variant="body2">
        © {new Date().getFullYear()} All rights reserved.
      </FooterText>
      <FooterText variant="caption" sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
        <FooterLink href="/terms">
          Terms of Service
        </FooterLink>
        <Box component="span" sx={{ color: "rgba(255, 255, 255, 0.4)" }}>|</Box>
        <FooterLink href="/privacy">
          Privacy Policy
        </FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
