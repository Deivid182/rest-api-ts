import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { loginSchema, signupSchema } from '../schemas/user.schema';
import { validateSchema } from '../middleware/validate-schema';
import { validateAuth } from '../middleware/validate-auth';

const authRouter = Router();

authRouter.post('/register', validateSchema(signupSchema), register);
authRouter.post('/login', validateSchema(loginSchema), login);
authRouter.get('/profile', validateAuth, getProfile);

export default authRouter
