import httpStatus from 'http-status';
import { CookieOptions, Response } from 'express';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.services';
import AppError from '../../Errors/AppError';

class AuthController {
  login = catchAsync(async (req, res) => {
    const result = await authServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;

    this.setRefreshTokenCookie(res, refreshToken);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully',
      data: { accessToken },
    });
  });

  refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Refresh token not found');
    }
    const result = await authServices.refreshToken(refreshToken);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Access token is retrieved successfully!',
      data: result,
    });
  });

  //private helper methods
  private getRefreshTokenCookieOptions(): CookieOptions {
    return {
      secure: config.env === 'production',
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    };
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie(
      'refreshToken',
      refreshToken,
      this.getRefreshTokenCookieOptions(),
    );
  }
}

export const authControllers = new AuthController();
