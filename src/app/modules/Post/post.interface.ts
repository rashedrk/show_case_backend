import { Optional } from 'sequelize';

export interface IPost {
  id: string;
  title?: string;
  shortDescription: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IPostCreationAttributes = Optional<
  IPost,
  'id' | 'createdAt' | 'updatedAt'
>;
