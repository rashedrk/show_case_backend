import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidationSchema } from './auth.validation';
import { authControllers } from './auth.controllers';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidationSchema.loginValidation),
  authControllers.login,
);

router.post(
  '/refresh-token',
  validateRequest(authValidationSchema.refreshTokenValidation),
  authControllers.refreshToken,
);

export const authRoutes = router;
