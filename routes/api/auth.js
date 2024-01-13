import { Router } from 'express';
import { register, login, getCurrent, logout } from '../../controllers/auth.js';
import validateBody from '../../middlewares/validateBody.js';
import authenticate from '../../middlewares/authenticate.js'
import schemas from '../../models/user.js';
const router = Router();

router.post('/register', validateBody(schemas.registerSchema), register);

router.post('/login', validateBody(schemas.loginSchema), login);

router.get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

export default router;