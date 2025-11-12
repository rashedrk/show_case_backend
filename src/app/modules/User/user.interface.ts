import { Optional } from 'sequelize';

export interface TUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: 'male' | 'female';
  password: string;
  role: 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

export type TUserCreationAttributes = Optional<
  TUser,
  'id' | 'createdAt' | 'updatedAt'
>;
