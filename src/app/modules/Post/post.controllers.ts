import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { postServices } from './post.services';
import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';

class PostController {
  // Create post
  createPost = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const userId = this.getUserIdOrThrow(req);

    const result = await postServices.createPost({ ...payload, userId });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Post created successfully',
      data: result,
    });
  });

  // Get all posts by user ID
  getAllPostsByUserId = catchAsync(async (req: Request, res: Response) => {
    const userId = this.getUserIdOrThrow(req);

    const result = await postServices.getAllPostsByUserId(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Posts retrieved successfully',
      data: result,
    });
  });

  // Get post by ID
  getPostById = catchAsync(async (req: Request, res: Response) => {
    const id = this.getIdOrThrow(req);
    const result = await postServices.getPostById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Post retrieved successfully',
      data: result,
    });
  });

  // Update post
  updatePost = catchAsync(async (req: Request, res: Response) => {
    const id = this.getIdOrThrow(req);
    const userId = this.getUserIdOrThrow(req);

    const result = await postServices.updatePost(id, userId, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Post updated successfully',
      data: result,
    });
  });

  // Delete post
  deletePost = catchAsync(async (req: Request, res: Response) => {
    const id = this.getIdOrThrow(req);
    const userId = this.getUserIdOrThrow(req);

    await postServices.deletePost(id, userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Post deleted successfully',
      data: null,
    });
  });

  // Private helper methods
  private getUserIdOrThrow(req: Request): string {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
    }
    return userId;
  }

  private getIdOrThrow(req: Request): string {
    const { id } = req.params;
    if (!id) {
      throw new AppError(httpStatus.BAD_REQUEST, `Id is required`);
    }
    return id;
  }
}

export const postControllers = new PostController();
