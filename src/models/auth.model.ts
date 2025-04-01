export interface ISignUpPayload {
  name: string;
  username: string;
  password: string;
}
export interface ISignupResponse {
  message: string;
  data: {
    accessToken: string;
    user: {
      username: string;
      name: string;
      provider: string;
      role: string;
    };
  };
}

export interface ISignInPayload {
  username: string;
  password: string;
}
export interface ISignInResponse {
  message: string;
  data: {
    accessToken: string;
    user: {
      username: string;
      name: string;
      provider: string;
      role: string;
    };
  };
}
