import { Router } from 'express';
import auth from '../../middlewares/Auth';
import { postControllers } from './post.controllers';

const router = Router();

router.get('/:userId', postControllers.getAllPostsByUserId);
router.post('/', auth('user'), postControllers.createPost);
router.get('/:id', postControllers.getPostById);
router.put('/:id', auth('user'), postControllers.updatePost);
router.delete('/:id', auth('user'), postControllers.deletePost);

export const postRoutes = router;
