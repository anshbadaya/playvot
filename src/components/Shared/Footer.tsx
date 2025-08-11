import React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

interface FooterLinkData {
  text: string;
  href: string;
}

interface FooterProps {
  copyrightText?: string;
  links?: FooterLinkData[];
  companyName?: string;
}

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)',
  color: 'rgba(255, 255, 255, 0.9)',
  padding: theme.spacing(4, 2),
  textAlign: 'center',
  marginTop: 'auto',
  borderTop: '1px solid rgba(29, 78, 216, 0.2)',
  backdropFilter: 'blur(8px)',
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '0.875rem',
  marginBottom: theme.spacing(2),
  margin: 0,
}));

const FooterLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: theme.spacing(3),
}));

const FooterLink = styled(RouterLink)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(0.5),
  
  '&:hover': {
    color: '#4461F2',
    backgroundColor: 'rgba(29, 78, 216, 0.1)',
    textDecoration: 'none',
  },
}));

const ContactSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingTop: theme.spacing(3),
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.8)',
  marginBottom: theme.spacing(1),
  justifyContent: 'center',
  
  '& svg': {
    color: '#4461F2',
    fontSize: '1.2rem',
  },
}));

const MapContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  maxWidth: '400px',
  margin: '0 auto',
}));

const Footer: React.FC<FooterProps> = ({ 
  copyrightText = `© ${new Date().getFullYear()} All rights reserved.`,
  links = [
    { text: "About Us", href: "/about" },
  ],
  companyName = "Zoddz"
}) => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <FooterText>
          {companyName ? `${copyrightText} ${companyName}` : copyrightText}
        </FooterText>
        <FooterLinks>
          {links.map((link, index) => (
            <FooterLink key={index} to={link.href}>
              {link.text}
            </FooterLink>
          ))}
        </FooterLinks>
        
        <ContactSection>
          <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
            Contact Us
          </Typography>
          
          <ContactItem>
            <LocationOnIcon />
            <Typography variant="body2">
              2002, Creative Tower, Fujairah - UAE
            </Typography>
          </ContactItem>
          
          <ContactItem>
            <PhoneIcon />
            <Typography variant="body2">
              WhatsApp: Coming Soon
            </Typography>
          </ContactItem>
          
          <MapContainer>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.1234567890123!2d56.3322!3d25.1289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA3JzQ0LjAiTiA1NsKwMTknNTYuMCJF!5e0!3m2!1sen!2sae!4v1234567890123"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zoddz Office Location - Creative Tower, Fujairah"
            />
          </MapContainer>
        </ContactSection>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
