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
  padding: theme.spacing(3, 2),
  textAlign: 'center',
  marginTop: 'auto',
  borderTop: `1px solid ${colors.primaryBorder}`,
  backdropFilter: 'blur(8px)',
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: colors.text.secondary,
  fontSize: '0.8rem',
  fontWeight: 500,
  marginBottom: theme.spacing(1.5),
  margin: 0,
  letterSpacing: '0.5px',
}));

const FooterLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: theme.spacing(1),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: colors.text.secondary,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  padding: theme.spacing(0.75, 1.5),
  borderRadius: theme.spacing(1),
  fontWeight: 500,
  fontSize: '0.85rem',
  
  '&:hover': {
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    textDecoration: 'none',
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
  },
}));

const ContactSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  paddingTop: theme.spacing(1),
  borderTop: `1px solid ${colors.border.secondary}`,
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '40px',
    height: '2px',
    background: colors.primary,
    borderRadius: '1px',
  }
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  color: colors.text.secondary,
  marginBottom: theme.spacing(0.75),
  justifyContent: 'center',
  fontSize: '0.85rem',
  fontWeight: 400,
  
  '& svg': {
    color: colors.primary,
    fontSize: '1.1rem',
    filter: 'drop-shadow(0 1px 2px rgba(59, 130, 246, 0.3))',
  },
}));

const MapContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  border: `1px solid ${colors.border.secondary}`,
  maxWidth: '280px',
  margin: '0 auto',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
  }
}));

const Footer: React.FC<FooterProps> = ({}) => {
  const handleLinkClick = () => {
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'center' },
          justifyContent: 'center',
          gap: 4,
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Left side - Information */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 0.5
          }}>
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
          </Box>
          
          {/* Right side - Map */}
          <MapContainer sx={{ 
            width: { xs: '100%', md: '280px' },
            margin: { xs: '0 auto', md: 0 }
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.5!2d56.3328!3d25.1289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef4c8c8c8c8c8c8%3A0x8c8c8c8c8c8c8c8c!2sFujairah%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1234567890"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zoddz Location - Creative Tower, Fujairah"
            />
          </MapContainer>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
