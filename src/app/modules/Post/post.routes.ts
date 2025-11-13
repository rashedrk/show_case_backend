import { Router } from 'express';
import auth from '../../middlewares/Auth';
import { postControllers } from './post.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { postValidationSchema } from './post.validation';

const router = Router();

router.get('/:id', postControllers.getPostById);

router.post(
  '/',
  auth('user'),
  validateRequest(postValidationSchema.createPost),
  postControllers.createPost,
);
router.patch(
  '/:id',
  auth('user'),
  validateRequest(postValidationSchema.updatePost),
  postControllers.updatePost,
);
router.delete('/:id', auth('user'), postControllers.deletePost);

export const postRoutes = router;
