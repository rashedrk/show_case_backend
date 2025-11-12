import { Request } from 'express';
import AppError from '../Errors/AppError';
import httpStatus from 'http-status';

export abstract class BaseController {
  // Shared helper methods for ALL controllers
  protected getUserIdOrThrow(req: Request): string {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
    }
    return userId;
  }

  protected getParamOrThrow(req: Request, paramName: string): string {
    const param = req.params[paramName];
    if (!param) {
      throw new AppError(httpStatus.BAD_REQUEST, `${paramName} is required`);
    }
    return param;
  }
}
