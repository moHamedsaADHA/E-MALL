import { CookieOptions, Request, RequestHandler, Response } from "express";
import logoutUser from "./service";
import environment from "../../../config/environment";

const cookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  httpOnly: true,
  sameSite: "strict",
  secure: environment.ModeEnv === "production",
};
const logout: RequestHandler<{}, string> = async (
  req: Request,
  res: Response,
) => {
  const { refreshToken } = req.cookies;

  await logoutUser(refreshToken!);

  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json("Logout successfully");
};

export default logout;
