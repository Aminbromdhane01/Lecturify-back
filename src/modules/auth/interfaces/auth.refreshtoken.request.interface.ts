export interface RefreshTokenRequest extends Request {
  user: {
    sub: string;
    refreshToken: string;
  };
}
