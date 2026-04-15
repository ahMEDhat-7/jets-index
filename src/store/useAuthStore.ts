import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as apiLogin } from '../lib/api';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthStore {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        const result = await apiLogin(email, password);
        if (result && result.token) {
          set({ token: result.token, user: result.user, isAuthenticated: true, isLoading: false, error: null });
          return true;
        } else {
          set({ isLoading: false, error: 'Invalid email or password' });
          return false;
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false, error: null });
      },
    }),
    {
      name: 'jets-admin-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);