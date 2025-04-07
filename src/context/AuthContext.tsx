
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Role = 'student' | 'teacher' | 'committee' | null;

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  profileImage?: string;
  rollNumber?: string;
  branch?: string;
  year?: string;
} | null;

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  role: Role;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, role: Role) => Promise<void>;
  signup: (name: string, email: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUserProfile: (profileData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('Failed to parse user data from localStorage', err);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: Role) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call to authenticate the user
      // For now, we'll simulate a successful login with mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on role
      const userData = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        name: email.split('@')[0], // Just use the part before @ as a mock name
        email,
        role: role,
        profileImage: '/placeholder.svg',
        rollNumber: role === 'student' ? `CSI${Math.floor(Math.random() * 10000)}` : undefined,
        branch: role === 'student' ? 'Computer Science' : undefined,
        year: role === 'student' ? '2nd Year' : undefined,
      };
      
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: Role) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call to register the user
      // For now, we'll simulate a successful registration with mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        role,
        profileImage: '/placeholder.svg',
        rollNumber: role === 'student' ? `CSI${Math.floor(Math.random() * 10000)}` : undefined,
        branch: role === 'student' ? 'Computer Science' : undefined,
        year: role === 'student' ? '2nd Year' : undefined,
      };
      
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };
  
  const updateUserProfile = (profileData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    role: user?.role || null,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
