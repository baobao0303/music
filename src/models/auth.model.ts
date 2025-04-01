export interface IAuthPayload {
  name: string;
  username: string;
  password: string;
}
export interface IAuthResponse {
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
