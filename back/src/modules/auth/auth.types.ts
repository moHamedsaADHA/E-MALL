export interface IAuthPayload {
  email: string;
  password: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
