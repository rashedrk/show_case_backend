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
  const result = await User.create(userData);
  return result;
};

const getUserById = async (id: string): Promise<TUser | null> => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const getAllUsers = async (): Promise<TUser[]> => {
  const users = await User.findAll();
  return users;
};

const updateUser = async (
  id: string,
  payload: Partial<TUser>,
): Promise<TUser | null> => {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return null;
  }
  await user.update(payload);
  return user;
};

export const userServices = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
};
