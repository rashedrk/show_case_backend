import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import User from '../modules/User/user.model';

type Role = 'user' | 'admin';

const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new Error('You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;

    const { id, role } = decoded;

    // checking if the user is exist
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('This user is not found !');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized!');
    }

    // Attach user info to request
    req.user = decoded;

    next();
  });
};

export default auth;
