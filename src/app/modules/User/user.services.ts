import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { IUser, IUserCreationAttributes } from './user.interface';
import User from './user.model';
import Post from '../Post/post.model';

class UserService {
  // Create user
  async createUser(
    payload: IUserCreationAttributes,
  ): Promise<Omit<IUser, 'password'>> {
    const user = await User.create(payload);
    return user.toSafeObject();
  }

  // Get all users
  async getAllUsers(): Promise<Pick<IUser, 'id' | 'name' | 'email'>[]> {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'phone', 'address'],
    });
    return users;
  }

  // Update user
  async updateUser(
    id: string,
    payload: Partial<IUserCreationAttributes>,
  ): Promise<Omit<IUser, 'password'>> {
    const user = await this.findUserOrThrow(id);
    await user.update(payload);
    return user.toSafeObject();
  }

  // Delete user
  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserOrThrow(id);
    await user.destroy();
    return true;
  }

  // Get user with posts
  async getUserWithPosts(id: string) {
    const user = await User.findByPk(id, {
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'address',
        'gender',
        'createdAt',
        'updatedAt',
      ],
      include: [
        {
          model: Post,
          as: 'posts',
        },
      ],
    });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    return user;
  }

  // Get current user
  async getCurrentUser(id: string): Promise<Omit<IUser, 'password'>> {
    const user = await this.findUserOrThrow(id);
    return user.toSafeObject();
  }

  // Private helper method
  private async findUserOrThrow(id: string): Promise<User> {
    const user = await User.findUserById(id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
  }
}

export const userServices = new UserService();
