import { create } from "zustand";

interface UserState {
  userId: string | null;
  name: string | null;
  setUser: (user: { userId: string; name: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  name: null,
  setUser: ({ userId, name }) => set({ userId, name }),
  clearUser: () => set({ userId: null, name: null }),
}));
