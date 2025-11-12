import { Router } from 'express';
import auth from '../../middlewares/Auth';
import { postControllers } from './post.controllers';

const router = Router();

router.post('/', auth('user'), postControllers.createPost);
router.get('/:id', postControllers.getPostById);
router.put('/:id', auth('user'), postControllers.updatePost);
router.delete('/:id', auth('user'), postControllers.deletePost);
router.get('/user/:userId', postControllers.getAllPostsByUserId);

export const postRoutes = router;
