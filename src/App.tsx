import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { styledTheme } from "@/config/styledTheme";
import { ErrorBoundary } from "@/components/ErrorBoundary";
<<<<<<< Updated upstream
import { AuthProvider } from "@/contexts/AuthContext";
import Fixtures from "@/pages/Fixtures";
=======
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/pages/Login";
import Match from "@/pages/Matches";
import MatchDetailPage from "@/pages/MatchDetails";
>>>>>>> Stashed changes
import AboutPage from "@/pages/About";
import LandingPage from "./pages/Landing";
import TournamentsPage from "@/pages/Tournaments";
import Matches from "@/pages/Matches";

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={styledTheme}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
<<<<<<< Updated upstream
              <Route path="/tournaments/" element={<TournamentsPage />} />
              <Route path="/tournaments/:slug" element={<Matches />} />
              <Route path="/match/:slug" element={<Fixtures />} />
=======
              <Route path="/login" element={<LoginPage />} />
              <Route path="/tournaments" element={<ProtectedRoute><TournamentsPage /></ProtectedRoute>} />
              <Route path="/matches" element={<ProtectedRoute><AllMatchesPage /></ProtectedRoute>} />
              <Route path="/match" element={<ProtectedRoute><Match /></ProtectedRoute>} />
              <Route path="/match/:slug" element={<ProtectedRoute><MatchDetailPage /></ProtectedRoute>} />
>>>>>>> Stashed changes
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
