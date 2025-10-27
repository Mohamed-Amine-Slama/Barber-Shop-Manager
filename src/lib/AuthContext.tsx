import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '@/components/LoadingPage';
import { api, User as ApiUser } from '@/lib/api';

interface AuthState {
  user: ApiUser | null;
  isAdmin: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAdmin: false,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;
    
    // Check for existing token
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        if (isMounted) {
          setState({ user: null, isAdmin: false, isLoading: false });
        }
        return;
      }

      try {
        const { user } = await api.getMe();
        const isAdmin = user.role === 'admin';
        
        if (isMounted) {
          setState({ user, isAdmin, isLoading: false });

          // Redirect based on role if on login page
          if (window.location.pathname === '/login') {
            if (isAdmin) {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('token');
        if (isMounted) {
          setState({ user: null, isAdmin: false, isLoading: false });
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      const { user, token } = await api.signIn({ email, password });

      // Store token
      localStorage.setItem('token', token);
      
      const isAdmin = user.role === 'admin';
      console.log('Sign in successful. User:', user.email, 'isAdmin:', isAdmin);
      setState({ user, isAdmin, isLoading: false });
      
      if (isAdmin) {
        console.log('Navigating to /admin');
        navigate('/admin');
      } else {
        console.log('Navigating to /dashboard');
        navigate('/dashboard');
      }
    } catch (error: any) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await api.signOut();
      localStorage.removeItem('token');
      setState({ user: null, isAdmin: false, isLoading: false });
      navigate('/');
    } catch (error: any) {
      throw error;
    }
  };

  if (state.isLoading) {
    return <LoadingPage />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
