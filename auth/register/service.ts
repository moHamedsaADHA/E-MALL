import UserRepository from "../../../repository/user.repository";
import bcrypt from "bcrypt";
import AppError from "../../../utils/app-error";
import LoginSessionRepository from "../../../repository/login-session.repository";
import { LoginSessionCreateInput } from "../../../../generated/prisma/models";
import CartRepository from "../../../repository/cart.repository";
import WishListRepository from "../../../repository/wish-list.repository";
import createAuthTokens from "../../../services/auth-tokens";
import environment from "../../../config/environment";
import crypto from "crypto";
const userRepo = new UserRepository();
const loginSessionRepo = new LoginSessionRepository();
const cartRepo = new CartRepository();
const wishListRepo = new WishListRepository();
const registerUser = async (
  email: string,
  password: string,
  name: string,
  phoneNumber: string,
) => {
  const isUserExists = await userRepo.findByEmail(email);
  if (isUserExists) {
    throw new AppError("User already exists", 400);
  }

  const hashPassword = await bcrypt.hash(password, environment.BCRYPT_SALT);
  const user = await userRepo.create({
    email,
    hashPassword,
    name,
    phoneNumber,
  });

  const findUser = await userRepo.findByEmail(email);
  if (!findUser) {
    throw new AppError("User not found", 404);
  }
  const userId = findUser.id;
  const { token, refreshToken, expiresAt } = await createAuthTokens(userId);
  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await loginSessionRepo.create({
    refreshToken: hashedRefreshToken,
    expiresAt,
    user: {
      connect: { id: userId },
    },
  } as LoginSessionCreateInput);

  await cartRepo.createCartForUser(userId);
  await wishListRepo.createWishListForUser(userId);

  return { token, refreshToken, expiresAt, user };
};

export default registerUser;
