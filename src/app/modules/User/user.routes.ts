import { Router } from 'express';
import { userControllers } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import auth from '../../middlewares/Auth';

const router = Router();

router.post(
  '/',
  validateRequest(userValidation.createUser),
  userControllers.createUser,
);
router.get('/', userControllers.getAllUsers);
router.get('/me', auth('user'), userControllers.getCurrentUser);
router.get('/:id', userControllers.getUserWithPosts);
router.put(
  '/',
  auth('user'),
  validateRequest(userValidation.updateUser),
  userControllers.updateUser,
);

export const userRoutes = router;
