import dotenv from "dotenv";

dotenv.config();

//  const ENVIRONMENT = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret-key";
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY || "secret-key";
const TOKEN_EXPIRES = process.env.JWT_EXPIRES || "1d";
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || "7d";
const environment = {
  PORT,
  MONGODB_URI,
  JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
  TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
};

export default environment;
