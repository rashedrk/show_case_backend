import httpStatus from 'http-status';
import config from '../../config';
import { generateToken } from '../../utils/JwtToken';
import { IAuth, IJwtTokenPayload } from './auth.interface';
import User from '../User/user.model';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import AppError from '../../Errors/AppError';

class AuthService {
  async loginUser(payload: IAuth) {
    const user = await this.findUserByEmail(payload.email);

    const isCorrectPassword = await user.comparePassword(payload.password);

    if (!isCorrectPassword) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Password incorrect!');
    }
    const jwtPayload = this.createJwtPayload(user);
    const accessToken = this.generateAccessToken(jwtPayload);
    const refreshToken = this.generateRefreshToken(jwtPayload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    // Verify refresh token
    const decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as Secret,
    ) as JwtPayload;

    const user = await User.findUserById(decoded.id);

    if (!user || user.email !== decoded.email) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const jwtPayload = this.createJwtPayload(user);
    const accessToken = this.generateAccessToken(jwtPayload);

    return {
      accessToken,
    };
  }

  // Private helper methods
  private createJwtPayload(user: User) {
    return {
      name: user.name,
      email: user.email,
      id: user.id,
      role: user.role,
    };
  }
  private generateAccessToken(payload: IJwtTokenPayload): string {
    return generateToken(
      payload,
      config.jwt_secret as Secret,
      config.jwt_expires_in as string,
    );
  }

  private generateRefreshToken(payload: IJwtTokenPayload): string {
    return generateToken(
      payload,
      config.jwt_refresh_secret as Secret,
      config.jwt_refresh_expires_in as string,
    );
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await User.scope('withPassword').findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    return user;
  }
}
export const authServices = new AuthService();
