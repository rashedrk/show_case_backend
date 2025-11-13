import httpStatus from 'http-status';
import { IPostCreationAttributes } from './post.interface';
import Post from './post.model';
import AppError from '../../Errors/AppError';

class PostService {
  // Create post
  async createPost(payload: IPostCreationAttributes) {
    const post = await Post.createPost(payload);
    return post.toSafeObject();
  }

  // Get post by id
  async getPostById(id: string) {
    const post = await this.findPostOrThrow(id);
    return post.toSafeObject();
  }

  // Update post
  async updatePost(
    id: string,
    userId: string,
    updateData: Partial<IPostCreationAttributes>,
  ) {
    const post = await this.findPostOrThrow(id);
    this.validateOwnership(post, userId);

    await post.update(updateData);
    return post.toSafeObject();
  }

  // Delete post
  async deletePost(id: string, userId: string): Promise<boolean> {
    const post = await this.findPostOrThrow(id);
    this.validateOwnership(post, userId);

    await post.destroy();
    return true;
  }

  // Private helper methods
  private async findPostOrThrow(id: string): Promise<Post> {
    const post = await Post.findByPk(id);
    if (!post) {
      throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
    }
    return post;
  }

  private validateOwnership(post: Post, userId: string): void {
    if (!post.isOwnedBy(userId)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not authorized to perform this action',
      );
    }
  }
}

export const postServices = new PostService();
