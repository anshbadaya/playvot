import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { styledTheme } from "@/config/styledTheme";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/Auth/components";
import OddsPage from "@/pages/Odds";
import AboutPage from "@/pages/About";
import LandingPage from "./pages/Landing";
import LoginPage from "@/pages/Login";
import TournamentsPage from "@/pages/Tournaments";
import FixturesPage from "@/pages/Fixtures";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={styledTheme}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/tournaments" element={<ProtectedRoute><TournamentsPage /></ProtectedRoute>} />
              <Route path="/tournaments/:slug" element={<ProtectedRoute><FixturesPage /></ProtectedRoute>} />
              <Route path="/fixture/:slug" element={<ProtectedRoute><OddsPage /></ProtectedRoute>} />
              <Route path="/match/:slug" element={<ProtectedRoute><OddsPage /></ProtectedRoute>} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
