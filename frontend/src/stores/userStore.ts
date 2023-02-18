import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type userState = {
  user: User;
  setUser: (userData: User | undefined) => void;
};

export const useUserStore = create<userState>((set) => ({
  user: <User>{},
  setUser: (userData: User | undefined) => set({ user: userData }),
}));
