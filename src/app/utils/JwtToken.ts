import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

export interface JwtTokenPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const generateToken = (
  payload: JwtTokenPayload,
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
