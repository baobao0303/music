import { useMutation } from "@tanstack/react-query";
import { authApi } from "../auth.api";
import { useNotificationContext } from "../../context/notification";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  // Context
  const notification = useNotificationContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      notification.success("Sign up successfully");
      const accessToken = data.data.accessToken;
      if (!accessToken) return;

      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    },
  });
}
export function useSignIn() {
  // Context
  const notification = useNotificationContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      notification.success("Sign in successfully");
      const accessToken = data.data.accessToken;
      if (!accessToken) return;

      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    },
  });
}
