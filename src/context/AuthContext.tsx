"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, AuthUser, LoginCredentials, RegisterData } from '@/lib/api';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const res = await authApi.me();
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const res = await authApi.login(credentials);
      if (res.success && res.data) {
        setUser(res.data);
        return { success: true, message: res.message || 'Sesión iniciada correctamente' };
      }
      return { success: false, message: res.message || 'Credenciales inválidas' };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Error al iniciar sesión' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      const res = await authApi.register(data);
      if (res.success && res.data) {
        setUser(res.data);
        return { success: true, message: res.message || 'Usuario registrado correctamente' };
      }
      return { success: false, message: res.message || 'No se pudo completar el registro' };
    } catch (error: any) {
      console.error('Registration error:', error);
      return { success: false, message: error.message || 'Error al registrar el usuario' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        checkSession
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
