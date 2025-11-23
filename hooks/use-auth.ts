import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { post } from '@/lib/api-client';

export interface User {
  id: string;
  email: string;
  nombre: string;
  rol: 'usuario' | 'administrador';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  const router = useRouter();

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('magnix_user');
    
    if (token && userJson) {
      try {
        setState({
          user: JSON.parse(userJson),
          token,
          loading: false,
          error: null,
        });
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('magnix_user');
        setState(prev => ({ ...prev, loading: false }));
      }
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await post('/auth/login', { email, password });
      const { token, user } = response;

      localStorage.setItem('token', token);
      localStorage.setItem('magnix_user', JSON.stringify(user));

      setState({
        user,
        token,
        loading: false,
        error: null,
      });

      router.push('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error en login';
      setState(prev => ({
        ...prev,
        loading: false,
        error: message,
      }));
    }
  }, [router]);

  const register = useCallback(async (
    email: string,
    password: string,
    nombre: string
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await post('/auth/register', { email, password, nombre });
      const { token, user } = response;

      localStorage.setItem('token', token);
      localStorage.setItem('magnix_user', JSON.stringify(user));

      setState({
        user,
        token,
        loading: false,
        error: null,
      });

      router.push('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error en registro';
      setState(prev => ({
        ...prev,
        loading: false,
        error: message,
      }));
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('magnix_user');
    setState({
      user: null,
      token: null,
      loading: false,
      error: null,
    });
    router.push('/');
  }, [router]);

  return {
    ...state,
    login,
    register,
    logout,
    isAuthenticated: !!state.token,
  };
}
