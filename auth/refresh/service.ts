import LoginSessionRepository from "../../../repository/login-session.repository";
import AppError from "../../../utils/app-error";
import hashRefreshToken from "../../../services/hash-refresh-token";
import createAuthTokens from "../../../services/auth-tokens";
import UserRepository from "../../../repository/user.repository";

const loginSessionRepo = new LoginSessionRepository();
const userRepo = new UserRepository();
const refreshAccessTokenAndRefreshToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError(
      "You are not logged in. Please log in to get access",
      401,
    );
  }

  const hashOldRefreshToken = hashRefreshToken(refreshToken);
  const session =
    await loginSessionRepo.findByRefreshToken(hashOldRefreshToken);

  if (!session) {
    throw new AppError("Invalid refresh token", 401);
  }

  if (session.revokedAt) {
    // console.log(session);
    await loginSessionRepo.revokeAllUserSessions(session.userId);
    throw new AppError("Security issue detected. Please login again.", 401);
  }

  const user = await userRepo.findById(session.userId);

  
  if (!user) {
    throw new AppError("User not found", 404);
  }

  await loginSessionRepo.revokeSession(session.id);

  const {
    token,
    refreshToken: newRefreshToken,
    expiresAt,
  } = await createAuthTokens(session.userId);
  const hashNewRefreshToken = hashRefreshToken(newRefreshToken);

  await loginSessionRepo.create({
    refreshToken: hashNewRefreshToken,
    expiresAt,
    user: {
      connect: {
        id: session.userId,
      },
    },
  });

  return { token, refreshToken: newRefreshToken, expiresAt, user };
};

export default refreshAccessTokenAndRefreshToken;
