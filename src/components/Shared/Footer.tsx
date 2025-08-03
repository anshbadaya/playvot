import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

interface FooterLinkData {
  text: string;
  href: string;
}

interface FooterProps {
  copyrightText?: string;
  links?: FooterLinkData[];
  companyName?: string;
}

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

const Footer: React.FC<FooterProps> = ({ 
  copyrightText = `© ${new Date().getFullYear()} All rights reserved.`,
  links = [
    { text: "Terms of Service", href: "/terms" },
    { text: "Privacy Policy", href: "/privacy" }
  ],
  companyName
}) => {
  return (
    <FooterContainer as="footer">
      <FooterText variant="body2">
        {companyName ? `${copyrightText} ${companyName}` : copyrightText}
      </FooterText>
      <FooterText variant="caption" sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <FooterLink href={link.href}>
              {link.text}
            </FooterLink>
            {index < links.length - 1 && (
              <Box component="span" sx={{ color: "rgba(255, 255, 255, 0.4)" }}>|</Box>
            )}
          </React.Fragment>
        ))}
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
