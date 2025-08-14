import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, validateCredentials } from '@/data/authData';

// User interface without sensitive data
interface AuthUser {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate credentials using dummy data
      const validation = validateCredentials(username, password);
      
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }
      
      if (!validation.user) {
        return { success: false, error: 'User not found' };
      }
      
      // Create auth user object without sensitive data
      const authUser: AuthUser = {
        id: validation.user.id,
        username: validation.user.username,
        name: validation.user.name,
        email: validation.user.email,
        avatar: validation.user.avatar,
        role: validation.user.role
      };
      
      setUser(authUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(authUser));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;