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

  // Get user by ID
  getUserById = catchAsync(async (req: Request, res: Response) => {
    const id = this.getParamOrThrow(req, 'id');

    const result = await userServices.getUserById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
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
}

export const userControllers = new UserController();
