import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.services';

const login = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

export const authControllers = {
  login,
  refreshToken,
};
