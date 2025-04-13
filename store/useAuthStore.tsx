import { create } from "zustand";
import Cookies from "universal-cookie";
import { toast } from "sonner";

const cookies = new Cookies();

const authStore = (set) => ({
  refresh: cookies.get("ticketPro")?.refresh,
  loggedIn: cookies.get("ticketPro")?.token ? true : false,
  user: cookies.get("ticketPro") || null,

  setUser: (user) => {
    set(() => {
      cookies.set("ticketPro", user);
      return { user: user, loggedIn: true };
    });
  },

  logout: () => {
    set(() => {
      cookies.remove("ticketPro");
      return {
        loggedIn: false,
        user: null,
      };
    });
    toast.success("Logged out successfully");
  },
});

export const useAuthStore = create(authStore);
