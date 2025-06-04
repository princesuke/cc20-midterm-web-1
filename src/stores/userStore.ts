import { create } from "zustand";
import type { User } from "../types/user";
import axios from "../config/axios";
import type { LoginResponse } from "@/types/response.type";
import { persist } from "zustand/middleware";
import { isAxiosError } from "axios";

type userStore = {
  accessToken: string;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => void;
};

const useUserStore = create<userStore>()(
  persist(
    (set) => ({
      accessToken: "",
      loading: false,
      login: async (user: User) => {
        set({ loading: true });
        try {
          const res = await axios.post<LoginResponse>("/V1/auth/login", user);
          set({ accessToken: res.data.accessToken });
        } catch (err) {
          if (isAxiosError(err)) {
            console.log(err.response?.data);
          }
          console.log("something error");
        }
      },
      logout: () => {
        console.log("logout");
        localStorage.clear();
        set({ accessToken: "" });
      },
      register: async (body: User) => {
        try {
          await axios.post<LoginResponse>("/V1/auth/register", body);
        } catch (err) {
          if (isAxiosError(err)) {
            console.log(err.response?.data);
          } else console.log("something error");
        }
      },
    }),
    {
      name: "user_storage",
      partialize(state) {
        return {
          accessToken: state.accessToken,
        };
      },
    }
  )
);

export default useUserStore;
