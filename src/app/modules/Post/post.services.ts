import { IPost, IPostCreationAttributes } from './post.interface';
import Post from './post.model';

const createPost = async (payload: IPostCreationAttributes): Promise<IPost> => {
  const post = await Post.create(payload);
  return post;
};

const getPostById = async (id: string): Promise<IPost | null> => {
  const post = await Post.findByPk(id);
  return post;
};

const getAllPostsByUserId = async (userId: string): Promise<IPost[]> => {
  const posts = await Post.findAll({
    where: { userId },
  });
  return posts;
};

const updatePost = async (
  id: string,
  userId: string,
  payload: Partial<IPost>,
): Promise<IPost | null> => {
  const post = await Post.findOne({ where: { id, userId } });

  if (!post) {
    return null;
  }

  await post.update(payload);
  return post;
};

const deletePost = async (id: string, userId: string): Promise<boolean> => {
  const deletedCount = await Post.destroy({
    where: { id, userId },
  });

  return deletedCount > 0;
};

export const postServices = {
  createPost,
  getAllPostsByUserId,
  getPostById,
  updatePost,
  deletePost,
};
