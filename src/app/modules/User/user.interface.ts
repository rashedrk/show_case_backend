import { Optional } from 'sequelize';

export interface IUser {
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

export type IUserCreationAttributes = Optional<
  IUser,
  'id' | 'createdAt' | 'updatedAt'
>;
