// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1D4ED8",
    },
    secondary: {
      main: "#64748b",
    },
    background: {
      default: "#0a0a23",
      paper: "#111827",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});
