import { Router } from 'express';
import {
  getProfiles,
  getProfile,
  updateProfile,
} from '../controllers/profileController';
import { requireAuth } from '../middleware/authMiddleware';

const router: Router = Router();

router.get('/', requireAuth, getProfiles);

router.get('/:profileId', requireAuth, getProfile);

router.put('/:profileId', requireAuth, updateProfile);

export const ProfileRouter = router;
