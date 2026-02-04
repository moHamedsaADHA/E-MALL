import { NextFunction, Request, Response } from "express";
import refreshAccessTokenAndRefreshToken from "./service";
import cookieOptions from "../../../options/cookie-options";

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies;

  const {
    token,
    refreshToken: newRefreshToken,
    user,
  } = await refreshAccessTokenAndRefreshToken(refreshToken);

  res.cookie("refreshToken", newRefreshToken, cookieOptions);

  res.status(200).json({
    status: "success",
    token: token,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    },
  });
};

export default refresh;
