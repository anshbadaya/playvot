import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook to protect routes that require authentication
 * Automatically redirects to login if user is not authenticated
 */
export const useAuthGuard = (redirectTo: string = '/login') => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return { isAuthenticated };
};

/**
 * Hook to redirect authenticated users away from public pages (like login)
 * Automatically redirects to specified route if user is already authenticated
 */
export const usePublicGuard = (redirectTo: string = '/tournaments') => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return { isAuthenticated };
};
