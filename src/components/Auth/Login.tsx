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
import { styled } from "@mui/material/styles";
import SportVotImage from '@/assets/images/Sportvot.png';

const Background = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  background: "radial-gradient(circle at center, #111827 0%, #0a0a23 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}));

const SkipButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: 24,
  right: 32,
  color: theme.palette.common.white,
  fontWeight: 700,
  letterSpacing: 1,
  fontSize: 14,
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(6, 4),
  minWidth: 360,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Login = () => {
  return (
    <Background>
      <LoginPaper elevation={8}>
        <img src={SportVotImage} alt="SportVot Logo" style={{ width: 128, marginBottom: 16 }} />
        <Typography variant="h6" fontWeight={700} gutterBottom align="center">
          Login To SportVot
        </Typography>
        <TextField
          label="Mobile"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#64748b' } }}
          sx={{ input: { color: 'white' } }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 1, mb: 2, fontWeight: 700 }}
        >
          GET OTP
        </Button>
        <Divider sx={{ width: '100%', my: 2 }}>OR</Divider>
        <Stack spacing={1} width="100%">
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: 'white',
              borderColor: '#64748b',
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontWeight: 600,
            }}
            startIcon={<Box sx={{ width: 24, height: 24, bgcolor: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" fontWeight={700} color="#fff">@</Typography>
            </Box>}
          >
            Login With Email
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: 'white',
              borderColor: '#64748b',
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontWeight: 600,
            }}
            startIcon={<GoogleIcon sx={{ color: '#fff' }} />}
          >
            Login With Google
          </Button>
        </Stack>
      </LoginPaper>
      <SkipButton variant="text">SKIP</SkipButton>
    </Background>
  );
};

export default Login;