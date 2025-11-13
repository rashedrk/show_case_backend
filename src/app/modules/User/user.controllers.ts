import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.services';
import httpStatus from 'http-status';
import { BaseController } from '../../controllers/BaseController';

class UserController extends BaseController {
  // Create user
  createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createUser(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  });

  // Get all users
  getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.getAllUsers();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  });

  // Update user
  updateUser = catchAsync(async (req: Request, res: Response) => {
    const userId = this.getUserIdOrThrow(req);

    const result = await userServices.updateUser(userId, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  });

  // Delete user
  deleteUser = catchAsync(async (req: Request, res: Response) => {
    const userId = this.getUserIdOrThrow(req);

    await userServices.deleteUser(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  });

  // Get user with posts
  getUserWithPosts = catchAsync(async (req: Request, res: Response) => {
    const id = this.getParamOrThrow(req, 'id');

    const result = await userServices.getUserWithPosts(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User with posts fetched successfully',
      data: result,
    });
  });

  // Get current user
  getCurrentUser = catchAsync(async (req: Request, res: Response) => {
    const userId = this.getUserIdOrThrow(req);

    const result = await userServices.getCurrentUser(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Current user fetched successfully',
      data: result,
    });
  });
}

export const userControllers = new UserController();
