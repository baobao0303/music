import { ISignInPayload, ISignUpPayload, ISignupResponse } from "../models/auth.model";
import axiosClient from "./axiosClient";

export const authApi = {
  signUp(data: ISignUpPayload) {
    const url = "/auth/sign-up";
    return axiosClient.post<unknown, ISignupResponse>(url, data);
  },

  signIn(data: ISignInPayload) {
    const url = "/auth/sign-in";
    return axiosClient.post(url, data);
  },
};
