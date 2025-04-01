import axiosClient from "./axiosClient";

export interface ISignUp {
  name: string;
  username: string;
  password: string;
}

interface ISignIn {
  username: string;
  password: string;
}

export const authApi = {
  signUp(data: ISignUp) {
    const url = "/auth/sign-up";
    return axiosClient.post(url, data);
  },

  signIn(data: ISignIn) {
    const url = "/auth/sign-in";
    return axiosClient.post(url, data);
  },
};
