import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { IJwtTokenPayload } from '../modules/Auth/auth.interface';

export const generateToken = (
  payload: IJwtTokenPayload,
  secret: Secret,
  expiresIn: string,
): string => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);

  return token;
};

export const verifyToken = <T extends JwtPayload = JwtPayload>(
  token: string,
  secret: string,
) => {
  return jwt.verify(token, secret) as T;
};
