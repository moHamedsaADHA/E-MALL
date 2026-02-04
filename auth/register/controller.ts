import {
  CookieOptions,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { IRequestUser, IResponseUser } from "./types";
import registerUser from "./service";
import AppError from "../../../utils/app-error";
import cookieOptions from "../../../options/cookie-options";

const register: RequestHandler<{}, IResponseUser, IRequestUser> = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, name, phoneNumber } = req.body;
    if (!email || !password || !name || !phoneNumber) {
      throw new AppError("Missing required fields", 400);
    }
    const user = await registerUser(email, password, name, phoneNumber);
    // console.log(user.token, user.refreshToken);
    res.cookie("refreshToken", user.refreshToken, cookieOptions);
    res.status(201).json({
      status: "success",
      token: user.token,
      data: {
        user: {
          id: user.user.id,
          name: user.user.name,
          email: user.user.email,
          phoneNumber: user.user.phoneNumber,
        },
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export default register;
