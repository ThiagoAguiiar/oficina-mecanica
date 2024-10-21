import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const createToken = (payload, expires) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expires });
};

// Pegar dados do token
export const decodeToken = async (token) => {
  return await jwtDecode(token);
};
