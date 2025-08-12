import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { styledTheme } from "@/config/styledTheme";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import Fixtures from "@/pages/Fixtures";
import AboutPage from "@/pages/About";
import LandingPage from "./pages/Landing";
import TournamentsPage from "@/pages/Tournaments";
import Matches from "@/pages/Matches";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={styledTheme}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/tournaments/" element={<TournamentsPage />} />
              <Route path="/tournaments/:slug" element={<Matches />} />
              <Route path="/match/:slug" element={<Fixtures />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
