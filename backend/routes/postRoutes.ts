import { Router } from 'express';
import {
  getPosts,
  createPost,
  deletePost,
} from '../controllers/postController';
import { requireAuth } from '../middleware/authMiddleware';

const router: Router = Router();

router.get('/', requireAuth, getPosts);

router.post('/', requireAuth, createPost);

router.delete('/:postId', requireAuth, deletePost);

export const PostRouter = router;
