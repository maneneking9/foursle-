import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/api';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = async (email: string, password: string) => {
    // Allow any email and password to login
    if (email && password) {
      const user = { id: 1, email, name: email.split('@')[0], role: 'admin' };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('admin_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const result = await api.register(email, password, name);
      if (result.success) {
        return await login(email, password);
      }
      return false;
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error.message || 'Cannot connect to server. Please run: npm run server');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};
