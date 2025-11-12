import config from '../../config';
import { generateToken } from '../../utils/JwtToken';
import bcrypt from 'bcrypt';
import { TAuth } from './auth.interface';
import User from '../User/user.model';
import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: TAuth) => {
  const userData = await User.findOne({
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

  const accessToken = generateToken(
    {
      name: userData.name,
      email: userData.email,
      id: userData.id,
      role: userData.role,
    },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string,
  );

  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
    gender: userData.gender,
    role: userData.role,
    token: accessToken,
  };
};

export const authServices = {
  loginUser,
};
