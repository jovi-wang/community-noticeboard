import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';
const router: Router = Router();

router.post('/', registerUser);

router.post('/login', loginUser);

export const UserRouter = router;
