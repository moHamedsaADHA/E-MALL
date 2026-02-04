import { Router } from 'express';
import { register, login } from '../../modules/auth/auth.controller';
import { validateRegister, validateLogin } from '../../modules/auth/auth.validation';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
