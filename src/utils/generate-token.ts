import jwt from "jsonwebtoken"
const generateToken = (id: number,secretKey : string,JWT_EXPIRES:string): string => {

  return jwt.sign({ id }, secretKey as string, {
    expiresIn: JWT_EXPIRES as jwt.SignOptions["expiresIn"],
  });
};

export default generateToken;