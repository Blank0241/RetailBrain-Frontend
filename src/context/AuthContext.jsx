import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser, loginAsDemoUser } from '../services/api';

const AuthContext = createContext(null);

const STORAGE_KEY = 'retailbrain_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const restore = async () => {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) {
          const cached = JSON.parse(raw);
          setUser(cached);
        }
      } catch {
        // ignore corrupt cache
      } finally {
        setIsLoading(false);
      }
    };
    restore();
  }, []);

  const persist = (nextUser) => {
    if (nextUser) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = useCallback(async (credentials) => {
    setAuthError(null);
    const { user: loggedInUser } = await loginUser(credentials);
    setUser(loggedInUser);
    persist(loggedInUser);
    return loggedInUser;
  }, []);

  const register = useCallback(async (details) => {
    setAuthError(null);
    const { user: newUser } = await registerUser(details);
    setUser(newUser);
    persist(newUser);
    return newUser;
  }, []);

  const continueAsDemo = useCallback(async () => {
    setAuthError(null);
    const { user: demoUser } = await loginAsDemoUser();
    setUser(demoUser);
    persist(demoUser);
    return demoUser;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    persist(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const current = await getCurrentUser();
    setUser(current);
    persist(current);
    return current;
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    authError,
    login,
    register,
    continueAsDemo,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
