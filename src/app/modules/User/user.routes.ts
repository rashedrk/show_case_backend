import { Router } from 'express';
import { userControllers } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidation.userSchema),
  userControllers.createUser,
);
router.get('/:id', userControllers.getUserById);
router.get('/', userControllers.getAllUsers);

export const userRoutes = router;
