import Router from 'express';
import { userRouter } from './user.routes.mjs';
import { movieRouter } from './movies.routes.mjs';
import { friendRouter } from './friends.routes.mjs';
import { authRouter } from './auth.routes.mjs';
import { verifyToken } from '../middleware/validateToken.mjs';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', userRouter);

router.use('/movies', verifyToken, movieRouter);

router.use('/friends', verifyToken, friendRouter);

export default router;