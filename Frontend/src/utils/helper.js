import { getCurrentUser } from "../apis/auth.api.js";
import { redirect } from "@tanstack/react-router";
import { login as loginAction } from "../store/slice/authSlice.js";

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
      retry: false,
    });
    store.dispatch(loginAction(user));
    const {isLoggedIn} = store.getState().auth;
    if (!isLoggedIn) {
      return redirect({ to: "/auth" });
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
    return redirect({ to: "/auth" });
  }
};
