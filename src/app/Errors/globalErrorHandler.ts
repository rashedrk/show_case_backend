import Joi from 'joi';
import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
} from 'sequelize';
import handleJoiError from '../Errors/handleJoiError';
import { NextFunction, Request, Response } from 'express';
import AppError from './AppError';
import config from '../config';

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages = ['Something went wrong!'];

  // Handle AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [err.message];
  }
  // Handle Joi Validation Error
  else if (err instanceof Joi.ValidationError) {
    const simplifiedError = handleJoiError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // Handle Sequelize Unique Constraint Error
  else if (err instanceof UniqueConstraintError) {
    statusCode = 409;
    message = 'Duplicate entry error';
    errorMessages = err.errors.map(
      (error) =>
        `${error.path} must be unique. Value '${error.value}' already exists.`,
    );
  }
  // Handle Sequelize Validation Error
  else if (err instanceof ValidationError) {
    statusCode = 400;
    message = 'Validation Error';
    errorMessages = err.errors.map((error) => error.message);
  }
  // Handle Sequelize Foreign Key Constraint Error
  else if (err instanceof ForeignKeyConstraintError) {
    statusCode = 400;
    message = 'Foreign key constraint error';
    errorMessages = [err.message];
  }
  // Handle Sequelize Database Error
  else if (err instanceof DatabaseError) {
    statusCode = 400;
    message = 'Database error';
    errorMessages = [err.message];
  }
  // Handle generic Error
  else if (err instanceof Error) {
    message = err.message;
    errorMessages = [err.message];
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorMessages,
    stack:
      config.env === 'development' && err instanceof Error
        ? err.stack
        : undefined,
  });
};

export default globalErrorHandler;
