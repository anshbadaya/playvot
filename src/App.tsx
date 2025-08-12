import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { styledTheme } from "@/config/styledTheme";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/pages/Login";
import Match from "@/pages/Matches";
import MatchDetailPage from "@/pages/MatchDetails";
import AboutPage from "@/pages/About";
import LandingPage from "./pages/Landing";
import TournamentsPage from "@/pages/Tournaments";

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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/tournaments" element={<ProtectedRoute><TournamentsPage /></ProtectedRoute>} />
              <Route path="/match" element={<ProtectedRoute><Match /></ProtectedRoute>} />
              <Route path="/match/:slug" element={<ProtectedRoute><MatchDetailPage /></ProtectedRoute>} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
