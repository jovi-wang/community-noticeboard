import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './models/User';

export const validateEmail = (email: string): boolean => {
  return Boolean(
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  );
};

export const hashPassword = async (
  plainTextPassword: string
): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
};

export const comparePasswords = async (
  plainTextPassword: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hash);
};

export const generateJWT = (user: User): string => {
  return jwt.sign(
    { email: user.email, profileId: user.profileId },
    process.env.JWT_SECRET || 'secret_jwt'
  );
};

export const extractProfileIdFromJWT = (token: string): string => {
  const decoded = jwt.decode(token) as {
    email: string;
    profileId: string;
  };
  return decoded.profileId;
};
