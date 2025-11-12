import { TUser, TUserCreationAttributes } from './user.interface';
import User from './user.model';

const createUser = async (
  userData: TUserCreationAttributes,
): Promise<TUser> => {
  const user = await User.create(userData);
  return user.toJSON();
};

const getUserByEmail = async (email: string): Promise<TUser | null> => {
  const user = await User.findOne({ where: { email } });
  return user ? user.toJSON() : null;
};

export const userServices = {
  createUser,
  getUserByEmail,
};
