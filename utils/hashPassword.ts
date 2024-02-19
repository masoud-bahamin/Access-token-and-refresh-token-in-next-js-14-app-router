import { hash, compare } from "bcryptjs";

export const hashPassword = async (pass: string) => {
  const hashed = await hash(pass, 12);
  return hashed;
};

export const comparePassword = async (pass: string, hashedPass: string) => {
  const password = await compare(pass, hashedPass);
  return password;
};
