import UserRepository from "../../../repository/user.repository";
import bcrypt from "bcrypt";
import createAuthTokens from "../../../services/auth-tokens";
import LoginSessionRepository from "../../../repository/login-session.repository";
import { LoginSessionCreateInput } from "../../../../generated/prisma/models";
import hashRefreshToken from "../../../services/hash-refresh-token";
import AppError from "../../../utils/app-error";

const userRepo = new UserRepository();
const loginSessionRepo = new LoginSessionRepository();
const loginUser = async (email: string, password: string) => {
  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw new AppError("User not found", 400);
  }
  const isPasswordMatch = await bcrypt.compare(password, user.hashPassword);
  if (!isPasswordMatch) {
    throw new AppError("Invalid password", 400);
  }
  const { token, refreshToken, expiresAt } = await createAuthTokens(user.id);

  const hashedRefreshToken = hashRefreshToken(refreshToken);

  await loginSessionRepo.create({
    refreshToken: hashedRefreshToken,
    expiresAt,
    user: {
      connect: {
        id: user.id,
      },
    },
  } as LoginSessionCreateInput);

  return { token, refreshToken, expiresAt, user };
};

export default loginUser;
