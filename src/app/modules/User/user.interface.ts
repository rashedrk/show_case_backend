import { Optional } from 'sequelize';

export interface TUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

export type TUserCreationAttributes = Optional<
  TUser,
  'id' | 'createdAt' | 'updatedAt'
>;
