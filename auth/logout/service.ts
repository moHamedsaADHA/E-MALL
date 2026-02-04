import LoginSessionRepository from "../../../repository/login-session.repository";
import crypto from "crypto";
const loginSessionRepo = new LoginSessionRepository();
const logoutUser = async (refreshToken: string) => {

    if (!refreshToken) {
        return;
    }
    const hashRefreshToken = crypto
  .createHash("sha256")
  .update(refreshToken)
  .digest("hex");
    const session = await loginSessionRepo.findByRefreshToken(hashRefreshToken);
    if (!session) {
        return;
    }

    await loginSessionRepo.revokeSession(session.id);

};

export default logoutUser;