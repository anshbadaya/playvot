import React from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { EmailOutlined } from "@mui/icons-material";
import { styled, keyframes } from "@mui/material/styles";
import SportVotImage from '@/assets/images/Sportvot.png';
import { LOGIN_TITLE } from "@/config/config";

// Floating animation for background elements
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(5deg); }
  66% { transform: translateY(10px) rotate(-3deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const slideUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
`;

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  background: `
    radial-gradient(circle at 20% 20%, rgba(29, 78, 216, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a23 0%, #111827 50%, #0f172a 100%)
  `,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: `
      radial-gradient(circle, rgba(29, 78, 216, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    animation: `${float} 20s ease-in-out infinite`,
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "10%",
    right: "10%",
    width: "300px",
    height: "300px",
    background: "radial-gradient(circle, rgba(29, 78, 216, 0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: `${pulse} 4s ease-in-out infinite`,
    pointerEvents: "none",
  },
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "6px",
  height: "6px",
  background: "rgba(29, 78, 216, 0.4)",
  borderRadius: "50%",
  animation: `${float} 15s ease-in-out infinite`,
  "&:nth-of-type(1)": {
    top: "20%",
    left: "15%",
    animationDelay: "0s",
  },
  "&:nth-of-type(2)": {
    top: "60%",
    right: "20%",
    animationDelay: "5s",
    background: "rgba(139, 92, 246, 0.4)",
  },
  "&:nth-of-type(3)": {
    bottom: "30%",
    left: "25%",
    animationDelay: "10s",
    background: "rgba(16, 185, 129, 0.4)",
  },
}));

const SkipButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: 24,
  right: 32,
  color: "rgba(255, 255, 255, 0.8)",
  fontWeight: 700,
  letterSpacing: 1.5,
  fontSize: 14,
  padding: "8px 16px",
  borderRadius: "20px",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "rgba(255, 255, 255, 1)",
    background: "rgba(29, 78, 216, 0.1)",
    transform: "translateY(-2px)",
  },
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  background: "transparent",
  padding: theme.spacing(6, 4),
  minWidth: 380,
  width: "90%",
  maxWidth: 380,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "none",
  animation: `${slideUp} 0.8s ease-out`,
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    minWidth: "unset",
    padding: theme.spacing(4, 2),
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  marginBottom: 24,
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-10px",
    left: "-10px",
    right: "-10px",
    bottom: "-10px",
    background: "radial-gradient(circle, rgba(29, 78, 216, 0.2) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: `${pulse} 3s ease-in-out infinite`,
    zIndex: -1,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    background: "rgba(15, 23, 42, 0.5)",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(15, 23, 42, 0.7)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(29, 78, 216, 0.5)",
      },
    },
    "&.Mui-focused": {
      background: "rgba(15, 23, 42, 0.8)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(100, 116, 139, 0.3)",
      transition: "all 0.3s ease",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(100, 116, 139, 0.8)",
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiInputBase-input": {
    color: "rgba(255, 255, 255, 0.9)",
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #3B82F6 100%)`,
  borderRadius: "12px",
  padding: theme.spacing(1.5),
  fontWeight: 700,
  fontSize: "14px",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  boxShadow: `
    0 4px 15px rgba(29, 78, 216, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2)
  `,
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(135deg, #2563EB 0%, ${theme.palette.primary.main} 100%)`,
    transform: "translateY(-2px)",
    boxShadow: `
      0 8px 25px rgba(29, 78, 216, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
  },
  "&:active": {
    transform: "translateY(0px)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    padding: theme.spacing(1.25),
  }
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: "rgba(15, 23, 42, 0.5)",
  border: "1px solid rgba(100, 116, 139, 0.3)",
  borderRadius: "12px",
  padding: theme.spacing(1.5),
  color: "rgba(255, 255, 255, 0.9)",
  textTransform: "none",
  fontWeight: 600,
  justifyContent: "center",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(29, 78, 216, 0.15)",
    borderColor: "rgba(29, 78, 216, 0.5)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(29, 78, 216, 0.2)",
  },
  "&:active": {
    transform: "translateY(0px)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    padding: theme.spacing(1.25),
  }
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(3, 0),
  "&::before, &::after": {
    borderColor: "rgba(100, 116, 139, 0.3)",
  },
  "& .MuiDivider-wrapper": {
    color: "rgba(100, 116, 139, 0.8)",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "1px",
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 24,
  height: 24,
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(1),
  transition: "all 0.3s ease",
}));

const Login = () => {
  return (
    <Background>
      <FloatingElement />
      <FloatingElement />
      <FloatingElement />
      
      <LoginPaper elevation={0}>
        <LogoContainer>
          <img 
            src={SportVotImage} 
            alt="SportVot Logo" 
            style={{ 
              width: 128, 
              height: "auto",
              filter: "drop-shadow(0 4px 8px rgba(29, 78, 216, 0.3))"
            }} 
          />
        </LogoContainer>
        
        <Typography 
          variant="h5" 
          fontWeight={700} 
          gutterBottom 
          align="center"
          sx={{ 
            color: "rgba(255, 255, 255, 0.95)",
            mb: 3,
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {LOGIN_TITLE}
        </Typography>
        
        <StyledTextField
          label="Mobile"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        
        <PrimaryButton
          variant="contained"
          fullWidth
          sx={{ mt: 2, mb: 1 }}
        >
          GET OTP
        </PrimaryButton>
        
        <StyledDivider>OR</StyledDivider>
        
        <Stack spacing={2} width="100%">
          <SecondaryButton
            variant="outlined"
            fullWidth
            startIcon={
              <IconContainer>
                <EmailOutlined sx={{ color: '#fff', fontSize: 16 }} />
              </IconContainer>
            }
          >
            Login With Email
          </SecondaryButton>
          
          <SecondaryButton
            variant="outlined"
            fullWidth
            startIcon={
              <IconContainer>
                <GoogleIcon sx={{ color: '#fff', fontSize: 16 }} />
              </IconContainer>
            }
          >
            Login With Google
          </SecondaryButton>
        </Stack>
      </LoginPaper>
      
      <SkipButton variant="text">SKIP</SkipButton>
    </Background>
  );
};

export default Login;