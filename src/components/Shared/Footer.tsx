import { colors } from '@/utils/colors';
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
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
  background: colors.gradients.background,
  color: colors.text.primary,
  padding: theme.spacing(4, 2),
  textAlign: 'center',
  marginTop: 'auto',
  borderTop: `1px solid ${colors.primaryBorder}`,
  backdropFilter: 'blur(8px)',
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: colors.text.secondary,
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

const FooterLink = styled(Link)(({ theme }) => ({
  color: colors.text.secondary,
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(0.5),
  
  '&:hover': {
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    textDecoration: 'none',
  },
}));

const ContactSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingTop: theme.spacing(3),
  borderTop: `1px solid ${colors.border.secondary}`,
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: colors.text.secondary,
  marginBottom: theme.spacing(1),
  justifyContent: 'center',
  
  '& svg': {
    color: colors.primary,
    fontSize: '1.2rem',
  },
}));

const MapContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  border: `1px solid ${colors.border.secondary}`,
  maxWidth: '400px',
  margin: '0 auto',
}));

const Footer: React.FC<FooterProps> = ({}) => {
  const handleLinkClick = () => {
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <FooterText>
          {`© ${new Date().getFullYear()} Zoddz. All rights reserved.`}
        </FooterText>
        
        <FooterLinks>
          <FooterLink to="/about" onClick={handleLinkClick}>
            About Us
          </FooterLink>
        </FooterLinks>
        
        <ContactSection>
          <ContactItem>
            <LocationOnIcon />
            <Typography variant="body2">
              2002, Creative Tower, Fujairah - UAE
            </Typography>
          </ContactItem>
          
          <ContactItem>
            <PhoneIcon />
            <Typography variant="body2">
              +971 50 328 9400
            </Typography>
          </ContactItem>
        </ContactSection>
        
        <MapContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.5!2d56.3328!3d25.1289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef4c8c8c8c8c8c8%3A0x8c8c8c8c8c8c8c8c!2sFujairah%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1234567890"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Zoddz Location - Creative Tower, Fujairah"
          />
        </MapContainer>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
