import generateToken from "./generate-token";
import environment from "../config/environment";

interface AuthTokens {
  token: string;
  refreshToken: string;
  expiresAt: Date;
}

const JWT_EXPIRES =environment.TOKEN_EXPIRES;
const REFRESH_TOKEN_EXPIRES =environment.REFRESH_TOKEN_EXPIRES;

const createAuthTokens = async (userId: number): Promise<AuthTokens> => {
  const token = generateToken(userId, environment.JWT_SECRET_KEY, JWT_EXPIRES);

  const expiresAt = new Date(Date.now() +REFRESH_TOKEN_EXPIRES); // 7 days
  

  const refreshToken = generateToken(
    userId,
    environment.JWT_REFRESH_SECRET_KEY,
    REFRESH_TOKEN_EXPIRES,
  );

  return { token, refreshToken, expiresAt };
};

export default createAuthTokens;
