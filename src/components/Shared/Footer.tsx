import React from "react";
import styled from "styled-components";

interface FooterLinkData {
  text: string;
  href: string;
}

interface FooterProps {
  copyrightText?: string;
  links?: FooterLinkData[];
  companyName?: string;
}

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%);
  color: rgba(255, 255, 255, 0.9);
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  text-align: center;
  margin-top: auto;
  border-top: 1px solid rgba(29, 78, 216, 0.2);
  backdrop-filter: blur(8px);
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(29, 78, 216, 0.1);
  }
`;

const Divider = styled.span`
  color: rgba(255, 255, 255, 0.4);
`;

const Footer: React.FC<FooterProps> = ({ 
  copyrightText = `© ${new Date().getFullYear()} All rights reserved.`,
  links = [
    { text: "Terms of Service", href: "/terms" },
    { text: "Privacy Policy", href: "/privacy" }
  ],
  companyName
}) => {
  return (
    <FooterContainer>
      <FooterText>
        {companyName ? `${copyrightText} ${companyName}` : copyrightText}
      </FooterText>
      <FooterLinks>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <FooterLink href={link.href}>
              {link.text}
            </FooterLink>
            {index < links.length - 1 && <Divider>|</Divider>}
          </React.Fragment>
        ))}
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;
