import config from '../../config';
import { generateToken } from '../../utils/JwtToken';
import bcrypt from 'bcrypt';
import { TAuth } from './auth.interface';
import User from '../User/user.model';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const loginUser = async (payload: TAuth) => {
  const userData = await User.scope('withPassword').findOne({
    where: {
      email: payload.email,
    },
  });

  if (!userData) {
    throw new Error('User not found');
  }

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new Error('Password incorrect!');
  }

  const jwtPayload = {
    name: userData.name,
    email: userData.email,
    id: userData.id,
    role: userData.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_secret as Secret,
    config.jwt_expires_in as string,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // Verify refresh token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as Secret,
  ) as JwtPayload;

  const { id, email } = decoded;

  // Check if user exists
  const user = await User.findOne({
    where: {
      id,
      email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const jwtPayload = {
    name: user.name,
    email: user.email,
    id: user.id,
    role: user.role,
  };

  // Generate new access token
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_secret as Secret,
    config.jwt_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const authServices = {
  loginUser,
  refreshToken,
};
