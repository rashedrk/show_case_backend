import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.services';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error('User ID is required');
  }
  const result = await userServices.getUserById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  // Get user ID from JWT token (set by auth middleware)
  const userId = req.user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const result = await userServices.updateUser(userId, req.body);
  if (!result) {
    throw new Error('User not found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const userControllers = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
};
