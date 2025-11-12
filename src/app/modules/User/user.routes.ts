import { Router } from 'express';
import { userControllers } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import auth from '../../middlewares/Auth';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidation.userSchema),
  userControllers.createUser,
);
router.get('/:id', userControllers.getUserById);
router.get('/', userControllers.getAllUsers);
router.put(
  '/',
  auth('user'),
  validateRequest(userValidation.update),
  userControllers.updateUser,
);

export const userRoutes = router;
