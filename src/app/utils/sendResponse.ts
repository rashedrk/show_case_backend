import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  payload: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
    data: T | null | undefined;
  },
) => {
  res.status(payload.statusCode).json({
    success: payload.success,
    statusCode: payload.statusCode,
    message: payload.message,
    meta: payload.meta || null || undefined,
    data: payload.data || null || undefined,
  });
};

export default sendResponse;
