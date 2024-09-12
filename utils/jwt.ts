import { sign, verify } from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY_TOKEN!

export const createToken = (email: string) => {
  const token = sign({
    exp: Math.floor(Date.now() / 1000) + (10),
      email 
  }, secretKey);

  return token;
};
export const createRefreshToken = (email: string) => {
  const token = sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24* 7),
      email 
  }, secretKey);

  return token;
};


export const verifyToken = (token: string) => {
  const user = verify(token, secretKey) as { email: string };
  return user.email;
};
