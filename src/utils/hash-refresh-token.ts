import crypto from "crypto";
const hashRefreshToken = (refreshToken: string) => {
  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  return hashedRefreshToken;
};

export default hashRefreshToken;
