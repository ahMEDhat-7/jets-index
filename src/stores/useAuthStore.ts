import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  getToken: () => string | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  setAuth: (token: string, user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jetsindex_token", token);
      localStorage.setItem("jetsindex_user", JSON.stringify(user));
    }
    set({ token, user });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jetsindex_token");
      localStorage.removeItem("jetsindex_user");
    }
    set({ token: null, user: null });
  },
  getToken: () => {
    if (typeof window === "undefined") return get().token;
    const stored = localStorage.getItem("jetsindex_token");
    if (stored && !get().token) {
      const userStr = localStorage.getItem("jetsindex_user");
      const user = userStr ? JSON.parse(userStr) : null;
      set({ token: stored, user });
      return stored;
    }
    return get().token;
  },
}));
