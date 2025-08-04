import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { styledTheme } from "@/config/styledTheme";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Login from "@/pages/Login";
import Match from "@/pages/Matches";
import MatchDetailPage from "@/pages/MatchDetails";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={styledTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<Match />} />
            <Route path="/login" element={<Login />} />
            <Route path="/match/:slug" element={<MatchDetailPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
