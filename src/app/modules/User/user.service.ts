import config from '../../config';
import { TUser, TUserCreationAttributes } from './user.interface';
import User from './user.model';
import bcrypt from 'bcrypt';

const createUser = async (payload: TUserCreationAttributes): Promise<TUser> => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.salt_rounds),
  );
  const userData = {
    ...payload,
    password: hashedPassword,
  };
  const result = await User.create(userData, {
    returning: [
      'id',
      'name',
      'email',
      'phone',
      'address',
      'gender',
      'role',
      'createdAt',
      'updatedAt',
    ],
  });
  return result.toJSON();
};

const getUserByEmail = async (email: string): Promise<TUser | null> => {
  const user = await User.findOne({ where: { email } });
  return user ? user.toJSON() : null;
};

export const userServices = {
  createUser,
  getUserByEmail,
};
