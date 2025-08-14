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
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('playvot_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Validate user data structure
          if (parsedUser && 
              typeof parsedUser.id === 'string' &&
              typeof parsedUser.username === 'string' &&
              typeof parsedUser.name === 'string' &&
              typeof parsedUser.email === 'string' &&
              ['user', 'admin'].includes(parsedUser.role)) {
            setUser(parsedUser);
          } else {
            // Invalid user data, clear it
            localStorage.removeItem('playvot_user');
          }
        }
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('playvot_user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Basic input validation
      if (!username?.trim() || !password?.trim()) {
        return { success: false, error: 'Username and password are required' };
      }

      // Validate credentials using dummy data
      const validation = validateCredentials(username.trim(), password);
      
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }
      
      if (!validation.user) {
        return { success: false, error: 'Invalid credentials' };
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
      localStorage.setItem('playvot_user', JSON.stringify(authUser));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('playvot_user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;