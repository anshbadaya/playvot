import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Logo from "@/assets/images/Logo.png";

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(29, 78, 216, 0.2);
  backdrop-filter: blur(8px);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.breakpoints.up('sm') ? theme.spacing(0, 2) : theme.spacing(0, 1)};
`;

const BackButton = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(1)};
  &:hover {
    opacity: 0.8;
  }
`;

const BackIcon = styled(KeyboardBackspaceIcon)`
  font-size: 24px;
  color: white;
`;

const LogoImage = styled('img')`
  height: ${({ theme }) => theme.breakpoints.up('md') ? '32px' : theme.breakpoints.up('sm') ? '28px' : '24px'};
  width: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  filter: brightness(0.95);
  transition: all 0.2s ease;
  &:hover {
    filter: brightness(1);
    transform: translateX(-50%) scale(1.02);
  }
`;

const SpacerBox = styled(Box)`
  width: 40px;
`;

const BackHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
        </BackButton>

        <LogoImage
          src={Logo}
          alt="Zoddz Logo"
        />

        <SpacerBox />
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default BackHeader;