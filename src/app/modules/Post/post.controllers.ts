import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { postServices } from './post.services';
import httpStatus from 'http-status';

const createPost = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const result = await postServices.createPost({ ...payload, userId });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Post created successfully',
    data: result,
  });
});

const getAllPostsByUserId = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    throw new Error('User ID is required');
  }

  const result = await postServices.getAllPostsByUserId(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts fetched successfully',
    data: result,
  });
});

const getPostById = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error('Post ID is required');
  }
  const result = await postServices.getPostById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post fetched successfully',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.params;
  if (!id) {
    throw new Error('Post ID is required');
  }
  const result = await postServices.updatePost(id, userId, req.body);
  if (!result) {
    throw new Error('Post not found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { id } = req.params;
  if (!id) {
    throw new Error('Post ID is required');
  }
  const result = await postServices.deletePost(id, userId);
  if (!result) {
    throw new Error('Post not found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post deleted successfully',
    data: null,
  });
});

export const postControllers = {
  createPost,
  getAllPostsByUserId,
  getPostById,
  updatePost,
  deletePost,
};
