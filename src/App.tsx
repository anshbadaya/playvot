import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { styledTheme } from "@/config/styledTheme";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/pages/Login";
import FixturesPage from "@/pages/Fixtures";
import AboutPage from "@/pages/About";
import LandingPage from "./pages/Landing";
import TournamentsPage from "@/pages/Tournaments";
import MatchesPage from "@/pages/Matches";

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
              <Route path="/tournaments/:slug" element={<ProtectedRoute><MatchesPage /></ProtectedRoute>} />
              <Route path="/match/:slug" element={<ProtectedRoute><FixturesPage /></ProtectedRoute>} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
