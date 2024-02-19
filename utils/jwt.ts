import { sign, verify } from "jsonwebtoken";

export const createToken = (email: string) => {
  const token = sign(email, "mamad");
  return token;
};

export const verifyToken = (token: string) => {
  const email = verify(token, "mamad");
  return email;
};
