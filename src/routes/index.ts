import { Request, Router } from 'express';
import UsersRouter from '@routes/Users/index';
import GoogleUserRouter from '@routes/googleOAuth/index';
import PeliculasRoutes from './Peliculas';
import session from 'express-session';
import passport from 'passport';
const router = Router();

router.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  }),
);

router.use(passport.initialize());

router.use('/security', UsersRouter);
router.use('/auth', GoogleUserRouter);
router.use('/movies', PeliculasRoutes);

export default router;

export interface WithUserRequest extends Request {
  user?: any;
}
